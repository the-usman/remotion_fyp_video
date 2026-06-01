import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {StatCounter} from '../components/StatCounter';
import {VideoScene} from '../components/VideoScene';
import {COLORS, fontFamily} from '../constants';

export const Corpus: React.FC = () => {
	const frame = useCurrentFrame();

	const statOpacity = interpolate(frame, [20, 40], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const warningOpacity = interpolate(frame, [120, 150], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});
	const warningScale = interpolate(frame, [120, 145], [0.9, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.34, 1.56, 0.64, 1),
	});

	return (
		<AbsoluteFill>
			<VideoScene
				src="videos/data.webm"
				overlayTitle="200,000 Rows"
				overlaySubtitle="The largest Urdu crime news corpus ever assembled"
				dimOpacity={0.58}
			/>

			{/* Stat counter top-right */}
			<div
				style={{
					position: 'absolute',
					top: 60,
					right: 80,
					textAlign: 'right',
					fontFamily,
					opacity: statOpacity,
				}}
			>
				<StatCounter to={200000} suffix="+" color={COLORS.gold} fontSize={72} delay={20} />
				<div
					style={{fontSize: 20, color: COLORS.muted, fontWeight: 600, marginTop: 6}}
				>
					crime news articles
				</div>
			</div>

			{/* Warning callout */}
			<div
				style={{
					position: 'absolute',
					top: 60,
					left: 80,
					fontFamily,
					opacity: warningOpacity,
					transform: `scale(${warningScale})`,
					transformOrigin: 'top left',
				}}
			>
				<div
					style={{
						padding: '18px 28px',
						borderRadius: 14,
						backgroundColor: 'rgba(245,158,11,0.1)',
						border: `1px solid rgba(245,158,11,0.35)`,
						maxWidth: 420,
					}}
				>
					<div
						style={{
							fontSize: 15,
							fontWeight: 700,
							color: COLORS.gold,
							letterSpacing: '2px',
							textTransform: 'uppercase',
							marginBottom: 8,
						}}
					>
						⚠ Data Quality Issue
					</div>
					<div
						style={{fontSize: 22, fontWeight: 600, color: COLORS.white, lineHeight: 1.4}}
					>
						Only <span style={{color: COLORS.gold}}>25%</span> is usable
					</div>
					<div
						style={{fontSize: 16, color: COLORS.muted, marginTop: 6}}
					>
						75% is noise — opinion columns, duplicates, general stats
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
