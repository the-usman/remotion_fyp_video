import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, fontFamily} from '../constants';

const Box: React.FC<{
	title: string;
	subtitle: string;
	color: string;
	opacity: number;
	scale: number;
}> = ({title, subtitle, color, opacity, scale}) => (
	<div
		style={{
			fontFamily,
			padding: '28px 32px',
			borderRadius: 14,
			backgroundColor: COLORS.surface,
			border: `2px solid ${color}`,
			minWidth: 280,
			opacity,
			transform: `scale(${scale})`,
			textAlign: 'center',
			boxShadow: `0 0 24px rgba(${color === COLORS.cyan ? '6,182,212' : '220,38,38'},0.15)`,
		}}
	>
		<div style={{fontSize: 22, fontWeight: 700, color, marginBottom: 8}}>
			{title}
		</div>
		<div style={{fontSize: 16, color: COLORS.muted, lineHeight: 1.4}}>
			{subtitle}
		</div>
	</div>
);

const Arrow: React.FC<{opacity: number}> = ({opacity}) => (
	<div
		style={{
			display: 'flex',
			alignItems: 'center',
			opacity,
			margin: '0 16px',
		}}
	>
		<div
			style={{width: 50, height: 2, backgroundColor: COLORS.border}}
		/>
		<div
			style={{
				width: 0,
				height: 0,
				borderTop: '8px solid transparent',
				borderBottom: '8px solid transparent',
				borderLeft: `14px solid ${COLORS.border}`,
			}}
		/>
	</div>
);

export const TwoStageArch: React.FC<{delay?: number}> = ({delay = 0}) => {
	const frame = useCurrentFrame();

	const ease = (start: number, end: number, d1: number, d2: number) =>
		interpolate(frame - delay, [d1, d2], [start, end], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.bezier(0.16, 1, 0.3, 1),
		});

	const box1Opacity = ease(0, 1, 0, 18);
	const box1Scale = ease(0.85, 1, 0, 18);
	const arrowOpacity = ease(0, 1, 14, 28);
	const box2Opacity = ease(0, 1, 20, 38);
	const box2Scale = ease(0.85, 1, 20, 38);
	const arrow2Opacity = ease(0, 1, 30, 44);
	const badgeOpacity = ease(0, 1, 36, 52);
	const badgeScale = interpolate(frame - delay, [36, 52], [0.85, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.34, 1.56, 0.64, 1),
	});

	return (
		<div>
			{/* Stage labels */}
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					gap: 16,
					marginBottom: 12,
					opacity: box1Opacity,
				}}
			>
				<span
					style={{
						fontSize: 14,
						fontWeight: 600,
						color: COLORS.muted,
						letterSpacing: '2px',
						textTransform: 'uppercase',
						fontFamily,
					}}
				>
					Stage 1
				</span>
				<span style={{width: 200}} />
				<span
					style={{
						fontSize: 14,
						fontWeight: 600,
						color: COLORS.muted,
						letterSpacing: '2px',
						textTransform: 'uppercase',
						fontFamily,
					}}
				>
					Stage 2
				</span>
			</div>

			{/* Boxes */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 0,
				}}
			>
				<Box
					title="Binary Filter"
					subtitle="Is this a crime event?"
					color={COLORS.cyan}
					opacity={box1Opacity}
					scale={box1Scale}
				/>
				<Arrow opacity={arrowOpacity} />
				<Box
					title="Category Classifier"
					subtitle="murder · robbery · rape suicide · kidnapping · terrorism"
					color={COLORS.red}
					opacity={box2Opacity}
					scale={box2Scale}
				/>
				<Arrow opacity={arrow2Opacity} />

				{/* Result badge */}
				<div
					style={{
						fontFamily,
						padding: '28px 32px',
						borderRadius: 14,
						backgroundColor: 'rgba(34,197,94,0.1)',
						border: `2px solid ${COLORS.green}`,
						textAlign: 'center',
						opacity: badgeOpacity,
						transform: `scale(${badgeScale})`,
					}}
				>
					<div
						style={{
							fontSize: 42,
							fontWeight: 800,
							color: COLORS.green,
							letterSpacing: '-1px',
						}}
					>
						88%
					</div>
					<div style={{fontSize: 14, color: COLORS.muted, marginTop: 4}}>
						Exact Match
					</div>
				</div>
			</div>
		</div>
	);
};
