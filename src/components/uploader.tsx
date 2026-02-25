"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Upload, FileText, X, RotateCcw, Loader2 } from "lucide-react";
import { cn } from "../lib/cn";

// =============================================================================
// Types
// =============================================================================

type UploadProgressCallback = (event: { loaded: number; total: number }) => void;

interface UploadResult {
  url?: string;
  [key: string]: unknown;
}

interface UploadStrategy {
  upload(
    file: File,
    onProgress: UploadProgressCallback
  ): { promise: Promise<UploadResult>; abort: () => void };
}

type FileStatus = "idle" | "uploading" | "completed" | "error" | "aborted";

interface UploaderFile {
  id: string;
  file: File;
  status: FileStatus;
  progress: number;
  loaded: number;
  total: number;
  error?: string;
  result?: UploadResult;
}

interface UploaderFileInternal extends UploaderFile {
  abortFn?: () => void;
}

// =============================================================================
// Utilities
// =============================================================================

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function isAcceptedType(file: File, accept?: string): boolean {
  if (!accept) return true;
  const acceptedTypes = accept.split(",").map((t) => t.trim());
  return acceptedTypes.some((type) => {
    if (type.startsWith(".")) {
      return file.name.toLowerCase().endsWith(type.toLowerCase());
    }
    if (type.endsWith("/*")) {
      const baseType = type.replace("/*", "");
      return file.type.startsWith(baseType);
    }
    return file.type === type;
  });
}

function generateFileId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

// =============================================================================
// Context
// =============================================================================

interface UploaderContextValue {
  files: UploaderFileInternal[];
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  retryFile: (id: string) => void;
  abortFile: (id: string) => void;
  openFilePicker: () => void;
  disabled: boolean;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  multiple: boolean;
}

const UploaderContext = React.createContext<UploaderContextValue | null>(null);

function useUploaderContext() {
  const context = React.useContext(UploaderContext);
  if (!context) {
    throw new Error("Uploader components must be used within an Uploader");
  }
  return context;
}

// =============================================================================
// Reducer
// =============================================================================

type UploaderAction =
  | { type: "ADD_FILES"; files: UploaderFileInternal[] }
  | { type: "REMOVE_FILE"; id: string }
  | { type: "UPDATE_PROGRESS"; id: string; progress: number; loaded: number; total: number }
  | { type: "UPLOAD_COMPLETE"; id: string; result: UploadResult }
  | { type: "UPLOAD_ERROR"; id: string; error: string }
  | { type: "UPLOAD_ABORT"; id: string }
  | { type: "SET_ABORT_FN"; id: string; abortFn: () => void }
  | { type: "RETRY"; id: string };

function uploaderReducer(
  state: UploaderFileInternal[],
  action: UploaderAction
): UploaderFileInternal[] {
  switch (action.type) {
    case "ADD_FILES":
      return [...state, ...action.files];
    case "REMOVE_FILE":
      return state.filter((f) => f.id !== action.id);
    case "UPDATE_PROGRESS":
      return state.map((f) =>
        f.id === action.id
          ? { ...f, progress: action.progress, loaded: action.loaded, total: action.total }
          : f
      );
    case "UPLOAD_COMPLETE":
      return state.map((f) =>
        f.id === action.id
          ? { ...f, status: "completed" as const, progress: 100, loaded: f.total, result: action.result, abortFn: undefined }
          : f
      );
    case "UPLOAD_ERROR":
      return state.map((f) =>
        f.id === action.id
          ? { ...f, status: "error" as const, error: action.error, abortFn: undefined }
          : f
      );
    case "UPLOAD_ABORT":
      return state.map((f) =>
        f.id === action.id
          ? { ...f, status: "aborted" as const, progress: 0, loaded: 0, abortFn: undefined }
          : f
      );
    case "SET_ABORT_FN":
      return state.map((f) =>
        f.id === action.id
          ? { ...f, status: "uploading" as const, abortFn: action.abortFn }
          : f
      );
    case "RETRY":
      return state.map((f) =>
        f.id === action.id
          ? { ...f, status: "idle" as const, progress: 0, loaded: 0, error: undefined, result: undefined }
          : f
      );
    default:
      return state;
  }
}

