import { useState } from 'react';

function HangerGuide({ hangerData = {} }) {
  const [selectedHanger, setSelectedHanger] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Use provided hanger data or show empty state
  const hangerChart = Object.keys(hangerData).length > 0 ? hangerData : {};

  const filteredHangers = Object.entries(hangerChart).filter(([code, info]) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      code.includes(searchLower) ||
      info.name.toLowerCase().includes(searchLower) ||
      (info.usedFor && info.usedFor.some(use => use.toLowerCase().includes(searchLower)))
    );
  });

  if (Object.keys(hangerChart).length === 0) {
    return (
      <div className="hanger-guide">
        <h3>🏷️ Hanger Reference Guide</h3>
        <div className="no-data-message">
          <p>No hanger data available. Upload a routing guide PDF to extract hanger specifications.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hanger-guide">
      <h3>🏷️ Hanger Reference Guide</h3>
      <p className="guide-description">
        Hanger specifications extracted from uploaded routing guide PDF
      </p>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by hanger code, name, or product type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="hanger-search"
        />
      </div>

      <div className="hanger-grid">
        {filteredHangers.map(([code, info]) => (
          <div 
            key={code} 
            className={`hanger-card ${selectedHanger === code ? 'selected' : ''}`}
            onClick={() => setSelectedHanger(selectedHanger === code ? null : code)}
          >
            <div className="hanger-header">
              <span className="hanger-icon">{info.image || '🏷️'}</span>
              <div className="hanger-title">
                <div className="hanger-code">{code}</div>
                <div className="hanger-name">{info.name || `Hanger Type ${code}`}</div>
              </div>
            </div>
            
            <div className="hanger-uses">
              {info.usedFor && info.usedFor.slice(0, 2).map((use, index) => (
                <span key={index} className="use-tag">{use}</span>
              ))}
              {info.usedFor && info.usedFor.length > 2 && (
                <span className="use-tag more">+{info.usedFor.length - 2} more</span>
              )}
              {!info.usedFor && <span className="use-tag">General Use</span>}
            </div>

            {selectedHanger === code && (
              <div className="hanger-details">
                <div className="detail-section">
                  <strong>Description:</strong>
                  <p>{info.description || 'Standard hanger'}</p>
                </div>
                
                {info.usedFor && (
                  <div className="detail-section">
                    <strong>Used For:</strong>
                    <ul>
                      {info.usedFor.map((use, index) => (
                        <li key={index}>{use}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="detail-section">
                  <strong>Requirements:</strong>
                  <ul>
                    <li>Sizer Required: {info.sizerRequired ? '✅ Yes' : '❌ No'}</li>
                    <li>Confidence: {info.confidence || 'medium'}</li>
                    <li>Source: {info.extractedFrom || 'pdf-parser'}</li>
                  </ul>
                </div>

                {info.specialInstructions && (
                  <div className="detail-section special">
                    <strong>⚠️ Special Instructions:</strong>
                    <p>{info.specialInstructions}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredHangers.length === 0 && searchTerm && (
        <div className="no-results">
          <p>No hangers found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}

export default HangerGuide;