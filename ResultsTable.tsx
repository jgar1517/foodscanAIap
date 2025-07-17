import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { AnalysisResult, DietaryType } from '../types';

interface ResultsTableProps {
  result: AnalysisResult;
  selectedFilters: DietaryType[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ result, selectedFilters }) => {
  const getSafetyIcon = (rating: string) => {
    switch (rating) {
      case 'safe':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'caution':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'avoid':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSafetyColor = (rating: string) => {
    switch (rating) {
      case 'safe':
        return 'bg-green-50 border-green-200';
      case 'caution':
        return 'bg-yellow-50 border-yellow-200';
      case 'avoid':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getOverallRatingText = (rating: string) => {
    switch (rating) {
      case 'safe':
        return 'Generally Safe';
      case 'caution':
        return 'Use with Caution';
      case 'avoid':
        return 'Not Recommended';
      default:
        return 'Unknown';
    }
  };

  const filteredCompatibility = selectedFilters.length > 0 
    ? Object.entries(result.dietaryCompatibility).filter(([key]) => 
        selectedFilters.includes(key as DietaryType)
      )
    : Object.entries(result.dietaryCompatibility);

  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <div className={`rounded-lg border-2 p-6 ${getSafetyColor(result.overallRating)}`}>
        <div className="flex items-center space-x-3 mb-3">
          {getSafetyIcon(result.overallRating)}
          <h2 className="text-xl font-bold text-gray-900">
            {getOverallRatingText(result.overallRating)}
          </h2>
        </div>
        <p className="text-gray-700">{result.summary}</p>
      </div>

      {/* Dietary Compatibility */}
      {filteredCompatibility.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dietary Compatibility</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filteredCompatibility.map(([key, compatible]) => (
              <div
                key={key}
                className={`flex items-center space-x-2 p-3 rounded-lg ${
                  compatible ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}
              >
                {compatible ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                <span className="text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ingredients Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Ingredient Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ingredient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Safety Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Concerns
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alternatives
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {result.ingredients.map((ingredient, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {ingredient.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getSafetyIcon(ingredient.safetyRating)}
                      <span className="text-sm text-gray-900 capitalize">
                        {ingredient.safetyRating}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">
                      {ingredient.concerns.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {ingredient.concerns.map((concern, idx) => (
                            <li key={idx}>{concern}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-500 italic">No specific concerns</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">
                      {ingredient.alternatives && ingredient.alternatives.length > 0 ? (
                        <div className="space-y-1">
                          {ingredient.alternatives.map((alternative, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                            >
                              {alternative}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500 italic">None suggested</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;