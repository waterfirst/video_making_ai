import asyncio
import edge_tts
import json
import os
import math
from mutagen.mp3 import MP3

async def generate_tts(text, output_path, voice="ko-KR-SunHiNeural"):
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output_path)
    audio = MP3(output_path)
    return audio.info.length

async def main():
    config_path = "video-config.json"
    with open(config_path, "r", encoding="utf-8") as f:
        config = json.load(f)

    fps = 30
    
    if not os.path.exists("public/audio"):
        os.makedirs("public/audio")

    for i, scene in enumerate(config["scenes"]):
        narration = scene.get("narration")
        if narration:
            audio_filename = f"scene_{i}.mp3"
            audio_path = os.path.join("public/audio", audio_filename)
            print(f"Generating TTS for scene {i}: {narration[:30]}...")
            
            duration_sec = await generate_tts(narration, audio_path)
            
            # Update config
            scene["audioUrl"] = f"audio/{audio_filename}"
            # Add some buffer (0.5s)
            scene["duration"] = math.ceil((duration_sec + 0.5) * fps)
            print(f"Scene {i} duration: {scene['duration']} frames ({duration_sec:.2f}s)")

    with open(config_path, "w", encoding="utf-8") as f:
        json.dump(config, f, indent=2, ensure_ascii=False)
    
    print("TTS generation complete and config updated.")

if __name__ == "__main__":
    # Check if mutagen is installed, if not install it
    try:
        import mutagen
    except ImportError:
        import subprocess
        subprocess.check_call(["pip", "install", "mutagen"])
    
    asyncio.run(main())
