import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const HeroScene: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const opacity = interpolate(frame, [0, 20], [0, 1]);
	const scale = spring({
		frame,
		fps,
		config: {
			damping: 12,
		},
	});

	return (
		<div style={{
			flex: 1,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#1a1a1a',
			color: 'white',
			fontFamily: 'Pretendard, sans-serif',
			width: '100%',
			height: '100%',
		}}>
			<h1 style={{
				fontSize: 120,
				opacity,
				transform: `scale(${scale})`,
				margin: 0,
				background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
				WebkitBackgroundClip: 'text',
				WebkitTextFillColor: 'transparent',
			}}>
				{title}
			</h1>
			{subtitle && (
				<p style={{ fontSize: 40, marginTop: 40, opacity }}>
					{subtitle}
				</p>
			)}
		</div>
	);
};
