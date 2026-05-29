import React, { useState } from 'react';

interface HeadspaceSummaryProps {
  summary: string;
  onSelectMode?: (mode: 'empathy' | 'analytical' | 'visual') => void;
  isLoading?: boolean;
}

export const HeadspaceSummary: React.FC<HeadspaceSummaryProps> = ({
  summary,
  onSelectMode,
  isLoading = false,
}) => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const handleModeSelect = (mode: 'empathy' | 'analytical' | 'visual') => {
    setSelectedMode(mode);
    onSelectMode?.(mode);
  };

  return (
    <div className="flex flex-col h-screen bg-calm-900">
      {/* Header */}
      <div className="bg-gradient-to-b from-calm-800 to-calm-900 p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-calm-50 mb-1">Headspace Summary</h1>
        <p className="text-calm-400 text-sm">Your thinking analyzed</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-6 space-y-8">
          {/* Summary Card */}
          <div className="card">
            <p className="text-calm-100 text-lg leading-relaxed">{summary}</p>
          </div>

          {/* Processing Mode Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-calm-50">How would you like to process this?</h2>
            <p className="text-calm-400 text-sm">Choose how to work through your thoughts:</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Empathy Mode */}
              <button
                onClick={() => handleModeSelect('empathy')}
                disabled={isLoading}
                className={`group p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedMode === 'empathy'
                    ? 'border-calm-400 bg-calm-800'
                    : 'border-calm-700 bg-calm-800 hover:border-calm-500'
                } disabled:opacity-50`}
              >
                <div className="text-3xl mb-3">💚</div>
                <h3 className="font-semibold text-calm-50 mb-2">Friendly Discussion</h3>
                <p className="text-calm-400 text-sm">
                  Talk it through with a warm, supportive friend
                </p>
              </button>

              {/* Analytical Mode */}
              <button
                onClick={() => handleModeSelect('analytical')}
                disabled={isLoading}
                className={`group p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedMode === 'analytical'
                    ? 'border-calm-400 bg-calm-800'
                    : 'border-calm-700 bg-calm-800 hover:border-calm-500'
                } disabled:opacity-50`}
              >
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="font-semibold text-calm-50 mb-2">The Breakdown</h3>
                <p className="text-calm-400 text-sm">
                  Deconstruct it into facts vs. anxiety
                </p>
              </button>

              {/* Visual Mode */}
              <button
                onClick={() => handleModeSelect('visual')}
                disabled={isLoading}
                className={`group p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedMode === 'visual'
                    ? 'border-calm-400 bg-calm-800'
                    : 'border-calm-700 bg-calm-800 hover:border-calm-500'
                } disabled:opacity-50`}
              >
                <div className="text-3xl mb-3">🗺️</div>
                <h3 className="font-semibold text-calm-50 mb-2">Mind Map</h3>
                <p className="text-calm-400 text-sm">
                  Visualize your thoughts as a network
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-calm-800 border-t border-calm-700 p-6 shadow-lg">
        <div className="max-w-2xl mx-auto text-center text-calm-400 text-sm">
          {selectedMode ? (
            <p>✨ Loading your {selectedMode} view...</p>
          ) : (
            <p>Select a mode above to continue exploring your thoughts</p>
          )}
        </div>
      </div>
    </div>
  );
};
