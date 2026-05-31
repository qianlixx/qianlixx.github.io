# 马思唯独立页面 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use frontend-design skill for design implementation.

**Goal:** 用杂志风格 × 涂鸦时间线重写马思唯独立页面

**Architecture:** 单 HTML 文件（纯静态），加载 `music_data.js` 获取数据，JS 在客户端过滤渲染。CSS 所有样式内联。

**Tech Stack:** HTML + CSS (vanilla) + JavaScript (vanilla) + SVG (内联涂鸦线) + Google Fonts (Bebas Neue, Outfit, DM Sans, Noto Sans SC)

---

### Task 1: HTML 骨架 & 全局样式

**Files:**
- Rewrite: `artist-masiwei.html` (lines 1-50)

- [ ] **Step 1: 创建完整 HTML 骨架**

从 `<!DOCTYPE html>` 开始，包含：
- Google Fonts 引入：Bebas Neue, Outfit, DM Sans, Noto Sans SC
- 全局 CSS reset
- CSS 变量（--accent: #F97316 等沿用主站，涂鸦线各阶段色值）
- Top Nav 固定 bar 的 HTML + CSS
- Hero 区的 HTML 结构（头像、标题、信息行、统计数字）
- Footer 结构
- 底部音频播放栏结构
- `<script src="music_data.js">` 引用

**Top Nav CSS：**
```css
.top-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:16px 28px;background:rgba(10,8,6,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(236,228,220,0.05)}
.top-nav .back{display:flex;align-items:center;gap:8px;font-size:13px;color:#6a5c54;letter-spacing:1.5px;text-transform:uppercase;transition:color .3s;font-weight:400}
.top-nav .back:hover{color:#ece4dc}
.top-nav .nav-title{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:3px;color:rgba(236,228,220,0.6)}
```

**Hero CSS：**
```css
.hero{position:relative;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(ellipse at 50% 30%,rgba(249,115,22,0.12) 0%,transparent 60%),radial-gradient(ellipse at 80% 70%,rgba(249,115,22,0.05) 0%,transparent 50%),#0a0806}
.hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;z-index:0}
.hero-bg-text{position:absolute;top:60%;left:50%;transform:translate(-50%,-50%) rotate(-8deg);font-family:'Bebas Neue',sans-serif;font-size:clamp(120px,20vw,300px);color:rgba(255,255,255,0.015);letter-spacing:8px;pointer-events:none;white-space:nowrap;user-select:none;z-index:0}
.hero-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:clamp(20px,3vh,40px);text-align:center}
```

**Hero 标题——粗犷张扬：**
```css
.hero h1{font-family:'Bebas Neue',sans-serif;font-size:clamp(72px,14vw,160px);line-height:0.85;letter-spacing:-0.03em;background:linear-gradient(135deg,#fbbf24,#F97316,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-shadow:0 0 60px rgba(249,115,22,0.15)}
.hero h1 .sub{display:block;font-family:'Bebas Neue','Noto Sans SC',sans-serif;font-size:clamp(16px,2vw,28px);letter-spacing:12px;color:rgba(236,228,220,0.35);background:none;-webkit-text-fill-color:rgba(236,228,220,0.35);font-weight:400;margin-top:4px}
```

**Hero 头像——金色双边框：**
```css
.hero-img-wrap{position:relative;width:clamp(160px,20vw,280px);height:clamp(160px,20vw,280px);border-radius:50%;overflow:hidden;border:3px solid rgba(249,115,22,0.25);box-shadow:0 0 60px rgba(249,115,22,0.15),0 0 120px rgba(249,115,22,0.05)}
.hero-img-wrap::before{content:'';position:absolute;inset:-6px;border-radius:50%;border:1.5px solid rgba(249,115,22,0.1);pointer-events:none;z-index:1}
.hero-img-wrap::after{content:'';position:absolute;inset:0;border-radius:50%;border:1px solid rgba(249,115,22,0.15);animation:heroPulse 3s ease-in-out infinite alternate}
@keyframes heroPulse{0%{opacity:0.3;transform:scale(1)}100%{opacity:1;transform:scale(1.05)}}
.hero-img-wrap img{width:100%;height:100%;object-fit:cover}
```

