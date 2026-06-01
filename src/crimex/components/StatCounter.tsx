import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, fontFamily} from '../constants';

interface StatCounterProps {
	to: number;
	suffix?: string;
	prefix?: string;
	color?: string;
	fontSize?: number;
	delay?: number;
}

export const StatCounter: React.FC<StatCounterProps> = ({
	to,
	suffix = '',
	prefix = '',
	color = COLORS.cyan,
	fontSize = 96,
	delay = 0,
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const f = Math.max(0, frame - delay);
	const animEnd = Math.max(1, durationInFrames * 0.7 - delay);

	const value = Math.round(
		interpolate(f, [0, animEnd], [0, to], {
			extrapolateRight: 'clamp',
		}),
	);

	return (
		<div
			style={{
				fontFamily,
				fontSize,
				fontWeight: 800,
				color,
				letterSpacing: '-2px',
				lineHeight: 1,
			}}
		>
			{prefix}
			{value.toLocaleString()}
			{suffix}
		</div>
	);
};
