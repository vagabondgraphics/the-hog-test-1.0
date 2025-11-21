# THE HOG DESIGN SYSTEM: BORDER INTEGRITY SYSTEM

## MASTER RULE: "SINGLE BORDER RESPONSIBILITY"

**Non-Negotiable Principle:**
> Every visible border line in your interface must be drawn by **exactly ONE element**. No exceptions. Ever.

---

## BORDER COLOR STANDARD

**Color:** `#F2F2F2`
**Tailwind Class:** `border-gray-100`
**CSS Variable:** `--border-default: #F2F2F2`
**Width:** Always `1px`

---

## CORE RULES (MEMORIZE THESE)

1. **ONE BORDER PER LINE** - Each visible border drawn by exactly one element
2. **#F2F2F2 ALWAYS** - Never use manual hex in code, always use `border-gray-100`
3. **1PX ALWAYS** - Never 0.5px, never 2px, always 1px
4. **CONTAINER OWNS EDGES** - If bordered box, container has all 4 sides
5. **RIGHT/BOTTOM OWN DIVIDERS** - Not left/top elements
6. **LAST = NO TERMINAL** - Last element has no right (rows) or bottom (columns) border
7. **NO GAPS IN FLEX** - Use `flex` with touching children, borders create dividers
8. **TEST AT ZOOM** - No dark corners/edges = pass
9. **DOCUMENT OWNERSHIP** - Comment which element owns which border
10. **IF YOU BREAK THESE RULES, BORDERS WILL DOUBLE**

---

## BORDER HIERARCHY RULES

### Rule 1: Container Owns Outer Edges

If a section has a visible outer border (forms a box), the **container** owns all 4 borders.

**Example:**
```jsx
// Container owns all edges
<div className="border border-gray-100">
  {/* Header owns only bottom */}
  <div className="border-b border-gray-100">Header</div>

  {/* Content sections - no outer borders */}
  <div className="flex">
    <div className="w-1/2">Left</div>
    <div className="w-1/2 border-l border-gray-100">Right</div>
  </div>
</div>
```

### Rule 2: Right/Bottom Elements Own Dividers

**Horizontal Layout (Side-by-Side):**
```jsx
❌ WRONG:
<div className="border-r">Left</div>
<div className="border-l">Right</div>  // = DOUBLE BORDER

✅ CORRECT:
<div>Left</div>
<div className="border-l border-gray-100">Right</div>  // = SINGLE BORDER
```

**Vertical Layout (Stacked):**
```jsx
❌ WRONG:
<div className="border-b">Top</div>
<div className="border-t">Bottom</div>  // = DOUBLE BORDER

✅ CORRECT:
<div>Top</div>
<div className="border-t border-gray-100">Bottom</div>  // = SINGLE BORDER
```

### Rule 3: Last Elements Never Have Terminal Borders

```jsx
// In a row of 3 cards
<div className="flex">
  <div>Card 1</div>                                    // No borders
  <div className="border-l border-gray-100">Card 2</div>  // Left border only
  <div className="border-l border-gray-100">Card 3</div>  // Left border only (NO right)
</div>
```

---

## IMPLEMENTATION PATTERNS

### Pattern 1: Metric Cards Row
```jsx
<div className="flex border-b border-gray-100">
  <div className="flex-1">
    <MetricCard value={47} />  {/* Card 1: No borders */}
  </div>
  <div className="flex-1 border-l border-gray-100">
    <MetricCard value={23} />  {/* Card 2: Left border only */}
  </div>
  <div className="flex-1 border-l border-gray-100">
    <MetricCard value={8} />   {/* Card 3: Left border only */}
  </div>
</div>
```

### Pattern 2: Two-Column Layout with Divider
```jsx
<div className="flex border-l border-r border-b border-gray-100">
  {/* Left section: No left/right borders (container owns them) */}
  <div className="w-[60%]">
    Left content
  </div>

  {/* Right section: Left border only (creates vertical divider) */}
  <div className="w-[40%] border-l border-gray-100">
    Right content
  </div>
</div>
```