**Hero 信息行——粗犷标签：**
```css
.hero-info{display:flex;gap:clamp(16px,2.5vw,36px);font-size:clamp(13px,1.1vw,16px);color:#6a5c54;letter-spacing:2.5px;text-transform:uppercase;font-weight:400;flex-wrap:wrap;justify-content:center}
.hero-info span{display:flex;align-items:center;gap:6px}
.hero-info .hl{color:rgba(249,115,22,0.6);font-weight:500}
```

**Hero 统计数字：**
```css
.hero-stats{display:flex;gap:clamp(24px,4vw,56px);margin-top:4px}
.hero-stats div{text-align:center}
.hero-stats .num{font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,3.5vw,52px);color:#ece4dc;line-height:1}
.hero-stats .lbl{font-size:11px;color:#6a5c54;letter-spacing:2.5px;text-transform:uppercase;font-weight:400}
```

**Footer：**
```css
.footer{padding:60px 24px 80px;text-align:center;position:relative;background:#0a0806}
.footer a{display:inline-flex;align-items:center;gap:8px;color:#6a5c54;font-size:13px;letter-spacing:2px;text-transform:uppercase;transition:color .3s;font-weight:400}
.footer a:hover{color:#F97316}
.footer .tag{font-family:'Bebas Neue',sans-serif;font-size:48px;letter-spacing:4px;color:rgba(255,255,255,0.02);margin-top:16px}
```

**Audio Bar HTML：**
```html
<div class="audio-bar" id="audioBar">
  <div class="ab-info">
    <img class="ab-img" id="abImg" src="" alt="">
    <span class="ab-name" id="abName"></span>
  </div>
  <button class="ab-close" id="abClose">✕</button>
</div>
```

**Audio Bar CSS：**
```css
.audio-bar{position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(10,8,6,0.92);backdrop-filter:blur(20px);border-top:1px solid rgba(249,115,22,0.1);padding:10px 20px;display:none;align-items:center;gap:16px;font-size:13px;color:#a09088}
.audio-bar.show{display:flex}
.audio-bar .ab-info{flex:1;min-width:0;display:flex;align-items:center;gap:10px}
.audio-bar .ab-img{width:32px;height:32px;border-radius:4px;object-fit:cover}
.audio-bar .ab-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#ece4dc;font-weight:400}
.audio-bar .ab-close{width:28px;height:28px;border-radius:50%;border:1px solid rgba(236,228,220,0.1);background:transparent;color:#6a5c54;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .3s;flex-shrink:0}
.audio-bar .ab-close:hover{color:#ece4dc;border-color:rgba(236,228,220,0.2)}
```

- [ ] **Step 2: 验证骨架渲染**

```bash
npx serve . -p 3000 --cors
```
打开浏览器访问 `http://localhost:3000/artist-masiwei.html`，确认 Hero 和 Nav 正常渲染。

- [ ] **Step 3: Commit**

```bash
git add artist-masiwei.html
git commit -m "feat: add masiwei artist page skeleton with hero and nav"
```

---

### Task 2: SVG 涂鸦线（蜿蜒喷漆路径）

**Files:**
- Modify: `artist-masiwei.html`（加入 SVG 涂鸦线）

**解释：** 涂鸦线是页面的核心视觉脊梁。用 SVG `<path>` 多段贝塞尔曲线实现蜿蜒效果。3 层叠加制造喷漆质感。每段线的颜色对应阶段色调。节点（dot）随滚动描边动画。

- [ ] **Step 1: 在 timeline-wrap 容器中写入 SVG**

SVG 放在 timeline-wrap 的最前面（absolute 定位）：

