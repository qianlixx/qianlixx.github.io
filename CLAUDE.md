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

```
index.html              ← HTML skeleton (~43 lines, references external CSS/JS)
css/styles.css          ← All styles extracted from inline <style> (~267 lines)
js/
  navigation.js         ← Splash, glass nav, scroll spy
  photos.js             ← Photo gallery with 3D parallax
  games.js              ← Game list with pagination
  movies.js             ← Movie carousel (generated from data)
  movies-data.js        ← 17 movies data
  memes.js              ← Meme carousel (~135 memes)
  easter-eggs.js        ← All easter eggs + cursor particles
  music.js              ← Album renderer from MUSIC_DATA
music_data.js           ← 731-track playlist from NetEase Cloud Music
```

- `index.html` — Single-page portfolio with 5 sections: about, games, photos, movies, music. All CSS and JS externalized.
- `css/styles.css` — All styles (~267 lines) previously inline in `<style>`.
- `music_data.js` — 731-track playlist from NetEase Cloud Music, exported as global `MUSIC_DATA`.

## Music Section Current State

**3 artists displayed as side-by-side panels in `#music`:**
- 马思唯 (马思唯) — panels/musicAlbumsMs
- 陶喆 (David Tao) — panels/musicAlbumsDt  
- 五月天 (Mayday) — panels/musicAlbumsWyt

**How it works:** JS function `RA(name, containerId)` filters `MUSIC_DATA.tracks` by artist name, deduplicates by album name, and renders album cover + name in a CSS grid. Artist avatars fall back to `AI` object URLs when no album pic exists.

**Artist avatar URLs:**
- 马思唯: `https://p1.music.126.net/bRHsTqcAX6mpZCylq_GIzQ==/109951170646726907.jpg`
- 陶喆: `https://p2.music.126.net/7FWLQ9Vm_po0VS7ptLTFiQ==/109951170606711717.jpg`
- 五月天: `https://p2.music.126.net/5Bu3XLAvh-M9Iwkh0wlOYg==/109951168162347102.jpg`

**Task: Build individual artist pages**
Goal: Create separate dedicated pages (or sub-sections) for each of the 3 artists, showing:
- Full discography with all albums
- Track listings per album
- Better visual presentation than the current compact grid panel
- Navigation back to main music section
- Keep consistent with existing dark theme + dopamine color scheme (accent: #F97316, music accent: #0EA5E9 blue)
- `pic/照片展示/` — 6 photography portfolio images.
- `pic/梗图/` — ~135 meme/reaction images referenced by filename array in index.html.

## Architecture

**Sections** (full-viewport scroll-snap):
- `#about` — Bio, social links (Bilibili/Zhihu/YouTube/Telegram/X/rousip/carpt), meme carousel, avatar with bounce effect
- `#games` — 30-game grid with Steam CDN posters, paginated 10/page, habit description text, glow bar hover effect
- `#photos` — 3-card horizontal stack with focus/side/far depth effect, conic-gradient frame, 20 photos, auto-advance 5s, 3D parallax tilt on hover, film-edge label
- `#movies` — 17-movie horizontal carousel with 3D focus effect, auto-advance 3.5s, posters from Amazon IMDB, shows title/director/year/actors/rating/quote, SVG film grain overlay on focus
- `#music` — NetEase Cloud Music album grid grouped by 3 artists (马思唯, 陶喆, 五月天), album art from `music.163.com`, vinyl spin animation on hover

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
| `music.163.com` | Album artwork and artist images via CDN (`p1.music.126.net`, `p2.music.126.net`) |
| `shared.akamai.steamstatic.com` | Steam game poster images (`library_600x900_2x.jpg`) |
| `m.media-amazon.com` | Movie poster images (Amazon IMDB CDN) |
| Google Fonts | Instrument Serif, Outfit, DM Sans, Noto Sans SC, Noto Serif SC, Playfair Display

## Git Notes

- Remote: `qianlixx.github.io` (GitHub Pages)
- Commits use `qianlixx` / `qianlixx@users.noreply.github.com`

## Design System

**Dopamine color scheme** — each section has its own accent:
- 关于我: #F97316 (orange) — warm amber glow
- 游戏: #6366F1 (indigo) — game accent
- 摄影: #14B8A6 (teal) — photo stage
- 电影: #EC4899 (pink) — movie focus border
- 音乐: #0EA5E9 (blue) — music panel

**CSS Variables** in `:root`:
```css
--font-display:'Instrument Serif','Noto Serif SC',serif;
--font-body:'Outfit','DM Sans','Noto Sans SC',sans-serif;
--radius-sm:8px; --radius-md:16px; --radius-lg:24px;
--ease-out-expo:cubic-bezier(0.16,1,0.3,1);
--ease-spring:cubic-bezier(0.34,1.56,0.64,1);
```

## Key Skills Available

Skills installed in `C:\Users\Jony\.claude\skills\` that are relevant to this project:
- `ui-ux-pro-max` — design system generation, style/color/typography recommendations
- `frontend-design` — production-grade frontend implementation
- `brainstorming` — design exploration before coding
- `writing-plans` — implementation planning
- `using-superpowers` — methodology for structured development
- `baoyu-compress-image` — image compression (WebP/PNG)