// =============================================================================
// CVA Variants
// =============================================================================

/**
 * Dropzone variants
 * - lg: 수직 중앙 레이아웃 (아이콘 → 제목 → 설명 → 버튼)
 * - md: 수평 레이아웃 (아이콘 | 텍스트)
 * - sm: 수평 콤팩트 레이아웃
 */
const uploaderDropzoneVariants = cva(
  "border rounded-large transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900",
  {
    variants: {
      size: {
        lg: "flex flex-col items-center justify-center p-10 gap-3",
        md: "flex flex-row items-center p-5 gap-4",
        sm: "flex flex-row items-center p-3 gap-3",
      },
      isDragOver: {
        true: "border-border-brand bg-blue-50",
        false: "bg-white border-border-200 hover:border-border-300",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
    },
    defaultVariants: { size: "md", isDragOver: false, disabled: false },
  }
);

/**
 * Progress variants
 * - card: 카드형 프로그레스 (lg: 큰 아이콘 중앙, md: 아이콘 좌측)
 * - inline: 인라인형 (Uploading + 파일명뱃지 + 프로그레스바)
 */
const uploaderProgressVariants = cva(
  "w-full border border-border-200 rounded-large bg-white overflow-hidden",
  {
    variants: {
      variant: {
        card: "flex flex-col",
        inline: "flex flex-col",
      },
      size: {
        lg: "",
        md: "",
      },
    },
    compoundVariants: [
      { variant: "card", size: "lg", className: "p-5 gap-3" },
      { variant: "card", size: "md", className: "p-4 gap-3" },
      { variant: "inline", className: "p-4 gap-3" },
    ],
    defaultVariants: { variant: "card", size: "lg" },
  }
);

/**
 * FileItem variants — 테두리 있는 칩/뱃지 형태
 * - lg / md / sm 3종 사이즈
 */
const uploaderFileItemVariants = cva(
  "inline-flex items-center border border-border-200 rounded-medium bg-white",
  {
    variants: {
      size: {
        lg: "h-9 px-3 gap-2 text-label-1",
        md: "h-7 px-2 gap-1.5 text-label-2",
        sm: "h-6 px-1.5 gap-1 text-label-3",
      },
    },
    defaultVariants: { size: "md" },
  }
);

// =============================================================================
// Root
// =============================================================================

/**
 * @component Uploader
 * @description 파일 업로드 컴포넌트. Strategy 패턴으로 업로드 로직을 주입.
 * @useCase S3 Presigned URL 업로드, Multipart Form Data 업로드
 */
interface UploaderRootProps {
  children?: React.ReactNode;
  className?: string;
  strategy: UploadStrategy;
  autoUpload?: boolean;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  onFilesChange?: (files: UploaderFile[]) => void;
  onUploadComplete?: (file: UploaderFile, result: UploadResult) => void;
  onUploadError?: (file: UploaderFile, error: string) => void;
}

function UploaderRoot({
  children,
  className,
  strategy,
  autoUpload = true,
  accept,
  multiple = true,
  maxFiles,
  maxSize,
  disabled = false,
  onFilesChange,
  onUploadComplete,
  onUploadError,
}: UploaderRootProps) {
  const [files, dispatch] = React.useReducer(uploaderReducer, []);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const strategyRef = React.useRef(strategy);
  strategyRef.current = strategy;

  const onFilesChangeRef = React.useRef(onFilesChange);
  onFilesChangeRef.current = onFilesChange;
  const onUploadCompleteRef = React.useRef(onUploadComplete);
  onUploadCompleteRef.current = onUploadComplete;
  const onUploadErrorRef = React.useRef(onUploadError);
  onUploadErrorRef.current = onUploadError;

  React.useEffect(() => {
    const publicFiles: UploaderFile[] = files.map(({ abortFn: _, ...rest }) => rest);
    onFilesChangeRef.current?.(publicFiles);
  }, [files]);

  const startUpload = React.useCallback(
    (fileEntry: UploaderFileInternal) => {
      const { promise, abort } = strategyRef.current.upload(
        fileEntry.file,
        (event) => {
          const progress = event.total > 0 ? Math.round((event.loaded / event.total) * 100) : 0;
          dispatch({
            type: "UPDATE_PROGRESS",
            id: fileEntry.id,
            progress,
            loaded: event.loaded,
            total: event.total,
          });
        }
      );

      dispatch({ type: "SET_ABORT_FN", id: fileEntry.id, abortFn: abort });

      promise
        .then((result) => {
          dispatch({ type: "UPLOAD_COMPLETE", id: fileEntry.id, result });
          const updatedFile: UploaderFile = {
            id: fileEntry.id,
            file: fileEntry.file,
            status: "completed",
            progress: 100,
            loaded: fileEntry.file.size,
            total: fileEntry.file.size,
            result,
          };
          onUploadCompleteRef.current?.(updatedFile, result);
        })
        .catch((err) => {
          if (err?.name === "AbortError" || err?.message === "Upload aborted") {
            return;
          }
          const errorMsg = err instanceof Error ? err.message : "Upload failed";
          dispatch({ type: "UPLOAD_ERROR", id: fileEntry.id, error: errorMsg });
          const updatedFile: UploaderFile = {
            id: fileEntry.id,
            file: fileEntry.file,
            status: "error",
            progress: fileEntry.progress,
            loaded: 0,
            total: fileEntry.file.size,
            error: errorMsg,
          };
          onUploadErrorRef.current?.(updatedFile, errorMsg);
        });
    },
    []
  );

  const addFiles = React.useCallback(
    (newFiles: File[]) => {
      const validated = newFiles.filter((file) => {
        if (accept && !isAcceptedType(file, accept)) return false;
        if (maxSize && file.size > maxSize) return false;
        return true;
      });

      if (validated.length === 0) return;

      const currentCount = files.length;
      const available = maxFiles ? Math.max(0, maxFiles - currentCount) : validated.length;
      const filesToAdd = validated.slice(0, available);

      if (filesToAdd.length === 0) return;

      const entries: UploaderFileInternal[] = filesToAdd.map((file) => ({
        id: generateFileId(),
        file,
        status: "idle" as const,
        progress: 0,
        loaded: 0,
        total: file.size,
      }));

      dispatch({ type: "ADD_FILES", files: entries });

      if (autoUpload) {
        entries.forEach((entry) => startUpload(entry));
      }
    },
    [accept, maxSize, maxFiles, files.length, autoUpload, startUpload]
  );

  const removeFile = React.useCallback(
    (id: string) => {
      const file = files.find((f) => f.id === id);
      if (file?.status === "uploading" && file.abortFn) {
        file.abortFn();
      }
      dispatch({ type: "REMOVE_FILE", id });
    },
    [files]
  );

  const retryFile = React.useCallback(
    (id: string) => {
      const file = files.find((f) => f.id === id);
      if (!file || (file.status !== "error" && file.status !== "aborted")) return;
      dispatch({ type: "RETRY", id });
      const retryEntry: UploaderFileInternal = {
        ...file,
        status: "idle",
        progress: 0,
        loaded: 0,
        error: undefined,
        result: undefined,
        abortFn: undefined,
      };
      startUpload(retryEntry);
    },
    [files, startUpload]
  );

  const abortFile = React.useCallback(
    (id: string) => {
      const file = files.find((f) => f.id === id);
      if (file?.status === "uploading" && file.abortFn) {
        file.abortFn();
        dispatch({ type: "UPLOAD_ABORT", id });
      }
    },
    [files]
  );

  const openFilePicker = React.useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (fileList && fileList.length > 0) {
        addFiles(Array.from(fileList));
      }
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [addFiles]
  );

  const contextValue = React.useMemo<UploaderContextValue>(
    () => ({
      files,
      addFiles,
      removeFile,
      retryFile,
      abortFile,
      openFilePicker,
      disabled,
      accept,
      maxFiles,
      maxSize,
      multiple,
    }),
    [files, addFiles, removeFile, retryFile, abortFile, openFilePicker, disabled, accept, maxFiles, maxSize, multiple]
  );

  return (
    <UploaderContext.Provider value={contextValue}>
      <div data-slot="uploader" className={cn("flex flex-col gap-3", className)}>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
          tabIndex={-1}
          aria-hidden="true"
        />
        {children}
      </div>
    </UploaderContext.Provider>
  );
}

