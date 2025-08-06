import { useState } from 'react';

function RetailerSelector({ onRetailerSelected, currentRetailer, isLoading }) {
  const [selectedRetailer, setSelectedRetailer] = useState(currentRetailer || '');

  const availableRetailers = [
    {
      id: 'dicks',
      name: 'Dick\'s Sporting Goods',
      pdfPath: '/pdfs/dicks_guide.pdf',
      description: 'Complete VAS requirements and compliance rules'
    }
    // Future retailers can be added here:
    // { id: 'target', name: 'Target Corporation', pdfPath: '/pdfs/target_guide.pdf' }
  ];

  const handleRetailerChange = (e) => {
    const retailerId = e.target.value;
    setSelectedRetailer(retailerId);
    
    if (retailerId) {
      const retailer = availableRetailers.find(r => r.id === retailerId);
      onRetailerSelected(retailer);
    }
  };

  return (
    <div className="retailer-selector">
      <h3>📦 Retailer Selection</h3>
      <p className="selector-description">
        Select which retailer you're shipping to. The system will automatically load the appropriate compliance rules.
      </p>

      <div className="retailer-form">
        <div className="form-group">
          <label htmlFor="retailer-select">Shipping to:</label>
          <select
            id="retailer-select"
            value={selectedRetailer}
            onChange={handleRetailerChange}
            disabled={isLoading}
            className="retailer-dropdown"
          >
            <option value="">Select Retailer...</option>
            {availableRetailers.map(retailer => (
              <option key={retailer.id} value={retailer.id}>
                {retailer.name}
              </option>
            ))}
          </select>
        </div>

        {selectedRetailer && (
          <div className="retailer-info">
            <div className="selected-retailer">
              <h4>Selected: {availableRetailers.find(r => r.id === selectedRetailer)?.name}</h4>
              <p>{availableRetailers.find(r => r.id === selectedRetailer)?.description}</p>
              {isLoading && (
                <div className="loading-rules">
                  <div className="spinner"></div>
                  <span>Loading compliance rules...</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="retailer-benefits">
        <h5>🎯 What This Does:</h5>
        <ul>
          <li><strong>Automatic Rule Loading:</strong> Loads retailer-specific compliance requirements</li>
          <li><strong>Warehouse Worker Complicance Checklist:</strong> Automatically creates retailer specific compliance checklist for warehouse workers</li>
          <li><strong>No Manual Upload:</strong> Routing guides are pre-loaded and maintained</li>
          <li><strong>Always Current:</strong> Rules updated when retailers publish new guides</li>
          <li><strong>Worker Friendly:</strong> Simple selection, no PDF handling required, and easy to follow checklist</li>
        </ul>
      </div>
    </div>
  );
}

export default RetailerSelector;