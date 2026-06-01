import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {VideoScene} from '../components/VideoScene';
import {COLORS, fontFamily} from '../constants';

const SOURCES = [
	'Geo News',
	'ARY News',
	'Dawn Urdu',
	'Express News',
	'Jang',
	'Nawaiwaqt',
];

export const Scraping: React.FC = () => {
	const frame = useCurrentFrame();

	const tickerOffset = interpolate(frame, [0, 450], [0, -800], {
		extrapolateRight: 'clamp',
	});

	const statsOpacity = interpolate(frame, [40, 60], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});

	return (
		<AbsoluteFill>
			<VideoScene
				src="videos/scraper.webm"
				overlayTitle="Building the Corpus"
				overlaySubtitle="Automated scraping of Urdu crime news at scale"
				chips={['Python', 'BeautifulSoup', 'Deduplication']}
				dimOpacity={0.52}
			/>

			{/* Top-right stat */}
			<div
				style={{
					position: 'absolute',
					top: 60,
					right: 80,
					textAlign: 'right',
					fontFamily,
					opacity: statsOpacity,
				}}
			>
				<div
					style={{fontSize: 60, fontWeight: 800, color: COLORS.gold, letterSpacing: '-2px'}}
				>
					6
				</div>
				<div style={{fontSize: 18, color: COLORS.muted, fontWeight: 600}}>
					Urdu news sources
				</div>
			</div>

			{/* Source ticker */}
			<div
				style={{
					position: 'absolute',
					top: 60,
					left: 80,
					right: 220,
					overflow: 'hidden',
					fontFamily,
					opacity: statsOpacity,
				}}
			>
				<div
					style={{
						display: 'flex',
						gap: 32,
						transform: `translateX(${tickerOffset}px)`,
						whiteSpace: 'nowrap',
					}}
				>
					{[...SOURCES, ...SOURCES, ...SOURCES].map((s, i) => (
						<span
							key={`${s}-${i}`}
							style={{
								padding: '6px 18px',
								borderRadius: 20,
								backgroundColor: 'rgba(15,22,35,0.85)',
								border: `1px solid ${COLORS.border}`,
								color: COLORS.muted,
								fontSize: 18,
								fontWeight: 600,
							}}
						>
							{s}
						</span>
					))}
				</div>
			</div>
		</AbsoluteFill>
	);
};
