import React, { useState } from 'react';

interface TextRantProps {
  onChange?: (text: string) => void;
  value?: string;
}

export const TextRant: React.FC<TextRantProps> = ({ onChange, value = '' }) => {
  const [charCount, setCharCount] = useState(0);
  const maxChars = 5000;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setCharCount(text.length);
      onChange?.(text);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 card">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-calm-100 mb-2">Text Rant</h3>
        <p className="text-sm text-calm-400">Write your unfiltered thoughts here</p>
      </div>

      <textarea
        value={value}
        onChange={handleChange}
        placeholder="Let it all out... No judgment, no filter. Write whatever&apos;s on your mind."
        className="input-field min-h-64 resize-none placeholder-calm-600 focus:placeholder-calm-700"
        aria-label="Text rant input"
      />

      <div className="flex justify-between items-center text-xs text-calm-500">
        <span>{charCount} / {maxChars} characters</span>
        {charCount > 3500 && (
          <span className="text-calm-400">✓ You&apos;re getting it all out!</span>
        )}
      </div>
    </div>
  );
};
