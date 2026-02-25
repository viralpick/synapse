# @viralpick/synapse

## 0.5.1

### Patch Changes

- migrate legacy shadcn tokens to semantic design tokens across all components

## 0.5.0

### Minor Changes

- feat: Chip 컴포넌트 추가

  인터랙티브한 칩/태그 컴포넌트.

  - size (md/sm), shape (rounded/pill) variants
  - leadIcon (아바타/아이콘), tailIcon (X 닫기), tag (컬러 Dot) 지원
  - onRemove 콜백, disabled 상태, focus-visible 링 지원

## 0.4.0

### Minor Changes

- feat: Uploader 컴포넌트 추가

  Strategy 패턴 기반 파일 업로드 컴포넌트.

  - Uploader.Dropzone (lg/md/sm), Uploader.Trigger, Uploader.FileList, Uploader.FileItem (lg/md/sm), Uploader.Progress (card lg/md, inline)
  - UploadStrategy 인터페이스로 업로드 로직 주입 (XHR 기반, abort 지원)
  - 드래그 & 드롭, 파일 validation, 진행률 추적, 에러 핸들링

## 0.3.2

### Patch Changes

- style modification, library release to public npm

## 0.3.1

### Patch Changes

- Slider 컴포넌트 추가 및 Storybook 환경 구성

  - Radix UI 기반 Slider 컴포넌트 (단일값/범위, 스텝퍼, 라벨, 캡션)
  - Storybook 8 + Tailwind CSS v4 셋업
  - 전체 컴포넌트 스토리 작성 (29개 파일)

- 24b8589: readme, claude, package-lock

## 0.3.0

### Minor Changes

- Export DatePickerProvider and add color prop to Badge

  - Export `DatePickerProvider` and `DatePickerProviderProps` for standalone calendar usage
  - Add `color` prop to Badge for dynamic hex color support

## 0.2.0

### Minor Changes

- Initial Setup
