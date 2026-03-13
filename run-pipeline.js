const { execSync } = require('child_process');
const fs = require('fs');

async function run() {
    console.log('--- Starting Video Generation Pipeline ---');

    // 1. TTS Generation
    console.log('Step 1: Generating TTS...');
    try {
        execSync('python scripts/tts_generator.py', { cwd: './', stdio: 'inherit' });
    } catch (e) {
        console.error('TTS Generation failed', e);
        return;
    }

    // 2. Remotion Render
    console.log('Step 2: Rendering Video...');
    try {
        // We'll use the 'Main' composition defined in Root.tsx
        execSync('npx remotion render src/index.ts Main out/video.mp4', { cwd: './', stdio: 'inherit' });
    } catch (e) {
        console.error('Rendering failed', e);
        return;
    }

    console.log('--- Pipeline Complete! Video saved to video-gen/out/video.mp4 ---');
}

run();
