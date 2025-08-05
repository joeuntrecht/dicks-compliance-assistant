import { useState } from 'react';
import ProductInput from './components/ProductInput';
import './App.css';

function App() {
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleAnalyze = (productData) => {
    console.log('Analyzing product:', productData);
    // We'll build the analysis logic next
    setAnalysisResults(productData);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Dick's Sporting Goods - Smart Compliance Assistant</h1>
      </header>
      <main className="app-main">
        <div className="container">
          <ProductInput onAnalyze={handleAnalyze} />
          
          {analysisResults && (
            <div className="analysis-results">
              <h3>Analysis Results:</h3>
              <pre>{JSON.stringify(analysisResults, null, 2)}</pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;