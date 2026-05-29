import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  onImageSelect?: (file: File, preview: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreview(result);
        setFileName(file.name);
        onImageSelect?.(file, result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const clearImage = () => {
    setPreview(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // For now, we'll just prompt the user to use their device's camera
      // In a real app, you'd create a video-to-canvas capture interface
      alert('Camera capture feature would open a camera interface here.');
    } catch (error) {
      console.error('Camera not available:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 card">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-calm-100 mb-2">Images</h3>
        <p className="text-sm text-calm-400">Add visual context to your thoughts</p>
      </div>

      {preview ? (
        <div className="relative w-full max-w-xs">
          <div className="relative w-full h-48 bg-calm-700 rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-calm-400 mt-2 truncate">{fileName}</p>
          <button
            onClick={clearImage}
            className="mt-3 w-full btn-secondary text-sm"
          >
            Remove Image
          </button>
        </div>
      ) : (
        <div className="flex gap-3 w-full">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 btn-secondary flex items-center justify-center gap-2"
          >
            <span>📁</span> Upload
          </button>
          <button
            onClick={handleCameraCapture}
            className="flex-1 btn-secondary flex items-center justify-center gap-2"
          >
            <span>📷</span> Camera
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload image"
      />
    </div>
  );
};
