import {Video} from '@remotion/media';
import {AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {COLORS, fontFamily} from '../constants';

interface VideoSceneProps {
	src: string;
	overlayTitle: string;
	overlaySubtitle?: string;
	chips?: string[];
	dimOpacity?: number;
}

export const VideoScene: React.FC<VideoSceneProps> = ({
	src,
	overlayTitle,
	overlaySubtitle,
	chips = [],
	dimOpacity = 0.55,
}) => {
	const frame = useCurrentFrame();

	const titleY = interpolate(frame, [0, 25], [30, 0], {
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateRight: 'clamp',
	});
	const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], {
		extrapolateRight: 'clamp',
	});
	const chipsOpacity = interpolate(frame, [25, 45], [0, 1], {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill>
			<Video
				src={staticFile(src)}
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
				}}
				muted
			/>

			{/* dark overlay */}
			<AbsoluteFill
				style={{backgroundColor: `rgba(8,11,20,${dimOpacity})`}}
			/>

			{/* bottom gradient for text */}
			<AbsoluteFill
				style={{
					background:
						'linear-gradient(to top, rgba(8,11,20,0.95) 0%, rgba(8,11,20,0.6) 35%, transparent 65%)',
				}}
			/>

			{/* text overlay */}
			<AbsoluteFill
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
					padding: '0 80px 70px',
					fontFamily,
				}}
			>
				<div
					style={{
						transform: `translateY(${titleY}px)`,
						opacity: titleOpacity,
					}}
				>
					<div
						style={{
							width: 48,
							height: 3,
							backgroundColor: COLORS.cyan,
							borderRadius: 2,
							marginBottom: 16,
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
						{overlayTitle}
					</div>
				</div>

				{overlaySubtitle && (
					<div
						style={{
							fontSize: 24,
							fontWeight: 400,
							color: COLORS.muted,
							marginTop: 10,
							opacity: subtitleOpacity,
						}}
					>
						{overlaySubtitle}
					</div>
				)}

				{chips.length > 0 && (
					<div
						style={{
							display: 'flex',
							gap: 12,
							marginTop: 16,
							opacity: chipsOpacity,
							flexWrap: 'wrap',
						}}
					>
						{chips.map((chip) => (
							<span
								key={chip}
								style={{
									padding: '6px 16px',
									borderRadius: 20,
									border: `1px solid ${COLORS.border}`,
									backgroundColor: 'rgba(15,22,35,0.8)',
									color: COLORS.muted,
									fontSize: 18,
									fontWeight: 600,
								}}
							>
								{chip}
							</span>
						))}
					</div>
				)}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
