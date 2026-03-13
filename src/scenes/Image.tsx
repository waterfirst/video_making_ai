import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig, Img, staticFile } from 'remotion';

export const ImageScene: React.FC<{ title: string; imageUrl: string; description?: string }> = ({ title, imageUrl, description }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const opacity = interpolate(frame, [0, 20], [0, 1]);
	const scale = interpolate(frame, [0, 150], [1, 1.1]); // Subtle zoom-in effect

	return (
		<div style={{
			flex: 1,
			display: 'flex',
			flexDirection: 'column',
			backgroundColor: '#000',
			fontFamily: 'Pretendard, sans-serif',
			width: '100%',
			height: '100%',
			overflow: 'hidden',
			position: 'relative',
		}}>
			<div style={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				transform: `scale(${scale})`,
			}}>
				<Img 
					src={imageUrl.startsWith('http') ? imageUrl : staticFile(imageUrl)} 
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						opacity: 0.7,
					}}
				/>
			</div>
			
			<div style={{
				position: 'relative',
				zIndex: 1,
				marginTop: 'auto',
				padding: 100,
				background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
			}}>
				<h2 style={{ 
					fontSize: 80, 
					color: 'white', 
					marginBottom: 20,
					opacity,
					transform: `translateY(${interpolate(frame, [0, 20], [50, 0])}px)`
				}}>
					{title}
				</h2>
				{description && (
					<p style={{ 
						fontSize: 32, 
						color: '#ccc', 
						opacity,
						transform: `translateY(${interpolate(frame, [10, 30], [50, 0])}px)`
					}}>
						{description}
					</p>
				)}
			</div>
		</div>
	);
};
