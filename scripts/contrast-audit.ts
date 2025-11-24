// WCAG Contrast Audit Script
// Checks color contrast ratios for WCAG 2.1 Level AA compliance

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(color1: string, color2: string): number {
  const l1 = getLuminance(...hexToRgb(color1));
  const l2 = getLuminance(...hexToRgb(color2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0];
}

// Color combinations to check
const combinations = [
  // Primary combinations
  { fg: '#1B5066', bg: '#FFFFFF', context: 'Primary text on white', minRatio: 4.5, size: 'normal' },
  { fg: '#6B7280', bg: '#FFFFFF', context: 'Neutral text on white', minRatio: 4.5, size: 'normal' },
  { fg: '#6B7280', bg: '#F8FAFC', context: 'Neutral text on surface-light', minRatio: 4.5, size: 'normal' },

  // Badge combinations
  { fg: '#1B5066', bg: '#E0F2FE', context: 'Primary badge', minRatio: 4.5, size: 'normal' },
  { fg: '#EF4444', bg: '#FEE2E2', context: 'Danger badge (red on light red)', minRatio: 4.5, size: 'normal' },
  { fg: '#DC2626', bg: '#FEE2E2', context: 'Danger badge (dark red on light red)', minRatio: 4.5, size: 'normal' },
  { fg: '#F59E0B', bg: '#FEF3C7', context: 'Warning badge (orange on light yellow)', minRatio: 4.5, size: 'normal' },
  { fg: '#D97706', bg: '#FEF3C7', context: 'Warning badge (dark orange on light yellow)', minRatio: 4.5, size: 'normal' },
  { fg: '#10B981', bg: '#D1FAE5', context: 'Success badge (green on light green)', minRatio: 4.5, size: 'normal' },
  { fg: '#059669', bg: '#D1FAE5', context: 'Success badge (dark green on light green)', minRatio: 4.5, size: 'normal' },

  // Button states
  { fg: '#FFFFFF', bg: '#1B5066', context: 'Primary button text', minRatio: 4.5, size: 'normal' },
  { fg: '#1B5066', bg: '#FFFFFF', context: 'Secondary button text', minRatio: 4.5, size: 'normal' },
  { fg: '#9CA3AF', bg: '#FFFFFF', context: 'Disabled button text', minRatio: 3.0, size: 'large' },

  // Links
  { fg: '#1B5066', bg: '#FFFFFF', context: 'Link text', minRatio: 4.5, size: 'normal' },

  // Placeholder text
  { fg: '#9CA3AF', bg: '#FFFFFF', context: 'Placeholder text (gray-400)', minRatio: 4.5, size: 'normal' },
  { fg: '#6B7280', bg: '#FFFFFF', context: 'Placeholder text (gray-500)', minRatio: 4.5, size: 'normal' },

  // Subtle text
  { fg: '#9CA3AF', bg: '#F8FAFC', context: 'Gray-400 on surface-light', minRatio: 4.5, size: 'normal' },
  { fg: '#D1D5DB', bg: '#FFFFFF', context: 'Gray-300 on white (borders)', minRatio: 3.0, size: 'ui' },
];

// Run audit
const results = combinations.map(combo => {
  const ratio = getContrastRatio(combo.fg, combo.bg);
  const passes = ratio >= combo.minRatio;
  return {
    ...combo,
    ratio: ratio.toFixed(2),
    passes,
    status: passes ? '✅ PASS' : '❌ FAIL'
  };
});

// Generate report
const report = `
# WCAG AA Contrast Audit Report
Generated: ${new Date().toISOString()}

## Summary
Total checks: ${results.length}
Passed: ${results.filter(r => r.passes).length}
Failed: ${results.filter(r => !r.passes).length}

Pass rate: ${Math.round((results.filter(r => r.passes).length / results.length) * 100)}%

## Detailed Results

${results.map(r => `
### ${r.context}
- **Foreground**: ${r.fg}
- **Background**: ${r.bg}
- **Contrast Ratio**: ${r.ratio}:1 (Required: ${r.minRatio}:1 for ${r.size} text)
- **Status**: ${r.status}
${!r.passes ? `
⚠️ **Action Required**:
Current ratio ${r.ratio}:1 does not meet WCAG AA ${r.minRatio}:1 requirement.
**Recommended fixes**:
${r.context.includes('badge') ? '- Use darker text color (e.g., 700 or 800 shade)' : ''}
${r.context.includes('Placeholder') ? '- Use gray-500 (#6B7280) or darker instead of gray-400' : ''}
${r.context.includes('Neutral') ? '- Consider using #595959 (7:1 ratio) for body text' : ''}
` : ''}
`).join('\n')}

## Recommendations

### Critical Issues (Failed Checks)
${results.filter(r => !r.passes).map(r => `
- **${r.context}**: ${r.ratio}:1 → needs ${r.minRatio}:1
`).join('')}

### Color Palette Updates Needed

If any checks failed, consider these updates to \`tailwind.config.ts\`:

\`\`\`typescript
colors: {
  // If neutral text fails, use darker grey
  neutral: '#595959',  // 7:1 ratio on white (currently #6B7280 = 4.6:1)

  // For placeholder text
  'placeholder-text': '#6B7280',  // Use gray-500 instead of gray-400

  // Badge text colors (use 700/800 shades)
  'badge-danger-text': '#DC2626',    // red-700
  'badge-warning-text': '#D97706',   // orange-700
  'badge-success-text': '#059669',   // green-700
}
\`\`\`

### Global CSS Updates

Add to \`globals.css\`:

\`\`\`css
/* Ensure all placeholder text meets contrast */
::placeholder {
  color: #6B7280; /* gray-500 instead of gray-400 */
  opacity: 1;
}

/* Focus indicators for accessibility */
*:focus-visible {
  outline: 2px solid #1B5066;
  outline-offset: 2px;
}
\`\`\`

## Next Steps

1. Fix all failed contrast checks
2. Add ARIA labels to interactive elements
3. Add focus indicators to all buttons/links
4. Test keyboard navigation
5. Run axe DevTools for additional issues
6. Test with screen reader

## Testing Tools

- **Browser Extension**: axe DevTools (Chrome/Firefox)
- **Command Line**: \`npm run lint:a11y\`
- **Manual Testing**: Tab through pages, test with screen reader

---
Report generated by contrast-audit.ts
`;

console.log(report);

// Also log summary to console
console.log('\n📊 WCAG AA Contrast Audit Summary');
console.log('================================');
console.log(`Total checks: ${results.length}`);
console.log(`✅ Passed: ${results.filter(r => r.passes).length}`);
console.log(`❌ Failed: ${results.filter(r => !r.passes).length}`);
console.log(`Pass rate: ${Math.round((results.filter(r => r.passes).length / results.length) * 100)}%\n`);

if (results.some(r => !r.passes)) {
  console.log('⚠️  Failed Checks:');
  results.filter(r => !r.passes).forEach(r => {
    console.log(`   - ${r.context}: ${r.ratio}:1 (needs ${r.minRatio}:1)`);
  });
}

export { getContrastRatio, results };
