import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {VideoScene} from '../components/VideoScene';
import {COLORS, fontFamily} from '../constants';

const CATEGORIES = [
	{label: 'Murder', color: COLORS.red},
	{label: 'Robbery', color: COLORS.gold},
	{label: 'Terrorism', color: '#f97316'},
	{label: 'Kidnapping', color: COLORS.cyan},
	{label: 'Suicide', color: COLORS.muted},
	{label: 'Rape', color: '#a855f7'},
];

export const EDA: React.FC = () => {
	const frame = useCurrentFrame();

	return (
		<AbsoluteFill>
			<VideoScene
				src="videos/ead.webm"
				overlayTitle="Exploratory Data Analysis"
				overlaySubtitle="Understanding what the corpus actually contains"
				dimOpacity={0.52}
			/>

			{/* Category chips top-left */}
			<div
				style={{
					position: 'absolute',
					top: 60,
					left: 80,
					display: 'flex',
					gap: 12,
					flexWrap: 'wrap',
					maxWidth: 600,
					fontFamily,
				}}
			>
				{CATEGORIES.map((cat, i) => {
					const opacity = interpolate(frame, [i * 10, i * 10 + 20], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
						easing: Easing.out(Easing.quad),
					});
					const y = interpolate(frame, [i * 10, i * 10 + 20], [-12, 0], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});
					return (
						<span
							key={cat.label}
							style={{
								padding: '8px 20px',
								borderRadius: 20,
								backgroundColor: COLORS.surface,
								border: `1px solid ${cat.color}`,
								color: cat.color,
								fontSize: 18,
								fontWeight: 700,
								opacity,
								transform: `translateY(${y}px)`,
							}}
						>
							{cat.label}
						</span>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};
