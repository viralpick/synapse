# CLAUDE.md

## Project Overview

**@viralpick/synapse** is a React component library built on Radix UI primitives with Tailwind CSS and class-variance-authority (CVA). Published to GitHub Package Registry under the `@viralpick` scope.

## Tech Stack

- **Runtime:** React 18/19 (peer dependency)
- **Language:** TypeScript (strict mode, ES2022 target)
- **Styling:** Tailwind CSS + CSS custom properties (oklch color system)
- **Headless UI:** Radix UI primitives
- **Variant Management:** class-variance-authority (CVA)
- **Class Merging:** clsx + tailwind-merge (custom `cn()` utility)
- **Icons:** lucide-react
- **Date Handling:** date-fns + react-day-picker
- **Build:** tsup (ESM + CJS dual output with .d.ts generation)
- **Versioning:** Changesets

## Project Structure

```
src/
├── components/       # All UI components
│   ├── date-picker/  # Multi-file component (context, types, utils)
│   ├── dropdown/     # Multi-file component
│   └── *.tsx         # Single-file components
├── lib/
│   └── cn.ts         # Class merging utility (clsx + tailwind-merge)
├── index.ts          # Single entry point - all exports
└── styles.css        # Design tokens (colors, typography, spacing, animations)
```

## Key Commands

```bash
npm run build       # Build with tsup + copy styles.css to dist
npm run changeset   # Create a new changeset
npm run version     # Apply changesets to update version
npm run release     # Build + publish to GitHub Package Registry
```

## Component Patterns

### Composition Pattern
Components use compound/composable parts:
```tsx
// Each sub-component is a separate named export
<Card>
  <CardHeader><CardTitle>...</CardTitle></CardHeader>
  <CardContent>...</CardContent>
</Card>
```

### CVA Variant Pattern
All variants are defined with CVA and exported alongside the component:
```tsx
const buttonVariants = cva(baseClasses, { variants: { ... } });
export { Button, buttonVariants };
```

### Naming Conventions
- **Files:** lowercase with dashes (`date-picker.tsx`, `single-select.tsx`)
- **Components:** PascalCase (`Button`, `DatePicker`)
- **Variants:** camelCase with `Variants` suffix (`buttonVariants`, `badgeVariants`)
- **Props:** `ComponentNameProps` pattern (`ButtonProps`, `BadgeProps`)
- **No default exports** — all named exports consolidated in `src/index.ts`

### Styling Conventions
- Use `cn()` for all className merging (handles custom typography classes)
- Design tokens are CSS custom properties defined in `styles.css`
- Font: "Pretendard Variable" with system-ui fallback
- Custom typography utilities: `text-label-{1-4}`, `text-body-{1-4}`, `text-caption-{1-3}`, `text-syntax-{1-3}`

### TypeScript
- Strict mode enabled
- Props extend Radix UI or HTML element types via `React.ComponentProps<>`
- Variant props extracted via `VariantProps<typeof componentVariants>`
- Modern JSX transform (no `import React` needed)

## Build & Distribution

- **Entry:** `src/index.ts`
- **Output:** `dist/` (ESM `.js`, CJS `.cjs`, types `.d.ts`/`.d.cts`, `styles.css`)
- **Externals:** All dependencies are external (not bundled)
- **Tree shaking:** Enabled; CSS marked as side effects
- **Registry:** `https://npm.pkg.github.com` (GitHub Packages)

## When Adding New Components

1. Create `src/components/{component-name}.tsx`
2. Follow existing patterns: Radix UI base, CVA variants, `cn()` for classes
3. Add JSDoc with `@component`, `@description`, `@useCase`
4. Export from `src/index.ts`
5. Create a changeset with `npm run changeset`
