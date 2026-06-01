import {AbsoluteFill} from 'remotion';
import {VideoScene} from '../components/VideoScene';

export const Dashboard: React.FC = () => {
	return (
		<AbsoluteFill>
			<VideoScene
				src="videos/dashboard-demo.webm"
				overlayTitle="CrimeX Dashboard"
				overlaySubtitle="FastAPI · Supabase · React"
				dimOpacity={0.35}
			/>
		</AbsoluteFill>
	);
};
