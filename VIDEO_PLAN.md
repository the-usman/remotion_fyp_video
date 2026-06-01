# CrimeX — Remotion Video Implementation Plan

## Overview

**Title:** CrimeX: Building Pakistan's First AI Crime Intelligence Pipeline  
**Format:** 1920×1080 (16:9), 30 fps  
**Estimated duration:** ~3–4 minutes (auto-calculated from asset durations)  
**Style:** Dark cinematic — deep navy/black background, crimson red accent for "Crime", cyan for AI/data  

---

## Asset Inventory

| File | Story Section |
|------|--------------|
| `scraper.webm` | Building the Corpus — web scraping pipeline |
| `data.webm` | Building the Corpus — 200K row dataset |
| `ead.webm` | EDA — exploring the corpus |
| `classification labeling.webm` | The Classification Problem — labeling pipeline |
| `single label training.webm` | RoBERTa single-label classifier training |
| `multi label training.webm` | Combined two-stage system training |
| `feature engineering for predictions.webm` | Forecasting feature engineering notebook |
| `predcition testing.webm` | Chronos model walk-forward evaluation |
| `prediction results in ui.webm` | Forecast results in the dashboard |
| `dashboard demo.webm` | Full live dashboard walkthrough |

---

## Scene Structure

| # | Scene Name | Duration | Assets Used | Key Content |
|---|-----------|----------|-------------|-------------|
| 0 | **Title Card** | 5 s | — | "CrimeX" animated title, tagline |
| 1 | **The Problem** | 12 s | — | Text callout: locked records, data gap in Pakistan |
| 2 | **Scraping the Web** | 15 s | `scraper.webm` | Pipeline overview, "6 Urdu news sources" |
| 3 | **The 200K Corpus** | 12 s | `data.webm` | Stat counter to 200,000; only 25% usable |
| 4 | **EDA Deep Dive** | 12 s | `ead.webm` | Exploring what the data actually contains |
| 5 | **LLMs Fail at Urdu** | 15 s | `classification labeling.webm` | Accuracy bars: Llama 25.9%, Qwen 44%, Grok 65% |
| 6 | **RoBERTa Breakthrough** | 15 s | `single label training.webm` | Accuracy climb: 72% → 78% → 80.7% → plateau |
| 7 | **The Lever: Combined System** | 15 s | `multi label training.webm` | 2-stage architecture, 88% accuracy |
| 8 | **Fine-Tuning at Scale** | 10 s | — | Animated: Llama 89%, Qwen 91.2% on 32K records |
| 9 | **Insights Extraction** | 8 s | — | Perplexity 99% — "knowing when not to build" |
| 10 | **Weather: Null Result** | 6 s | — | "No meaningful correlation" — honest science |
| 11 | **Feature Engineering** | 15 s | `feature engineering for predictions.webm` | Chronos notebook, rolling features |
| 12 | **Prediction Testing** | 15 s | `predcition testing.webm` | Walk-forward evaluation vs MA-4 baseline |
| 13 | **Results in UI** | 12 s | `prediction results in ui.webm` | Forecast display in dashboard |
| 14 | **Dashboard Demo** | 20 s | `dashboard demo.webm` | Full live system walkthrough |
| 15 | **Outro** | 8 s | — | Final stats, "The door is open" |

**Total:** ~195 s (~5850 frames at 30 fps)

---

## Color Palette & Typography

```
Background:  #080b14   (deep dark navy)
Surface:     #0f1623   (card background)
Accent Red:  #dc2626   (crime, danger)
Accent Cyan: #06b6d4   (AI, data, tech)
Accent Gold: #f59e0b   (accuracy numbers, highlights)
Text White:  #f8fafc
Text Muted:  #64748b
```

**Font:** Load `Inter` from Google Fonts (via `@remotion/google-fonts`).  
**Heading weight:** 800 | **Body weight:** 400 | **Label weight:** 600

