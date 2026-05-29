# Second Mind - Development Instructions

## Project Overview
**Second Mind** is a thought-structuring web app for overthinkers using local AI (Ollama + Gemma) for privacy-first processing.

## Current Status
✅ **Phase 1: Capture UI** - COMPLETE
- Voice recording component with waveform tracking
- Image upload component (file & camera)
- Text rant input (up to 5000 chars)
- Calming, minimalist UI (Tailwind CSS)
- Full Next.js/TypeScript project structure
- Ollama/Gemma API integration prepared

## Architecture & Key Files

### Frontend Components
- `src/components/CaptureScreen.tsx` - Main capture interface with tab navigation
- `src/components/VoiceRecorder.tsx` - Voice recording with duration tracking
- `src/components/ImageUploader.tsx` - Image upload & preview
- `src/components/TextRant.tsx` - Text input with character counter
- `src/components/HeadspaceSummary.tsx` - Result display (ready for Phase 2)

### Backend/API
- `src/api/ollama.ts` - Ollama client utilities (generateWithGemma, streaming, etc.)
- `src/pages/api/analyze.ts` - API route for Gemma-based thought analysis

### Styling
- `src/styles/globals.css` - Global styles, Tailwind config, custom animations
- `tailwind.config.js` - Color palette (calm-blue, mindful-green)
- `.env.local` - Ollama URL and model configuration

## How to Continue Development

### Setup (First Time)
```bash
# 1. Install dependencies
npm install

# 2. Ensure Ollama is running
ollama serve  # In separate terminal

# 3. Pull Gemma model if not present
ollama pull gemma

# 4. Start dev server
npm run dev
```

### Next Phases to Implement

#### Phase 2: AI Analysis & Headspace Summary
1. Currently the `/api/analyze` endpoint is stubbed
2. Replace mock response with actual Ollama call
3. Display HeadspaceSummary component after processing
4. Prompt engineering for better summaries

#### Phase 3: Three Processing Modes
- **Option A (Empathy Mode)**: Build conversational chat interface
  - Component: `src/components/EmpathyChat.tsx`
  - API: `src/pages/api/empathy.ts`
  
- **Option B (Analytical Mode)**: Deconstruct thoughts into:
  - Core Triggers
  - Fact vs. Anxiety
  - Micro-Steps
  - Component: `src/components/AnalyticalBreakdown.tsx`
  - API: `src/pages/api/breakdown.ts`
  
- **Option C (Visual Mode)**: Mind Map visualization
  - Library recommendation: `react-flow-renderer` or `vis-network`
  - Component: `src/components/MindMap.tsx`
  - API: `src/pages/api/mindmap.ts`

#### Phase 4: Thought History & Archive
- Database integration (SQLite, PostgreSQL, or similar)
- Past thoughts archive view
- Search & filter functionality

#### Phase 5: Insights & Analytics
- Emotion tracking over time
- Identifying recurring themes
- Growth insights

## Code Style & Conventions
- **Language**: TypeScript with strict mode
- **Components**: Functional components with hooks
- **Styling**: Tailwind CSS with custom color palette
- **State Management**: Zustand (prepared, not yet used)
- **Formatting**: Prettier (on save)
- **Linting**: ESLint with Next.js rules

### Commands
```bash
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code
npm run type-check   # TypeScript check
```

## UI/UX Guidelines

### Calming Color Palette
```
Primary (Blues):     calm-50 to calm-900
Secondary (Greens):  mindful-50 to mindful-900
Success States:      Use mindful-green
Error/Warning:       Use soft red (not harsh)
```

### Component Classes
- `.btn-primary` - Main action buttons
- `.btn-secondary` - Secondary actions
- `.btn-icon` - Icon buttons (rounded)
- `.input-field` - Input elements
- `.card` - Content containers
- `.animate-fadeIn` - Fade animations
- `.animate-slideUp` - Slide up animations

## Ollama Integration Notes

### Environment Variables
```env
NEXT_PUBLIC_OLLAMA_URL=http://localhost:11434
NEXT_PUBLIC_OLLAMA_MODEL=gemma
```

### API Response Format
All Ollama responses follow this pattern:
```typescript
interface OllamaGenerateResponse {
  model: string;
  response: string;  // The generated text
  done: boolean;
  // ... other metadata
}
```

### Error Handling
- Check Ollama availability before processing
- Display user-friendly errors if Ollama is not running
- Log detailed errors for debugging

## Testing Notes
- Components use React hooks and refs (no complex mocking needed)
- Test voice recording with mock MediaRecorder
- Test image upload with File API mocks
- Test Ollama API calls with fetch mocks

## Performance Considerations
- Voice recording limited by browser audio constraints
- Image upload size validation recommended
- Text input limit: 5000 chars (enforced)
- Ollama response streaming for long responses

## Known Limitations
- Camera capture feature prepared but not fully implemented
- Audio transcription requires additional setup (external API or library)
- No offline support yet for Ollama fallback
- Single-user local app (no backend database yet)

## Deployment Notes
- Ollama must run on the same machine as the Next.js app
- CORS may need configuration if deploying to different server
- Environment variables must be set on deployment server
- Consider Vercel deployment with separate Ollama instance

## Resources
- [Ollama Docs](https://github.com/jmorganca/ollama)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Google Gemma](https://ai.google.dev/gemma)

---

## Development Workflow Checklist
- [ ] Feature branch created from `main`
- [ ] Component implemented with TypeScript
- [ ] Styled with Tailwind CSS
- [ ] API route created if needed
- [ ] Error handling added
- [ ] Console errors checked
- [ ] Code formatted with Prettier
- [ ] TypeScript strict mode passes
- [ ] ESLint passes
- [ ] Tested in browser
- [ ] PR with description created

---

**Last Updated**: May 29, 2026
