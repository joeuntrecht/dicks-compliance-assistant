import { useState } from 'react';
import ProductInput from './components/ProductInput';
import ComplianceResults from './components/ComplianceResults';
import { ComplianceCategorizer } from './utils/categorizer';
import './App.css';

function App() {
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleAnalyze = (productData) => {
    const results = ComplianceCategorizer.analyzeProduct(productData);
    setAnalysisResults(results);
  };

  const handleStartOver = () => {
    setAnalysisResults(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Dick's Sporting Goods - Smart Compliance Assistant</h1>
      </header>
      <main className="app-main">
        <div className="container">
          {!analysisResults ? (
            <ProductInput onAnalyze={handleAnalyze} />
          ) : (
            <ComplianceResults results={analysisResults} />
          )}
          
          {analysisResults && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <button 
                onClick={handleStartOver}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                ← Back to Product Input
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;