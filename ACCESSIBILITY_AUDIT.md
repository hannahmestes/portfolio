# Accessibility Audit Report - Hannah Estes Portfolio

**Date:** 2026-04-22
**Audited:** index.html
**Standards:** WCAG 2.1 AA

---

## Critical Issues (Must Fix)

### 1. ❌ Missing skip navigation link
- **WCAG 2.4.1 Bypass Blocks**
- **Impact:** Critical - Keyboard users must tab through all interactive elements to reach main content
- **Fix:** Add skip link at the top of the page

### 2. ❌ Interactive elements lack visible focus indicators
- **WCAG 2.4.7 Focus Visible**
- **Impact:** Critical - Keyboard users cannot see which element has focus
- **Fix:** Add explicit focus styles for all interactive elements

### 3. ❌ Tarot cards are missing ARIA attributes
- **WCAG 4.1.2 Name, Role, Value**
- **Impact:** Critical - Screen readers cannot understand card flip functionality
- **Fix:** Add `role="button"`, `aria-pressed`, and `aria-expanded` attributes

### 4. ❌ Color contrast insufficient
- **WCAG 1.4.3 Contrast (Minimum)**
- **Impact:** Critical - Low vision users cannot read text
- **Issues:**
  - Card back text on light background (#5a4a6e on #faf9ff) - contrast ~2.8:1 (needs 4.5:1)
  - Gallery captions (#000 on transparent) - may have contrast issues
- **Fix:** Adjust colors to meet 4.5:1 ratio

### 5. ❌ Images missing decorative attribute
- **WCAG 1.1.1 Non-text Content**
- **Impact:** High - Decorative images announced to screen readers
- **Fix:** Add `role="presentation"` or `alt=""` to decorative SVG icons

---

## High Priority Issues

### 6. ⚠️ Window controls lack accessible names
- **WCAG 4.1.2 Name, Role, Value**
- **Impact:** High - Screen readers announce "x" instead of "Close window"
- **Fix:** Add `aria-label="Close window"`

### 7. ⚠️ Icon labels are visual only
- **WCAG 2.5.3 Label in Name**
- **Impact:** High - Screen readers don't announce icon purposes
- **Fix:** Ensure icon labels match visual text

### 8. ⚠️ No heading structure in some areas
- **WCAG 1.3.1 Info and Relationships**
- **Impact:** High - Screen reader users can't navigate content
- **Fix:** Add proper heading hierarchy

### 9. ⚠️ Touch targets too small on mobile
- **WCAG 2.5.5 Target Size**
- **Impact:** High - Users with motor impairments can't accurately tap
- **Fix:** Ensure touch targets are at least 44x44px

---

## Medium Priority Issues

### 10. ⚠️ Missing aria-live regions for dynamic content
- **WCAG 4.1.3 Status Messages**
- **Impact:** Medium - Screen readers don't announce card flip
- **Fix:** Consider adding `aria-live="polite"` for important state changes

### 11. ⚠️ Windows don't announce when opened/closed
- **WCAG 4.1.3 Status Messages**
- **Impact:** Medium - Screen reader users don't know window state
- **Fix:** Add aria-live announcements

### 12. ⚠️ PDF iframe not accessible
- **WCAG 1.1.1 Non-text Content**
- **Impact:** Medium - Screen readers may not properly announce PDF content
- **Fix:** Provide accessible alternative or ensure PDF is tagged

---

## Low Priority Issues

### 13. ℹ️ Animation lacks pause/resume control
- **WCAG 2.3.3 Animation from Interactions**
- **Impact:** Low - Twinkling stars animation
- **Fix:** Consider adding pause control or respect `prefers-reduced-motion`

### 14. ℹ️ Language not declared for all text content
- **WCAG 3.1.2 Language of Parts**
- **Impact:** Low - Some content may not be correctly pronounced
- **Fix:** Add `lang` attribute where appropriate

---

## Recommended Fixes

All critical and high-priority issues will be addressed in the pull request.
