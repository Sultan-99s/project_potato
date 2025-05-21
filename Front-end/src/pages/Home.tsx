import React, { useState } from 'react';
import ImageUploader from '../components/disease/ImageUploader';
import ResultDisplay from '../components/disease/ResultDisplay';
import { Leaf, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '../components/ui/toast';

interface ClassificationResult {
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
}

const hardcodedSuggestions: Record<string, { description: string; treatment: string }> = {
  "Healthy": {
    description: "This leaf shows no signs of disease. It is a healthy potato plant leaf with normal coloration and structure.",
    treatment: "Continue good farming practices including regular monitoring, proper watering, and balanced fertilization."
  },
  "Early Blight": {
    description: "Early blight is caused by the fungus Alternaria solani. It appears as dark brown spots with concentric rings forming a 'bull's-eye' pattern.",
    treatment: "Remove infected leaves, use fungicides with chlorothalonil or copper compounds, and ensure proper plant spacing for air circulation."
  },
  "Late Blight": {
    description: "Late blight is caused by the oomycete Phytophthora infestans. It appears as dark, water-soaked spots that quickly enlarge and turn purple-brown.",
    treatment: "Apply fungicides preventively, plant resistant varieties, avoid overhead irrigation, and remove infected plants promptly."
  },
  "Fungi": {
    description: "Fungal diseases can cause various spots and patches on leaves, often spreading in wet conditions.",
    treatment: "Use appropriate fungicides and avoid water on foliage when possible."
  },
  "Bacteria": {
    description: "Bacterial leaf spots are often angular and water-soaked, turning brown or black with yellow halos.",
    treatment: "Remove infected plants, avoid overhead watering, and rotate crops."
  },
  "Virus": {
    description: "Viral infections can lead to mottled or distorted leaves with stunted growth.",
    treatment: "Remove infected plants and control insect vectors like aphids or whiteflies."
  },
  "Nematode": {
    description: "Nematodes attack roots but may cause yellowing or wilting in leaves.",
    treatment: "Use nematode-resistant varieties and solarize soil before planting."
  },
  "Pest": {
    description: "Pests like beetles or caterpillars chew on leaves, leaving holes or damage.",
    treatment: "Use organic or chemical pesticides and inspect plants regularly."
  }
};

const Home: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    setResult(null);
    setImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to classify image');
      }

      const data = await response.json();

      const disease = data.class;
      const confidence = data.confidence;

      const suggestion = hardcodedSuggestions[disease] || {
        description: "No information available for this disease.",
        treatment: "Please consult an expert or extension service."
      };

      setResult({
        disease,
        confidence,
        description: suggestion.description,
        treatment: suggestion.treatment
      });

      toast({
        title: "Analysis Complete",
        description: `Detected: ${disease}`,
        variant: disease === "Healthy" ? "success" : "warning",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze image.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
          Potato Leaf Disease Detection
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload a photo of your potato plant leaf and our AI will analyze it to detect possible diseases. 
          Get instant results and treatment recommendations.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 order-1 md:order-1">
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <Leaf className="h-5 w-5 mr-2" />
            Upload Leaf Image
          </h2>
          <ImageUploader onUpload={handleImageUpload} isUploading={isAnalyzing} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 order-2 md:order-2">
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Analysis Results
          </h2>
          <ResultDisplay 
            isAnalyzing={isAnalyzing} 
            result={result} 
            image={image} 
          />
        </div>
      </div>

      <div className="bg-green-100 rounded-lg p-6 border border-green-200 mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-green-800 mb-2">Need farming advice?</h3>
            <p className="text-green-700">
              Ask our AI farming assistant about disease prevention, crop management, and more.
            </p>
          </div>
          <Link 
            to="/chat" 
            className="mt-4 sm:mt-0 flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Chat with Assistant <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
