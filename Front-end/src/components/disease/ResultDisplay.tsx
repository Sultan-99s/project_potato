import React from 'react';
import { Loader2, ThumbsUp, AlertTriangle } from 'lucide-react';

interface ClassificationResult {
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
}

interface ResultDisplayProps {
  isAnalyzing: boolean;
  result: ClassificationResult | null;
  image: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isAnalyzing, result, image }) => {
  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full">
        <Loader2 className="h-10 w-10 text-green-600 animate-spin mb-4" />
        <p className="text-lg text-gray-700">Analyzing leaf image...</p>
        <p className="text-sm text-gray-500 mt-2">This will only take a few seconds</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-64 border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500 text-center">
          Upload a leaf image to see the analysis results
        </p>
      </div>
    );
  }

  const isHealthy = result.disease === "Healthy";
  const confidencePercentage = Math.round(result.confidence * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          {isHealthy ? (
            <>
              <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-700">{result.disease}</span>
            </>
          ) : (
            <>
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-amber-700">{result.disease}</span>
            </>
          )}
        </h3>
        <span className="text-sm font-medium px-2 py-1 rounded-full bg-gray-100">
          {confidencePercentage}% confidence
        </span>
      </div>

      {image && (
        <div className="relative border rounded-md overflow-hidden max-h-48">
          <img 
            src={image} 
            alt="Analyzed leaf" 
            className="w-full h-full object-contain"
          />
        </div>
      )}

      <div className={`p-4 rounded-md ${isHealthy ? 'bg-green-50' : 'bg-amber-50'}`}>
        <h4 className="font-medium mb-2">Description:</h4>
        <p className="text-sm text-gray-700">{result.description}</p>
      </div>

      <div className="p-4 rounded-md bg-blue-50">
        <h4 className="font-medium mb-2">Recommended Treatment:</h4>
        <p className="text-sm text-gray-700">{result.treatment}</p>
      </div>
    </div>
  );
};

export default ResultDisplay;