```html
<div class="timeline-wrap" id="timeline">
  <div class="timeline-line" id="timelineLine">
    <svg id="graffitiSvg" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8B6F47" stop-opacity="0.3"/>
          <stop offset="14%" stop-color="#D97706" stop-opacity="0.4"/>
          <stop offset="28%" stop-color="#B91C1C" stop-opacity="0.5"/>
          <stop offset="42%" stop-color="#F59E0B" stop-opacity="0.6"/>
          <stop offset="57%" stop-color="#EA580C" stop-opacity="0.7"/>
          <stop offset="71%" stop-color="#0EA5E9" stop-opacity="0.6"/>
          <stop offset="85%" stop-color="#7C3AED" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#7C3AED" stop-opacity="0.1"/>
        </linearGradient>
        <filter id="spray">
          <feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>
      <!-- 主路径：蜿蜒贝塞尔曲线 -->
      <path id="graffitiPath" d="M30 0 
               C25 60, 40 80, 30 120 
               C20 160, 35 180, 30 220 
               C25 260, 40 280, 30 320 
               C20 360, 35 380, 30 420 
               C25 460, 40 480, 30 520 
               C20 560, 35 580, 30 620 
               C25 660, 40 680, 30 720"
            stroke="url(#lineGrad)" stroke-width="3.5" fill="none" opacity="0.25" filter="url(#spray)"/>
      <!-- 第 2 层：偏移细线 -->
      <path d="M33 0 
               C28 60, 43 80, 33 120 
               C23 160, 38 180, 33 220 
               C28 260, 43 280, 33 320 
               C23 360, 38 380, 33 420 
               C28 460, 43 480, 33 520 
               C23 560, 38 580, 33 620 
               C28 660, 43 680, 33 720"
            stroke="url(#lineGrad)" stroke-width="1.5" fill="none" opacity="0.12" filter="url(#spray)"/>
      <!-- 第 3 层：反偏移更细 -->
      <path d="M27 0 
               C22 60, 37 80, 27 120 
               C17 160, 32 180, 27 220 
               C22 260, 37 280, 27 320 
               C17 360, 32 380, 27 420 
               C22 460, 37 480, 27 520 
               C17 560, 32 580, 27 620 
               C22 660, 37 680, 27 720"
            stroke="url(#lineGrad)" stroke-width="0.8" fill="none" opacity="0.08" filter="url(#spray)"/>
    </svg>
  </div>
```

**CSS 定位：**
```css
.timeline-wrap{position:relative;max-width:1400px;margin:0 auto;padding:0}
.timeline-line{position:absolute;top:0;left:50%;transform:translateX(-50%);z-index:1;pointer-events:none;width:60px;bottom:0}
.timeline-line svg{width:100%;display:block}
@keyframes graffitiDraw{0%{stroke-dashoffset:1000}100%{stroke-dashoffset:0}}
```

- [ ] **Step 2: 节点（dot + glow + drip）CSS**

```css
.phase-node{flex:0 0 60px;display:flex;flex-direction:column;align-items:center;position:relative;z-index:3}
.phase-node .dot{width:clamp(18px,2vw,24px);height:clamp(18px,2vw,24px);border-radius:50%;position:relative;z-index:2;border:3px solid;transition:all .5s ease;flex-shrink:0}
.phase-node .dot-glow{position:absolute;width:clamp(48px,6vw,80px);height:clamp(48px,6vw,80px);border-radius:50%;opacity:0.08;z-index:1;filter:blur(14px);transition:all .5s ease}
.phase-node .year{font-family:'Bebas Neue',sans-serif;font-size:clamp(14px,1.3vw,18px);letter-spacing:2px;margin-top:8px;white-space:nowrap}
.phase-node .drip{width:2px;height:clamp(24px,4vh,48px);border-radius:0 0 3px 3px;margin-top:6px;opacity:0.25}
```

- [ ] **Step 3: 节点动画 CSS**

```css
.phase.visible .phase-node .dot{animation:nodePop .5s cubic-bezier(0.34,1.56,0.64,1) forwards}
@keyframes nodePop{0%{transform:scale(0)}60%{transform:scale(1.3)}100%{transform:scale(1)}}
.phase.visible .phase-node .dot-glow{animation:glowPop .6s ease forwards}
@keyframes glowPop{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:0.08}}
```

- [ ] **Step 4: 涂鸦线 JS 动态高度 + 滚动描画**

