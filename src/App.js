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
            <ComplianceResults 
              results={analysisResults} 
              onStartOver={handleStartOver}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;