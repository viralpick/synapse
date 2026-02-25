# @enhans/synapse

Radix UI 기반의 React 컴포넌트 라이브러리입니다. Tailwind CSS와 CVA(class-variance-authority)를 활용한 디자인 시스템을 제공합니다.

## 설치

```bash
npm install @enhans/synapse
```

## 요구사항

- React 18 또는 19
- Tailwind CSS 환경

## 사용법

```tsx
import { Button, Badge, Card } from "@enhans/synapse";
import "@enhans/synapse/styles.css";
```

스타일 파일(`styles.css`)은 디자인 토큰(색상, 타이포그래피, 간격 등)을 포함하고 있으므로 반드시 임포트해야 합니다.

## 컴포넌트

### 레이아웃 및 구조

| 컴포넌트       | 설명                    |
| -------------- | ----------------------- |
| **Accordion**  | 접기/펼치기 콘텐츠 섹션 |
| **Breadcrumb** | 탐색 경로 표시          |
| **Card**       | 그룹 콘텐츠 컨테이너    |
| **Separator**  | 시각적 구분선           |
| **Sheet**      | 사이드 드로어           |
| **Table**      | 데이터 테이블           |
| **Tabs**       | 탭 인터페이스           |

### 입력 컨트롤

| 컴포넌트         | 설명                                       |
| ---------------- | ------------------------------------------ |
| **Button**       | 버튼 (primary, secondary, tertiary, ghost) |
| **Checkbox**     | 체크박스                                   |
| **Input**        | 텍스트 입력                                |
| **Label**        | 폼 필드 레이블                             |
| **Radio**        | 라디오 버튼 그룹                           |
| **Slider**       | 범위 슬라이더                              |
| **Switch**       | 토글 스위치                                |
| **Textarea**     | 멀티라인 텍스트 입력                       |
| **Dropdown**     | 단일/다중 선택 드롭다운                    |
| **SingleSelect** | 단일 선택 드롭다운                         |
| **Command**      | 커맨드 팔레트                              |

### 데이터 표시

| 컴포넌트     | 설명              |
| ------------ | ----------------- |
| **Alert**    | 알림 메시지       |
| **Avatar**   | 프로필 이미지     |
| **Badge**    | 상태/태그 라벨    |
| **Calendar** | 캘린더            |
| **Dot**      | 상태 인디케이터   |
| **Progress** | 진행률 바         |
| **Skeleton** | 로딩 플레이스홀더 |
| **Spinner**  | 로딩 애니메이션   |

### 고급 컴포넌트

| 컴포넌트       | 설명                                 |
| -------------- | ------------------------------------ |
| **DatePicker** | 날짜 선택기 (프리셋, 시간 선택 포함) |
| **Dialog**     | 모달 다이얼로그                      |
| **Popover**    | 플로팅 팝오버                        |
| **Pagination** | 페이지네이션                         |
| **Stepper**    | 단계 표시기                          |
| **Tooltip**    | 툴팁                                 |

## 유틸리티

### `cn(...inputs)`

Tailwind CSS 클래스를 병합하는 유틸리티 함수입니다. `clsx`와 `tailwind-merge`를 결합하여 커스텀 타이포그래피 클래스(`text-label-*`, `text-body-*` 등)도 올바르게 처리합니다.

```tsx
import { cn } from "@enhans/synapse";

cn("px-4 py-2", isActive && "bg-blue-500", className);
```

## 디자인 토큰

`styles.css`에 정의된 디자인 토큰:

- **색상**: oklch 기반 시맨틱 컬러 시스템 (Gray, Slate, Blue, Red, Green, Purple, Yellow)
- **타이포그래피**: Pretendard Variable 기반 (Display, Headline, Title, Body, Label, Caption, Syntax)
- **간격**: Border radius (small 4px ~ round 9999px)
- **애니메이션**: 아코디언 열기/닫기 애니메이션

## 개발

```bash
# 빌드
npm run build

# Storybook 실행
npm run storybook

# 체인지셋 생성
npm run changeset

# 버전 업데이트
npm run version

# 배포
npm run release
```

### 배포 워크플로우

1. 코드 작업 완료
2. `npm run changeset` — 변경 내용 기록 (patch/minor/major 선택)
3. `npm run version` — changeset 반영하여 버전 업데이트 + CHANGELOG 생성
4. `git add . && git commit` — 버전 변경사항 커밋
5. `git push` — 리모트에 푸시
6. `npm run release` — 빌드 + npm 배포

## 라이선스

UNLICENSED