// =============================================================================
// Dropzone
// =============================================================================

interface UploaderDropzoneProps extends VariantProps<typeof uploaderDropzoneVariants> {
  children?: React.ReactNode;
  className?: string;
  /** 드롭존 제목 */
  title?: string;
  /** 드롭존 설명 */
  description?: string;
}

function UploaderDropzone({
  children,
  className,
  size = "md",
  title = "여기에 파일을 드롭하거나 선택하세요",
  description,
}: UploaderDropzoneProps) {
  const { addFiles, openFilePicker, disabled, accept, maxSize } = useUploaderContext();
  const [isDragOver, setIsDragOver] = React.useState(false);
  const dragCounterRef = React.useRef(0);

  // accept/maxSize에서 자동 생성
  const autoDescription = React.useMemo(() => {
    if (description) return description;
    const parts: string[] = [];
    if (maxSize) parts.push(`${formatFileSize(maxSize)} 이하의`);
    if (accept) {
      const types = accept
        .split(",")
        .map((t) => t.trim().replace(".", "").replace("/*", ""))
        .join(", ");
      parts.push(types);
    }
    return parts.length > 0 ? parts.join(" ") : undefined;
  }, [description, maxSize, accept]);

  const handleDragEnter = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      dragCounterRef.current += 1;
      if (dragCounterRef.current === 1) setIsDragOver(true);
    },
    [disabled]
  );

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current === 0) setIsDragOver(false);
  }, []);

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current = 0;
      setIsDragOver(false);
      if (disabled) return;
      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles.length > 0) addFiles(droppedFiles);
    },
    [disabled, addFiles]
  );

  const handleClick = React.useCallback(() => {
    if (!disabled) openFilePicker();
  }, [disabled, openFilePicker]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openFilePicker();
      }
    },
    [disabled, openFilePicker]
  );

  // 사이즈별 아이콘 사이즈/렌더링
  const renderDefaultContent = () => {
    if (size === "lg") {
      return (
        <>
          <Upload className="size-8 text-icon-secondary" />
          <span className="text-label-1 font-semibold text-text-primary">{title}</span>
          {maxSize && (
            <span className="text-caption-1 text-text-tertiary">
              최대 파일크기: {formatFileSize(maxSize)}
            </span>
          )}
          {accept && (
            <span className="text-caption-1 text-text-tertiary">
              업로드 가능 유형: {accept.split(",").map((t) => t.trim().replace(".", "")).join(", ")}
            </span>
          )}
        </>
      );
    }

    // md, sm → 수평 레이아웃
    const iconWrapperSize = size === "sm" ? "size-8" : "size-10";
    const iconSize = size === "sm" ? "size-4" : "size-5";

    return (
      <>
        <div
          className={cn(
            "shrink-0 rounded-medium bg-background-100 flex items-center justify-center",
            iconWrapperSize
          )}
        >
          <Upload className={cn("text-icon-secondary", iconSize)} />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className={cn(
            "font-medium text-text-primary",
            size === "sm" ? "text-label-3" : "text-label-2"
          )}>
            {title}
          </span>
          {autoDescription && (
            <span className={cn(
              "text-text-tertiary",
              size === "sm" ? "text-caption-2" : "text-caption-1"
            )}>
              {autoDescription}
            </span>
          )}
        </div>
      </>
    );
  };

  return (
    <div
      data-slot="uploader-dropzone"
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="파일 업로드 영역"
      aria-disabled={disabled}
      className={cn(
        uploaderDropzoneVariants({ size, isDragOver, disabled }),
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children || renderDefaultContent()}
    </div>
  );
}

