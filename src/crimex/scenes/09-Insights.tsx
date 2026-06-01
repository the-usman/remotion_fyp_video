import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Background} from '../components/Background';
import {StatCounter} from '../components/StatCounter';
import {COLORS, fontFamily} from '../constants';

export const Insights: React.FC = () => {
	const frame = useCurrentFrame();

	const headingOpacity = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});
	const headingY = interpolate(frame, [0, 22], [30, 0], {
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const statOpacity = interpolate(frame, [20, 45], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const noteOpacity = interpolate(frame, [80, 110], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill>
			<Background />
			<AbsoluteFill
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					fontFamily,
					padding: '60px 120px',
					gap: 32,
				}}
			>
				<div style={{opacity: headingOpacity, transform: `translateY(${headingY}px)`, textAlign: 'center'}}>
					<div
						style={{
							fontSize: 15,
							fontWeight: 700,
							color: COLORS.muted,
							letterSpacing: '3px',
							textTransform: 'uppercase',
							marginBottom: 12,
						}}
					>
						Insights Extraction
					</div>
					<div style={{fontSize: 52, fontWeight: 800, color: COLORS.white, letterSpacing: '-1.5px', lineHeight: 1.1}}>
						Knowing when{' '}
						<span style={{color: COLORS.cyan}}>not</span> to build
					</div>
				</div>

				{/* Big accuracy number */}
				<div style={{opacity: statOpacity, textAlign: 'center'}}>
					<StatCounter to={99} suffix="%" color={COLORS.green} fontSize={120} delay={20} />
					<div style={{fontSize: 22, color: COLORS.muted, marginTop: 8}}>
						Perplexity AI — Extraction Accuracy
					</div>
				</div>

				{/* Callout */}
				<div
					style={{
						opacity: noteOpacity,
						padding: '22px 36px',
						borderRadius: 14,
						backgroundColor: COLORS.surface,
						border: `1px solid ${COLORS.border}`,
						maxWidth: 800,
						textAlign: 'center',
					}}
				>
					<div style={{fontSize: 22, color: COLORS.white, lineHeight: 1.5}}>
						"We did not train our own extraction model. Building a production pipeline
						on a proven tool is faster and more reliable."
					</div>
					<div
						style={{
							marginTop: 14,
							fontSize: 16,
							color: COLORS.cyan,
							fontWeight: 700,
							letterSpacing: '1px',
						}}
					>
						This is not a compromise — it is engineering judgment.
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
