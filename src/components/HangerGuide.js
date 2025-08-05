import { useState } from 'react';
import { hangerChart, tuckingRules, specialRules } from '../data/hangerChart';

function HangerGuide() {
  const [selectedHanger, setSelectedHanger] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHangers = Object.entries(hangerChart).filter(([code, info]) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      code.includes(searchLower) ||
      info.name.toLowerCase().includes(searchLower) ||
      info.usedFor.some(use => use.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="hanger-guide">
      <h3>🏷️ Hanger Reference Guide</h3>
      <p className="guide-description">
        Quick lookup for GS1 standard hanger types and usage guidelines
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
              <span className="hanger-icon">{info.image}</span>
              <div className="hanger-title">
                <div className="hanger-code">{code}</div>
                <div className="hanger-name">{info.name}</div>
              </div>
            </div>
            
            <div className="hanger-uses">
              {info.usedFor.slice(0, 2).map((use, index) => (
                <span key={index} className="use-tag">{use}</span>
              ))}
              {info.usedFor.length > 2 && (
                <span className="use-tag more">+{info.usedFor.length - 2} more</span>
              )}
            </div>

            {selectedHanger === code && (
              <div className="hanger-details">
                <div className="detail-section">
                  <strong>Description:</strong>
                  <p>{info.description}</p>
                </div>
                
                <div className="detail-section">
                  <strong>Used For:</strong>
                  <ul>
                    {info.usedFor.map((use, index) => (
                      <li key={index}>{use}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <strong>Requirements:</strong>
                  <ul>
                    <li>Sizer Required: {info.sizerRequired ? '✅ Yes' : '❌ No'}</li>
                    {info.presentation && (
                      <li>Presentation: {info.presentation} position</li>
                    )}
                    {info.tuckingRequired !== undefined && (
                      <li>Tucking: {info.tuckingRequired ? '✅ Required' : '❌ Not required'}</li>
                    )}
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

      <div className="tucking-guide">
        <h4>📐 Tucking Guidelines</h4>
        <div className="tucking-rules">
          {Object.entries(tuckingRules).map(([type, rule]) => (
            <div key={type} className="tucking-rule">
              <h5>{type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h5>
              <p><strong>When to use:</strong> {rule.sizes.join(', ')}</p>
              <p><strong>Instructions:</strong> {rule.instruction}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="special-rules">
        <h4>⚡ Special Handling Rules</h4>
        <div className="rules-grid">
          <div className="rule-category">
            <h5>Open Presentation Required:</h5>
            <ul>
              {specialRules.openPresentation.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="rule-category">
            <h5>No Sizer Required:</h5>
            <ul>
              {specialRules.noSizerRequired.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="rule-category">
            <h5>Upside-Down Hanging:</h5>
            <ul>
              {specialRules.upsideDownHanging.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HangerGuide;