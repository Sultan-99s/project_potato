import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload, isUploading }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0 && !isUploading) {
      const file = acceptedFiles[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onUpload(file);
    }
  }, [onUpload, isUploading]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    disabled: isUploading
  });

  const resetUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
  };

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 transition-colors duration-200 cursor-pointer relative ${
          isDragActive ? 'border-green-500 bg-green-50' : 
          isDragReject ? 'border-red-500 bg-red-50' : 
          'border-gray-300 hover:border-green-400'
        } ${isUploading ? 'opacity-70 pointer-events-none' : ''}`}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="mx-auto max-h-64 rounded-md" 
            />
            {!isUploading && (
              <button 
                onClick={resetUpload} 
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-100 transition-colors duration-200"
              >
                <X className="h-4 w-4 text-red-500" />
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">
              {isDragActive ? 'Drop the image here...' : 
                'Drag and drop a leaf image, or click to select'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supports JPG, JPEG, PNG
            </p>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-lg">
            <div className="text-center">
              <Loader2 className="h-8 w-8 text-green-600 mx-auto animate-spin" />
              <p className="mt-2 text-green-700 font-medium">Analyzing image...</p>
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
        {!preview ? (
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center mx-auto transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => document.getElementById('fileInput')?.click()}
            disabled={isUploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Image
          </button>
        ) : !isUploading ? (
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center mx-auto transition-colors duration-200"
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload New Image
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ImageUploader;