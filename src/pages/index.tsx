import React, { useState } from 'react';
import { CaptureScreen } from '@/components/CaptureScreen';
import { HeadspaceSummary } from '@/components/HeadspaceSummary';

interface CaptureData {
  text: string;
  audio?: Blob;
  image?: {
    file: File;
    preview: string;
  };
}

interface AnalysisResult {
  success: boolean;
  headspaceSummary?: string;
  error?: string;
  message?: string;
}

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCaptureSubmit = async (data: CaptureData) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Submit text to API endpoint
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: data.text,
          audioTranscript: data.audio ? '[Audio data captured]' : undefined,
        }),
      });

      const result: AnalysisResult = await response.json();

      if (response.ok && result.success) {
        setAnalysisResult(result);
        console.log('✅ Analysis complete:', result);
      } else {
        const errorMsg =
          result.error || 'Failed to analyze your thoughts. Please try again.';
        setError(errorMsg);
        console.error('❌ Analysis failed:', result);

        // Show additional help if Ollama is not running
        if (result.message) {
          console.error('Details:', result.message);
        }
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'An unknown error occurred';
      setError(`Connection error: ${errorMsg}`);
      console.error('Error during analysis:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToCapture = () => {
    setAnalysisResult(null);
    setError(null);
  };

  const handleProcessingMode = (mode: 'empathy' | 'analytical' | 'visual') => {
    console.log('Selected processing mode:', mode);
    // Phase 3 implementation will go here
  };

  // Show HeadspaceSummary if analysis was successful
  if (analysisResult?.success && analysisResult.headspaceSummary) {
    return (
      <main>
        <div className="min-h-screen bg-calm-900">
          <HeadspaceSummary
            summary={analysisResult.headspaceSummary}
            onSelectMode={handleProcessingMode}
            isLoading={isProcessing}
          />
          <div className="fixed bottom-6 left-6 z-50">
            <button
              onClick={handleBackToCapture}
              className="btn-secondary text-sm flex items-center gap-2"
            >
              ← Back to Capture
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Show error state if analysis failed
  if (error) {
    return (
      <main>
        <div className="min-h-screen bg-calm-900 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-calm-800 rounded-xl p-8 text-center space-y-6">
            <div className="text-5xl">⚠️</div>
            <h2 className="text-2xl font-semibold text-calm-50">
              Ollama Connection Issue
            </h2>
            <div className="text-calm-300 space-y-3">
              <p className="font-medium">{error}</p>
              <div className="bg-calm-900 rounded-lg p-4 text-left text-sm text-calm-400">
                <p className="font-mono mb-2">
                  💡 Make sure Ollama is running:
                </p>
                <pre className="text-xs bg-black p-3 rounded overflow-x-auto text-calm-200">
                  ollama serve
                </pre>
              </div>
            </div>
            <button
              onClick={handleBackToCapture}
              className="btn-primary w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Show capture screen (default state)
  return (
    <main>
      <CaptureScreen onSubmit={handleCaptureSubmit} isProcessing={isProcessing} />
    </main>
  );
}