---

## File Structure

```
src/
  crimex/
    CrimeXVideo.tsx          ← root composition
    scenes/
      00-TitleCard.tsx
      01-TheProblem.tsx
      02-Scraping.tsx
      03-Corpus.tsx
      04-EDA.tsx
      05-LLMsFail.tsx
      06-RoBERTa.tsx
      07-CombinedSystem.tsx
      08-FineTuning.tsx
      09-Insights.tsx
      10-WeatherNull.tsx
      11-FeatureEngineering.tsx
      12-PredictionTesting.tsx
      13-ResultsInUI.tsx
      14-Dashboard.tsx
      15-Outro.tsx
    components/
      Background.tsx          ← animated gradient background
      SectionTitle.tsx        ← reusable scene header
      VideoScene.tsx          ← wraps a webm with overlay text
      StatCounter.tsx         ← animated counting number
      AccuracyBar.tsx         ← horizontal progress bar with label
      AccuracyChart.tsx       ← multi-model comparison bars
      TwoStageArch.tsx        ← animated pipeline diagram
      StatCard.tsx            ← key metric card
      CinematicText.tsx       ← word-by-word reveal text
    constants.ts              ← scene timings, colors, fonts
public/
  videos/                     ← copy all 10 .webm files here
```

---

## Step-by-Step Implementation

### Step 1 — Install Dependencies

```bash
npm install @remotion/media @remotion/google-fonts
```

`@remotion/media` provides `<Video>` and `<Audio>` components.  
`@remotion/google-fonts` loads Inter without manual font files.

---

### Step 2 — Copy Assets to `public/`

Create `public/videos/` and copy all 10 `.webm` files from `assets/` into it:

```
public/videos/scraper.webm
public/videos/data.webm
public/videos/ead.webm
public/videos/classification labeling.webm
public/videos/single label training.webm
public/videos/multi label training.webm
public/videos/feature engineering for predictions.webm
public/videos/predcition testing.webm
public/videos/prediction results in ui.webm
public/videos/dashboard demo.webm
```

Reference them in code with `staticFile("videos/scraper.webm")`.

---

### Step 3 — Define Constants (`src/crimex/constants.ts`)

Define scene durations in frames (at 30 fps), colors, and font settings in one place so every component imports from a single source of truth.

```ts
export const FPS = 30;
export const s = (seconds: number) => seconds * FPS;  // helper

// Scene durations in frames
export const SCENE_DURATIONS = {
  titleCard:          s(5),
  theProblem:         s(12),
  scraping:           s(15),
  corpus:             s(12),
  eda:                s(12),
  llmsFail:           s(15),
  roberta:            s(15),
  combinedSystem:     s(15),
  fineTuning:         s(10),
  insights:           s(8),
  weatherNull:        s(6),
  featureEngineering: s(15),
  predictionTesting:  s(15),
  resultsInUI:        s(12),
  dashboard:          s(20),
  outro:              s(8),
};

export const TOTAL_FRAMES = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

export const COLORS = {
  bg:        '#080b14',
  surface:   '#0f1623',
  red:       '#dc2626',
  cyan:      '#06b6d4',
  gold:      '#f59e0b',
  white:     '#f8fafc',
  muted:     '#64748b',
};
```

---

### Step 4 — Build Shared Components

#### `Background.tsx`
Animated radial gradient that slowly pulses. Uses `interpolate` on `useCurrentFrame()` to breathe opacity between 0.6–1.0 over 120 frames with `extrapolateRight: "clamp"`.

#### `SectionTitle.tsx`
Props: `title: string`, `subtitle?: string`, `accentColor?: string`  
Slides up from y=30 to y=0 with `spring()` from remotion, fades in over first 20 frames.

#### `CinematicText.tsx`
Props: `words: string[]`, `delayPerWord: number`  
Renders each word in its own `<Sequence>` offset by `delayPerWord` frames, each with a short fade-in.

