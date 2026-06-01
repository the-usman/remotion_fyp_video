import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {AccuracyChart} from '../components/AccuracyChart';
import {VideoScene} from '../components/VideoScene';
import {COLORS, fontFamily} from '../constants';

const MODELS = [
	{label: 'Llama 3.2 3B (zero-shot)', value: 25.9, color: COLORS.red},
	{label: 'Qwen 2.5 (zero-shot)', value: 44, color: '#f97316'},
	{label: 'Gemini 2.5 (zero-shot)', value: 44, color: COLORS.gold},
	{label: 'Grok 4.1 Fast (zero-shot)', value: 65, color: '#eab308'},
	{label: 'Qwen 2.5 (few-shot)', value: 77, color: '#84cc16'},
];

export const LLMsFail: React.FC = () => {
	const frame = useCurrentFrame();

	const panelOpacity = interpolate(frame, [10, 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});
	const warningOpacity = interpolate(frame, [260, 290], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill>
			<VideoScene
				src="videos/classification-labeling.webm"
				overlayTitle="The Classification Problem"
				overlaySubtitle="Urdu crime categories — harder than it looks"
				dimOpacity={0.72}
			/>

			{/* Accuracy chart panel */}
			<div
				style={{
					position: 'absolute',
					top: 60,
					right: 80,
					width: 560,
					padding: '28px 32px',
					borderRadius: 16,
					backgroundColor: 'rgba(15,22,35,0.9)',
					border: `1px solid ${COLORS.border}`,
					fontFamily,
					opacity: panelOpacity,
				}}
			>
				<AccuracyChart
					title="Model Accuracy — Exact Match"
					models={MODELS}
					startDelay={20}
				/>

				<div
					style={{
						marginTop: 20,
						opacity: warningOpacity,
						padding: '14px 18px',
						borderRadius: 10,
						backgroundColor: 'rgba(220,38,38,0.1)',
						border: `1px solid rgba(220,38,38,0.25)`,
					}}
				>
					<div style={{fontSize: 16, color: COLORS.red, fontWeight: 600}}>
						Not reliable enough for a production pipeline
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
