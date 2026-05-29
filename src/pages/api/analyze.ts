import type { NextApiRequest, NextApiResponse } from 'next';
import { generateWithGemma, checkOllamaAvailability } from '@/api/ollama';

interface AnalysisResponse {
  success: boolean;
  headspaceSummary?: string;
  processingMode?: string;
  error?: string;
  message?: string;
}

/**
 * API route to analyze user's thoughts using Ollama/Gemma4
 * Expected POST request with JSON body containing:
 * - text: The text rant
 * - audioTranscript: (optional) Transcribed audio text
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalysisResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Check if Ollama is available
    const isOllamaAvailable = await checkOllamaAvailability();
    if (!isOllamaAvailable) {
      return res.status(503).json({
        success: false,
        error: 'Ollama is not running. Please start Ollama with: ollama serve',
        message: 'Make sure Ollama is running on http://localhost:11434',
      });
    }

    const { text, audioTranscript } = req.body;

    if (!text && !audioTranscript) {
      return res.status(400).json({
        success: false,
        error: 'No text or audio input provided',
      });
    }

    // Combine text and audio transcript if both exist
    const combinedInput = [text, audioTranscript].filter(Boolean).join('\n\n');

    // Create a detailed prompt for Gemma4 to generate the Headspace Summary
    const prompt = `You are a compassionate and insightful therapist analyzing a person's anxious or overthinking thoughts. Your task is to create a brief, comforting "Headspace Summary" - a 2-3 sentence objective analysis of what is happening in their mind right now.

User's thoughts:
"${combinedInput}"

Instructions:
1. Identify the core emotional themes (e.g., work overwhelm, imposter syndrome, decision paralysis, relationship anxiety, fear of failure)
2. Validate their feelings while remaining grounded and objective
3. Keep it concise, warm, and calming - as if a supportive friend is speaking
4. Focus on WHAT is happening in their mind right now, not advice or solutions

Respond with ONLY the 2-3 sentence Headspace Summary, nothing else. No preamble or explanation.`;

    // Call Ollama/Gemma4 to generate the summary
    const headspaceSummary = await generateWithGemma(prompt, 0.8, 200);

    if (!headspaceSummary || headspaceSummary.trim().length === 0) {
      return res.status(500).json({
        success: false,
        error: 'Failed to generate analysis. Please try again.',
      });
    }

    res.status(200).json({
      success: true,
      headspaceSummary: headspaceSummary.trim(),
      processingMode: 'summary',
    });
  } catch (error) {
    console.error('Analysis error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    res.status(500).json({
      success: false,
      error: 'Failed to analyze thoughts.',
      message: `Details: ${errorMessage}. Ensure Ollama is running: ollama serve`,
    });
  }
}
