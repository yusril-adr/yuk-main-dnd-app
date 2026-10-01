# Fonts

Source: `src/app/layout.tsx`

All fonts are loaded from [Google Fonts](https://fonts.google.com/) via `next/font/google`.

## Font Stack

| Role | CSS Variable | Font | Weight | Category |
|---|---|---|---|---|
| **Heading** | `--font-heading` | [Eczar](https://fonts.google.com/specimen/Eczar) | 400 | Serif (Devanagari + Latin) |
| **Body / Sans** | `--font-sans` | [Alegreya Sans](https://fonts.google.com/specimen/Alegreya+Sans) | 400 | Sans-serif |
| **Monospace** | `--font-mono` | [DM Mono](https://fonts.google.com/specimen/DM+Mono) | 400 | Monospace |

## Usage

The fonts are exposed as CSS custom variables on `<html>` and mapped to Tailwind theme tokens in `globals.css`:

- `font-sans` → Alegreya Sans (applied to `<html>` via `@apply font-sans`)
- `font-heading` → Eczar (use `font-heading` class on headings)
- `font-mono` → DM Mono (use `font-mono` class on code blocks)

### Example

```tsx
<h1 className="font-heading text-4xl">My Heading</h1>
<p className="font-sans">Body text uses Alegreya Sans.</p>
<code className="font-mono">console.log("hello")</code>
```

## Notes

- All fonts use the `latin` subset.
- The body sans-serif (`Alegreya Sans`) is loaded at weight `400` only. If you need bold or italic, add additional weights to the font config in `layout.tsx`.
- The monospace font (`DM Mono`) is also loaded at `400` only.