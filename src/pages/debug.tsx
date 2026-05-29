import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface HealthStatus {
  status: 'ok' | 'error';
  ollama: {
    running: boolean;
    url: string;
    model: string;
  };
  message: string;
  timestamp: string;
}

export default function Debug() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/health');
      const data: HealthStatus = await response.json();
      setHealth(data);
      console.log('Health check response:', data);
    } catch (error) {
      console.error('Health check failed:', error);
      setHealth({
        status: 'error',
        ollama: {
          running: false,
          url: 'http://localhost:11434',
          model: 'gemma4:e2b',
        },
        message: `Connection error: ${error instanceof Error ? error.message : 'Unknown'}`,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const testAnalyzeAPI = async () => {
    setTestResult('Testing...');
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: 'Test input to check if Ollama is working',
          audioTranscript: undefined,
        }),
      });

      const data = await response.json();
      console.log('Analyze API response:', data);

      if (data.success) {
        setTestResult(
          `✅ Success!\nSummary: ${data.headspaceSummary}`
        );
      } else {
        setTestResult(
          `❌ Error: ${data.error}\nDetails: ${data.message || 'No details'}`
        );
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'Unknown error';
      setTestResult(`❌ Request failed: ${errorMsg}`);
      console.error('Analyze API error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-calm-900 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-calm-50 mb-2">
            🔧 Second Mind Debug
          </h1>
          <p className="text-calm-400">Troubleshoot Ollama connection</p>
        </div>

        {/* Health Status Card */}
        <div className="bg-calm-800 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-calm-100">System Status</h2>

          {loading ? (
            <div className="text-calm-400 text-center py-8">
              <div className="inline-block animate-pulse text-3xl">⏳</div>
              <p>Checking connection...</p>
            </div>
          ) : health ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-calm-700 rounded">
                <span className="text-calm-300">Status:</span>
                <span
                  className={`font-mono ${
                    health.status === 'ok'
                      ? 'text-mindful-400'
                      : 'text-red-400'
                  }`}
                >
                  {health.status === 'ok' ? '✅ OK' : '❌ ERROR'}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-calm-700 rounded">
                <span className="text-calm-300">Ollama Running:</span>
                <span
                  className={
                    health.ollama.running
                      ? 'text-mindful-400'
                      : 'text-red-400'
                  }
                >
                  {health.ollama.running ? '✅ Yes' : '❌ No'}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-calm-700 rounded">
                <span className="text-calm-300">URL:</span>
                <span className="text-calm-200 font-mono text-sm">
                  {health.ollama.url}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-calm-700 rounded">
                <span className="text-calm-300">Model:</span>
                <span className="text-calm-200 font-mono text-sm">
                  {health.ollama.model}
                </span>
              </div>

              <div className="p-3 bg-calm-700 rounded">
                <p className="text-calm-300 text-sm">{health.message}</p>
              </div>

              <div className="text-xs text-calm-600 text-right">
                {health.timestamp}
              </div>
            </div>
          ) : null}

          <button
            onClick={checkHealth}
            className="w-full btn-secondary mt-4"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Test Analyze API */}
        {health?.ollama.running && (
          <div className="bg-calm-800 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-calm-100">Test Analysis</h2>
            <p className="text-calm-400 text-sm">
              Send a test request to the analyze endpoint to verify Gemma4:e2b
              is working.
            </p>

            {testResult && (
              <div className="bg-calm-900 rounded-lg p-4 text-calm-200 whitespace-pre-wrap text-sm font-mono">
                {testResult}
              </div>
            )}

            <button onClick={testAnalyzeAPI} className="w-full btn-primary">
              📊 Test /api/analyze
            </button>
          </div>
        )}

        {/* Troubleshooting Guide */}
        <div className="bg-calm-800 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-calm-100">
            🛠️ Troubleshooting
          </h2>

          <div className="space-y-3 text-sm text-calm-300">
            <div className="border border-calm-600 rounded p-3">
              <p className="font-semibold text-calm-100 mb-1">
                Ollama Not Running?
              </p>
              <code className="text-xs bg-calm-900 p-2 rounded block mt-2">
                ollama serve
              </code>
            </div>

            <div className="border border-calm-600 rounded p-3">
              <p className="font-semibold text-calm-100 mb-1">
                Model Not Found?
              </p>
              <code className="text-xs bg-calm-900 p-2 rounded block mt-2">
                ollama pull gemma4:e2b
              </code>
            </div>

            <div className="border border-calm-600 rounded p-3">
              <p className="font-semibold text-calm-100 mb-1">
                Port 11434 Already in Use?
              </p>
              <p className="mt-2">
                Another Ollama instance is running. Either stop it or set a
                different port in .env.local
              </p>
            </div>

            <div className="border border-calm-600 rounded p-3">
              <p className="font-semibold text-calm-100 mb-1">
                Check Environment Variables
              </p>
              <code className="text-xs bg-calm-900 p-2 rounded block mt-2">
                NEXT_PUBLIC_OLLAMA_URL=http://localhost:11434
                <br />
                NEXT_PUBLIC_OLLAMA_MODEL=gemma4:e2b
              </code>
            </div>
          </div>
        </div>

        {/* Back to App */}
        <div className="text-center">
          <Link href="/" className="btn-primary inline-block">
            ← Back to App
          </Link>
        </div>
      </div>
    </div>
  );
}
