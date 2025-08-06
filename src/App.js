import { useState } from 'react';
import ProductInput from './components/ProductInput';
import ComplianceResults from './components/ComplianceResults';
import RetailerSelector from './components/RetailerSelector';
import HangerGuide from './components/HangerGuide';
import { DynamicRuleEngine } from './utils/dynamicRuleEngine';
import { PDFLoader } from './utils/pdfLoader';
import './App.css';

function App() {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [ruleEngine, setRuleEngine] = useState(new DynamicRuleEngine());
  const [currentRetailer, setCurrentRetailer] = useState(null);
  const [isLoadingRules, setIsLoadingRules] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = (productData) => {
    if (!ruleEngine.hasValidRules()) {
      alert('Please select a retailer first to load compliance rules.');
      return;
    }

    const results = ruleEngine.analyzeProduct(productData);
    setAnalysisResults(results);
  };

  const handleStartOver = () => {
    setAnalysisResults(null);
  };

  const handleRetailerSelected = async (retailer) => {
    setIsLoadingRules(true);
    setError(null);
    
    try {
      // Load the retailer's routing guide automatically
      const extractedData = await PDFLoader.loadRetailerRules(retailer);
      
      // Convert to application format
      const convertedRules = DynamicRuleEngine.convertPdfToApplicationRules(extractedData);
      
      // Create new rule engine with retailer data
      const newRuleEngine = new DynamicRuleEngine(convertedRules);
      setRuleEngine(newRuleEngine);
      setCurrentRetailer(retailer);
      
      console.log(`${retailer.name} rules loaded:`, convertedRules);
      
    } catch (err) {
      setError(`Failed to load ${retailer.name} compliance rules: ${err.message}`);
      console.error('Retailer loading error:', err);
    } finally {
      setIsLoadingRules(false);
    }
  };

  const getRuleSourceDisplay = () => {
    if (!currentRetailer) return '⚠️ No Retailer Selected';
    if (isLoadingRules) return `🔄 Loading ${currentRetailer.name} Rules...`;
    
    const source = ruleEngine.getRuleSource();
    return `✅ ${currentRetailer.name} Rules (${source.totalRules} rules loaded)`;
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Smart Compliance Assistant</h1>
        <div className="header-controls">
          <div className="rule-source">
            {getRuleSourceDisplay()}
          </div>
        </div>
      </header>
      <main className="app-main">
        <div className="container">
          {!currentRetailer || !ruleEngine.hasValidRules() ? (
            <>
              <RetailerSelector 
                onRetailerSelected={handleRetailerSelected}
                currentRetailer={currentRetailer?.id}
                isLoading={isLoadingRules}
              />
              
              {error && (
                <div className="error-message">
                  <h3>⚠️ Error Loading Rules</h3>
                  <p>{error}</p>
                  <button onClick={() => setError(null)}>Try Again</button>
                </div>
              )}
              
              {!currentRetailer && (
                <div className="no-retailer-warning">
                  <h3>👋 Welcome to Smart Compliance Assistant</h3>
                  <p>Select which retailer you're shipping to above, and we'll automatically load their specific compliance requirements.</p>
                  <div className="benefits-grid">
                    <div className="benefit">
                      <h4>🎯 Retailer Specific</h4>
                      <p>Get exact requirements for each retailer's routing guide</p>
                    </div>
                    <div className="benefit">
                      <h4>💰 Prevent Penalties</h4>
                      <p>Avoid $250-$500+ compliance violations</p>
                    </div>
                    <div className="benefit">
                      <h4>📋 Step-by-Step</h4>
                      <p>Get clear guidance for complex VAS requirements</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="retailer-header">
                <h2>📦 Shipping to: {currentRetailer.name}</h2>
                <button 
                  onClick={() => {
                    setCurrentRetailer(null);
                    setRuleEngine(new DynamicRuleEngine());
                    setAnalysisResults(null);
                  }}
                  className="change-retailer-btn"
                >
                  Change Retailer
                </button>
              </div>

              {!analysisResults ? (
                <ProductInput onAnalyze={handleAnalyze} />
              ) : (
                <ComplianceResults 
                  results={analysisResults} 
                  onStartOver={handleStartOver}
                />
              )}
              
              {ruleEngine.rules.hangerChart && Object.keys(ruleEngine.rules.hangerChart).length > 0 && (
                <HangerGuide hangerData={ruleEngine.rules.hangerChart} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;