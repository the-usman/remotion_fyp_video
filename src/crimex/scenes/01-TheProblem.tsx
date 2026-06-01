import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Background} from '../components/Background';
import {COLORS, fontFamily} from '../constants';

const Bullet: React.FC<{text: string; icon: string; delay: number; accent?: string}> = ({
	text,
	icon,
	delay,
	accent,
}) => {
	const frame = useCurrentFrame();
	const f = frame - delay;
	const y = interpolate(f, [0, 22], [30, 0], {
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
				transform: `translateY(${y}px)`,
				opacity,
				display: 'flex',
				alignItems: 'flex-start',
				gap: 20,
				marginBottom: 28,
			}}
		>
			<div
				style={{
					width: 44,
					height: 44,
					borderRadius: 12,
					backgroundColor: accent ? `rgba(220,38,38,0.12)` : COLORS.surface,
					border: `1px solid ${accent ?? COLORS.border}`,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: 22,
					flexShrink: 0,
					marginTop: 2,
				}}
			>
				{icon}
			</div>
			<div
				style={{
					fontSize: 28,
					fontWeight: 600,
					color: accent ? COLORS.white : COLORS.muted,
					lineHeight: 1.4,
					fontFamily,
				}}
			>
				{text}
			</div>
		</div>
	);
};

export const TheProblem: React.FC = () => {
	const frame = useCurrentFrame();

	const headingY = interpolate(frame, [0, 22], [30, 0], {
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const headingOpacity = interpolate(frame, [0, 18], [0, 1], {
		extrapolateRight: 'clamp',
	});
	const closingOpacity = interpolate(frame, [190, 230], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const closingY = interpolate(frame, [190, 230], [20, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	return (
		<AbsoluteFill>
			<Background />
			<AbsoluteFill
				style={{
					padding: '80px 120px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					fontFamily,
				}}
			>
				{/* Heading */}
				<div
					style={{
						transform: `translateY(${headingY}px)`,
						opacity: headingOpacity,
						marginBottom: 52,
					}}
				>
					<div
						style={{
							fontSize: 16,
							fontWeight: 600,
							color: COLORS.red,
							letterSpacing: '3px',
							textTransform: 'uppercase',
							marginBottom: 14,
						}}
					>
						The Problem
					</div>
					<div
						style={{
							fontSize: 56,
							fontWeight: 800,
							color: COLORS.white,
							lineHeight: 1.1,
							letterSpacing: '-1.5px',
						}}
					>
						A wall nobody
						<br />
						wanted to break.
					</div>
				</div>

				{/* Bullets */}
				<Bullet
					icon="🔒"
					text="Police crime records locked away — not by malice, by bureaucracy"
					delay={40}
					accent={COLORS.red}
				/>
				<Bullet
					icon="📭"
					text="No public dataset for Pakistani crime researchers"
					delay={80}
				/>
				<Bullet
					icon="📉"
					text="Data-driven crime research — years behind comparable countries"
					delay={120}
				/>

				{/* Closing statement */}
				<div
					style={{
						transform: `translateY(${closingY}px)`,
						opacity: closingOpacity,
						marginTop: 20,
						padding: '24px 32px',
						borderRadius: 14,
						backgroundColor: 'rgba(220,38,38,0.08)',
						border: `1px solid rgba(220,38,38,0.25)`,
					}}
				>
					<div
						style={{
							fontSize: 30,
							fontWeight: 700,
							color: COLORS.white,
							lineHeight: 1.4,
						}}
					>
						We hit the same wall.{' '}
						<span style={{color: COLORS.red}}>
							Instead of stopping — we built a door through it.
						</span>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
