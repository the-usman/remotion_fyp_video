import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Background} from '../components/Background';
import {COLORS, fontFamily} from '../constants';

const CrossedItem: React.FC<{label: string; delay: number}> = ({label, delay}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame - delay, [0, 18], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div style={{display: 'flex', alignItems: 'center', gap: 12, opacity, fontFamily}}>
			<span style={{fontSize: 20, color: COLORS.red}}>✕</span>
			<span style={{fontSize: 22, color: COLORS.muted, textDecoration: 'line-through'}}>{label}</span>
		</div>
	);
};

export const WeatherNull: React.FC = () => {
	const frame = useCurrentFrame();

	const titleOpacity = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});
	const titleY = interpolate(frame, [0, 22], [30, 0], {
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const mainOpacity = interpolate(frame, [30, 55], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.34, 1.56, 0.64, 1),
	});
	const noteOpacity = interpolate(frame, [100, 130], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill>
			<Background />
			<AbsoluteFill
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					fontFamily,
					gap: 28,
					padding: '60px 140px',
				}}
			>
				<div style={{opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: 'center'}}>
					<div style={{fontSize: 15, color: COLORS.muted, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 8}}>
						Weather Correlation Analysis
					</div>
					<div style={{fontSize: 52, fontWeight: 800, color: COLORS.white, letterSpacing: '-1.5px'}}>
						A null result worth reporting
					</div>
				</div>

				{/* Weather vars */}
				<div style={{display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center'}}>
					<CrossedItem label="Temperature" delay={40} />
					<CrossedItem label="Humidity" delay={55} />
					<CrossedItem label="Rainfall" delay={70} />
					<CrossedItem label="Precipitation" delay={85} />
				</div>

				{/* Main statement */}
				<div
					style={{
						opacity: mainOpacity,
						textAlign: 'center',
						padding: '28px 44px',
						borderRadius: 16,
						border: `2px solid ${COLORS.border}`,
						backgroundColor: COLORS.surface,
					}}
				>
					<div
						style={{
							fontSize: 52,
							fontWeight: 800,
							color: COLORS.white,
							letterSpacing: '-1px',
						}}
					>
						No meaningful correlation.
					</div>
					<div style={{fontSize: 20, color: COLORS.muted, marginTop: 8}}>
						Tested across Lahore · Karachi · Faisalabad
					</div>
				</div>

				<div
					style={{
						opacity: noteOpacity,
						fontSize: 20,
						color: COLORS.muted,
						fontStyle: 'italic',
						textAlign: 'center',
					}}
				>
					Weather does not appear to be a reliable predictor of crime frequency in the Pakistani context.
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