```js
// 动态高度
function sizeGraffitiLine() {
  var wrap = document.getElementById('timeline');
  var line = document.getElementById('timelineLine');
  var svg = document.getElementById('graffitiSvg');
  if (!wrap || !line || !svg) return;
  var h = wrap.scrollHeight;
  svg.setAttribute('viewBox', '0 0 60 ' + h);
  svg.style.height = h + 'px';
}
sizeGraffitiLine();
window.addEventListener('resize', sizeGraffitiLine);

// 滚动描画
var path = document.getElementById('graffitiPath');
if (path) {
  var length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  path.style.animation = 'graffitiDraw 2s ease-out forwards';
  window.addEventListener('scroll', function() {
    var scrollTop = window.scrollY || window.pageYOffset;
    var maxScroll = document.body.scrollHeight - window.innerHeight;
    var progress = Math.min(scrollTop / maxScroll, 1);
    path.style.strokeDashoffset = length - (length * progress * 0.9);
  });
  window.dispatchEvent(new Event('scroll'));
}
```

- [ ] **Step 5: Commit**

```bash
git add artist-masiwei.html
git commit -m "feat: add graffiti timeline SVG with spray paint effect"
```

---

### Task 3: 7 个 Phase 内容结构

**Files:**
- Modify: `artist-masiwei.html`

**解释：** 在 SVG 涂鸦线之后写入 7 个 `section.phase`，每个包含节点（dot/drip/year）和内容区（编号、标题、正文、事件卡、专辑网格容器）。左右交替用 `.phase-inner.right` 类控制。

- [ ] **Step 1: Phase 通用 CSS**

```css
.phase{padding:clamp(60px,10vh,120px) 24px;position:relative;overflow:hidden;opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s cubic-bezier(0.16,1,0.3,1)}
.phase.visible{opacity:1;transform:translateY(0)}
.phase-inner{position:relative;z-index:2;display:flex;align-items:flex-start;gap:clamp(24px,4vw,60px);max-width:1200px;margin:0 auto}
.phase-inner.right{flex-direction:row-reverse}
```

- [ ] **Step 2: Phase 内容卡片 CSS**

```css
.phase-content{flex:1;min-width:0}
.phase-header{display:flex;align-items:center;gap:12px;margin-bottom:16px}
.phase-num{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,6vw,80px);line-height:0.85;opacity:0.12;letter-spacing:-2px}
.phase-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(30px,3.5vw,48px);letter-spacing:1.5px;line-height:1}
.phase-sub{font-size:clamp(12px,0.9vw,14px);color:#6a5c54;letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;font-weight:400}
.phase-desc{font-size:clamp(14px,1vw,16px);color:#a09088;line-height:1.9;margin-bottom:20px;max-width:560px}
.phase-desc strong{color:#ece4dc;font-weight:500}
```

**事件卡（Beef 阶段）：**
```css
.event-card{background:rgba(255,255,255,0.02);border-left:3px solid #B91C1C;border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:14px}
.event-card .ev-tag{font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:500;margin-bottom:4px}
.event-card .ev-title{font-weight:500;font-size:15px;margin-bottom:4px}
.event-card .ev-desc{font-size:13px;color:#6a5c54;line-height:1.7}
```

- [ ] **Step 3: 专辑网格 CSS**

```css
.phase-albums{display:grid;grid-template-columns:repeat(auto-fill,minmax(clamp(120px,15vw,160px),1fr));gap:12px;margin-top:16px}
.phase-album-card{cursor:pointer;transition:transform .35s cubic-bezier(0.34,1.56,0.64,1);position:relative}
.phase-album-card:hover{transform:translateY(-4px) scale(1.03)}
.phase-album-img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px;border:1px solid rgba(236,228,220,0.06);box-shadow:0 4px 16px rgba(0,0,0,0.4);transition:all .35s ease}
.phase-album-card:hover .phase-album-img{border-color:rgba(249,115,22,0.2);box-shadow:0 8px 28px rgba(249,115,22,0.15)}
.phase-album-name{font-size:12px;color:#a09088;margin-top:6px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:400}
.phase-album-count{font-size:10px;color:#6a5c54;text-align:center;letter-spacing:1px}
```

