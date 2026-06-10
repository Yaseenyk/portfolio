The brand's base card surface: rounded-2xl, zinc-800/50 border, translucent dark fill with backdrop blur.

```jsx
<GlassCard hover="glow" style={{ padding: "2rem" }}>
  <span className="sk-category">Flagship · Desktop Cockpit</span>
  <h3>streamerOS</h3>
</GlassCard>
```

- `hover="glow"` (default): border → ice/30 + soft ice glow — used on project rows.
- `hover="lift"`: rises 5px, border → cyan — used on blog post cards.
- `hover="none"`: static panels.
