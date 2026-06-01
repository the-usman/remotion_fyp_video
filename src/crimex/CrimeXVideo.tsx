import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {AbsoluteFill} from 'remotion';
import {TitleCard} from './scenes/00-TitleCard';
import {TheProblem} from './scenes/01-TheProblem';
import {Scraping} from './scenes/02-Scraping';
import {Corpus} from './scenes/03-Corpus';
import {EDA} from './scenes/04-EDA';
import {LLMsFail} from './scenes/05-LLMsFail';
import {RoBERTa} from './scenes/06-RoBERTa';
import {CombinedSystem} from './scenes/07-CombinedSystem';
import {FineTuning} from './scenes/08-FineTuning';
import {Insights} from './scenes/09-Insights';
import {WeatherNull} from './scenes/10-WeatherNull';
import {FeatureEngineering} from './scenes/11-FeatureEngineering';
import {PredictionTesting} from './scenes/12-PredictionTesting';
import {ResultsInUI} from './scenes/13-ResultsInUI';
import {Dashboard} from './scenes/14-Dashboard';
import {Outro} from './scenes/15-Outro';
import {SCENE_DURATIONS, TRANSITION_FRAMES, COLORS} from './constants';

const T = linearTiming({durationInFrames: TRANSITION_FRAMES});

export const CrimeXVideo: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bg}}>
			<TransitionSeries>
				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.titleCard}>
					<TitleCard />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={T} />

				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.theProblem}>
					<TheProblem />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={T} />

				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scraping}>
					<Scraping />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={T} />

				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.corpus}>
					<Corpus />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={T} />

				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.eda}>
					<EDA />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={T} />

				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.llmsFail}>
					<LLMsFail />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={T} />

				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.roberta}>
					<RoBERTa />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={T} />

				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.combinedSystem}>
					<CombinedSystem />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={T} />

				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.fineTuning}>
					<FineTuning />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={T} />

				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.insights}>
					<Insights />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={T} />

				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.weatherNull}>
					<WeatherNull />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={T} />

				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.featureEngineering}>
					<FeatureEngineering />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={T} />

				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.predictionTesting}>
					<PredictionTesting />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={T} />

				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.resultsInUI}>
					<ResultsInUI />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={T} />

				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.dashboard}>
					<Dashboard />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition presentation={fade()} timing={T} />

				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.outro}>
					<Outro />
				</TransitionSeries.Sequence>
			</TransitionSeries>
		</AbsoluteFill>
	);
};
