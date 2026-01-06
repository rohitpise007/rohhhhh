import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';

const DiseasePrediction = () => {
  const [symptomsData, setSymptomsData] = useState({});
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSymptoms, setIsLoadingSymptoms] = useState(true);
  const [topK, setTopK] = useState(5);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.5);
  const [showResults, setShowResults] = useState(false);

  // Load symptoms data on component mount
  useEffect(() => {
    loadSymptoms();
  }, []);

  const loadSymptoms = async () => {
    try {
      setIsLoadingSymptoms(true);
      const response = await axios.get('/disease/symptoms');
      setSymptomsData(response.data);
    } catch (error) {
      console.error('Error loading symptoms:', error);
      toast.error('Failed to load symptoms data');
    } finally {
      setIsLoadingSymptoms(false);
    }
  };

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptom)) {
        return prev.filter(s => s !== symptom);
      } else {
        return [...prev, symptom];
      }
    });
  };

  const handleCategoryClear = (category) => {
    const categorySymptoms = symptomsData[category] || [];
    setSelectedSymptoms(prev => prev.filter(s => !categorySymptoms.includes(s)));
  };

  const handleClearAll = () => {
    setSelectedSymptoms([]);
    setPredictions([]);
    setShowResults(false);
  };

  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) {
      toast.warning('Please select at least one symptom');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post('/disease/predict', {
        symptoms: selectedSymptoms,
        top_k: topK,
        confidence_threshold: confidenceThreshold
      });

      setPredictions(response.data.predictions || []);
      setShowResults(true);
      toast.success('Prediction completed successfully!');
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error(error.response?.data?.error || 'Prediction failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceColor = (probability, threshold) => {
    if (probability >= threshold) return 'text-green-600';
    if (probability >= threshold * 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoadingSymptoms) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3">Loading symptoms data...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Disease Prediction
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Select your symptoms from the categories below and our AI will provide disease predictions
            based on medical data. This tool is for informational purposes only and should not replace
            professional medical advice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Symptoms Selection Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Select Your Symptoms
                </h2>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="mb-4">
                <span className="text-sm text-gray-600">
                  Selected symptoms: <strong>{selectedSymptoms.length}</strong>
                </span>
              </div>

              {/* Symptoms Categories */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {Object.entries(symptomsData).map(([category, symptoms]) => (
                  <div key={category} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-medium text-gray-900">{category}</h3>
                      <button
                        onClick={() => handleCategoryClear(category)}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Clear category
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {symptoms.map((symptom) => (
                        <label key={symptom} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedSymptoms.includes(symptom)}
                            onChange={() => handleSymptomToggle(symptom)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{symptom}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Prediction Settings and Results Panel */}
          <div className="space-y-6">
            {/* Settings Panel */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Prediction Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of predictions to show: {topK}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={topK}
                    onChange={(e) => setTopK(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confidence threshold: {(confidenceThreshold * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="0.9"
                    step="0.1"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <button
                  onClick={handlePredict}
                  disabled={isLoading || selectedSymptoms.length === 0}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Predicting...
                    </div>
                  ) : (
                    'Get Predictions'
                  )}
                </button>
              </div>
            </div>

            {/* Results Panel */}
            {showResults && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Prediction Results
                </h3>

                {predictions.length === 0 ? (
                  <p className="text-gray-600">No predictions available</p>
                ) : (
                  <div className="space-y-3">
                    {predictions.map((prediction, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">
                            {prediction.disease}
                          </h4>
                          <span className={`text-sm font-medium px-2 py-1 rounded ${
                            prediction.confidence_level === 'High'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {prediction.confidence_level}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${
                                prediction.probability >= confidenceThreshold
                                  ? 'bg-green-500'
                                  : prediction.probability >= confidenceThreshold * 0.7
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${prediction.probability * 100}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${getConfidenceColor(prediction.probability, confidenceThreshold)}`}>
                            {(prediction.probability * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>⚠️ Medical Disclaimer:</strong> This AI prediction tool is for informational purposes only.
                    Please consult with a qualified healthcare professional for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseasePrediction;