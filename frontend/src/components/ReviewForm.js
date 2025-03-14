// frontend/src/components/ReviewForm.js

import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  const [url, setUrl] = useState('');
  const [initialAnalysis, setInitialAnalysis] = useState(null);
  const [selectedAspect, setSelectedAspect] = useState(null);
  const [detailedAnalysis, setDetailedAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInitialAnalysis(null);
    setDetailedAnalysis(null);

    try {
      const response = await fetch('http://localhost:8000/api/analyze-track/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze track');
      }

      setInitialAnalysis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAspectSelect = async (aspect) => {
    setLoading(true);
    setError(null);
    setSelectedAspect(aspect);
    setDetailedAnalysis(null);

    try {
      const response = await fetch('http://localhost:8000/api/analyze-track/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          url,
          aspect
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get detailed analysis');
      }

      setDetailedAnalysis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderAnalysis = () => {
    if (!initialAnalysis) return null;

    const analysisLines = initialAnalysis.analysis.split('\n').filter(line => line.trim());

    return (
      <div className="analysis-section">
        <h3>Initial Analysis</h3>
        <div className="analysis-content">
          {analysisLines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        
        <div className="aspects-section">
          <h3>Discuss Specific Aspects</h3>
          <div className="aspect-buttons">
            {initialAnalysis.available_aspects.map((aspect) => (
              <button
                key={aspect}
                onClick={() => handleAspectSelect(aspect)}
                className={`aspect-button ${selectedAspect === aspect ? 'selected' : ''}`}
              >
                {aspect}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDetailedAnalysis = () => {
    if (!detailedAnalysis) return null;

    return (
      <div className="detailed-analysis-section">
        <h3>Detailed Analysis: {detailedAnalysis.aspect}</h3>
        <div className="detailed-content">
          {detailedAnalysis.detailed_analysis.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="review-form-container">
      <h2>AI-Powered Music Review</h2>
      
      <form onSubmit={handleInitialSubmit} className="url-form">
        <div className="input-group">
          <label htmlFor="track-url">SoundCloud or Music Track URL:</label>
          <input
            id="track-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://soundcloud.com/artist/track"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Track'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading && (
        <div className="loading-message">
          Analyzing your track, please wait...
        </div>
      )}

      {renderAnalysis()}
      {renderDetailedAnalysis()}
    </div>
  );
};

export default ReviewForm;
