# Typography System

## Font Family
- **Primary**: Akkurat
- **Fallback**: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif

## Type Scale

### Headers
| Class | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-page-title` | 24px | 32px | 700 | Page titles (Dashboard, Channels, Competitors, etc.) |
| `text-section-title` | 18px | 24px | 700 | Section headers within pages (e.g., "Top Opportunities") |
| `text-subsection-title` | 16px | 24px | 700 | Card titles, subsection headers |

### Body Text
| Class | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-body-lg` | 16px | 24px | 400 | Primary body text, long-form content |
| `text-body` | 14px | 20px | 400 | Standard UI text, descriptions, paragraphs |
| `text-body-sm` | 13px | 18px | 400 | Secondary text, metadata, subtitles |

### Supporting Text
| Class | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-caption` | 12px | 16px | 400 | Timestamps, badges, tiny supporting text |
| `text-label` | 11px | 16px | 600 | Form labels, uppercase labels, UI labels |

## Usage Examples

```tsx
// Page header (main page title)
<h1 className="text-page-title text-gray-900">Dashboard</h1>

// Page subtitle
<p className="text-body-sm text-neutral mt-0.5">
  Last 24 hours
</p>

// Section heading
<h2 className="text-section-title text-gray-900">Top Opportunities</h2>

// Card title
<h3 className="text-subsection-title text-gray-900">LinkedIn Organic</h3>

// Primary body text (use sparingly for important content)
<p className="text-body-lg text-gray-900">
  This is important content that needs emphasis
</p>

// Standard body text (most common use case)
<p className="text-body text-gray-700">
  This is standard description text used throughout the interface
</p>

// Metadata, timestamps, secondary information
<span className="text-body-sm text-neutral">2 hours ago</span>

// Badge text, tiny labels
<span className="text-caption text-gray-600">HIGH URGENCY</span>

// Form labels
<label className="text-label text-gray-900">EMAIL ADDRESS</label>
```

## Color Combinations

### Text Colors
- **Primary text**: `text-gray-900` (#0F172A) - Main headings, important text
- **Secondary text**: `text-neutral` (#6B7280) - Subtitles, descriptions, metadata
- **Tertiary text**: `text-gray-500` (#6B7280) - Less important information
- **Link text**: `text-primary` (#1B5066) - Interactive links, CTAs
- **Error text**: `text-danger` (#EF4444) - Error messages, warnings
- **Success text**: `text-success` (#10B981) - Success states, confirmations

### Usage Guidelines
1. **Page titles** always use `text-page-title` + `text-gray-900`
2. **Section headers** always use `text-section-title` + `text-gray-900`
3. **Body text** defaults to `text-body` (14px) - most common size
4. Use `text-body-lg` (16px) sparingly for important content that needs emphasis
5. **Timestamps and metadata** use `text-body-sm` or `text-caption` + `text-neutral`
6. **Card titles** use `text-subsection-title` + `text-gray-900`

## Page Header Pattern

All page headers should follow this consistent pattern:

```tsx
<header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
  <div className="flex items-center gap-4">
    {/* Optional: Navigation arrows */}
    <NavigationArrows />

    <div>
      <h1 className="text-page-title text-gray-900">Page Name</h1>
      <p className="text-body-sm text-neutral mt-0.5">Optional subtitle</p>
    </div>
  </div>

  {/* Optional: Right side actions */}
  <div className="flex items-center gap-3">
    {/* Action buttons, notifications, etc. */}
  </div>
</header>
```

## Section Header Pattern

```tsx
<div className="mb-6">
  <h2 className="text-section-title text-gray-900 mb-4">Section Title</h2>
  <div className="space-y-4">
    {/* Section content */}
  </div>
</div>
```

## Card Header Pattern

```tsx
<div className="bg-white border border-gray-100 rounded-lg p-4">
  <h3 className="text-subsection-title text-gray-900 mb-3">Card Title</h3>
  <p className="text-body text-gray-700">Card content goes here</p>
</div>
```

## Migration Guide

### Legacy Classes (Being Phased Out)
These classes still exist for backwards compatibility but should not be used in new code:

| Legacy Class | New Class | Notes |
|--------------|-----------|-------|
| `text-display` (32px) | N/A - Too large | Use `text-page-title` (24px) instead |
| `text-h1` (24px) | `text-page-title` | Use the semantic name |
| `text-h2` (20px) | `text-section-title` (18px) | Reduced from 20px to 18px |

### Before (Legacy)
```tsx
// ❌ Old way - inconsistent sizing
<h1 className="text-2xl font-bold">THE HOG Dashboard</h1>
<h2 className="text-xl font-bold">Top Opportunities Found:</h2>
<p className="text-base">Description text</p>
```

### After (New System)
```tsx
// ✅ New way - consistent typography system
<h1 className="text-page-title text-gray-900">Dashboard</h1>
<h2 className="text-section-title text-gray-900">Top Opportunities</h2>
<p className="text-body text-gray-700">Description text</p>
```

## Design Principles

1. **Consistency**: Use the defined type scale everywhere - no custom font sizes
2. **Hierarchy**: Maintain clear visual hierarchy with appropriate size differences
3. **Readability**: All text meets WCAG 2.1 Level AA contrast requirements
4. **Efficiency**: Default to `text-body` (14px) for most UI text
5. **Emphasis**: Use `text-body-lg` (16px) sparingly to highlight important content

## Accessibility

All typography combinations meet WCAG 2.1 Level AA standards:
- Normal text (≤18px): 4.5:1 contrast ratio minimum
- Large text (≥19px): 3:1 contrast ratio minimum
- UI components: 3:1 contrast ratio minimum

Verified combinations:
- `text-gray-900` on white: 21:1 ✓
- `text-neutral` (#6B7280) on white: 4.83:1 ✓
- `text-primary` (#1B5066) on white: 8.80:1 ✓

## Implementation Checklist

When creating or updating pages:
- [ ] Remove "THE HOG" branding from page headers
- [ ] Use `text-page-title` for main page heading
- [ ] Use `text-section-title` for section headings
- [ ] Use `text-subsection-title` for card/component titles
- [ ] Default to `text-body` (14px) for UI text
- [ ] Use `text-body-sm` for metadata and subtitles
- [ ] Verify all text has appropriate color classes
- [ ] Ensure consistent header height (h-16 = 64px)
- [ ] Test page with different content lengths

## Files Updated

### Configuration
- `/tailwind.config.ts` - Typography scale definitions

### Components
- `/components/Header.tsx` - Dashboard header

### Pages
- `/app/page.tsx` - Dashboard
- `/app/channels/page.tsx` - Channels
- `/app/competitors/page.tsx` - Competitors
- `/app/content/page.tsx` - Content Generator
- `/app/agents/page.tsx` - Agents

## Additional Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Typography Plugin](https://tailwindcss.com/docs/font-size)
- [Project Accessibility Documentation](/ACCESSIBILITY.md)
