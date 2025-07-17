export interface Ingredient {
  name: string;
  safetyRating: 'safe' | 'caution' | 'avoid';
  concerns: string[];
  alternatives?: string[];
}

export interface AnalysisResult {
  ingredients: Ingredient[];
  overallRating: 'safe' | 'caution' | 'avoid';
  dietaryCompatibility: {
    vegan: boolean;
    vegetarian: boolean;
    keto: boolean;
    diabetic: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    nutFree: boolean;
  };
  summary: string;
}

export type DietaryType = keyof AnalysisResult['dietaryCompatibility'];

export interface UploadState {
  isUploading: boolean;
  isAnalyzing: boolean;
  hasResult: boolean;
  error: string | null;
}