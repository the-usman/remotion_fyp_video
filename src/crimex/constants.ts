import {loadFont} from '@remotion/google-fonts/Inter';

export const {fontFamily} = loadFont('normal', {
	weights: ['400', '600', '700', '800'],
	subsets: ['latin'],
});

export const FPS = 30;
export const s = (sec: number) => Math.round(sec * FPS);

export const COLORS = {
	bg: '#080b14',
	surface: '#0f1623',
	border: '#1e293b',
	red: '#dc2626',
	cyan: '#06b6d4',
	gold: '#f59e0b',
	green: '#22c55e',
	white: '#f8fafc',
	muted: '#64748b',
};

export const TRANSITION_FRAMES = 15;

export const SCENE_DURATIONS = {
	titleCard: s(5),
	theProblem: s(12),
	scraping: s(15),
	corpus: s(12),
	eda: s(12),
	llmsFail: s(15),
	roberta: s(15),
	combinedSystem: s(15),
	fineTuning: s(10),
	insights: s(8),
	weatherNull: s(6),
	featureEngineering: s(15),
	predictionTesting: s(15),
	resultsInUI: s(12),
	dashboard: s(20),
	outro: s(8),
};

const SCENE_COUNT = Object.keys(SCENE_DURATIONS).length;
export const TOTAL_FRAMES =
	Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0) -
	(SCENE_COUNT - 1) * TRANSITION_FRAMES;
