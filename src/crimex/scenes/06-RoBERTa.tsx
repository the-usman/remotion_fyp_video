import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {VideoScene} from '../components/VideoScene';
import {COLORS, fontFamily} from '../constants';

const Milestone: React.FC<{
	samples: string;
	accuracy: string;
	note?: string;
	delay: number;
	isPlateauMark?: boolean;
}> = ({samples, accuracy, note, delay, isPlateauMark}) => {
	const frame = useCurrentFrame();
	const f = frame - delay;

	const x = interpolate(f, [0, 22], [-30, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const opacity = interpolate(f, [0, 18], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				fontFamily,
				display: 'flex',
				alignItems: 'center',
				gap: 16,
				marginBottom: 18,
				transform: `translateX(${x}px)`,
				opacity,
			}}
		>
			<div
				style={{
					width: 10,
					height: 10,
					borderRadius: '50%',
					backgroundColor: isPlateauMark ? COLORS.muted : COLORS.cyan,
					flexShrink: 0,
				}}
			/>
			<div
				style={{
					fontSize: 20,
					color: COLORS.muted,
					fontWeight: 600,
					width: 200,
				}}
			>
				{samples} samples
			</div>
			<div
				style={{
					fontSize: 28,
					fontWeight: 800,
					color: isPlateauMark ? COLORS.muted : COLORS.white,
					letterSpacing: '-0.5px',
				}}
			>
				→ {accuracy}
			</div>
			{note && (
				<div
					style={{
						fontSize: 15,
						color: isPlateauMark ? COLORS.red : COLORS.muted,
						fontStyle: 'italic',
					}}
				>
					{note}
				</div>
			)}
		</div>
	);
};

export const RoBERTa: React.FC = () => {
	const frame = useCurrentFrame();

	const panelOpacity = interpolate(frame, [10, 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const modelBadgeOpacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill>
			<VideoScene
				src="videos/single-label-training.webm"
				overlayTitle="RoBERTa-Urdu-Small"
				overlaySubtitle="Built specifically for Urdu — F1 of 96% on benchmarks"
				dimOpacity={0.68}
			/>

			{/* Model badge top-left */}
			<div
				style={{
					position: 'absolute',
					top: 60,
					left: 80,
					fontFamily,
					opacity: modelBadgeOpacity,
				}}
			>
				<div
					style={{
						padding: '10px 22px',
						borderRadius: 10,
						backgroundColor: 'rgba(6,182,212,0.1)',
						border: `1px solid ${COLORS.cyan}`,
						fontSize: 18,
						fontWeight: 700,
						color: COLORS.cyan,
						fontFamily: 'monospace',
					}}
				>
					roberta-urdu-small
				</div>
			</div>

			{/* Milestones panel */}
			<div
				style={{
					position: 'absolute',
					top: 130,
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
				<div
					style={{
						fontSize: 14,
						fontWeight: 700,
						color: COLORS.muted,
						letterSpacing: '2px',
						textTransform: 'uppercase',
						marginBottom: 24,
					}}
				>
					Accuracy vs. Training Data
				</div>

				<Milestone samples="2,000" accuracy="72%" delay={30} />
				<Milestone samples="4,000" accuracy="78%" delay={60} />
				<Milestone samples="8,000" accuracy="80.7%" delay={90} />
				<Milestone
					samples="9,700"
					accuracy="+0.5% only"
					note="data ceiling"
					delay={130}
					isPlateauMark
				/>

				<div
					style={{
						marginTop: 20,
						padding: '14px 18px',
						borderRadius: 10,
						backgroundColor: 'rgba(220,38,38,0.08)',
						border: `1px solid rgba(220,38,38,0.2)`,
						opacity: interpolate(frame, [180, 210], [0, 1], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					<div style={{fontSize: 16, color: COLORS.red, fontWeight: 600}}>
						Manual annotation is brutal work — we needed a different lever.
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
