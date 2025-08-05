import { useState } from 'react';

function PenaltyCalculator({ checklist }) {
  const [violations, setViolations] = useState({});
  const [quantities, setQuantities] = useState({
    units: 100,
    cartons: 10,
    shipments: 1
  });

  const handleViolationChange = (index, isViolated) => {
    setViolations({
      ...violations,
      [index]: isViolated
    });
  };

  const handleQuantityChange = (field, value) => {
    setQuantities({
      ...quantities,
      [field]: parseInt(value) || 0
    });
  };

  const calculatePenalty = (penaltyText, quantities) => {
    if (penaltyText === 'N/A') return 0;
    
    // Parse different penalty formats
    if (penaltyText.includes('per unit')) {
      const match = penaltyText.match(/\$(\d+(?:\.\d+)?)\s*per unit.*?\$(\d+)/);
      if (match) {
        const perUnit = parseFloat(match[1]);
        const serviceFee = parseFloat(match[2]);
        return (perUnit * quantities.units) + serviceFee;
      }
    }
    
    if (penaltyText.includes('per carton')) {
      const match = penaltyText.match(/\$(\d+(?:\.\d+)?)\s*per carton.*?\$(\d+)/);
      if (match) {
        const perCarton = parseFloat(match[1]);
        const serviceFee = parseFloat(match[2]);
        return (perCarton * quantities.cartons) + serviceFee;
      }
    }
    
    if (penaltyText.includes('per shipment') || penaltyText.includes('per bill of lading')) {
      const match = penaltyText.match(/\$(\d+)/);
      if (match) {
        return parseFloat(match[1]) * quantities.shipments;
      }
    }
    
    // Flat fee fallback
    const flatMatch = penaltyText.match(/\$(\d+)/);
    return flatMatch ? parseFloat(flatMatch[1]) : 250; // Default service fee
  };

  const getViolatedItems = () => {
    return checklist.filter((_, index) => violations[index]);
  };

  const getTotalPenalty = () => {
    return getViolatedItems().reduce((total, item, originalIndex) => {
      const checklistIndex = checklist.findIndex(checklistItem => checklistItem === item);
      if (violations[checklistIndex]) {
        return total + calculatePenalty(item.penaltyIfMissed, quantities);
      }
      return total;
    }, 0);
  };

  const violatedItems = getViolatedItems();
  const totalPenalty = getTotalPenalty();

  return (
    <div className="penalty-calculator">
      <h3>🚨 Penalty Impact Calculator</h3>
      <p className="calculator-description">
        Select compliance violations below to see the financial impact of non-compliance:
      </p>

      <div className="quantity-inputs">
        <h4>Shipment Quantities</h4>
        <div className="quantity-row">
          <div className="quantity-input">
            <label>Units:</label>
            <input 
              type="number" 
              value={quantities.units} 
              onChange={(e) => handleQuantityChange('units', e.target.value)}
              min="1"
            />
          </div>
          <div className="quantity-input">
            <label>Cartons:</label>
            <input 
              type="number" 
              value={quantities.cartons} 
              onChange={(e) => handleQuantityChange('cartons', e.target.value)}
              min="1"
            />
          </div>
          <div className="quantity-input">
            <label>Shipments:</label>
            <input 
              type="number" 
              value={quantities.shipments} 
              onChange={(e) => handleQuantityChange('shipments', e.target.value)}
              min="1"
            />
          </div>
        </div>
      </div>

      <div className="violation-checklist">
        <h4>Select Potential Violations</h4>
        {checklist.map((item, index) => (
          <div key={index} className="violation-item">
            <label className="violation-checkbox">
              <input
                type="checkbox"
                checked={violations[index] || false}
                onChange={(e) => handleViolationChange(index, e.target.checked)}
              />
              <span className="checkmark"></span>
              <div className="violation-content">
                <div className="violation-requirement">{item.requirement}</div>
                <div className="violation-penalty">
                  Penalty: {item.penaltyIfMissed}
                  {violations[index] && (
                    <span className="calculated-penalty">
                      → ${calculatePenalty(item.penaltyIfMissed, quantities).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>

      {violatedItems.length > 0 && (
        <div className="penalty-summary">
          <div className="penalty-total">
            <h4>💰 Total Penalty Impact</h4>
            <div className="total-amount">${totalPenalty.toLocaleString()}</div>
            <div className="penalty-breakdown">
              {violatedItems.length} violation{violatedItems.length !== 1 ? 's' : ''} × 
              {quantities.units} units × {quantities.cartons} cartons × {quantities.shipments} shipment{quantities.shipments !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="annual-projection">
            <h5>📈 Annual Impact Projection</h5>
            <div className="projection-scenarios">
              <div className="scenario">
                <span className="scenario-label">If this happens monthly:</span>
                <span className="scenario-value">${(totalPenalty * 12).toLocaleString()}/year</span>
              </div>
              <div className="scenario">
                <span className="scenario-label">If this happens weekly:</span>
                <span className="scenario-value">${(totalPenalty * 52).toLocaleString()}/year</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {violatedItems.length === 0 && (
        <div className="no-violations">
          <p>✅ Select violations above to see penalty calculations</p>
        </div>
      )}
    </div>
  );
}

export default PenaltyCalculator;