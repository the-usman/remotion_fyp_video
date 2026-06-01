import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../constants';
import {AccuracyBar} from './AccuracyBar';

interface ModelEntry {
	label: string;
	value: number;
	color: string;
}

interface AccuracyChartProps {
	models: ModelEntry[];
	title?: string;
	startDelay?: number;
}

export const AccuracyChart: React.FC<AccuracyChartProps> = ({
	models,
	title,
	startDelay = 0,
}) => {
	const frame = useCurrentFrame();

	const titleOpacity = interpolate(frame, [startDelay, startDelay + 15], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});

	return (
		<div style={{width: '100%'}}>
			{title && (
				<div
					style={{
						fontSize: 28,
						fontWeight: 700,
						color: COLORS.muted,
						marginBottom: 28,
						opacity: titleOpacity,
						textTransform: 'uppercase',
						letterSpacing: '2px',
					}}
				>
					{title}
				</div>
			)}
			{models.map((m, i) => (
				<AccuracyBar
					key={m.label}
					label={m.label}
					value={m.value}
					color={m.color}
					delay={startDelay + i * 8}
				/>
			))}
		</div>
	);
};
