import type { NextApiRequest, NextApiResponse } from 'next';
import { checkOllamaAvailability } from '@/api/ollama';

interface HealthResponse {
  status: 'ok' | 'error';
  ollama: {
    running: boolean;
    url: string;
    model: string;
  };
  message: string;
  timestamp: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  const ollamaUrl = process.env.NEXT_PUBLIC_OLLAMA_URL || 'http://localhost:11434';
  const model = process.env.NEXT_PUBLIC_OLLAMA_MODEL || 'gemma4:e2b';

  try {
    const isRunning = await checkOllamaAvailability();

    res.status(200).json({
      status: isRunning ? 'ok' : 'error',
      ollama: {
        running: isRunning,
        url: ollamaUrl,
        model: model,
      },
      message: isRunning
        ? `✅ Ollama is running with model ${model}`
        : `❌ Ollama not responding. Please run: ollama serve`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';

    res.status(503).json({
      status: 'error',
      ollama: {
        running: false,
        url: ollamaUrl,
        model: model,
      },
      message: `❌ Failed to connect: ${errorMsg}`,
      timestamp: new Date().toISOString(),
    });
  }
}
