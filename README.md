# Video-Making AI: Gemini + Remotion + edge-tts

AI 에이전트(Gemini/Antigravity)를 사용하여 자동으로 영상을 제작하는 파이프라인입니다. 텍스트 주제만 던지면 **기획 → 대본 작성 → 음성 합성(TTS) → 영상 렌더링**이 한 번에 진행됩니다.

## 🚀 주요 기능

- **자동 기획**: 주제를 입력하면 AI가 `video-config.json`을 통해 전체 씬 구조와 대본을 생성합니다.
- **고품질 TTS**: `edge-tts`를 활용하여 자연스러운 한국어 나레이션을 생성합니다.
- **자동 싱크**: 나레이션의 길이를 계산하여 각 영상 씬의 지속 시간을 자동으로 조절합니다.
- **React 기반 렌더링**: `Remotion`을 사용하여 고퀄리티의 React 컴포넌트를 영상 프레임으로 변환합니다.

## 🛠 기술 스택

- **AI**: Gemini / Antigravity Agent
- **Video Engine**: [Remotion](https://www.remotion.dev/) (React)
- **Voice**: [edge-tts](https://pypi.org/project/edge-tts/) (Microsoft Edge TTS)
- **Language**: Node.js, Python, TypeScript

## 📂 프로젝트 구조

```text
video-gen/
├── src/                # Remotion React 소스 (씬 템플릿 등)
├── scripts/            # TTS 생성 및 오디오 처리 스크립트 (Python)
├── video-config.json   # AI가 작성하는 영상 설계도
├── run-pipeline.js     # 전체 자동화 실행 마스터 스크립트
└── out/                # 최종 렌더링된 MP3/MP4 결과물
```

## 🏃‍♂️ 시작하기

### 1. 환경 설정
Node.js와 Python 3.10 이상이 필요합니다.

```bash
# Node 패키지 설치
cd video-gen
npm install

# Python 라이브러리 설치
pip install edge-tts mutagen
```

### 2. 영상 생성
`video-config.json`에 내용을 채운 후(또는 AI에게 요청 후) 아래 명령어를 실행합니다.

```bash
node run-pipeline.js
```

최종 영상은 `video-gen/out/video.mp4` 경로에 저장됩니다.

## 🎬 씬 템플릿 (Templates)
현재 다음과 같은 템플릿을 지원합니다:
- `Hero`: 타이틀과 서브타이틀 중심의 메인 화면
- `List`: 불렛 포인트 형태의 목록 화면
- `Grid`: 4개의 카드로 구성된 그리드 정보 화면

---
Created by [Antigravity AI Agent](https://github.com/google-deepmind/antigravity)
