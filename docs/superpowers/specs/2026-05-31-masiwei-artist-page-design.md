# 马思唯独立页面 — 设计规格

## 概述

为马思唯（MaSiWei）制作独立的传记型展示页面，以 **杂志风格 × 涂鸦时间线** 为核心视觉语言，按时间线线性展示他的职业生涯。属于主站 `index.html#music` 的外延页面，风格 hip-hop 潮流。

## 核心视觉语言

- **杂志风格**：类似《The FADER》《XXL》《Complex》的嘻哈艺人专题排版
- **涂鸦时间线**：一条蜿蜒的 SVG 喷漆线贯穿全页，连接各个生涯阶段
- **粗犷张扬**：Impact/Bebas Neue 粗体大字，金色/橙色渐变，暗黑奢华感

## 页面结构

### 1. Top Nav（固定）
- 左侧 "← BACK" → `index.html#music`
- 右侧 "MA$IWEI" 标识
- 半透明玻璃态背景，始终可见

### 2. Hero 满屏
- 深黑底 + noise texture + 暖橙径向光晕
- 背景水印大字「马思唯」斜切底纹
- 艺人头像（圆形 + 金色双边框）
- 标题 **MA$IWEI**（Impact/Bebas Neue，clamp(72px,14vw,160px)，金色渐变，字距压缩）
- 副标题「马思唯」小字、uppercase、宽字距
- 信息行：📍成都·郫都区 · 🎂 1993.01.27 · 🎤 Higher Brothers
- 统计数字：65 TRACKS · 29 ALBUMS · 12 YEARS
- 底部 scroll 提示 + 涂鸦线滴落起点

### 3. 时间线主体（7 个 Phase）
**布局机制：** 中央涂鸦线贯穿，phase 左右交替排版

| Phase | 年份 | 标题 | 色调 |
|-------|------|------|------|
| 01 | 1993-2013 | 郫县少年 | #8B6F47 大地棕 |
| 02 | 2014-2015 | 横空出世 | #D97706 橙 |
| 03 | 2015-2016 | Beef·战火 | #B91C1C 战红 |
| 04 | 2016-2019 | Higher Brothers 走向世界 | #F59E0B 金 |
| 05 | 2020 | 黑马王子 | #EA580C 橙红 |
| 06 | 2021-2023 | 高产期 | #0EA5E9 蓝 |
| 07 | 2024-至今 | 乐透人生 | #7C3AED 紫 |

**每阶段内容：**
- 超大节点编号（01-07）+ 标题 + 英文副标题
- 正文段落（Outfit 300，max-width 560px）
- 事件卡片（Beef 阶段用，红色边框强调）
- 专辑封面网格（clamp(120px,15vw,160px) inline grid）
- 专辑曲目展开（手风琴效果）
- 曲目播放预览（NetEase 音频 · 底部固定 bar）

### 4. Footer
- ← Back to Main 链接
- MA$IWEI 水印大字

### 5. 音频播放栏（浮动固定底部）
- 当前曲目信息：封面小图 + 歌名
- 关闭按钮
- 播放状态同步

## 涂鸦线设计

- SVG 蜿蜒路径（多段贝塞尔曲线左右交错）
- 3 层叠加制造喷漆质感（粗/中/细 + feTurbulence filter + x 偏移）
- 描边颜色从棕→橙→红→金→橙红→蓝→紫渐变（匹配 phase 色调）
- 每阶段节点：dot（20px）+ glow 光晕 + drip 滴落
- 滚动时描边动画（stroke-dashoffset 实时更新）
- 加载时 2s 描画入场

## 响应式

- 桌面 ≥ 769px：涂鸦线居中，左右交替排版
- 移动端 ≤ 768px：涂鸦线移至左侧，内容全部右对齐
- prefers-reduced-motion：禁用所有动画

## 数据来源

- `music_data.js` 全局变量 `MUSIC_DATA`
- 按「马思唯」过滤曲目，按 album 分组
- 音频预览：`https://music.163.com/song/media/outer/url?id={id}.mp3`

## 文件

- `artist-masiwei.html` — 独立单文件页面
- `index.html` — 主站增加马思唯面板 ↗ 跳转链接
