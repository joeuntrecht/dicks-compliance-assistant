import { useState } from 'react';
import { parseRoutingGuide } from '../utils/pdfProcessor';

function PDFParser({ onDataExtracted }) {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const extractedData = await parseRoutingGuide(file);
      setResults(extractedData);
      onDataExtracted(extractedData);
    } catch (err) {
      setError(`Processing failed: ${err.message}`);
      console.error('PDF processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadExtractedData = () => {
    if (!results) return;
    
    // Create downloadable files
    const hangerData = `export const hangerChart = ${JSON.stringify(results.hangerChart, null, 2)};`;
    const productData = `export const productRules = ${JSON.stringify(results.productRules, null, 2)};`;
    
    // Download hanger chart
    const hangerBlob = new Blob([hangerData], { type: 'text/javascript' });
    const hangerUrl = URL.createObjectURL(hangerBlob);
    const hangerLink = document.createElement('a');
    hangerLink.href = hangerUrl;
    hangerLink.download = 'hangerChart.js';
    hangerLink.click();
    
    // Download product rules
    const productBlob = new Blob([productData], { type: 'text/javascript' });
    const productUrl = URL.createObjectURL(productBlob);
    const productLink = document.createElement('a');
    productLink.href = productUrl;
    productLink.download = 'productRules.js';
    productLink.click();
    
    // Cleanup
    URL.revokeObjectURL(hangerUrl);
    URL.revokeObjectURL(productUrl);
  };

  return (
    <div className="pdf-parser">
      <h3>📄 Routing Guide PDF Parser</h3>
      <p className="parser-description">
        Upload a retailer's routing guide PDF to automatically extract compliance rules and hanger specifications.
      </p>

      <div className="upload-section">
        <div className="file-input-container">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="file-input"
            id="pdf-upload"
          />
          <label htmlFor="pdf-upload" className="file-label">
            {file ? file.name : "Choose PDF File"}
          </label>
        </div>

        <button 
          onClick={handleProcess}
          disabled={!file || isProcessing}
          className="process-btn"
        >
          {isProcessing ? 'Processing...' : 'Extract Data'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {isProcessing && (
        <div className="processing-status">
          <div className="spinner"></div>
          <div className="status-text">
            <p>Processing PDF... This may take a few moments.</p>
            <p>Extracting hanger specifications, VAS requirements, and compliance rules...</p>
          </div>
        </div>
      )}

      {results && (
        <div className="results-summary">
          <h4>✅ Extraction Complete!</h4>
          <div className="extraction-stats">
            <div className="stat">
              <span className="stat-number">{Object.keys(results.hangerChart || {}).length}</span>
              <span className="stat-label">Hanger Types Found</span>
            </div>
            <div className="stat">
              <span className="stat-number">{Object.keys(results.productRules || {}).length}</span>
              <span className="stat-label">Product Categories</span>
            </div>
            <div className="stat">
              <span className="stat-number">{results.penaltyRules?.length || 0}</span>
              <span className="stat-label">Penalty Rules</span>
            </div>
          </div>

          <div className="preview-section">
            <h5>Preview of Extracted Data:</h5>
            <div className="data-preview">
              {results.hangerChart && Object.keys(results.hangerChart).length > 0 && (
                <div className="preview-item">
                  <strong>Sample Hanger Types:</strong>
                  {Object.entries(results.hangerChart).slice(0, 3).map(([code, info]) => (
                    <div key={code} className="sample-item">
                      {code}: {info.name}
                    </div>
                  ))}
                </div>
              )}
              
              {results.productRules && Object.keys(results.productRules).length > 0 && (
                <div className="preview-item">
                  <strong>Sample Product Rules:</strong>
                  {Object.keys(results.productRules).slice(0, 3).map(category => (
                    <div key={category} className="sample-item">
                      {category.replace('-', ' ').toUpperCase()}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={downloadExtractedData} className="download-btn">
              📥 Download Extracted Files
            </button>
            <button 
              onClick={() => onDataExtracted(results)} 
              className="use-data-btn"
            >
              🔄 Use This Data in App
            </button>
          </div>
        </div>
      )}

      <div className="feature-info">
        <h5>🤖 What This Parser Extracts:</h5>
        <ul>
          <li><strong>Hanger Specifications:</strong> Types, usage rules, and presentation requirements</li>
          <li><strong>VAS Requirements:</strong> Product-specific hanging, folding, and packaging rules</li>
          <li><strong>Penalty Structures:</strong> Compliance violation costs and fee schedules</li>
          <li><strong>Order Type Rules:</strong> Packing requirements for different order types</li>
          <li><strong>Special Instructions:</strong> Product-specific exceptions and guidelines</li>
        </ul>
        <p className="disclaimer">
          <em>Note: Parser uses pattern recognition and may require manual review for complex documents.</em>
        </p>
      </div>
    </div>
  );
}

export default PDFParser;