// =============================================================================
// Trigger
// =============================================================================

interface UploaderTriggerProps {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

function UploaderTrigger({ children, className, asChild = false }: UploaderTriggerProps) {
  const { openFilePicker, disabled } = useUploaderContext();
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="uploader-trigger"
      type={asChild ? undefined : "button"}
      className={className}
      onClick={openFilePicker}
      disabled={disabled}
    >
      {children}
    </Comp>
  );
}

// =============================================================================
// FileList
// =============================================================================

interface UploaderFileListProps {
  children?: React.ReactNode | ((files: UploaderFile[]) => React.ReactNode);
  className?: string;
}

function UploaderFileList({ children, className }: UploaderFileListProps) {
  const { files } = useUploaderContext();

  if (files.length === 0) return null;

  const publicFiles: UploaderFile[] = files.map(({ abortFn: _, ...rest }) => rest);

  return (
    <div
      data-slot="uploader-file-list"
      className={cn("flex flex-wrap gap-2", className)}
      aria-live="polite"
    >
      {typeof children === "function"
        ? children(publicFiles)
        : children ||
          files.map((file) => <UploaderFileItem key={file.id} fileId={file.id} />)}
    </div>
  );
}

// =============================================================================
// FileItem — 디자인: 테두리 칩 + 파일아이콘 + 이름 + 원형X
// =============================================================================

