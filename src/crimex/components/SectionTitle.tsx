import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, fontFamily} from '../constants';

interface SectionTitleProps {
	title: string;
	subtitle?: string;
	accentColor?: string;
	delay?: number;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
	title,
	subtitle,
	accentColor = COLORS.cyan,
	delay = 0,
}) => {
	const frame = useCurrentFrame();
	const f = frame - delay;

	const y = interpolate(f, [0, 25], [40, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const opacity = interpolate(f, [0, 18], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const lineWidth = interpolate(f, [10, 35], [0, 60], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const subtitleOpacity = interpolate(f, [20, 40], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div style={{fontFamily, transform: `translateY(${y}px)`, opacity}}>
			<div
				style={{
					width: lineWidth,
					height: 3,
					backgroundColor: accentColor,
					marginBottom: 16,
					borderRadius: 2,
				}}
			/>
			<div
				style={{
					fontSize: 52,
					fontWeight: 800,
					color: COLORS.white,
					lineHeight: 1.1,
					letterSpacing: '-1px',
				}}
			>
				{title}
			</div>
			{subtitle && (
				<div
					style={{
						fontSize: 24,
						fontWeight: 400,
						color: COLORS.muted,
						marginTop: 12,
						opacity: subtitleOpacity,
					}}
				>
					{subtitle}
				</div>
			)}
		</div>
	);
};