#### `StatCounter.tsx`
Props: `from: number`, `to: number`, `suffix?: string`, `color?: string`  
Uses `interpolate(frame, [0, durationInFrames * 0.7], [from, to])` and `Math.round()` to animate a number counting up.

#### `AccuracyBar.tsx`
Props: `label: string`, `value: number`, `color: string`, `delayFrames: number`  
A horizontal bar that grows from 0% to `value`% width using `interpolate`, with the percentage number animating alongside it.

#### `AccuracyChart.tsx`
Renders a column of `AccuracyBar` components, each delayed by `index * 8` frames for a staggered entry effect.

#### `VideoScene.tsx`
Props: `src: string`, `overlayTitle: string`, `overlayText?: string`  
Uses `<Video>` from `@remotion/media` with `staticFile()`. Adds a semi-transparent dark overlay on top, then renders `overlayTitle` and `overlayText` with slide-in animation. The video plays at full width/height (object-fit: cover).

#### `TwoStageArch.tsx`
An SVG/div-based pipeline diagram for the combined classifier:
- Box 1: "Binary Filter — Is this a crime?" (appears at frame 10)
- Arrow → (appears at frame 25)
- Box 2: "Category Classifier — murder / robbery / rape / suicide / kidnapping / terrorism" (appears at frame 40)
- Result badge "88% Accuracy" (appears at frame 60)

---

### Step 5 — Build Each Scene Component

#### Scene 00 — `TitleCard.tsx`
- Full dark background
- "CRIME**X**" where "CRIME" is white and "X" is `#dc2626` (red), scale springs in from 0.7→1.0
- Tagline: "Building Pakistan's First AI Crime Intelligence Pipeline" fades in at frame 30
- Small label: "Final Year Project — 2024/25" at frame 60, muted color

#### Scene 01 — `TheProblem.tsx`
- Background with a faint map silhouette of Pakistan (or just gradient)
- Three bullet points appearing sequentially:
  - "Police crime records — locked away" (frame 0)
  - "No public dataset for researchers" (frame 20)
  - "Data-driven crime research — years behind" (frame 40)
- Impact callout: "We decided to build a door through it." — bold, centered, frame 70

#### Scene 02 — `Scraping.tsx`
- Uses `<VideoScene src={staticFile("videos/scraper.webm")} overlayTitle="Building the Corpus" overlayText="Scraping 6 major Urdu news sources" />`
- Bottom ticker: "Geo News · ARY News · Dawn Urdu · Express News · Jang · Nawaiwaqt" scrolling left

#### Scene 03 — `Corpus.tsx`
- Uses `<VideoScene src={staticFile("videos/data.webm")} overlayTitle="200,000 Rows" />`
- `<StatCounter from={0} to={200000} suffix=" articles" />` animates in
- Warning callout at frame 60: "Only 25% is usable — the rest is noise" in `#f59e0b`

#### Scene 04 — `EDA.tsx`
- `<VideoScene src={staticFile("videos/ead.webm")} overlayTitle="Exploratory Data Analysis" overlayText="Understanding what the corpus actually contains" />`

#### Scene 05 — `LLMsFail.tsx`
- Uses `<VideoScene src={staticFile("videos/classification labeling.webm")} overlayTitle="The Classification Problem" />`
- `<AccuracyChart>` with 5 models staggered in:
  - Llama 3.2 3B — 25.9% (red)
  - Qwen 2.5 — 44% (amber)
  - Gemini 2.5 — 44% (amber)
  - Grok 4.1 Fast — 65% (yellow)
  - Human baseline — 100% (green)
- Label at bottom: "Zero-shot on Urdu crime classification"

