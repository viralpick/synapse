import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Uploader } from "./uploader";
import { Button } from "./button";
import type { UploadStrategy, UploadProgressCallback, UploaderFile } from "./uploader";

// =============================================================================
// XHR-based Mock Strategy
// 실제 XMLHttpRequest를 사용하여 Blob을 httpbin.org에 업로드.
// upload.onprogress에서 실제 loaded/total을 측정함.
// 오프라인/CORS 에러 시 fallback으로 시뮬레이션.
// =============================================================================

function createXhrMockStrategy(): UploadStrategy {
  return {
    upload(file: File, onProgress: UploadProgressCallback) {
      const xhr = new XMLHttpRequest();
      let aborted = false;

      const promise = new Promise<{ url?: string }>((resolve, reject) => {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            onProgress({ loaded: event.loaded, total: event.total });
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({ url: `https://cdn.example.com/uploads/${encodeURIComponent(file.name)}` });
          } else {
            reject(new Error(`Upload failed: ${xhr.status}`));
          }
        };

        xhr.onerror = () => {
          if (aborted) return;
          // CORS 에러 등으로 실패 시 → fallback 시뮬레이션
          simulateFallback(file, onProgress, resolve, () => aborted);
        };

        xhr.onabort = () => {
          reject(new Error("Upload aborted"));
        };

        xhr.open("POST", "https://httpbin.org/post");
        const formData = new FormData();
        formData.append("file", file);
        xhr.send(formData);
      });

      return {
        promise,
        abort: () => {
          aborted = true;
          xhr.abort();
        },
      };
    },
  };
}

/** CORS/네트워크 에러 시 fallback: 가변 속도 시뮬레이션 */
function simulateFallback(
  file: File,
  onProgress: UploadProgressCallback,
  resolve: (value: { url?: string }) => void,
  isAborted: () => boolean
) {
  let loaded = 0;
  const total = file.size;

  function tick() {
    if (isAborted()) return;
    // 가변 increment: 파일 크기에 비례하되 랜덤성 추가
    const chunk = total * (0.02 + Math.random() * 0.08);
    loaded = Math.min(total, loaded + chunk);
    onProgress({ loaded, total });

    if (loaded >= total) {
      resolve({ url: `https://cdn.example.com/uploads/${encodeURIComponent(file.name)}` });
    } else {
      setTimeout(tick, 50 + Math.random() * 150);
    }
  }
  setTimeout(tick, 100);
}

/** 무조건 실패하는 Strategy (에러 테스트용) */
function createFailingStrategy(): UploadStrategy {
  return {
    upload(file: File, onProgress: UploadProgressCallback) {
      let aborted = false;

      const promise = new Promise<{ url?: string }>((_, reject) => {
        let loaded = 0;
        const total = file.size;

        function tick() {
          if (aborted) return;
          const chunk = total * (0.03 + Math.random() * 0.05);
          loaded = Math.min(total * 0.6, loaded + chunk);
          onProgress({ loaded, total });

          if (loaded >= total * 0.6) {
            reject(new Error("Network error: Connection refused"));
          } else {
            setTimeout(tick, 80 + Math.random() * 120);
          }
        }
        setTimeout(tick, 100);
      });

      return {
        promise,
        abort: () => { aborted = true; },
      };
    },
  };
}

// =============================================================================
// Meta
// =============================================================================

