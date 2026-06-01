import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, fontFamily} from '../constants';

interface StatCardProps {
	value: string;
	label: string;
	color?: string;
	delay?: number;
	large?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
	value,
	label,
	color = COLORS.cyan,
	delay = 0,
	large = false,
}) => {
	const frame = useCurrentFrame();
	const f = frame - delay;

	const scale = interpolate(f, [0, 20], [0.85, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.34, 1.56, 0.64, 1),
	});
	const opacity = interpolate(f, [0, 15], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				fontFamily,
				padding: large ? '36px 44px' : '28px 36px',
				borderRadius: 16,
				backgroundColor: COLORS.surface,
				border: `1px solid ${COLORS.border}`,
				transform: `scale(${scale})`,
				opacity,
				borderTop: `3px solid ${color}`,
			}}
		>
			<div
				style={{
					fontSize: large ? 72 : 56,
					fontWeight: 800,
					color,
					letterSpacing: '-2px',
					lineHeight: 1,
				}}
			>
				{value}
			</div>
			<div
				style={{
					fontSize: large ? 20 : 16,
					fontWeight: 600,
					color: COLORS.muted,
					marginTop: 10,
					lineHeight: 1.4,
				}}
			>
				{label}
			</div>
		</div>
	);
};
