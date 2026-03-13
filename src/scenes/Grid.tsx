import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const GridScene: React.FC<{ title: string; cards: {title: string, desc: string}[] }> = ({ title, cards }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	return (
		<div style={{
			flex: 1,
			display: 'flex',
			flexDirection: 'column',
			padding: 80,
			backgroundColor: '#111',
			color: 'white',
			fontFamily: 'Pretendard, sans-serif',
			width: '100%',
			height: '100%',
		}}>
			<h2 style={{ fontSize: 60, marginBottom: 50 }}>{title}</h2>
			<div style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)',
				gap: 40,
			}}>
				{cards.map((card, i) => {
					const itemFrame = frame - 20 - i * 5;
					const opacity = interpolate(itemFrame, [0, 10], [0, 1], { extrapolateLeft: 'clamp' });
					const scale = spring({ frame: itemFrame, fps, config: { damping: 10 } });

					return (
						<div key={i} style={{
							padding: 40,
							backgroundColor: '#222',
							borderRadius: 20,
							opacity,
							transform: `scale(${scale})`,
							border: '1px solid #333',
						}}>
							<h3 style={{ fontSize: 40, margin: '0 0 20px 0', color: '#4facfe' }}>{card.title}</h3>
							<p style={{ fontSize: 24, margin: 0, color: '#aaa', lineHeight: 1.4 }}>{card.desc}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