#### Scene 06 — `RoBERTa.tsx`
- `<VideoScene src={staticFile("videos/single label training.webm")} overlayTitle="RoBERTa-Urdu-Small" />`
- Accuracy progression cards appearing one by one:
  - "2,000 samples → 72%" (frame 10)
  - "4,000 samples → 78%" (frame 25)
  - "8,000 samples → 80.7%" (frame 40)
  - "9,700 samples → +0.5% only" (frame 55) — muted, "plateau"
- Plateau label: "The data ceiling" in red

#### Scene 07 — `CombinedSystem.tsx`
- `<VideoScene src={staticFile("videos/multi label training.webm")} overlayTitle="The Combined System" />`
- `<TwoStageArch />` diagram animates in at frame 20
- Final accuracy badge: "88% Exact Match" with a glow effect (`box-shadow`) pulsing via interpolate

#### Scene 08 — `FineTuning.tsx`
- No demo video — pure animated stats scene
- Background: animated particle-like dots (simple divs with random positions animated)
- Two large stat cards side by side:
  - Left: "Llama 3.2" — counter animates to 89.0%
  - Right: "Qwen 2.5-7B" — counter animates to 91.2% (highlighted, larger, cyan glow)
- Subtitle: "Fine-tuned on 32,000 verified Urdu crime records"
- Quote: "The model was never the limitation. The data was." — appears at frame 70, italic

#### Scene 09 — `Insights.tsx`
- Clean text scene — no video (or use `ead.webm` as muted background)
- Title: "Insights Extraction"
- `<StatCounter to={99} suffix="%" />` — Perplexity accuracy
- Quote: "We did not train our own extraction model. This is not a compromise — it is engineering judgment."

#### Scene 10 — `WeatherNull.tsx`
- Minimalist scene: raindrop icon, temperature icon crossing out
- Bold statement: "No meaningful correlation." centered
- Subtitle: "Temperature, humidity, rainfall — tested across 3 districts"
- Small footnote: "A null result worth reporting."

#### Scene 11 — `FeatureEngineering.tsx`
- `<VideoScene src={staticFile("videos/feature engineering for predictions.webm")} overlayTitle="Forecasting Architecture" overlayText="Weekly crime counts · Weather · Ramadan flags · Lag features" />`

#### Scene 12 — `PredictionTesting.tsx`
- `<VideoScene src={staticFile("videos/predcition testing.webm")} overlayTitle="Chronos-2 Walk-Forward Evaluation" overlayText="Lahore · Karachi · Faisalabad" />`

#### Scene 13 — `ResultsInUI.tsx`
- `<VideoScene src={staticFile("videos/prediction results in ui.webm")} overlayTitle="District-Level Predictions" overlayText="Weekly crime forecasts in the live dashboard" />`

#### Scene 14 — `Dashboard.tsx`
- `<VideoScene src={staticFile("videos/dashboard demo.webm")} overlayTitle="CrimeX Dashboard" overlayText="FastAPI · Supabase · React" />`
- Minimal overlay so the dashboard itself is clearly visible

#### Scene 15 — `Outro.tsx`
- Summary stat cards in a 2×2 grid, each springing in with delay:
  - "200,000+ articles scraped"
  - "32,000 verified records"
  - "91.2% classification accuracy"
  - "3 cities forecast weekly"
- Closing line: "The door is open." — large, centered, red accent on "open"
- Subtitle: "CrimeX — FYP 2024/25"

---

### Step 6 — Assemble `CrimeXVideo.tsx`

Compose all scenes using `<Sequence from={...} durationInFrames={...}>` with cumulative `from` values derived from `SCENE_DURATIONS`.

