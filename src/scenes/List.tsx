import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const ListScene: React.FC<{ title: string; items: string[] }> = ({ title, items }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	return (
		<div style={{
			flex: 1,
			display: 'flex',
			flexDirection: 'column',
			padding: 100,
			backgroundColor: '#f8f9fa',
			fontFamily: 'Pretendard, sans-serif',
			width: '100%',
			height: '100%',
		}}>
			<h2 style={{ fontSize: 80, color: '#333', marginBottom: 60 }}>{title}</h2>
			<ul style={{ listStyle: 'none', padding: 0 }}>
				{items.map((item, i) => {
					const itemFrame = frame - 20 - i * 10;
					const opacity = interpolate(itemFrame, [0, 10], [0, 1], { extrapolateLeft: 'clamp' });
					const x = interpolate(itemFrame, [0, 10], [-50, 0], { extrapolateLeft: 'clamp' });

					return (
						<li key={i} style={{
							fontSize: 50,
							marginBottom: 30,
							opacity,
							transform: `translateX(${x}px)`,
							display: 'flex',
							alignItems: 'center',
						}}>
							<span style={{
								width: 20,
								height: 20,
								backgroundColor: '#4facfe',
								borderRadius: '50%',
								marginRight: 30,
							}} />
							{item}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
