import React from 'react';
import { DietaryType } from '../types';

interface DietaryFiltersProps {
  selectedFilters: DietaryType[];
  onFilterChange: (filters: DietaryType[]) => void;
}

const DietaryFilters: React.FC<DietaryFiltersProps> = ({ selectedFilters, onFilterChange }) => {
  const dietaryOptions: { key: DietaryType; label: string; color: string }[] = [
    { key: 'vegan', label: 'Vegan', color: 'bg-green-100 text-green-800' },
    { key: 'vegetarian', label: 'Vegetarian', color: 'bg-green-100 text-green-800' },
    { key: 'keto', label: 'Keto', color: 'bg-purple-100 text-purple-800' },
    { key: 'diabetic', label: 'Diabetic-Friendly', color: 'bg-blue-100 text-blue-800' },
    { key: 'glutenFree', label: 'Gluten-Free', color: 'bg-yellow-100 text-yellow-800' },
    { key: 'dairyFree', label: 'Dairy-Free', color: 'bg-orange-100 text-orange-800' },
    { key: 'nutFree', label: 'Nut-Free', color: 'bg-red-100 text-red-800' },
  ];

  const handleFilterToggle = (filter: DietaryType) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter];
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Dietary Filters</h3>
      <div className="flex flex-wrap gap-2">
        {dietaryOptions.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => handleFilterToggle(key)}
            className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedFilters.includes(key)
                ? `${color} ring-2 ring-offset-2 ring-opacity-50`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {selectedFilters.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Filtering by: {selectedFilters.length} dietary requirement{selectedFilters.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default DietaryFilters;