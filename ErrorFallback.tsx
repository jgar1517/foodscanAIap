import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error: string;
  onRetry: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, onRetry }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-red-100 rounded-full">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Analysis Failed
      </h3>
      
      <p className="text-gray-600 mb-6">
        {error}
      </p>
      
      <div className="space-y-4">
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
        
        <div className="bg-gray-50 rounded-lg p-4 text-left">
          <h4 className="font-medium text-gray-900 mb-2">Troubleshooting Tips:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Ensure the image is clear and well-lit</li>
            <li>• Make sure ingredient labels are visible</li>
            <li>• Try a different image format (JPG, PNG)</li>
            <li>• Check your internet connection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;