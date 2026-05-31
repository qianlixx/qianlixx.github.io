# 多巴胺配色实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将个人网站从暗色琥珀色配色改为多巴胺日落霓虹方案，每个板块独立主色

**Architecture:** 纯 CSS 变量替换 + section 背景色调整，不修改 HTML 结构或 JS 逻辑

**Tech Stack:** 单文件 index.html（内联 CSS）

**参考文档:** `docs/superpowers/specs/2026-05-31-dopamine-colors-design.md`

---

### Task 1: 更新 CSS 变量

**Files:**
- Modify: `E:\个人网站\index.html:9-22`

将 `:root` 中的琥珀色变量替换为多巴胺配色：

- [ ] **把以下 CSS 变量块：**

```
:root {
  --bg-deep: #0a0806;
  --bg-surface: #14100c;
  --bg-elevated: #1e1814;
  --bg-card: rgba(30, 24, 20, 0.7);
  --text-primary: #ece4dc;
  --text-secondary: #a09088;
  --text-muted: #6a5c54;
  --accent: #c97b3a;
  --accent-light: #e0944a;
  --accent-glow: rgba(201, 123, 58, 0.2);
  --accent-deep: #8a5c2a;
  --border-subtle: rgba(236, 228, 220, 0.06);
  --border-medium: rgba(236, 228, 220, 0.12);
```

**替换为：**

```
:root {
  --bg-deep: #0a0806;
  --bg-surface: #14100c;
  --bg-elevated: #1e1814;
  --bg-card: rgba(30, 24, 20, 0.7);
  --text-primary: #ece4dc;
  --text-secondary: #a09088;
  --text-muted: #6a5c54;
  --accent: #FF6B35;
  --accent-light: #FF8C5A;
  --accent-glow: rgba(255, 107, 53, 0.2);
  --accent-deep: #CC552A;
  --border-subtle: rgba(236, 228, 220, 0.06);
  --border-medium: rgba(236, 228, 220, 0.12);
```

- [ ] **验证:** 重启页面确认基础变量生效（导航栏指示器、按钮变为橙红色）

---

### Task 2: 自定义光标颜色 — 橙色系 → 橙红色

**Files:**
- Modify: `E:\个人网站\index.html:44-48`

将所有光标中的 `rgba(201,123,58,*)` 和 `rgba(224,148,74,*)` 替换为 `rgba(255,107,53,*)` 和 `rgba(255,140,90,*)`

- [ ] **`#cursor` 第44行：** `border:1.5px solid rgba(255,107,53,0.3)`
- [ ] **`#cursor.hover` 第45行：** `border-color:rgba(255,140,90,0.5)` + `background:rgba(255,107,53,0.04)`
- [ ] **`#cursor.click` 第46行：** `border-color:rgba(255,140,90,0.7)`
- [ ] **`#cursor-dot` 第47行：** `background:rgba(255,107,53,0.35)`
- [ ] **`#cursor-dot.hover` 第48行：** `background:rgba(255,140,90,0.6)`

---

### Task 3: 文字悬停效果颜色更新

**Files:**
- Modify: `E:\个人网站\index.html:50-73`

将所有 `rgba(201,123,58,*)` 引用替换为 `rgba(255,107,53,*)`：

- [ ] **第52行 hover-text-shadow：** `rgba(255,107,53,0.1)`
- [ ] **第53行 movie-h3-hover：** `var(--accent-light)`（变量已变，无需改动）
- [ ] **第57行 hero-title-shadow：** `var(--accent-glow)` + `rgba(255,107,53,0.1)`
- [ ] **第58行 greeting：** `color:rgba(255,140,90,0.6)`（accent-light 新值）
- [ ] **第60行 site-link：** `var(--accent-glow)` + `rgba(255,107,53,0.08)`

---

### Task 4: 入口扫光动画颜色

**Files:**
- Modify: `E:\个人网站\index.html:77`

- [ ] **第77行 splash::before：** `rgba(255,107,53,0.4)`、`rgba(204,85,42,0.3)`、`rgba(30,20,16,0.4)`
- [ ] **第79行 splash.dismissing：** 背景色中的 `rgba(30,20,16,1)` → `rgba(40,10,5,1)`

---

### Task 5: 导航指示器 & 导航点颜色

**Files:**
- Modify: `E:\个人网站\index.html:103,115`

- [ ] **第103行 glass-nav-indicator：** 替换为 `rgba(255,107,53,0.15)` + `rgba(255,107,53,0.2)`
- [ ] **第115行 nav-dot active：** 使用 `var(--accent)` + `var(--accent-glow)`（变量已变）

---

### Task 6: 关于我（#about）背景色 + 光晕

**Files:**
- Modify: `E:\个人网站\index.html:121-160`

