# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Available slash commands:**
- `/karpathy-guidelines` — Behavioral guidelines to reduce LLM coding mistakes (Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution)

## Behavioral Guidelines

*Derived from Andrej Karpathy's observations on LLM coding pitfalls. These apply by default — you don't need to invoke the skill for them to take effect.*

### 1. Think Before Coding
- State assumptions explicitly. If uncertain, ask.
- Present multiple interpretations rather than silently picking one.
- Push back on overcomplicated approaches. Say so if a simpler way exists.
- If something is unclear, stop and clarify before implementing.

### 2. Simplicity First
- No features beyond what was asked.
- No abstractions for single-use code.
- No speculative flexibility or configurability.
- If a solution is 200 lines when it could be 50, rewrite it.

### 3. Surgical Changes
- Don't improve adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style even if you'd do it differently.
- Every changed line should trace directly to the request.

### 4. Goal-Driven Execution
- Transform tasks into verifiable criteria. "Fix the bug" → "Write a test that reproduces it, then make it pass".
- For multi-step tasks, state a brief plan with verification steps.

## Dev Server

```bash
npx serve . -p 3000 --cors
```
Or use the PowerShell server: `powershell -ExecutionPolicy Bypass -File server.ps1`

The site is pure static HTML — no build step, no package.json, no framework.

## Project Structure

- `index.html` — Entire website (~1200 lines): inline HTML, CSS (in `<style>`), and JS (in `<script>`). Single-page portfolio with 4 sections: about, photos, movies, music.
- `music_data.js` — 731-track playlist from NetEase Cloud Music, exported as global `MUSIC_DATA`.
- `pic/照片展示/` — 6 photography portfolio images.
- `pic/梗图/` — ~135 meme/reaction images referenced by filename array in index.html.

## Architecture

**Sections** (full-viewport scroll-snap):
- `#about` — Bio, social links (Bilibili/Zhihu/YouTube/Telegram/X/rousip/carpt), meme carousel
- `#photos` — Photo carousel with prev/next, dot indicators, auto-advance 5s, themed accent colors
- `#movies` — 17-movie horizontal carousel with 3D focus effect, auto-advance 3.5s, posters from Amazon IMDB, shows title/director/year/actors/rating/quote
- `#music` — NetEase Cloud Music player grouped by artist (马思唯, 陶喆), 30s audio previews from `music.163.com`

**Navigation**: Glassmorphism top nav with sliding indicator, right-side nav dots (hidden on mobile).

**Visual**: Dark theme with per-section background colors (amber, navy, crimson, purple), custom cursor (ring+dot, mix-blend-mode: difference), splash entrance animation, intersection-observer fade-in-up.

**Key patterns**:
- Background color crossfades as user scrolls between sections
- Custom cursor disabled on touch devices via `('ontouchstart' in window)`
- NetEase audio previews use `https://music.163.com/song/media/outer/url?id={id}.mp3`
- Meme carousel uses 3 rows of infinite scroll animation (CSS `animation: scroll`) with mouseover pause

## External Dependencies

| Resource | Purpose |
|---|---|
| `music.163.com` | 30s audio previews (`/song/media/outer/url`) |
| `m.media-amazon.com` | Movie poster images |
| Google Fonts | Noto Sans SC, Noto Serif SC, Playfair Display |

## Git Notes

- Remote: `qianlixx.github.io` (GitHub Pages)
- Commits use `qianlixx` / `qianlixx@users.noreply.github.com`