const meta: Meta<typeof Uploader> = {
  title: "Components/Uploader",
  component: Uploader,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Uploader>;

// =============================================================================
// Part 1: Uploader (Dropzone) — 3 variants
// =============================================================================

export const DropzoneLarge: Story = {
  name: "Uploader / Large",
  render: () => {
    const strategy = React.useMemo(() => createXhrMockStrategy(), []);
    return (
      <div className="w-[520px]">
        <Uploader
          strategy={strategy}
          accept=".pdf,.docx,.csv,.xlsx,.txt"
          maxSize={50 * 1024 * 1024}
        >
          <Uploader.Dropzone size="lg">
            <Upload className="size-8 text-icon-secondary" />
            <span className="text-label-1 font-semibold text-text-primary">
              여기에 파일을 드롭하거나 선택하세요
            </span>
            <span className="text-caption-1 text-text-tertiary">
              최대 파일크기: 50MB
            </span>
            <span className="text-caption-1 text-text-tertiary">
              업로드 가능 유형: pdf, docx, csv, xlsx, txt
            </span>
            <div className="flex gap-2 mt-2">
              <Uploader.Trigger asChild>
                <Button size="sm">파일 선택</Button>
              </Uploader.Trigger>
              <Button buttonStyle="secondary" size="sm">
                템플릿 다운로드
              </Button>
            </div>
          </Uploader.Dropzone>
          <Uploader.FileList />
        </Uploader>
      </div>
    );
  },
};

export const DropzoneMedium: Story = {
  name: "Uploader / Medium",
  render: () => {
    const strategy = React.useMemo(() => createXhrMockStrategy(), []);
    return (
      <div className="w-[520px]">
        <Uploader
          strategy={strategy}
          accept=".pdf,.docx,.csv,.xlsx,.txt"
          maxSize={50 * 1024 * 1024}
        >
          <Uploader.Dropzone size="md" />
          <Uploader.FileList />
        </Uploader>
      </div>
    );
  },
};

export const DropzoneSmall: Story = {
  name: "Uploader / Small",
  render: () => {
    const strategy = React.useMemo(() => createXhrMockStrategy(), []);
    return (
      <div className="w-[520px]">
        <Uploader
          strategy={strategy}
          accept=".pdf,.docx,.csv,.xlsx,.txt"
          maxSize={50 * 1024 * 1024}
        >
          <Uploader.Dropzone size="sm" />
          <Uploader.FileList />
        </Uploader>
      </div>
    );
  },
};

export const AllDropzones: Story = {
  name: "Uploader / All Sizes",
  render: () => {
    const strategy = React.useMemo(() => createXhrMockStrategy(), []);
    return (
      <div className="flex flex-col gap-6 w-[520px]">
        <Uploader
          strategy={strategy}
          accept=".pdf,.docx,.csv,.xlsx,.txt"
          maxSize={50 * 1024 * 1024}
        >
          <Uploader.Dropzone size="lg">
            <Upload className="size-8 text-icon-secondary" />
            <span className="text-label-1 font-semibold text-text-primary">
              여기에 파일을 드롭하거나 선택하세요
            </span>
            <span className="text-caption-1 text-text-tertiary">
              최대 파일크기: 50MB
            </span>
            <span className="text-caption-1 text-text-tertiary">
              업로드 가능 유형: pdf, docx, csv, xlsx, txt
            </span>
            <div className="flex gap-2 mt-2">
              <Uploader.Trigger asChild>
                <Button size="sm">파일 선택</Button>
              </Uploader.Trigger>
              <Button buttonStyle="secondary" size="sm">
                템플릿 다운로드
              </Button>
            </div>
          </Uploader.Dropzone>
        </Uploader>

        <Uploader
          strategy={strategy}
          accept=".pdf,.docx,.csv,.xlsx,.txt"
          maxSize={50 * 1024 * 1024}
        >
          <Uploader.Dropzone size="md" />
        </Uploader>

        <Uploader
          strategy={strategy}
          accept=".pdf,.docx,.csv,.xlsx,.txt"
          maxSize={50 * 1024 * 1024}
        >
          <Uploader.Dropzone size="sm" />
        </Uploader>
      </div>
    );
  },
};

// =============================================================================
// Part 2: Loading (Progress) — 3 variants
// =============================================================================

export const LoadingCardLarge: Story = {
  name: "Loading / Card Large",
  render: () => {
    const strategy = React.useMemo(() => createXhrMockStrategy(), []);
    return (
      <div className="w-[480px]">
        <Uploader strategy={strategy}>
          <Uploader.Dropzone size="sm" />
          <Uploader.FileList>
            {(files: UploaderFile[]) =>
              files.map((f) => (
                <Uploader.Progress key={f.id} file={f} variant="card" size="lg" />
              ))
            }
          </Uploader.FileList>
        </Uploader>
      </div>
    );
  },
};

export const LoadingCardMedium: Story = {
  name: "Loading / Card Medium",
  render: () => {
    const strategy = React.useMemo(() => createXhrMockStrategy(), []);
    return (
      <div className="w-[480px]">
        <Uploader strategy={strategy}>
          <Uploader.Dropzone size="sm" />
          <Uploader.FileList>
            {(files: UploaderFile[]) =>
              files.map((f) => (
                <Uploader.Progress key={f.id} file={f} variant="card" size="md" />
              ))
            }
          </Uploader.FileList>
        </Uploader>
      </div>
    );
  },
};

export const LoadingInline: Story = {
  name: "Loading / Inline",
  render: () => {
    const strategy = React.useMemo(() => createXhrMockStrategy(), []);
    return (
      <div className="w-[480px]">
        <Uploader strategy={strategy}>
          <Uploader.Dropzone size="sm" />
          <Uploader.FileList>
            {(files: UploaderFile[]) =>
              files.map((f) => (
                <Uploader.Progress key={f.id} file={f} variant="inline" />
              ))
            }
          </Uploader.FileList>
        </Uploader>
      </div>
    );
  },
};

// =============================================================================
// Part 3: File Item — 3 sizes
// =============================================================================

export const FileItemLarge: Story = {
  name: "File Item / Large",
  render: () => {
    const strategy = React.useMemo(() => createXhrMockStrategy(), []);
    return (
      <Uploader strategy={strategy}>
        <Uploader.Dropzone size="sm" />
        <Uploader.FileList>
          {(files: UploaderFile[]) =>
            files.map((f) => (
              <Uploader.FileItem key={f.id} file={f} size="lg" />
            ))
          }
        </Uploader.FileList>
      </Uploader>
    );
  },
};

export const FileItemMedium: Story = {
  name: "File Item / Medium",
  render: () => {
    const strategy = React.useMemo(() => createXhrMockStrategy(), []);
    return (
      <Uploader strategy={strategy}>
        <Uploader.Dropzone size="sm" />
        <Uploader.FileList>
          {(files: UploaderFile[]) =>
            files.map((f) => (
              <Uploader.FileItem key={f.id} file={f} size="md" />
            ))
          }
        </Uploader.FileList>
      </Uploader>
    );
  },
};

export const FileItemSmall: Story = {
  name: "File Item / Small",
  render: () => {
    const strategy = React.useMemo(() => createXhrMockStrategy(), []);
    return (
      <Uploader strategy={strategy}>
        <Uploader.Dropzone size="sm" />
        <Uploader.FileList>
          {(files: UploaderFile[]) =>
            files.map((f) => (
              <Uploader.FileItem key={f.id} file={f} size="sm" />
            ))
          }
        </Uploader.FileList>
      </Uploader>
    );
  },
};

export const AllFileItems: Story = {
  name: "File Item / All Sizes",
  render: () => {
    const strategy = React.useMemo(() => createXhrMockStrategy(), []);
    return (
      <div className="flex flex-col gap-4">
        {(["lg", "md", "sm"] as const).map((size) => (
          <div key={size}>
            <p className="text-caption-1 text-text-tertiary mb-2">Size: {size}</p>
            <Uploader strategy={strategy}>
              <Uploader.Trigger asChild>
                <Button buttonStyle="secondary" size="xs">파일 추가</Button>
              </Uploader.Trigger>
              <Uploader.FileList>
                {(files: UploaderFile[]) =>
                  files.map((f) => (
                    <Uploader.FileItem key={f.id} file={f} size={size} />
                  ))
                }
              </Uploader.FileList>
            </Uploader>
          </div>
        ))}
      </div>
    );
  },
};

// =============================================================================
// Error & Retry
// =============================================================================

export const ErrorAndRetry: Story = {
  render: () => {
    const strategy = React.useMemo(() => createFailingStrategy(), []);
    return (
      <div className="w-[480px]">
        <Uploader strategy={strategy}>
          <Uploader.Dropzone size="md" />
          <Uploader.FileList>
            {(files: UploaderFile[]) =>
              files.map((f) => (
                <Uploader.Progress key={f.id} file={f} variant="card" size="lg" />
              ))
            }
          </Uploader.FileList>
        </Uploader>
      </div>
    );
  },
};

// =============================================================================
// Disabled
// =============================================================================

export const Disabled: Story = {
  render: () => {
    const strategy = React.useMemo(() => createXhrMockStrategy(), []);
    return (
      <div className="w-[480px] flex flex-col gap-4">
        <Uploader strategy={strategy} disabled>
          <Uploader.Dropzone size="lg" />
        </Uploader>
        <Uploader strategy={strategy} disabled>
          <Uploader.Dropzone size="md" />
        </Uploader>
      </div>
    );
  },
};

// =============================================================================
// Full Example
// =============================================================================

export const FullExample: Story = {
  render: () => {
    const strategy = React.useMemo(() => createXhrMockStrategy(), []);
    return (
      <div className="w-[520px]">
        <Uploader
          strategy={strategy}
          accept=".pdf,.docx,.csv,.xlsx,.txt"
          maxSize={50 * 1024 * 1024}
          maxFiles={5}
        >
          <Uploader.Dropzone size="lg">
            <Upload className="size-8 text-icon-secondary" />
            <span className="text-label-1 font-semibold text-text-primary">
              여기에 파일을 드롭하거나 선택하세요
            </span>
            <span className="text-caption-1 text-text-tertiary">
              최대 파일크기: 50MB
            </span>
            <span className="text-caption-1 text-text-tertiary">
              업로드 가능 유형: pdf, docx, csv, xlsx, txt
            </span>
            <div className="flex gap-2 mt-2">
              <Uploader.Trigger asChild>
                <Button size="sm">파일 선택</Button>
              </Uploader.Trigger>
              <Button buttonStyle="secondary" size="sm">
                템플릿 다운로드
              </Button>
            </div>
          </Uploader.Dropzone>

          <Uploader.FileList>
            {(files: UploaderFile[]) => (
              <div className="flex flex-col gap-2 w-full">
                {files.map((f) =>
                  f.status === "uploading" || f.status === "error" ? (
                    <Uploader.Progress key={f.id} file={f} variant="card" size="md" />
                  ) : (
                    <Uploader.FileItem key={f.id} file={f} size="md" />
                  )
                )}
              </div>
            )}
          </Uploader.FileList>
        </Uploader>
      </div>
    );
  },
};

// lucide-react Upload 아이콘을 스토리에서 사용하기 위한 re-export
import { Upload } from "lucide-react";
