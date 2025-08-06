import PenaltyCalculator from './PenaltyCalculator';

function ComplianceResults({ results, onStartOver }) {
  if (!results) return null;

  const { productInfo, checklist, riskAssessment } = results;

  const getRiskColor = (level) => {
    switch (level) {
      case 'HIGH': return '#dc2626';
      case 'MEDIUM': return '#d97706';
      case 'LOW': return '#059669';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Hanging': return '👔';
      case 'Ticketing': return '🏷️';
      case 'Packaging': return '📦';
      case 'Documentation': return '📋';
      case 'Labeling': return '🏷️';
      default: return '✓';
    }
  };

  const groupedChecklist = checklist.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="compliance-results">
      <div className="results-header">
        <h2>Compliance Analysis Results</h2>
        <div className="risk-badge" style={{ backgroundColor: getRiskColor(riskAssessment.riskLevel) }}>
          {riskAssessment.riskLevel} RISK
        </div>
      </div>

      <div className="product-summary">
        <h3>Product Information</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="label">Category:</span>
            <span className="value">{productInfo.category.replace('-', ' ').toUpperCase()}</span>
          </div>
          <div className="summary-item">
            <span className="label">Gender/Age:</span>
            <span className="value">{productInfo.gender.toUpperCase()}</span>
          </div>
          <div className="summary-item">
            <span className="label">Order Type:</span>
            <span className="value">{productInfo.orderType.replace('-', ' ').toUpperCase()}</span>
          </div>
          <div className="summary-item">
            <span className="label">Destination:</span>
            <span className="value">{productInfo.destination.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="risk-summary">
        <h3>Risk Assessment</h3>
        <div className="risk-stats">
          <div className="risk-stat">
            <div className="stat-number">{riskAssessment.criticalRequirements}</div>
            <div className="stat-label">Critical Requirements</div>
          </div>
          <div className="risk-stat">
            <div className="stat-number">{checklist.length}</div>
            <div className="stat-label">Total Requirements</div>
          </div>
          <div className="risk-stat">
            <div className="stat-number">${riskAssessment.estimatedPenaltyExposure}</div>
            <div className="stat-label">Penalty Exposure</div>
          </div>
        </div>
      </div>

      <div className="compliance-checklist">
        <h3>Compliance Checklist</h3>
        {Object.entries(groupedChecklist).map(([category, items]) => (
          <div key={category} className="checklist-category">
            <h4 className="category-header">
              <span className="category-icon">{getCategoryIcon(category)}</span>
              {category}
              <span className="item-count">({items.length} item{items.length !== 1 ? 's' : ''})</span>
            </h4>
            <div className="checklist-items">
              {items.map((item, index) => (
                <div key={index} className={`checklist-item ${item.critical ? 'critical' : 'standard'}`}>
                  <div className="item-content">
                    <div className="requirement-text">{item.requirement}</div>
                    {item.critical && (
                      <div className="penalty-info">
                        <strong>Penalty if missed:</strong> {item.penaltyIfMissed}
                      </div>
                    )}
                  </div>
                  <div className="item-status">
                    {item.critical && <span className="critical-badge">CRITICAL</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <PenaltyCalculator checklist={checklist} />

      <div className="action-buttons">
        <button 
          className="btn-print"
          onClick={() => window.print()}
        >
          Print Checklist
        </button>
        <button 
          className="btn-start-over"
          onClick={onStartOver}
        >
          Start New Analysis
        </button>
      </div>
    </div>
  );
}

export default ComplianceResults;