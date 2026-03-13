import React from 'react';
import { interpolate, Sequence, useCurrentFrame, useVideoConfig, Audio, staticFile } from 'remotion';
import { HeroScene } from './scenes/Hero';
import { ListScene } from './scenes/List';
import { GridScene } from './scenes/Grid';

export const Main: React.FC<any> = ({ scenes }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	let currentStartFrame = 0;

	return (
		<div style={{ flex: 1, backgroundColor: 'white' }}>
			{scenes.map((scene, index) => {
				const duration = scene.duration || 150;
				const startFrame = currentStartFrame;
				currentStartFrame += duration;

				let SceneComponent: any = HeroScene;
				if (scene.template === 'List') SceneComponent = ListScene;
				if (scene.template === 'Grid') SceneComponent = GridScene;

				return (
					<Sequence key={index} from={startFrame} durationInFrames={duration}>
						<SceneComponent {...scene.props} />
						{scene.audioUrl && (
							<Audio src={staticFile(scene.audioUrl)} />
						)}
					</Sequence>
				);
			})}
		</div>
	);
};