**曲目列表：**
```css
.track-list{display:none;grid-column:1/-1;padding:12px;background:rgba(0,0,0,0.3);border-radius:8px;margin-top:4px}
.track-list.open{display:block}
.track-item{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:6px;transition:background .25s;gap:8px}
.track-item:hover{background:rgba(249,115,22,0.06)}
.track-item .ti-left{display:flex;align-items:center;gap:10px;min-width:0;flex:1}
.track-item .ti-idx{font-size:11px;color:#6a5c54;font-weight:400;width:20px;text-align:right;flex-shrink:0}
.track-item .ti-name{font-size:14px;color:#ece4dc;font-weight:400;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.track-item .ti-feat{font-size:12px;color:#6a5c54;font-weight:300}
.track-item .ti-right{display:flex;align-items:center;gap:10px;flex-shrink:0}
.track-item .ti-dt{font-size:12px;color:#6a5c54;font-weight:300}
.track-item .ti-play{width:28px;height:28px;border-radius:50%;border:1px solid rgba(249,115,22,0.2);background:transparent;color:#F97316;font-size:11px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s;flex-shrink:0}
.track-item .ti-play:hover{background:#F97316;color:#000;border-color:#F97316}
.track-item .ti-play.playing{background:#0EA5E9;color:#000;border-color:#0EA5E9}
```

- [ ] **Step 4: 写出 7 个 Phase 的 HTML 结构**

每个 phase 的格式：

```html
<section class="phase" data-phase="N" id="phase-N">
  <div class="phase-inner">
    <div class="phase-node">
      <div class="dot-glow"></div>
      <div class="dot"></div>
      <div class="drip"></div>
      <div class="year">年份</div>
    </div>
    <div class="phase-content">
      <div class="phase-header">
        <span class="phase-num">0N</span>
        <h2 class="phase-title">阶段标题</h2>
      </div>
      <div class="phase-sub">英文副标题</div>
      <div class="phase-desc">
        <!-- 正文内容 -->
      </div>
      <!-- 可选：事件卡片（Phase 3 Beef 阶段） -->
      <div class="event-card">...</div>
      <!-- 专辑网格（JS 渲染） -->
      <div class="phase-albums" data-phase="N"></div>
    </div>
  </div>
</section>
```

**7 个 Phase 的年份和标题（轮流左右交替）：**

| Phase | 方向 | 年份 | 标题 | 色调 |
|-------|------|------|------|------|
| phase-0 | .phase-inner（左） | 1993–2013 | 郫县少年 | #8B6F47 |
| phase-1 | .phase-inner.right（右） | 2014–2015 | 横空出世 | #D97706 |
| phase-2 | .phase-inner（左） | 2015–2016 | Beef·战火 | #B91C1C |
| phase-3 | .phase-inner.right（右） | 2016–2019 | Higher Brothers 走向世界 | #F59E0B |
| phase-4 | .phase-inner（左） | 2020 | 黑马王子 | #EA580C |
| phase-5 | .phase-inner.right（右） | 2021–2023 | 高产期 | #0EA5E9 |
| phase-6 | .phase-inner（左） | 2024–至今 | 乐透人生 | #7C3AED |

- [ ] **Step 5: Phase 色调 CSS**

每个 phase 的色调规则，例如 phase-0：
```css
.phase[data-phase="0"] .phase-node .dot{border-color:#8B6F47;background:#8B6F47}
.phase[data-phase="0"] .phase-node .dot-glow{background:#8B6F47}
.phase[data-phase="0"] .phase-node .year{color:#8B6F47}
.phase[data-phase="0"] .phase-node .drip{background:linear-gradient(to bottom,#8B6F47,transparent)}
.phase[data-phase="0"] .phase-num{color:#8B6F47}
```

其他 6 个 phase 同理替换色值。

- [ ] **Step 6: Commit**

```bash
git add artist-masiwei.html
git commit -m "feat: add 7 timeline phases with alternating layout"
```

---

### Task 4: JS 数据处理 & 专辑渲染

**Files:**
- Modify: `artist-masiwei.html`（<script> 部分）

- [ ] **Step 1: 数据过滤 + 专辑分组 JS**

```js
(function() {
  if (typeof MUSIC_DATA === 'undefined') return;

  var tracks = MUSIC_DATA.tracks.filter(function(t) {
    return t.artists.some(function(a) { return a.indexOf('马思唯') !== -1; });
  });

  // Stats
  document.getElementById('trackCount').textContent = tracks.length;
  document.getElementById('featCount').textContent = '12';

  // 按 album 分组
  var albumMap = {};
  tracks.forEach(function(t) {
    var key = t.album || '';
    if (!albumMap[key]) albumMap[key] = { name: key, pic: t.albumPic, tracks: [] };
    albumMap[key].tracks.push(t);
  });
  var albums = Object.values(albumMap);
  document.getElementById('albumCount').textContent = albums.length;
```

