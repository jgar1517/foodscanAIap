import { AnalysisResult } from '../types';

// Mock AI service that simulates ingredient analysis
export const analyzeIngredients = async (imageFile: File): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

  // Simulate potential API failures (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Unable to process image. Please ensure the ingredient label is clearly visible and try again.');
  }

  // Mock analysis results based on common ingredient scenarios
  const mockResults: AnalysisResult[] = [
    {
      ingredients: [
        {
          name: 'Organic Wheat Flour',
          safetyRating: 'safe',
          concerns: [],
          alternatives: ['Almond Flour', 'Rice Flour']
        },
        {
          name: 'Cane Sugar',
          safetyRating: 'caution',
          concerns: ['High glycemic index', 'May cause blood sugar spikes'],
          alternatives: ['Stevia', 'Monk Fruit', 'Erythritol']
        },
        {
          name: 'Palm Oil',
          safetyRating: 'caution',
          concerns: ['Environmental concerns', 'High in saturated fat'],
          alternatives: ['Coconut Oil', 'Olive Oil']
        },
        {
          name: 'Natural Vanilla Extract',
          safetyRating: 'safe',
          concerns: [],
        }
      ],
      overallRating: 'caution',
      dietaryCompatibility: {
        vegan: false,
        vegetarian: true,
        keto: false,
        diabetic: false,
        glutenFree: false,
        dairyFree: true,
        nutFree: true
      },
      summary: 'This product contains some ingredients that may require caution, particularly for those monitoring sugar intake or following specific diets.'
    },
    {
      ingredients: [
        {
          name: 'Organic Almonds',
          safetyRating: 'safe',
          concerns: [],
        },
        {
          name: 'Sea Salt',
          safetyRating: 'safe',
          concerns: [],
        },
        {
          name: 'Organic Coconut Oil',
          safetyRating: 'safe',
          concerns: [],
        }
      ],
      overallRating: 'safe',
      dietaryCompatibility: {
        vegan: true,
        vegetarian: true,
        keto: true,
        diabetic: true,
        glutenFree: true,
        dairyFree: true,
        nutFree: false
      },
      summary: 'This product appears to be made with high-quality, minimally processed ingredients that are suitable for most dietary preferences.'
    },
    {
      ingredients: [
        {
          name: 'High Fructose Corn Syrup',
          safetyRating: 'avoid',
          concerns: ['Linked to obesity', 'May increase diabetes risk', 'Highly processed'],
          alternatives: ['Pure Maple Syrup', 'Honey', 'Date Syrup']
        },
        {
          name: 'Artificial Colors (Red 40, Yellow 6)',
          safetyRating: 'avoid',
          concerns: ['May cause hyperactivity in children', 'Potential allergen', 'Synthetic additive'],
          alternatives: ['Natural Food Coloring', 'Beet Juice', 'Turmeric']
        },
        {
          name: 'Sodium Benzoate',
          safetyRating: 'caution',
          concerns: ['Preservative', 'May form benzene when combined with vitamin C'],
          alternatives: ['Natural Preservatives', 'Rosemary Extract']
        }
      ],
      overallRating: 'avoid',
      dietaryCompatibility: {
        vegan: true,
        vegetarian: true,
        keto: false,
        diabetic: false,
        glutenFree: true,
        dairyFree: true,
        nutFree: true
      },
      summary: 'This product contains several highly processed ingredients and artificial additives that are not recommended for optimal health.'
    }
  ];

  // Return a random mock result
  return mockResults[Math.floor(Math.random() * mockResults.length)];
};