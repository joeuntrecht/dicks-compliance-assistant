import { productRules, orderTypeRules, ecommerceRules } from '../data/productRules';

export class ComplianceCategorizer {
  static analyzeProduct(productData) {
    const { category, gender, size, orderType, destination } = productData;
    
    // Get base product rules
    const baseRules = this.getProductRules(category, gender);
    
    // Get order type specific rules
    const orderRules = orderTypeRules[orderType] || {};
    
    // Apply e-commerce modifications if needed
    const finalRules = orderType === 'ecommerce' 
      ? this.applyEcommerceRules(baseRules, orderRules)
      : baseRules;
    
    // Generate compliance checklist
    const checklist = this.generateChecklist(finalRules, orderRules, productData);
    
    // Calculate risk and penalties
    const riskAssessment = this.calculateRisk(checklist);
    
    return {
      productInfo: productData,
      vasRequirements: finalRules,
      orderRequirements: orderRules,
      checklist: checklist,
      riskAssessment: riskAssessment,
      timestamp: new Date().toISOString()
    };
  }
  
  static getProductRules(category, gender) {
    const categoryRules = productRules[category];
    if (!categoryRules) {
      return this.getDefaultRules();
    }
    
    // Try to get gender-specific rules, fall back to 'all'
    return categoryRules[gender] || categoryRules['all'] || this.getDefaultRules();
  }
  
  static applyEcommerceRules(baseRules, orderRules) {
    return {
      ...baseRules,
      hanging: {
        ...baseRules.hanging,
        required: false // No hangers for e-commerce
      },
      packaging: {
        ...baseRules.packaging,
        individualPolybag: true,
        polybagWarning: ecommerceRules.polybagWarning,
        maxCartonWeight: ecommerceRules.maxCartonWeight
      }
    };
  }
  
  static generateChecklist(vasRules, orderRules, productData) {
    const checklist = [];
    
    // Hanging requirements
    if (vasRules.hanging && vasRules.hanging.required) {
      checklist.push({
        category: 'Hanging',
        requirement: `Use hanger type ${vasRules.hanging.hangerType}`,
        critical: true,
        penaltyIfMissed: '$0.50 per unit + $250 service fee'
      });
      
      if (vasRules.hanging.sizerRequired) {
        checklist.push({
          category: 'Hanging',
          requirement: 'Apply black 4-sided secure over-hanger sizer (SOHS)',
          critical: true,
          penaltyIfMissed: '$0.25 per unit + $250 service fee'
        });
      }
      
      if (vasRules.hanging.presentation === 'closed' && vasRules.hanging.tuckingRequired) {
        checklist.push({
          category: 'Hanging',
          requirement: `Apply ${vasRules.hanging.tuckingType} tuck presentation`,
          critical: true,
          penaltyIfMissed: '$0.50 per unit + $250 service fee'
        });
      }
    }
    
    // Ticketing requirements
    if (vasRules.ticketing && vasRules.ticketing.required) {
      checklist.push({
        category: 'Ticketing',
        requirement: `Place retail ticket at: ${vasRules.ticketing.location}`,
        critical: true,
        penaltyIfMissed: '$0.50 per unit + $250 service fee'
      });
      
      if (vasRules.ticketing.retailPriceRequired) {
        checklist.push({
          category: 'Ticketing',
          requirement: 'Verify retail price 30 days before DNSB4 date',
          critical: true,
          penaltyIfMissed: '$0.50 per unit + $250 service fee'
        });
      }
    }
    
    // Packaging requirements
    if (vasRules.packaging) {
      if (vasRules.packaging.individualPolybag) {
        checklist.push({
          category: 'Packaging',
          requirement: 'Individual polybag required for each unit',
          critical: true,
          penaltyIfMissed: '$0.25 per unit + $250 service fee'
        });
        
        if (vasRules.packaging.polybagWarning) {
          checklist.push({
            category: 'Packaging',
            requirement: 'Print suffocation warning on polybags',
            critical: true,
            penaltyIfMissed: '$0.50 per unit + $250 service fee'
          });
        }
      }
      
      if (vasRules.packaging.bladderBag) {
        checklist.push({
          category: 'Packaging',
          requirement: 'Use bladder bag around entire carton contents (do not seal)',
          critical: false,
          penaltyIfMissed: 'N/A'
        });
      }
    }
    
    // Order type specific requirements
    if (orderRules.packingSlipRequired) {
      checklist.push({
        category: 'Documentation',
        requirement: 'Include packing slip for each carton',
        critical: true,
        penaltyIfMissed: '$300 per bill of lading'
      });
    }
    
    if (orderRules.cartonMarking) {
      checklist.push({
        category: 'Labeling',
        requirement: 'Mark cartons as "carton X of Y"',
        critical: true,
        penaltyIfMissed: '$2.00 per carton + $250 service fee'
      });
    }
    
    return checklist;
  }
  
  static calculateRisk(checklist) {
    const criticalItems = checklist.filter(item => item.critical);
    const totalPenaltyExposure = criticalItems.length * 275; // Average penalty
    
    let riskLevel = 'LOW';
    if (criticalItems.length > 5) riskLevel = 'HIGH';
    else if (criticalItems.length > 2) riskLevel = 'MEDIUM';
    
    return {
      riskLevel,
      criticalRequirements: criticalItems.length,
      totalRequirements: checklist.length,
      estimatedPenaltyExposure: totalPenaltyExposure
    };
  }
  
  static getDefaultRules() {
    return {
      hanging: { required: false },
      ticketing: { required: false },
      packaging: { specialRequirements: 'Follow product-specific guidelines' }
    };
  }
}