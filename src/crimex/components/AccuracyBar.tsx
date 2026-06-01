import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, fontFamily} from '../constants';

interface AccuracyBarProps {
	label: string;
	value: number;
	color?: string;
	delay?: number;
}

export const AccuracyBar: React.FC<AccuracyBarProps> = ({
	label,
	value,
	color = COLORS.cyan,
	delay = 0,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		frame: frame - delay,
		fps,
		config: {damping: 18, stiffness: 80},
	});

	const clampedProgress = Math.min(1, Math.max(0, progress));
	const displayValue = (value * clampedProgress).toFixed(1);

	return (
		<div style={{fontFamily, marginBottom: 20}}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: 8,
					alignItems: 'baseline',
				}}
			>
				<span style={{fontSize: 22, fontWeight: 600, color: COLORS.white}}>
					{label}
				</span>
				<span
					style={{
						fontSize: 26,
						fontWeight: 700,
						color,
						minWidth: 70,
						textAlign: 'right',
					}}
				>
					{displayValue}%
				</span>
			</div>
			<div
				style={{
					height: 18,
					backgroundColor: COLORS.border,
					borderRadius: 9,
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						height: '100%',
						width: `${value * clampedProgress}%`,
						backgroundColor: color,
						borderRadius: 9,
						transition: 'none',
					}}
				/>
			</div>
		</div>
	);
};
