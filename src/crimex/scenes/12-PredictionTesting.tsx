import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {VideoScene} from '../components/VideoScene';
import {COLORS, fontFamily} from '../constants';

// Lower MAE = better. Bars are drawn as (1 - normalised_mae) so the best model gets the longest bar.
// Normalise against the worst value shown so bars fill meaningfully.
const MODELS = [
	{name: 'ARIMA', mae: 3.9, color: COLORS.green, winner: true},
	{name: 'Chronos-2', mae: null, color: COLORS.cyan, winner: false},
	{name: 'MA-4 Baseline', mae: null, color: COLORS.muted, winner: false},
];

// Visual bar widths: ARIMA 90%, Chronos ~60%, MA-4 ~40%
const BAR_WIDTHS = [0.9, 0.6, 0.4];

const ModelRow: React.FC<{
	name: string;
	mae: number | null;
	color: string;
	winner: boolean;
	barWidth: number;
	delay: number;
}> = ({name, mae, color, winner, barWidth, delay}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		frame: frame - delay,
		fps,
		config: {damping: 18, stiffness: 80},
	});
	const clampedProgress = Math.min(1, Math.max(0, progress));

	const rowOpacity = interpolate(frame - delay, [0, 15], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				fontFamily,
				marginBottom: winner ? 28 : 20,
				opacity: rowOpacity,
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: 8,
				}}
			>
				<div style={{display: 'flex', alignItems: 'center', gap: 10}}>
					<span
						style={{
							fontSize: winner ? 24 : 20,
							fontWeight: winner ? 800 : 600,
							color: winner ? COLORS.white : COLORS.muted,
						}}
					>
						{name}
					</span>
					{winner && (
						<span
							style={{
								padding: '3px 12px',
								borderRadius: 20,
								backgroundColor: 'rgba(34,197,94,0.15)',
								border: `1px solid ${COLORS.green}`,
								color: COLORS.green,
								fontSize: 13,
								fontWeight: 700,
								letterSpacing: '1px',
							}}
						>
							BEST RESULT
						</span>
					)}
				</div>
				<span
					style={{
						fontSize: winner ? 28 : 20,
						fontWeight: winner ? 800 : 600,
						color,
						letterSpacing: '-0.5px',
					}}
				>
					{mae !== null ? `MAE ${mae.toFixed(1)}` : '—'}
				</span>
			</div>

			<div
				style={{
					height: winner ? 20 : 14,
					backgroundColor: COLORS.border,
					borderRadius: 10,
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						height: '100%',
						width: `${barWidth * clampedProgress * 100}%`,
						backgroundColor: color,
						borderRadius: 10,
						transition: 'none',
					}}
				/>
			</div>

			{winner && (
				<div
					style={{
						fontSize: 14,
						color: COLORS.muted,
						marginTop: 6,
						fontStyle: 'italic',
					}}
				>
					Lower MAE = better forecast accuracy
				</div>
			)}
		</div>
	);
};

export const PredictionTesting: React.FC = () => {
	const frame = useCurrentFrame();

	const panelOpacity = interpolate(frame, [15, 35], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});

	const maeBadgeScale = interpolate(frame, [80, 105], [0.7, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.34, 1.56, 0.64, 1),
	});
	const maeBadgeOpacity = interpolate(frame, [80, 100], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const citiesOpacity = interpolate(frame, [200, 230], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill>
			<VideoScene
				src="videos/prediction-testing.webm"
				overlayTitle="Walk-Forward Evaluation"
				overlaySubtitle="Predict one week at a time — extend with true values"
				dimOpacity={0.68}
			/>

			{/* Comparison panel */}
			<div
				style={{
					position: 'absolute',
					top: 60,
					left: 80,
					width: 560,
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
						marginBottom: 24,
					}}
				>
					Model Comparison — MAE (lower is better)
				</div>

				{MODELS.map((m, i) => (
					<ModelRow
						key={m.name}
						name={m.name}
						mae={m.mae}
						color={m.color}
						winner={m.winner}
						barWidth={BAR_WIDTHS[i]}
						delay={20 + i * 18}
					/>
				))}

				{/* Cities */}
				<div
					style={{
						marginTop: 20,
						display: 'flex',
						gap: 10,
						opacity: citiesOpacity,
					}}
				>
					{['Lahore', 'Karachi', 'Faisalabad'].map((city) => (
						<span
							key={city}
							style={{
								padding: '6px 16px',
								borderRadius: 20,
								backgroundColor: COLORS.bg,
								border: `1px solid ${COLORS.cyan}`,
								color: COLORS.cyan,
								fontSize: 16,
								fontWeight: 600,
							}}
						>
							{city}
						</span>
					))}
				</div>
			</div>

			{/* Hero MAE badge */}
			<div
				style={{
					position: 'absolute',
					top: 60,
					right: 80,
					textAlign: 'center',
					fontFamily,
					opacity: maeBadgeOpacity,
					transform: `scale(${maeBadgeScale})`,
					transformOrigin: 'top right',
				}}
			>
				<div
					style={{
						padding: '32px 44px',
						borderRadius: 20,
						backgroundColor: 'rgba(34,197,94,0.08)',
						border: `2px solid ${COLORS.green}`,
						boxShadow: `0 0 40px rgba(34,197,94,0.15)`,
					}}
				>
					<div style={{fontSize: 18, fontWeight: 700, color: COLORS.green, letterSpacing: '2px', marginBottom: 4}}>
						ARIMA — BEST
					</div>
					<div
						style={{
							fontSize: 90,
							fontWeight: 800,
							color: COLORS.green,
							letterSpacing: '-4px',
							lineHeight: 1,
						}}
					>
						3.9
					</div>
					<div style={{fontSize: 22, color: COLORS.muted, marginTop: 6}}>
						Mean Absolute Error
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