### Pattern 3: Stacked Cards with Dividers
```jsx
<div className="flex flex-col">
  <div className="p-4">Card 1</div>  {/* No borders */}
  <div className="p-4 border-t border-gray-100">Card 2</div>  {/* Top border only */}
  <div className="p-4 border-t border-gray-100">Card 3</div>  {/* Top border only */}
</div>
```

---

## CURRENT IMPLEMENTATION (SCREEN 1: DASHBOARD)

### Border Ownership Matrix

| Section | Element | Top | Right | Bottom | Left |
|---------|---------|-----|-------|--------|------|
| **Metric Cards** | Row wrapper | ❌ | ❌ | ✅ | ❌ |
| | Card 1 (47) | ❌ | ❌ | ❌ | ❌ |
| | Card 2 (23) | ❌ | ❌ | ❌ | ✅ |
| | Card 3 (8) | ❌ | ❌ | ❌ | ✅ |
| **Top Opportunities** | Header | ✅ | ❌ | ✅ | ❌ |
| | Content wrapper | ❌ | ✅ | ✅ | ✅ |
| | Left section | ❌ | ❌ | ❌ | ❌ |
| | Right section | ❌ | ❌ | ❌ | ✅ |
| | Compact Card 1 | ❌ | ❌ | ✅ | ❌ |
| | Compact Card 2 | ❌ | ❌ | ✅ | ❌ |
| | Compact Card 3 | ❌ | ❌ | ❌ | ❌ |
| **Charts** | Row wrapper | ❌ | ❌ | ✅ | ❌ |
| | Line chart | ❌ | ❌ | ❌ | ❌ |
| | Bar chart | ❌ | ❌ | ❌ | ✅ |

---

## DEBUGGING CHECKLIST

**Before Deploying Any Screen:**

1. **Visual Inspection at Normal Zoom**
   - [ ] All borders appear same thickness
   - [ ] All borders appear same color (#F2F2F2)
   - [ ] No visible doubling or dark corners

2. **Code Review**
   - [ ] Search for `border-gray-200` (old color) → Replace with `border-gray-100`
   - [ ] Check for `border-r` on left-side elements → Move to `border-l` on right-side
   - [ ] Check for `border-b` on top elements → Move to `border-t` on bottom elements
   - [ ] Verify last elements have no terminal borders

3. **Browser DevTools Check**
   - [ ] Inspect computed styles → All borders show `1px solid rgb(242, 242, 242)`
   - [ ] No elements have borders on both touching edges

---

## COMMON MISTAKES TO AVOID

❌ **Mistake 1: Both Adjacent Elements Have Borders**
```jsx
// WRONG - Creates 2px border
<div className="border-r border-gray-100">Left</div>
<div className="border-l border-gray-100">Right</div>
```

❌ **Mistake 2: Container + Child Both Have Borders**
```jsx
// WRONG - Creates overlap at edges
<div className="border border-gray-100">
  <div className="border-t border-gray-100">Child</div>  // Overlaps with container top
</div>
```

❌ **Mistake 3: Using Wrong Color**
```jsx
// WRONG - Inconsistent color
<div className="border-gray-200">  // #E5E7EB (darker)
```

❌ **Mistake 4: Last Element Has Terminal Border**
```jsx
// WRONG - Last card has bottom border that doubles with container
<div className="border border-gray-100">
  <div className="border-b border-gray-100">Card 1</div>
  <div className="border-b border-gray-100">Card 2</div>  // This doubles with container bottom
</div>
```

---

## ENFORCEMENT

**Design Review Gate:**
No screen goes to production without passing all 3 debug checks above.

**Violation Tracking:**
Document any border doubling issues found in production and the fix applied.

**Continuous Improvement:**
Update this document when new patterns are discovered or edge cases are found.

---

## TAILWIND CONFIG REFERENCE

Current border color configuration:
```typescript
// tailwind.config.ts
colors: {
  gray: {
    100: '#F2F2F2',  // ← Border default (use border-gray-100)
    200: '#E5E7EB',  // ← Old color (DO NOT USE for borders)
  },
}
```

---

**Last Updated:** 2025-11-20
**Version:** 1.0
**Status:** ✅ Implemented and Enforced
