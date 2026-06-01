import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {COLORS, fontFamily} from '../constants';

const ModelCard: React.FC<{
	name: string;
	accuracy: string;
	records: string;
	color: string;
	delay: number;
	large?: boolean;
}> = ({name, accuracy, records, color, delay, large}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = spring({
		frame: frame - delay,
		fps,
		config: {damping: 14, stiffness: 100},
	});
	const clampedScale = interpolate(scale, [0, 1], [0.8, 1]);
	const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const counterVal = Math.round(
		interpolate(
			Math.max(0, frame - delay),
			[0, 150],
			[0, parseFloat(accuracy)],
			{extrapolateRight: 'clamp'},
		) * 10,
	) / 10;

	return (
		<div
			style={{
				fontFamily,
				padding: large ? '44px 52px' : '36px 44px',
				borderRadius: 20,
				backgroundColor: COLORS.surface,
				border: `2px solid ${color}`,
				transform: `scale(${clampedScale})`,
				opacity,
				flex: 1,
				boxShadow: `0 0 40px rgba(${color === COLORS.cyan ? '6,182,212' : '220,38,38'},0.1)`,
				borderTop: `4px solid ${color}`,
			}}
		>
			<div
				style={{
					fontSize: 16,
					fontWeight: 700,
					color,
					letterSpacing: '2px',
					textTransform: 'uppercase',
					marginBottom: 8,
				}}
			>
				{name}
			</div>
			<div
				style={{
					fontSize: large ? 88 : 72,
					fontWeight: 800,
					color,
					letterSpacing: '-3px',
					lineHeight: 1,
				}}
			>
				{counterVal.toFixed(1)}%
			</div>
			<div style={{fontSize: 18, color: COLORS.muted, marginTop: 12}}>
				Exact Match Accuracy
			</div>
			<div
				style={{
					marginTop: 16,
					padding: '8px 14px',
					borderRadius: 8,
					backgroundColor: COLORS.bg,
					display: 'inline-block',
					fontSize: 15,
					color: COLORS.muted,
					fontFamily: 'monospace',
				}}
			>
				{records}
			</div>
		</div>
	);
};

export const FineTuning: React.FC = () => {
	const frame = useCurrentFrame();

	const headingY = interpolate(frame, [0, 22], [30, 0], {
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const headingOpacity = interpolate(frame, [0, 18], [0, 1], {
		extrapolateRight: 'clamp',
	});
	const quoteOpacity = interpolate(frame, [200, 240], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill>
			<Background />
			<AbsoluteFill
				style={{
					padding: '60px 100px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					fontFamily,
					gap: 40,
				}}
			>
				{/* Heading */}
				<div style={{transform: `translateY(${headingY}px)`, opacity: headingOpacity}}>
					<div
						style={{
							fontSize: 15,
							fontWeight: 700,
							color: COLORS.gold,
							letterSpacing: '3px',
							textTransform: 'uppercase',
							marginBottom: 10,
						}}
					>
						Scaling Up — Fine-Tuning at 32K Records
					</div>
					<div
						style={{
							fontSize: 48,
							fontWeight: 800,
							color: COLORS.white,
							letterSpacing: '-1.5px',
							lineHeight: 1.1,
						}}
					>
						Generalist models on
						<br />
						domain-specific Urdu data
					</div>
				</div>

				{/* Model cards */}
				<div style={{display: 'flex', gap: 32}}>
					<ModelCard
						name="Llama 3.2"
						accuracy="89.0"
						records="Fine-tuned · 32K records"
						color={COLORS.gold}
						delay={40}
					/>
					<ModelCard
						name="Qwen 2.5-7B"
						accuracy="91.2"
						records="Best result · 32K records"
						color={COLORS.cyan}
						delay={80}
						large
					/>
				</div>

				{/* Quote */}
				<div
					style={{
						opacity: quoteOpacity,
						padding: '22px 28px',
						borderRadius: 14,
						borderLeft: `4px solid ${COLORS.cyan}`,
						backgroundColor: 'rgba(6,182,212,0.06)',
					}}
				>
					<div
						style={{
							fontSize: 26,
							fontStyle: 'italic',
							color: COLORS.white,
							lineHeight: 1.5,
						}}
					>
						"The model was never the limitation.{' '}
						<span style={{color: COLORS.cyan}}>The data was.</span>"
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
