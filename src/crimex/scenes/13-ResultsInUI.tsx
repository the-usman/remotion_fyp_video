import {AbsoluteFill} from 'remotion';
import {VideoScene} from '../components/VideoScene';

export const ResultsInUI: React.FC = () => {
	return (
		<AbsoluteFill>
			<VideoScene
				src="videos/prediction-results-ui.webm"
				overlayTitle="District-Level Predictions"
				overlaySubtitle="Weekly crime forecasts displayed in the live dashboard"
				chips={['Lahore', 'Karachi', 'Faisalabad']}
				dimOpacity={0.45}
			/>
		</AbsoluteFill>
	);
};
