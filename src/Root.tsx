import React from 'react';
import { Composition, staticFile } from 'remotion';
import { Main } from './Main';
import config from '../video-config.json';

export const RemotionRoot: React.FC = () => {
	// Total duration calculation or default
	const durationInFrames = config.scenes.reduce((acc, scene) => acc + (scene.duration || 150), 0);

	return (
		<>
			<Composition
				id="Main"
				component={Main}
				durationInFrames={durationInFrames || 300}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={config}
			/>
		</>
	);
};
