# Second Mind - Thought Structuring App for Overthinkers

A minimalist web application designed to help chronic overthinkers capture, process, and structure their chaotic thoughts using local, privacy-first AI processing with Google's Gemma model.

---

## The "Why": Solving the Overthinker's Dilemma

Overthinking isn't just "thinking too much"—it is a state of cognitive overload where thoughts move too fast to be processed, categorized, or understood. When an overthinker experiences stress, their brain dumps ideas, anxieties, and branch-offs all at once, leading to a paralyzing feedback loop. Traditional journaling often fails because translating a chaotic web of thoughts into a linear text format requires the very mental structure the user is currently lacking.

**Second Mind** acts as an external cognitive sandbox. It provides an immediate, frictionless "brain dump" mechanism that accepts the mess exactly as it is—whether it’s a spoken audio rant, a chaotic stream of consciousness text, or visual context. By taking the burden of organization off the user, it intercepts the spiral and restores mental clarity.

## Why Google Gemma is the Perfect Fit

Building a "Second Mind" requires an AI model that balances high-quality semantic understanding with extreme resource efficiency and absolute privacy. Google’s Gemma is uniquely suited for this for three critical reasons:

1. **Absolute, Uncompromised Privacy:** A user’s most raw, vulnerable, and chaotic thoughts should never live on a cloud server or be used for corporate model training. Because Gemma is highly optimized for local execution via Ollama, *Second Mind* runs entirely on-premise. Your raw thoughts never leave your local machine.
2. **Exceptional Reasoning in a Compact Footprint:** Built on the same research and technology as Google's Gemini models, Gemma possesses advanced linguistic and structural reasoning capabilities. It doesn't just summarize text; it effectively identifies underlying themes, separates objective facts from anxiety-induced assumptions, and structures chaotic dialogue into logical nodes.
3. **Sub-Second Local Latency:** When a user is spinning out, waiting for a clogged cloud API to respond introduces friction that worsens anxiety. Gemma's lightweight architecture allows it to generate rapid "Headspace Summaries" locally, providing instant grounding and feedback right when the user needs it most.

---

## Overview

**Second Mind** seamlessly captures multi-modal inputs (voice, photos, text) and processes them locally using an on-device AI model to structure chaotic thoughts into clear, actionable, or comforting formats.

### Core Features (Phase 1)

- **Voice Recording**: Record long-form voice rants with real-time waveform visualization
- **Visual Input**: Upload photos or images for context
- **Text Rant**: Write unfiltered thoughts in a distraction-free interface
- **Calming UI**: Dark-mode, minimalist design with soft colors (blues, greens, pastels)
- **Privacy-First**: All data processing happens locally on your device using Ollama + Gemma

## Tech Stack

- **Frontend**: React 18 + Next.js 14 + TypeScript
- **Styling**: Tailwind CSS with custom calm color palette
- **AI Backend**: Ollama (local LLM runtime) + Google Gemma4 model
- **State Management**: Zustand (prepared for future use)
- **Development**: ESLint, Prettier

## Prerequisites

### System Requirements

- Node.js 18+ and npm/yarn
- Ollama installed locally ([Download Ollama](https://ollama.ai))
- Google Gemma model pulled in Ollama

### Setup Ollama

1. **Install Ollama** from [ollama.ai](https://ollama.ai)

2. **Pull the Gemma model**:
```bash
   ollama pull gemma

3. **Start Ollama server** (runs on http://localhost:11434 by default):
   ```bash
   ollama serve
   ```

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Ollama Configuration
NEXT_PUBLIC_OLLAMA_URL=http://localhost:11434
NEXT_PUBLIC_OLLAMA_MODEL=gemma
```

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
src/
├── pages/
│   ├── _app.tsx              # Next.js app wrapper
│   ├── _document.tsx         # HTML document structure
│   ├── index.tsx             # Home page (Capture Screen)
│   └── api/
│       └── analyze.ts        # API route for Gemma processing
├── components/
│   ├── CaptureScreen.tsx     # Main capture interface
│   ├── VoiceRecorder.tsx     # Voice recording component
│   ├── ImageUploader.tsx     # Image upload component
│   └── TextRant.tsx          # Text input component
├── api/
│   └── ollama.ts             # Ollama client utilities
├── hooks/                    # Custom React hooks
├── store/                    # Zustand state management
├── styles/
│   └── globals.css           # Global styles and Tailwind
└── utils/                    # Helper utilities
```

## Architecture

### Phase 1: Brain Dump

Three seamless input channels:

1. **Voice Recording** - Record thoughts with timestamp tracking
2. **Visual Input** - Upload/capture photos for context
3. **Text Rant** - Write unfiltered thoughts (up to 5000 chars)

Users can combine inputs before submitting for processing.

### Phase 2: Local AI Analysis

Once submitted, Ollama + Gemma processes the data:
1. Transcribe audio inputs
2. Generate "Headspace Summary" (2-3 sentence objective analysis)

### Phase 3: Processing Paths

Three interactive paths after analysis:
- **Option A**: Friendly Discussion (Empathy Mode)
- **Option B**: The Breakdown (Analytical Mode)
- **Option C**: Mind Map (Visual Mode)

### Ollama/Gemma Integration

**Expected Ollama Server**: `http://localhost:11434`

Example API response from `/api/analyze`:
```json
{
  "success": true,
  "headspaceSummary": "You're experiencing decision paralysis around a major life choice, and it's manifesting as work anxiety. The core overthinking is rooted in fear of making the wrong decision, which is triggering a domino effect of worry."
}
```

## Development Notes

### Browser Compatibility

Requires browsers with support for:
- Media Recorder API (voice recording)
- FileReader API (image upload)
- MediaDevices getUserMedia (camera)

Modern versions of Chrome, Firefox, Safari, and Edge.

### Microphone & Camera Permissions

Users will be prompted to grant permissions when accessing:
- Microphone (voice recording)
- Camera (photo capture - prepared for future)

### Performance

- All processing is client-side capture
- Server-side processing via Ollama runs locally
- No data is sent to cloud services

## Future Enhancements

- [ ] Phase 2: Three processing modes (Discussion, Breakdown, Mind Map)
- [ ] Thought archiving and historical analysis
- [ ] Mobile app versions (React Native)


## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Ollama Documentation](https://github.com/jmorganca/ollama)
- [Google Gemma](https://ai.google.dev/gemma)

## Privacy & Security

✅ **All processing is local**
- No data is sent to external servers
- Audio, images, and text remain on your device
- Ollama runs entirely on localhost

## License

MIT License - See LICENSE file for details

---

**Made with ❤️ for overthinkers everywhere**
