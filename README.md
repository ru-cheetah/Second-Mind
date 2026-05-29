# Second Mind - Thought Structuring App for Overthinkers

A minimalist web application designed to help chronic overthinkers capture, process, and structure their chaotic thoughts using local, privacy-first AI processing with Google's Gemma model.

## Overview

**Second Mind** seamlessly captures multi-modal inputs (voice, photos, text) and processes them locally using an on-device AI model to structure chaotic thoughts into clear, actionable, or comforting formats.

### Core Features (Phase 1 - Capture UI)

- **Voice Recording**: Record long-form voice rants with real-time waveform visualization
- **Visual Input**: Upload photos or images for context
- **Text Rant**: Write unfiltered thoughts in a distraction-free interface
- **Calming UI**: Dark-mode, minimalist design with soft colors (blues, greens, pastels)
- **Privacy-First**: All data processing happens locally on your device using Ollama + Gemma

## Tech Stack

- **Frontend**: React 18 + Next.js 14 + TypeScript
- **Styling**: Tailwind CSS with custom calm color palette
- **AI Backend**: Ollama (local LLM runtime) + Google Gemma model
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
   ```

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

## Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
npm run type-check      # Check TypeScript types
```

## Architecture

### Phase 1: Brain Dump UI (Current Implementation)

Three seamless input channels:

1. **Voice Recording** - Record thoughts with timestamp tracking
2. **Visual Input** - Upload/capture photos for context
3. **Text Rant** - Write unfiltered thoughts (up to 5000 chars)

Users can combine inputs before submitting for processing.

### Phase 2: Local AI Analysis (Prepared)

Once submitted, Ollama + Gemma processes the data:
1. Transcribe audio inputs
2. Generate "Headspace Summary" (2-3 sentence objective analysis)

### Phase 3: Processing Paths (UI Ready)

Three interactive paths after analysis:
- **Option A**: Friendly Discussion (Empathy Mode)
- **Option B**: The Breakdown (Analytical Mode)
- **Option C**: Mind Map (Visual Mode)

## Color Palette

The app uses a calming, dark-mode color scheme:

- **Calm Blues**: Primary interface colors
- **Mindful Greens**: Secondary, success states
- **Soft Pastels**: Accents and highlights
- **Dark Backgrounds**: Eye-friendly main colors

```
calm-50 to calm-900    - Primary palette
mindful-50 to mindful-900 - Secondary palette
```

## API Integration

### Ollama/Gemma Integration

All requests to Ollama are handled through:
- `src/api/ollama.ts` - Client utilities
- `src/pages/api/analyze.ts` - API route handler

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

- [ ] Phase 2: Full AI analysis with Headspace Summary
- [ ] Phase 3: Three processing modes (Discussion, Breakdown, Mind Map)
- [ ] Thought archiving and historical analysis
- [ ] Insights dashboard with emotion trends
- [ ] Export functionality (PDF, journal entries)
- [ ] Mobile app versions (React Native)
- [ ] Advanced Gemma prompting for specialized insights

## Troubleshooting

### "Ollama connection refused"
- Ensure Ollama is running: `ollama serve`
- Check that `NEXT_PUBLIC_OLLAMA_URL` is correct in `.env.local`

### "Model not found"
- Pull Gemma: `ollama pull gemma`
- Verify with: `ollama list`

### Microphone not working
- Grant microphone permissions in browser settings
- Check HTTPS or localhost is being used (required for media access)

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

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
