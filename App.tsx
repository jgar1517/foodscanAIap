import React, { useState } from 'react';
import { Utensils, Shield, Sparkles } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import DietaryFilters from './components/DietaryFilters';
import ResultsTable from './components/ResultsTable';
import ErrorFallback from './components/ErrorFallback';
import { analyzeIngredients } from './services/mockAI';
import { AnalysisResult, DietaryType, UploadState } from './types';

function App() {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    isAnalyzing: false,
    hasResult: false,
    error: null
  });
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<DietaryType[]>([]);

  const handleImageUpload = async (file: File) => {
    setUploadState({
      isUploading: true,
      isAnalyzing: true,
      hasResult: false,
      error: null
    });

    try {
      const result = await analyzeIngredients(file);
      setAnalysisResult(result);
      setUploadState({
        isUploading: false,
        isAnalyzing: false,
        hasResult: true,
        error: null
      });
    } catch (error) {
      setUploadState({
        isUploading: false,
        isAnalyzing: false,
        hasResult: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    }
  };

  const handleRetry = () => {
    setUploadState({
      isUploading: false,
      isAnalyzing: false,
      hasResult: false,
      error: null
    });
    setAnalysisResult(null);
  };

  const resetApp = () => {
    setUploadState({
      isUploading: false,
      isAnalyzing: false,
      hasResult: false,
      error: null
    });
    setAnalysisResult(null);
    setSelectedFilters([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Ingredient Safety Analyzer
                </h1>
                <p className="text-gray-600">
                  AI-powered food safety analysis for better health choices
                </p>
              </div>
            </div>
            {uploadState.hasResult && (
              <button
                onClick={resetApp}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Analyze New Product
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!uploadState.hasResult && !uploadState.error && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center py-12">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl">
                    <Utensils className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upload a Food Label for Instant Analysis
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get comprehensive ingredient safety ratings, dietary compatibility, 
                and healthier alternatives powered by advanced AI analysis.
              </p>
            </div>

            {/* Upload Section */}
            <ImageUpload
              onImageUpload={handleImageUpload}
              isUploading={uploadState.isUploading}
              isAnalyzing={uploadState.isAnalyzing}
            />

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Safety Analysis
                </h3>
                <p className="text-gray-600">
                  Get detailed safety ratings for each ingredient with potential health concerns.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                  <Utensils className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Dietary Compatibility
                </h3>
                <p className="text-gray-600">
                  Check compatibility with vegan, keto, diabetic, and other dietary requirements.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Smart Alternatives
                </h3>
                <p className="text-gray-600">
                  Discover healthier ingredient alternatives for better food choices.
                </p>
              </div>
            </div>
          </div>
        )}

        {uploadState.error && (
          <ErrorFallback
            error={uploadState.error}
            onRetry={handleRetry}
          />
        )}

        {uploadState.hasResult && analysisResult && (
          <div className="space-y-6">
            <DietaryFilters
              selectedFilters={selectedFilters}
              onFilterChange={setSelectedFilters}
            />
            <ResultsTable
              result={analysisResult}
              selectedFilters={selectedFilters}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              <strong>Disclaimer:</strong> This tool provides general information and should not replace professional medical advice.
            </p>
            <p className="text-sm">
              Always consult with healthcare professionals for specific dietary requirements or health concerns.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;