- [ ] **第121行 #about 背景：** `#1a0a04`（深暖褐）
- [ ] **第123行 ::before 径向渐变：** `rgba(255,107,53,0.25)` + `rgba(200,80,30,0.1)`
- [ ] **第126行 ::after 光束：** `rgba(255,140,90,0.06)` + `rgba(255,80,40,0.03)`
- [ ] **第136行 头像阴影：** `rgba(255,107,53,0.1)` + `rgba(255,107,53,0.04)`
- [ ] **第139行 头像hover：** `rgba(255,107,53,0.18)` + `rgba(255,107,53,0.08)`
- [ ] **第143行 greeting：** `color:rgba(255,107,53,0.35)`
- [ ] **第145行 hero-title：** `color:var(--accent-light)`（变量已变）`text-shadow:rgba(255,107,53,0.15)`
- [ ] **第151行 bio strong：** `var(--accent-light)`
- [ ] **第152行 hero-btn：** `rgba(255,107,53,0.3)` / `rgba(255,107,53,0.08)`
- [ ] **第154行 hero-btn:hover：** `rgba(255,107,53,0.15)` / `rgba(255,107,53,0.5)` / `rgba(255,107,53,0.2)`
- [ ] **第159行 deco-cross：** `rgba(255,107,53,0.03)`
- [ ] **第160行 deco-light：** `rgba(255,107,53,0.06)`
- [ ] **第166行 site-link:hover：** `rgba(255,107,53,0.25)` / `rgba(255,107,53,0.06)`

---

### Task 7: 摄影区（#photos）背景色 + 光晕

**Files:**
- Modify: `E:\个人网站\index.html:170-209`

- [ ] **第170行 #photos 背景：** `linear-gradient(150deg,#041a14 0%,#062e24 40%,#042018 70%,#041a14 100%)`
- [ ] **第172行 ::before 光晕：** `rgba(6,214,160,0.08)` + `rgba(17,138,178,0.06)`
- [ ] **第209行 photo-dots active：** `var(--accent-light)` + `var(--accent-glow)` → 改为使用 `#06D6A0`（摄影区独立）

---

### Task 8: 电影区（#movies）背景色 + 主色

**Files:**
- Modify: `E:\个人网站\index.html:212-243`

- [ ] **第212行 #movies 背景：** `linear-gradient(160deg,#1a0408 0%,#2a0a12 30%,#1a0408 60%,#0d0204 100%)`
- [ ] **第213行 ::before 光晕：** `radial-gradient(ellipse at 50% 0%,rgba(239,71,111,0.15),transparent 70%)`
- [ ] **第216行 section-title::after：** `rgba(239,71,111,0.5)`
- [ ] **第229行 movie-card.focus：** `rgba(239,71,111,0.5)`
- [ ] **第239行 focus title：** `color:#EF476F`
- [ ] **第242行 focus rating：** 保持不变 `#d4a547`（IMDb 金色）

---

### Task 9: 音乐区（#music）背景色 + accent 色

**Files:**
- Modify: `E:\个人网站\index.html:255-284`

- [ ] **第255行 #music 背景：** `linear-gradient(145deg,#04101a 0%,#0a1e30 30%,#04101a 100%)`
- [ ] **第257行 ::before 光晕：** `rgba(17,138,178,0.08)` + `rgba(6,214,160,0.04)`
- [ ] **第269行 music-artist-img shadow：** `rgba(17,138,178,0.15)`
- [ ] **第270行 music-artist-img:hover：** `rgba(17,138,178,0.3)`
- [ ] **第272行 music-artist-count：** `rgba(17,138,178,0.35)`
- [ ] **第275行 scrollbar-color：** `rgba(17,138,178,0.15)`
- [ ] **第278行 scrollbar-thumb：** `rgba(17,138,178,0.2)` → hover `rgba(17,138,178,0.35)`
- [ ] **第284行 album-card:hover shadow：** `rgba(17,138,178,0.2)`

---

### Task 10: 更新 JS 中的 bgColors

**Files:**
- Modify: `E:\个人网站\index.html:663`

- [ ] **第663行 bgColors：** 将颜色值更新为与 CSS 一致：
  ```js
  const bgColors = {
    about: '#1a0a04',
    photos: '#041a14',
    movies: '#1a0408',
    music: '#04101a'
  };
  ```

---

### Task 11: 移动端断点适配

**Files:**
- Modify: `E:\个人网站\index.html`

- [ ] **第367行 移动端 photo-scroll-wrap 背景：** `background:#062e24`
- [ ] **第427行 小屏 photo-scroll-wrap 背景：** `background:#062e24`

---

### Task 12: 验证

- [ ] 启动预览服务器 `npx serve . -p 3000 --cors`
- [ ] 检查每个 section 背景色是否正确
- [ ] 检查导航指示器颜色
- [ ] 检查自定义光标颜色
- [ ] 检查按钮 hover 效果
- [ ] 检查电影 focus 卡片边框色
- [ ] 检查移动端布局
