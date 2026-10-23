# Hero background video

Drop your video file here as exactly:

    hero-background.mp4

The Hero section (`src/components/Hero.tsx`) is already wired to look for it at
`/media/hero-background.mp4`. As soon as the file exists, it will autoplay,
loop, and mute itself behind the headline — no code changes needed.

Recommended specs:
- Format: .mp4 (H.264)
- Length: 10–20 seconds, seamlessly loopable
- Resolution: 1920x1080 (or 1280x720 to keep file size down)
- File size: under ~15MB so it loads quickly
- No audio needed — it plays muted

If no file is present, the section falls back automatically to the existing
grid/glow background with no broken video icon or console errors.
