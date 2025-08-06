import { useState } from 'react';
import ProductInput from './components/ProductInput';
import ComplianceResults from './components/ComplianceResults';
import PDFParser from './components/PDFParser';
import HangerGuide from './components/HangerGuide';
import { DynamicRuleEngine } from './utils/dynamicRuleEngine';
import './App.css';

function App() {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [showPDFParser, setShowPDFParser] = useState(true); // Show by default since we need PDF data
  const [ruleEngine, setRuleEngine] = useState(new DynamicRuleEngine());
  const [dataSource, setDataSource] = useState('none');

  const handleAnalyze = (productData) => {
    if (!ruleEngine.hasValidRules()) {
      alert('Please upload a routing guide PDF first to extract compliance rules.');
      setShowPDFParser(true);
      return;
    }

    const results = ruleEngine.analyzeProduct(productData);
    setAnalysisResults(results);
  };

  const handleStartOver = () => {
    setAnalysisResults(null);
  };

  const handleDataExtracted = (extractedData) => {
    // Convert PDF data to our application format
    const convertedRules = DynamicRuleEngine.convertPdfToApplicationRules(extractedData);
    
    // Create new rule engine with extracted data
    const newRuleEngine = new DynamicRuleEngine(convertedRules);
    setRuleEngine(newRuleEngine);
    setDataSource('pdf');
    
    console.log('Rules loaded from PDF:', convertedRules);
    
    // Show success message
    const ruleCount = Object.keys(convertedRules.productRules).length + Object.keys(convertedRules.hangerChart).length;
    alert(`Success! Loaded ${ruleCount} rules from PDF. You can now analyze products.`);
  };

  const getRuleSourceDisplay = () => {
    const source = ruleEngine.getRuleSource();
    switch (source.source) {
      case 'pdf': return `📄 PDF Rules (${source.totalRules} rules loaded)`;
      case 'empty': return '⚠️ No Rules Loaded - Upload PDF';
      default: return '❓ Unknown Source';
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Dick's Sporting Goods - Smart Compliance Assistant</h1>
        <div className="header-controls">
          <div className="rule-source">
            {getRuleSourceDisplay()}
          </div>
          <button 
            onClick={() => setShowPDFParser(!showPDFParser)}
            className="toggle-parser-btn"
          >
            {showPDFParser ? 'Hide' : 'Show'} PDF Parser
          </button>
        </div>
      </header>
      <main className="app-main">
        <div className="container">
          {showPDFParser && (
            <div className="pdf-section">
              <PDFParser onDataExtracted={handleDataExtracted} />
              
              {!ruleEngine.hasValidRules() && (
                <div className="no-rules-warning">
                  <h3>⚠️ No Compliance Rules Loaded</h3>
                  <p>This application now runs entirely on PDF-extracted data. Please upload a retailer's routing guide PDF above to begin.</p>
                  <p><strong>What this demonstrates:</strong></p>
                  <ul>
                    <li>Dynamic rule system that works with any retailer</li>
                    <li>PDF parsing and data extraction capabilities</li>
                    <li>Scalable architecture beyond Dick's Sporting Goods</li>
                    <li>Real-time rule loading and application</li>
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {ruleEngine.hasValidRules() && (
            <>
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