interface UploaderFileItemProps extends VariantProps<typeof uploaderFileItemVariants> {
  fileId?: string;
  file?: UploaderFile;
  className?: string;
  /** 제거 버튼 표시 여부 (기본: true) */
  removable?: boolean;
}

function UploaderFileItem({
  fileId,
  file: fileProp,
  className,
  size = "md",
  removable = true,
}: UploaderFileItemProps) {
  const ctx = useUploaderContext();
  const internalFile = fileId ? ctx.files.find((f) => f.id === fileId) : undefined;
  const displayFile = fileProp || internalFile;

  if (!displayFile) return null;

  const id = displayFile.id;
  const fileName = displayFile.file.name;

  // 사이즈별 아이콘/X 크기
  const iconSize = size === "lg" ? "size-5" : size === "sm" ? "size-3.5" : "size-4";
  const xBtnSize = size === "lg" ? "size-5" : size === "sm" ? "size-3.5" : "size-4";
  const xIconSize = size === "lg" ? "size-3" : size === "sm" ? "size-2" : "size-2.5";

  return (
    <div
      data-slot="uploader-file-item"
      className={cn(uploaderFileItemVariants({ size }), className)}
    >
      <FileText className={cn("shrink-0 text-icon-secondary", iconSize)} />
      <span className="truncate text-text-primary">{fileName}</span>
      {removable && (
        <button
          type="button"
          className={cn(
            "shrink-0 rounded-full bg-gray-400 text-white flex items-center justify-center hover:bg-gray-500 transition-colors",
            xBtnSize
          )}
          onClick={() => ctx.removeFile(id)}
          aria-label="파일 제거"
        >
          <X className={xIconSize} />
        </button>
      )}
    </div>
  );
}

// =============================================================================
// Progress — 디자인: card(lg/md) + inline
// =============================================================================

interface UploaderProgressProps extends VariantProps<typeof uploaderProgressVariants> {
  fileId?: string;
  file?: UploaderFile;
  className?: string;
  indicatorClassName?: string;
}

