import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {VideoScene} from '../components/VideoScene';
import {COLORS, fontFamily} from '../constants';

const FEATURES = [
	{label: 'Weekly crime counts', color: COLORS.cyan},
	{label: 'Weather variables', color: COLORS.gold},
	{label: 'Ramadan / Muharram flags', color: '#a855f7'},
	{label: 'Inflation rates', color: COLORS.gold},
	{label: 'Lag features (1–4 weeks)', color: COLORS.cyan},
	{label: 'Rolling means (4, 8, 12 weeks)', color: '#84cc16'},
];

export const FeatureEngineering: React.FC = () => {
	const frame = useCurrentFrame();

	const panelOpacity = interpolate(frame, [15, 35], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});

	return (
		<AbsoluteFill>
			<VideoScene
				src="videos/feature-engineering.webm"
				overlayTitle="Forecasting Architecture"
				overlaySubtitle="ARIMA · Chronos-2 · District-level · Weekly predictions"
				dimOpacity={0.68}
			/>

			{/* Feature list */}
			<div
				style={{
					position: 'absolute',
					top: 60,
					right: 80,
					width: 480,
					padding: '28px 32px',
					borderRadius: 16,
					backgroundColor: 'rgba(15,22,35,0.92)',
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
						marginBottom: 20,
					}}
				>
					Engineered Features
				</div>
				{FEATURES.map((f, i) => {
					const itemOpacity = interpolate(frame, [30 + i * 10, 50 + i * 10], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});
					const itemX = interpolate(frame, [30 + i * 10, 50 + i * 10], [-16, 0], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});
					return (
						<div
							key={f.label}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 12,
								marginBottom: 14,
								opacity: itemOpacity,
								transform: `translateX(${itemX}px)`,
							}}
						>
							<div
								style={{
									width: 8,
									height: 8,
									borderRadius: '50%',
									backgroundColor: f.color,
									flexShrink: 0,
								}}
							/>
							<span style={{fontSize: 19, color: COLORS.white, fontWeight: 500}}>
								{f.label}
							</span>
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};