- [ ] **Step 2: Phase→Album 映射**

```js
var phaseAlbums = {
  0: [],
  1: ['P.E.I Vol.2', '339 EP', 'Overcook Freestyle'],
  2: ['339 EP'],
  3: ['Black Cab', 'Five Stars', '最高'],
  4: ['黑马王子', '黑马季节演唱会精选辑 (Live)', 'R&B All Night (Masiwei Remix)'],
  5: ['黑马', 'Humble Swag', 'Humble Swag GT Mixtape', '狗咬狗', '特别怪人', '冠军情歌', '啥子范', 'Something New', '为什么', 'I Need a Girl，Pt.3', 'P.Y.T', 'BLACK SERIES', 'LIFE IS A MOVIE人生如戏', 'Mr. Enjoy Da Money', 'On Both Side 3:Summer Tape', '年度人物', 'Couple Hunnid All Star Mixtape Vol.1', 'LONG TIME KNOW SEE'],
  6: ['乐透人生', '乐透人生GT：即刻入戏']
};
```

- [ ] **Step 3: 专辑渲染函数**

```js
function renderPhase(phaseNum, container) {
  var albumNames = phaseAlbums[phaseNum] || [];
  if (!albumNames.length) return;

  var maxShow = 8;
  var needsFold = albumNames.length > maxShow;
  var shown = needsFold ? albumNames.slice(0, maxShow) : albumNames;

  shown.forEach(function(aname) {
    var alb = albumMap[aname];
    if (!alb || !alb.tracks.length) return;
    var card = document.createElement('div');
    card.className = 'phase-album-card';
    card.innerHTML = '<img class="phase-album-img" src="' + (alb.pic || '') + '" alt="" loading="lazy">' +
      '<div class="phase-album-name">' + alb.name + '</div>' +
      '<div class="phase-album-count">' + alb.tracks.length + ' tracks</div>' +
      '<div class="track-list">' +
      alb.tracks.map(function(t, i) {
        var feat = t.artists.filter(function(a) { return a.indexOf('马思唯') === -1 && a.indexOf('Higher Brothers') === -1; });
        var featStr = feat.length ? ' <span class="ti-feat">feat. ' + feat.join(', ') + '</span>' : '';
        return '<div class="track-item"><div class="ti-left"><span class="ti-idx">' + (i+1) + '</span><span class="ti-name">' + t.name + featStr + '</span></div><div class="ti-right"><span class="ti-dt">' + t.dt + '</span><button class="ti-play" data-id="' + t.id + '" data-pic="' + (alb.pic || '') + '" data-name="' + t.name + '">▶</button></div></div>';
      }).join('') + '</div>';
    card.addEventListener('click', function(e) {
      if (e.target.closest('.ti-play')) return;
      var tl = card.querySelector('.track-list');
      tl.classList.toggle('open');
    });
    container.appendChild(card);
  });

  // "+X more" 折叠
  if (needsFold) {
    var more = document.createElement('div');
    more.className = 'phase-album-more';
    more.textContent = '+' + (albumNames.length - maxShow) + ' more';
    more.addEventListener('click', function() {
      this.remove();
      albumNames.slice(maxShow).forEach(function(aname) {
        var alb = albumMap[aname];
        if (!alb || !alb.tracks.length) return;
        var card = document.createElement('div');
        card.className = 'phase-album-card';
        card.innerHTML = '...'; // 同上
        container.appendChild(card);
      });
    });
    container.appendChild(more);
  }
}

// Mount
document.querySelectorAll('.phase-albums[data-phase]').forEach(function(el) {
  renderPhase(parseInt(el.dataset.phase), el);
});
```

- [ ] **Step 4: 音频播放功能**

