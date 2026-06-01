import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {StatCard} from '../components/StatCard';
import {COLORS, fontFamily} from '../constants';

export const Outro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const headingOpacity = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});
	const headingY = interpolate(frame, [0, 22], [30, 0], {
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	const closingScale = spring({frame: frame - 130, fps, config: {damping: 14, stiffness: 100}});
	const closingScaleClamped = interpolate(closingScale, [0, 1], [0.8, 1]);
	const closingOpacity = interpolate(frame, [130, 160], [0, 1], {
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
					gap: 36,
				}}
			>
				{/* Heading */}
				<div style={{opacity: headingOpacity, transform: `translateY(${headingY}px)`}}>
					<div
						style={{
							fontSize: 15,
							fontWeight: 700,
							color: COLORS.muted,
							letterSpacing: '3px',
							textTransform: 'uppercase',
							marginBottom: 10,
						}}
					>
						What This System Is
					</div>
					<div
						style={{
							fontSize: 52,
							fontWeight: 800,
							color: COLORS.white,
							letterSpacing: '-1.5px',
							lineHeight: 1.1,
						}}
					>
						A complete pipeline —
						<br />
						<span style={{color: COLORS.red}}>raw Urdu news</span> to{' '}
						<span style={{color: COLORS.cyan}}>structured intelligence</span>
					</div>
				</div>

				{/* Stat cards grid */}
				<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
					<StatCard
						value="200K+"
						label="Urdu crime articles scraped from 6 sources"
						color={COLORS.gold}
						delay={30}
					/>
					<StatCard
						value="32K"
						label="Manually verified labeled records"
						color={COLORS.cyan}
						delay={50}
					/>
					<StatCard
						value="91.2%"
						label="Classification accuracy — Qwen 2.5-7B fine-tuned"
						color={COLORS.green}
						delay={70}
					/>
					<StatCard
						value="MAE 3.9"
						label="ARIMA — best forecast · Lahore · Karachi · Faisalabad"
						color={COLORS.red}
						delay={90}
					/>
				</div>

				{/* Closing line */}
				<div
					style={{
						textAlign: 'center',
						opacity: closingOpacity,
						transform: `scale(${closingScaleClamped})`,
					}}
				>
					<div
						style={{
							fontSize: 52,
							fontWeight: 800,
							color: COLORS.white,
							letterSpacing: '-1.5px',
						}}
					>
						The door is{' '}
						<span style={{color: COLORS.red}}>open.</span>
					</div>
					<div
						style={{
							fontSize: 20,
							color: COLORS.muted,
							marginTop: 12,
							letterSpacing: '1px',
						}}
					>
						CrimeX · FYP 2024/25
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
