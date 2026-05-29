// Ollama API configuration and helper functions
// Ensure Ollama is running locally on http://localhost:11434
// Model: gemma4:e2b (7.2 GB)

const OLLAMA_API_URL = process.env.NEXT_PUBLIC_OLLAMA_URL || 'http://localhost:11434';
const MODEL = process.env.NEXT_PUBLIC_OLLAMA_MODEL || 'gemma4:e2b';

interface OllamaGenerateRequest {
  model: string;
  prompt: string;
  stream?: boolean;
  temperature?: number;
  top_k?: number;
  top_p?: number;
  num_predict?: number;
}

interface OllamaGenerateResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

/**
 * Generate text using Ollama's local Gemma4 model
 * @param prompt The prompt to send to the model
 * @param temperature Controls randomness (0-1, default 0.8)
 * @param numPredict Number of tokens to generate (default 200)
 */
export async function generateWithGemma(
  prompt: string,
  temperature = 0.8,
  numPredict = 200
): Promise<string> {
  try {
    console.log(`🧠 Calling Ollama at ${OLLAMA_API_URL} with model: ${MODEL}`);

    const request: OllamaGenerateRequest = {
      model: MODEL,
      prompt,
      stream: false,
      temperature,
      num_predict: numPredict,
      top_k: 40,
      top_p: 0.9,
    };

    const response = await fetch(`${OLLAMA_API_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(
        `Ollama API error: ${response.status} ${response.statusText}`
      );
    }

    const data: OllamaGenerateResponse = await response.json();

    if (!data.response) {
      throw new Error('Empty response from Ollama');
    }

    console.log('✅ Ollama response received successfully');
    return data.response.trim();
  } catch (error) {
    console.error('❌ Error calling Ollama:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        `Cannot connect to Ollama at ${OLLAMA_API_URL}. Is Ollama running? Try: ollama serve`
      );
    }

    throw error;
  }
}

/**
 * Check if Ollama is available and the model is loaded
 */
export async function checkOllamaAvailability(): Promise<boolean> {
  try {
    console.log(`🔍 Checking Ollama availability at ${OLLAMA_API_URL}...`);
    const response = await fetch(`${OLLAMA_API_URL}/api/tags`);
    const isAvailable = response.ok;

    if (isAvailable) {
      const data = await response.json();
      const modelExists = data.models?.some(
        (m: any) => m.name === MODEL || m.name === `${MODEL}:latest`
      );

      if (modelExists) {
        console.log(`✅ Ollama available with model ${MODEL}`);
      } else {
        console.warn(
          `⚠️ Ollama available but model ${MODEL} not found. Pull it with: ollama pull ${MODEL}`
        );
      }

      return modelExists || false;
    } else {
      console.error('❌ Ollama server not responding');
      return false;
    }
  } catch (error) {
    console.error('❌ Ollama unavailable:', error);
    return false;
  }
}

/**
 * Stream response from Ollama (for real-time processing)
 */
export async function* streamGenerateWithGemma(
  prompt: string,
  temperature = 0.8
): AsyncGenerator<string, void, unknown> {
  try {
    const request: OllamaGenerateRequest = {
      model: MODEL,
      prompt,
      stream: true,
      temperature,
    };

    const response = await fetch(`${OLLAMA_API_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i].trim();
        if (line) {
          try {
            const data: OllamaGenerateResponse = JSON.parse(line);
            yield data.response;
          } catch (e) {
            console.error('Failed to parse streaming response:', e);
          }
        }
      }

      buffer = lines[lines.length - 1];
    }
  } catch (error) {
    console.error('❌ Error in streaming generation:', error);
    throw error;
  }
}