```tsx
import { AbsoluteFill, Sequence } from "remotion";
import { SCENE_DURATIONS } from "./constants";
import { TitleCard } from "./scenes/00-TitleCard";
// ... import all 16 scenes

const getStart = (sceneIndex: number) => {
  const keys = Object.values(SCENE_DURATIONS);
  return keys.slice(0, sceneIndex).reduce((a, b) => a + b, 0);
};

export const CrimeXVideo = () => {
  const durations = Object.values(SCENE_DURATIONS);
  return (
    <AbsoluteFill style={{ background: "#080b14" }}>
      <Sequence from={getStart(0)}  durationInFrames={durations[0]}>  <TitleCard />          </Sequence>
      <Sequence from={getStart(1)}  durationInFrames={durations[1]}>  <TheProblem />         </Sequence>
      <Sequence from={getStart(2)}  durationInFrames={durations[2]}>  <Scraping />           </Sequence>
      {/* ... all 16 scenes */}
    </AbsoluteFill>
  );
};
```

---

### Step 7 — Register in `Root.tsx`

Add the `CrimeXVideo` composition alongside the existing ones:

```tsx
import { CrimeXVideo } from "./crimex/CrimeXVideo";
import { TOTAL_FRAMES, FPS } from "./crimex/constants";

<Composition
  id="CrimeX"
  component={CrimeXVideo}
  durationInFrames={TOTAL_FRAMES}
  fps={FPS}
  width={1920}
  height={1080}
/>
```

---

### Step 8 — Preview in Remotion Studio

```bash
npm run dev
```

Open `http://localhost:3000`, select **CrimeX** from the sidebar. Scrub through each scene, check timings, and adjust `SCENE_DURATIONS` in `constants.ts` as needed.

---

### Step 9 — Render

```bash
npx remotion render CrimeX out/crimex.mp4
```

For a faster preview render (lower quality):
```bash
npx remotion render CrimeX out/crimex-preview.mp4 --scale=0.5
```

---

## Animation Techniques Reference

| Effect | Technique |
|--------|-----------|
| Fade in | `interpolate(frame, [0, 20], [0, 1], {extrapolateRight:'clamp'})` on `opacity` |
| Slide up | `interpolate(frame, [0, 20], [30, 0], {extrapolateRight:'clamp'})` on `translateY` |
| Spring scale | `spring({frame, fps, config:{damping:14}})` → scale from 0 to 1 |
| Count up | `Math.round(interpolate(frame, [0, duration*0.7], [0, target]))` |
| Bar grow | `interpolate(frame, [delay, delay+30], [0, value])` on width percentage |
| Stagger | Each child delays by `index * 8` frames using `from` in `<Sequence>` |
| Video overlay | `<Video>` full bleed + semi-transparent `<AbsoluteFill style={{background:'rgba(8,11,20,0.55)'}}` on top |

---

## Key Rules (from Remotion Best Practices)

- **No CSS transitions or animations** — all animation must go through `useCurrentFrame()` + `interpolate()`
- **No Tailwind animation classes** — styling with Tailwind classes is fine, animations are not
- All assets in `public/` and referenced with `staticFile()`
- `<Video>` component from `@remotion/media`, not native `<video>`
- Scene order controlled by `<Sequence from={...}>`, not CSS z-index tricks

---

## Implementation Order

1. `[ ]` Install `@remotion/media` and `@remotion/google-fonts`
2. `[ ]` Copy all `.webm` files to `public/videos/`
3. `[ ]` Create `src/crimex/constants.ts`
4. `[ ]` Build `Background.tsx`, `SectionTitle.tsx`, `CinematicText.tsx`
5. `[ ]` Build `StatCounter.tsx`, `AccuracyBar.tsx`, `AccuracyChart.tsx`
6. `[ ]` Build `VideoScene.tsx` — test with one webm
7. `[ ]` Build `TwoStageArch.tsx` and `StatCard.tsx`
8. `[ ]` Build scenes 00–07 (title through combined system)
9. `[ ]` Build scenes 08–15 (fine-tuning through outro)
10. `[ ]` Assemble `CrimeXVideo.tsx`
11. `[ ]` Register in `Root.tsx`
12. `[ ]` Preview in Remotion Studio, adjust timings
13. `[ ]` Final render to `out/crimex.mp4`
