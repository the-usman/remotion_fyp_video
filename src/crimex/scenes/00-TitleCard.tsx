import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {COLORS, fontFamily} from '../constants';

export const TitleCard: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = spring({frame, fps, config: {damping: 14, stiffness: 120}});
	const clampedScale = interpolate(scale, [0, 1], [0.6, 1]);

	const opacity = interpolate(frame, [0, 15], [0, 1], {
		extrapolateRight: 'clamp',
	});
	const taglineY = interpolate(frame, [20, 45], [24, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const taglineOpacity = interpolate(frame, [20, 40], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const subOpacity = interpolate(frame, [50, 70], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const lineWidth = interpolate(frame, [30, 60], [0, 340], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
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
					gap: 0,
				}}
			>
				{/* Logo */}
				<div
					style={{
						transform: `scale(${clampedScale})`,
						opacity,
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontSize: 130,
							fontWeight: 800,
							letterSpacing: '-4px',
							lineHeight: 1,
						}}
					>
						<span style={{color: COLORS.white}}>CRIME</span>
						<span style={{color: COLORS.red}}>X</span>
					</div>
				</div>

				{/* Separator */}
				<div
					style={{
						width: lineWidth,
						height: 2,
						backgroundColor: COLORS.border,
						marginTop: 24,
						marginBottom: 24,
					}}
				/>

				{/* Tagline */}
				<div
					style={{
						transform: `translateY(${taglineY}px)`,
						opacity: taglineOpacity,
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontSize: 28,
							fontWeight: 400,
							color: COLORS.muted,
							letterSpacing: '0.5px',
						}}
					>
						Building Pakistan's First AI Crime Intelligence Pipeline
					</div>
				</div>

				{/* FYP label */}
				<div
					style={{
						marginTop: 28,
						opacity: subOpacity,
						display: 'flex',
						gap: 16,
						alignItems: 'center',
					}}
				>
					<span
						style={{
							padding: '6px 18px',
							borderRadius: 20,
							border: `1px solid ${COLORS.red}`,
							color: COLORS.red,
							fontSize: 16,
							fontWeight: 600,
							letterSpacing: '1px',
						}}
					>
						FYP 2024/25
					</span>
					<span
						style={{
							padding: '6px 18px',
							borderRadius: 20,
							border: `1px solid ${COLORS.border}`,
							color: COLORS.muted,
							fontSize: 16,
							fontWeight: 600,
						}}
					>
						Urdu · AI · Crime Research
					</span>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
