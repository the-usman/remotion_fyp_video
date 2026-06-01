import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../constants';

export const Background: React.FC = () => {
	const frame = useCurrentFrame();
	const pulse = interpolate(frame % 180, [0, 90, 180], [0, 1, 0], {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bg}}>
			<div
				style={{
					position: 'absolute',
					top: '40%',
					left: '30%',
					width: 900,
					height: 900,
					transform: 'translate(-50%, -50%)',
					background: `radial-gradient(circle, rgba(220,38,38,${0.04 + pulse * 0.03}) 0%, transparent 65%)`,
					borderRadius: '50%',
					pointerEvents: 'none',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					top: '60%',
					left: '70%',
					width: 600,
					height: 600,
					transform: 'translate(-50%, -50%)',
					background: `radial-gradient(circle, rgba(6,182,212,${0.03 + pulse * 0.02}) 0%, transparent 65%)`,
					borderRadius: '50%',
					pointerEvents: 'none',
				}}
			/>
		</AbsoluteFill>
	);
};
