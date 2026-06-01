import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {TwoStageArch} from '../components/TwoStageArch';
import {VideoScene} from '../components/VideoScene';
import {COLORS, fontFamily} from '../constants';

export const CombinedSystem: React.FC = () => {
	const frame = useCurrentFrame();

	const panelOpacity = interpolate(frame, [10, 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});
	const insightOpacity = interpolate(frame, [280, 310], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill>
			<VideoScene
				src="videos/multi-label-training.webm"
				overlayTitle="The Combined System"
				overlaySubtitle="Inspired by how human annotators actually work"
				dimOpacity={0.75}
			/>

			{/* Architecture panel */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 1400,
					padding: '36px 40px',
					borderRadius: 20,
					backgroundColor: 'rgba(8,11,20,0.92)',
					border: `1px solid ${COLORS.border}`,
					fontFamily,
					opacity: panelOpacity,
				}}
			>
				<div
					style={{
						fontSize: 14,
						fontWeight: 700,
						color: COLORS.muted,
						letterSpacing: '2px',
						textTransform: 'uppercase',
						marginBottom: 28,
						textAlign: 'center',
					}}
				>
					Two-Stage Classification Architecture
				</div>

				<TwoStageArch delay={20} />

				<div
					style={{
						marginTop: 24,
						textAlign: 'center',
						opacity: insightOpacity,
					}}
				>
					<div style={{fontSize: 20, color: COLORS.muted, fontStyle: 'italic'}}>
						"The model no longer had to decide relevance and category in a single step."
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
