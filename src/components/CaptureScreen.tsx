import React, { useState } from 'react';
import { VoiceRecorder } from './VoiceRecorder';
import { ImageUploader } from './ImageUploader';
import { TextRant } from './TextRant';

interface CaptureData {
  text: string;
  audio?: Blob;
  image?: {
    file: File;
    preview: string;
  };
}

interface CaptureScreenProps {
  onSubmit?: (data: CaptureData) => void;
  isProcessing?: boolean;
}

export const CaptureScreen: React.FC<CaptureScreenProps> = ({
  onSubmit,
  isProcessing = false,
}) => {
  const [data, setData] = useState<CaptureData>({
    text: '',
  });
  const [activeTab, setActiveTab] = useState<'combined' | 'voice' | 'image' | 'text'>(
    'combined'
  );

  const handleTextChange = (text: string) => {
    setData((prev) => ({ ...prev, text }));
  };

  const handleAudioComplete = (blob: Blob) => {
    setData((prev) => ({ ...prev, audio: blob }));
  };

  const handleImageSelect = (file: File, preview: string) => {
    setData((prev) => ({
      ...prev,
      image: { file, preview },
    }));
  };

  const hasContent =
    data.text.trim().length > 0 || data.audio || data.image;

  const handleSubmit = () => {
    if (hasContent) {
      onSubmit?.(data);
    }
  };

  const clearAll = () => {
    setData({ text: '' });
  };

  return (
    <div className="flex flex-col h-screen bg-calm-900">
      {/* Header */}
      <div className="bg-gradient-to-b from-calm-800 to-calm-900 p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-calm-50 mb-1">Second Mind</h1>
        <p className="text-calm-400 text-sm">Your external thinking space</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-6 space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 bg-calm-800 p-2 rounded-lg">
            {[
              { id: 'combined' as const, label: '💭 All', icon: '✨' },
              { id: 'voice' as const, label: '🎤 Voice' },
              { id: 'image' as const, label: '📸 Image' },
              { id: 'text' as const, label: '✍️ Text' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-calm-500 text-calm-50'
                    : 'text-calm-300 hover:bg-calm-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Views */}
          {activeTab === 'combined' && (
            <div className="space-y-6 animate-fadeIn">
              <VoiceRecorder onRecordingComplete={handleAudioComplete} />
              <ImageUploader onImageSelect={handleImageSelect} />
              <TextRant value={data.text} onChange={handleTextChange} />
            </div>
          )}

          {activeTab === 'voice' && (
            <div className="animate-fadeIn">
              <VoiceRecorder onRecordingComplete={handleAudioComplete} />
            </div>
          )}

          {activeTab === 'image' && (
            <div className="animate-fadeIn">
              <ImageUploader onImageSelect={handleImageSelect} />
            </div>
          )}

          {activeTab === 'text' && (
            <div className="animate-fadeIn">
              <TextRant value={data.text} onChange={handleTextChange} />
            </div>
          )}

          {/* Selected Inputs Summary */}
          {hasContent && (
            <div className="bg-calm-800 rounded-lg p-4 animate-fadeIn">
              <p className="text-sm text-calm-300 mb-3">Selected inputs:</p>
              <div className="flex flex-wrap gap-2">
                {data.text && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-calm-700 rounded-full text-xs text-calm-100">
                    ✍️ Text ({data.text.length} chars)
                  </span>
                )}
                {data.audio && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-calm-700 rounded-full text-xs text-calm-100">
                    🎤 Voice
                  </span>
                )}
                {data.image && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-calm-700 rounded-full text-xs text-calm-100">
                    📸 Image
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer / Action Buttons */}
      <div className="bg-calm-800 border-t border-calm-700 p-6 shadow-lg">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button
            onClick={clearAll}
            disabled={!hasContent || isProcessing}
            className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
          <button
            onClick={handleSubmit}
            disabled={!hasContent || isProcessing}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <span className="inline-block animate-spin">⏳</span>
                Processing...
              </>
            ) : (
              <>
                <span>✨</span>
                Process My Thoughts
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-calm-500 mt-3 text-center">
          All processing happens locally on your device. Your privacy is guaranteed.
        </p>
      </div>
    </div>
  );
};