function UploaderProgress({
  fileId,
  file: fileProp,
  className,
  variant = "card",
  size = "lg",
  indicatorClassName,
}: UploaderProgressProps) {
  const ctx = useUploaderContext();
  const internalFile = fileId ? ctx.files.find((f) => f.id === fileId) : undefined;
  const displayFile = fileProp || internalFile;

  if (!displayFile) return null;

  const { progress, status, file, loaded, total } = displayFile;
  const percentage = Math.min(100, Math.max(0, progress));

  const progressBar = (
    <div className="relative w-full h-1.5 rounded-round bg-background-track overflow-hidden">
      <div
        className={cn(
          "h-full rounded-round transition-all duration-300 ease-in-out",
          status === "error" ? "bg-red-500" : "bg-blue-500",
          indicatorClassName
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );

  const spinnerEl = status === "uploading" && (
    <Loader2 className="size-4 animate-spin text-icon-secondary shrink-0" />
  );

  // --- card variant ---
  if (variant === "card") {
    if (size === "lg") {
      // 디자인 Loading 첫째: 큰 파일아이콘 중앙 → 텍스트 row → 바 → 사이즈
      return (
        <div
          data-slot="uploader-progress"
          className={cn(uploaderProgressVariants({ variant, size }), className)}
        >
          <div className="flex justify-center">
            <FileText className="size-10 text-icon-secondary" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-label-2 text-text-primary">Uploading...</span>
            <div className="flex items-center gap-1.5">
              <span className="text-label-2 text-text-secondary">{percentage}%</span>
              {spinnerEl}
            </div>
          </div>
          {progressBar}
          <span className="text-caption-1 text-text-tertiary">
            {formatFileSize(loaded)} of {formatFileSize(total)}
          </span>
          {status === "error" && displayFile.error && (
            <div className="flex items-center gap-2">
              <span className="text-caption-1 text-text-error flex-1">{displayFile.error}</span>
              <button
                type="button"
                className="text-caption-1 text-text-brand hover:underline shrink-0"
                onClick={() => ctx.retryFile(displayFile.id)}
              >
                재시도
              </button>
            </div>
          )}
        </div>
      );
    }

    // size === "md" : 디자인 Loading 둘째
    return (
      <div
        data-slot="uploader-progress"
        className={cn(uploaderProgressVariants({ variant, size }), className)}
      >
        <div className="flex items-center gap-3">
          <FileText className="size-6 text-icon-secondary shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-label-2 text-text-primary">Uploading...</span>
              <div className="flex items-center gap-1.5">
                <span className="text-label-3 text-text-secondary">{percentage}%</span>
                {spinnerEl}
              </div>
            </div>
          </div>
        </div>
        {progressBar}
        {status === "error" && displayFile.error && (
          <div className="flex items-center gap-2">
            <span className="text-caption-1 text-text-error flex-1">{displayFile.error}</span>
            <button
              type="button"
              className="text-caption-1 text-text-brand hover:underline shrink-0"
              onClick={() => ctx.retryFile(displayFile.id)}
            >
              재시도
            </button>
          </div>
        )}
      </div>
    );
  }

  // --- inline variant --- 디자인 Loading 셋째
  return (
    <div
      data-slot="uploader-progress"
      className={cn(uploaderProgressVariants({ variant: "inline" }), className)}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-label-2 text-text-primary shrink-0">Uploading</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-small bg-blue-50 text-blue-600 text-label-3 truncate max-w-[200px]">
          {file.name}
        </span>
        <span className="text-text-tertiary text-caption-1 shrink-0">····</span>
        <span className="text-label-3 text-text-secondary shrink-0">{percentage}%</span>
      </div>
      <div className="relative w-full h-2 rounded-round bg-background-track overflow-hidden">
        <div
          className={cn(
            "h-full rounded-round transition-all duration-300 ease-in-out bg-gray-800",
            indicatorClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {status === "error" && displayFile.error && (
        <div className="flex items-center gap-2">
          <span className="text-caption-1 text-text-error flex-1">{displayFile.error}</span>
          <button
            type="button"
            className="text-caption-1 text-text-brand hover:underline shrink-0"
            onClick={() => ctx.retryFile(displayFile.id)}
          >
            재시도
          </button>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Export
// =============================================================================

const Uploader = Object.assign(UploaderRoot, {
  Dropzone: UploaderDropzone,
  Trigger: UploaderTrigger,
  FileList: UploaderFileList,
  FileItem: UploaderFileItem,
  Progress: UploaderProgress,
});

export {
  Uploader,
  uploaderDropzoneVariants,
  uploaderProgressVariants,
  uploaderFileItemVariants,
  formatFileSize,
};

export type {
  UploadStrategy,
  UploadResult,
  UploadProgressCallback,
  UploaderFile,
  FileStatus,
  UploaderRootProps as UploaderProps,
  UploaderDropzoneProps,
  UploaderTriggerProps,
  UploaderFileListProps,
  UploaderFileItemProps,
  UploaderProgressProps,
};