```js
var audioEl = null;
var currentTrackId = null;
var audioBar = document.getElementById('audioBar');
var abImg = document.getElementById('abImg');
var abName = document.getElementById('abName');
var abClose = document.getElementById('abClose');

function playTrack(trackId, albumPic, trackName) {
  if (audioEl) { audioEl.pause(); audioEl = null; }
  if (currentTrackId === trackId) { currentTrackId = null; audioBar.classList.remove('show'); return; }
  var url = 'https://music.163.com/song/media/outer/url?id=' + trackId + '.mp3';
  audioEl = new Audio(url);
  audioEl.volume = 0.5;
  audioEl.play().then(function() {
    currentTrackId = trackId;
    abImg.src = albumPic || '';
    abName.textContent = trackName || '';
    audioBar.classList.add('show');
    document.querySelectorAll('.ti-play').forEach(function(b) { b.classList.remove('playing'); });
    var btn = document.querySelector('.ti-play[data-id="' + trackId + '"]');
    if (btn) btn.classList.add('playing');
  }).catch(function() {});

  if (audioEl) {
    audioEl.addEventListener('ended', function() {
      audioBar.classList.remove('show');
      currentTrackId = null;
      document.querySelectorAll('.ti-play').forEach(function(b) { b.classList.remove('playing'); });
    });
  }
}

abClose.addEventListener('click', function() {
  if (audioEl) { audioEl.pause(); audioEl = null; }
  currentTrackId = null;
  audioBar.classList.remove('show');
  document.querySelectorAll('.ti-play').forEach(function(b) { b.classList.remove('playing'); });
});

// Wire play buttons after render
document.querySelectorAll('.ti-play').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    playTrack(parseInt(this.dataset.id), this.dataset.pic, this.dataset.name);
  });
});
```

- [ ] **Step 5: IntersectionObserver 滚动动画**

```js
var phaseObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.phase').forEach(function(p) {
  phaseObserver.observe(p);
});
```

- [ ] **Step 6: Commit**

```bash
git add artist-masiwei.html
git commit -m "feat: add music data rendering and audio preview"
```

---

### Task 5: 响应式 & 动画 & reduced-motion

**Files:**
- Modify: `artist-masiwei.html`

- [ ] **Step 1: 桌面版滚动描边动画 JS**（已在 Task 2 中实现，确保存在）

- [ ] **Step 2: 移动端响应式 CSS**

```css
@media(max-width:768px){
  .phase-inner,.phase-inner.right{flex-direction:column;align-items:stretch;gap:12px}
  .phase-node{flex-direction:row;gap:12px;margin-bottom:8px}
  .phase-node .drip{display:none}
  .timeline-line{left:24px;transform:none}
  .phase-node .year{font-size:14px;margin-top:0}
  .hero h1{font-size:clamp(48px,16vw,72px);letter-spacing:0}
  .hero-stats{gap:16px}
  .phase{padding:40px 16px}
  .track-item{flex-wrap:wrap}
  .top-nav{padding:12px 16px}
}

@media(max-width:480px){
  .phase-albums{grid-template-columns:repeat(2,1fr)}
  .hero-info{gap:10px;flex-direction:column;align-items:center}
  .top-nav .nav-title{font-size:16px}
}
```

- [ ] **Step 3: prefers-reduced-motion**

```css
@media(prefers-reduced-motion:reduce){
  .phase,.phase-content>*{opacity:1;transform:none;transition:none}
  .phase-node .dot,.phase-node .dot-glow{animation:none!important}
  .timeline-line #graffitiPath{stroke-dashoffset:0!important;animation:none!important}
}
```

- [ ] **Step 4: 验证全部功能**

确认浏览器打开页面后：
- Hero 正常渲染，统计数字显示 65/29/12
- 涂鸦线从顶蜿蜒到底
- 滚动时线描画 + 节点弹入
- 所有 7 个 phase 内容正确
- 专辑封面正常加载
- 点击专辑展开曲目列表
- 点击 ▶ 播放预览
- 移动端缩小后布局适配
- "Back" 链接回到主站

- [ ] **Step 5: 更新 index.html（已提前完成，确认即可）**

确认 `index.html` 中马思唯面板已有 `onclick="window.location.href='artist-masiwei.html'"` 和 `↗` 指示符。

- [ ] **Step 6: 最终 Commit**

```bash
git add artist-masiwei.html index.html
git commit -m "feat: responsive design and final polish for masiwei page"
```
