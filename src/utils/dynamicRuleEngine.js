export class DynamicRuleEngine {
    constructor(extractedData = null) {
      this.rules = extractedData || this.getEmptyRules();
    }
  
    getEmptyRules() {
      return {
        hangerChart: {},
        productRules: {},
        penaltyRules: [],
        orderTypeRules: {},
        metadata: { source: 'empty', confidence: 'none' }
      };
    }
  
    // Convert PDF extracted data into our application format
    static convertPdfToApplicationRules(pdfData) {
      return {
        hangerChart: pdfData.hangerChart || {},
        productRules: DynamicRuleEngine.normalizeProductRules(pdfData.productRules || {}),
        penaltyRules: pdfData.penaltyRules || [],
        orderTypeRules: pdfData.orderTypeRules || {},
        metadata: pdfData.metadata || { source: 'pdf', confidence: 'medium' }
      };
    }
  
    static normalizeProductRules(pdfProductRules) {
      const normalized = {};
      
      Object.entries(pdfProductRules).forEach(([category, rules]) => {
        normalized[category] = {
          all: {
            hanging: rules.hanging || { required: false },
            ticketing: rules.ticketing || { required: false },
            packaging: rules.packaging || { specialRequirements: 'Standard' },
            extractedFrom: rules.extractedFrom || 'pdf-parser'
          }
        };
      });
  
      return normalized;
    }
  
    // Core analysis method - same logic as original categorizer
    analyzeProduct(productData) {
      const { category, gender, size, orderType, destination } = productData;
      
      // Get base product rules
      const baseRules = this.getProductRules(category, gender);
      
      // Get order type specific rules
      const orderRules = this.rules.orderTypeRules[orderType] || {};
      
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
        dataSource: this.rules.metadata.source,
        timestamp: new Date().toISOString()
      };
    }
  
    getProductRules(category, gender) {
      const categoryRules = this.rules.productRules[category];
      if (!categoryRules) {
        return this.getDefaultRules();
      }
      
      // Try to get gender-specific rules, fall back to 'all'
      return categoryRules[gender] || categoryRules['all'] || this.getDefaultRules();
    }
  
    applyEcommerceRules(baseRules, orderRules) {
      return {
        ...baseRules,
        hanging: {
          ...baseRules.hanging,
          required: false // No hangers for e-commerce
        },
        packaging: {
          ...baseRules.packaging,
          individualPolybag: true,
          polybagWarning: 'WARNING – To avoid danger of suffocation; keep away from babies and children.',
          maxCartonWeight: 40
        }
      };
    }
  
    generateChecklist(vasRules, orderRules, productData) {
      const checklist = [];
      
      // Hanging requirements
      if (vasRules.hanging && vasRules.hanging.required) {
        const hangerType = this.findHangerType(productData.category, productData.gender);
        
        checklist.push({
          category: 'Hanging',
          requirement: `Use hanger type ${hangerType}`,
          critical: true,
          penaltyIfMissed: '$0.50 per unit + $250 service fee'
        });
        
        if (vasRules.hanging.sizerRequired !== false) {
          checklist.push({
            category: 'Hanging',
            requirement: 'Apply black 4-sided secure over-hanger sizer (SOHS)',
            critical: true,
            penaltyIfMissed: '$0.25 per unit + $250 service fee'
          });
        }
        
        if (vasRules.hanging.presentation === 'closed' && vasRules.hanging.tuckingRequired) {
          const tuckType = this.determineTuckingType(productData.size);
          checklist.push({
            category: 'Hanging',
            requirement: `Apply ${tuckType} tuck presentation`,
            critical: true,
            penaltyIfMissed: '$0.50 per unit + $250 service fee'
          });
        }
      }
      
      // Ticketing requirements
      if (vasRules.ticketing && vasRules.ticketing.required) {
        checklist.push({
          category: 'Ticketing',
          requirement: `Place retail ticket at: ${vasRules.ticketing.location || 'hang tag near UPC'}`,
          critical: true,
          penaltyIfMissed: '$0.50 per unit + $250 service fee'
        });
        
        if (vasRules.ticketing.retailPriceRequired !== false) {
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
      
      // Order type specific requirements from PDF data
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
  
      // Add penalty rules from PDF
      this.addPenaltyBasedRequirements(checklist);
      
      return checklist;
    }
  
    findHangerType(category, gender) {
      // Look through extracted hanger chart for appropriate type
      const hangers = this.rules.hangerChart;
      
      for (const [code, info] of Object.entries(hangers)) {
        const usageText = info.usedFor?.join(' ').toLowerCase() || '';
        const categoryMatch = category.includes('tops') ? 'top' : category.includes('bottoms') ? 'bottom' : '';
        
        if (usageText.includes(gender.toLowerCase()) && usageText.includes(categoryMatch)) {
          return code;
        }
      }
      
      // Fallback logic based on category and gender
      if (category.includes('tops')) {
        return gender === 'youth' ? '485' : '484';
      } else if (category.includes('bottoms')) {
        return gender === 'mens' ? '6012' : '6010';
      }
      
      return '484'; // Default fallback
    }
  
    determineTuckingType(size) {
      const sizeOrder = ['xs', 's', 'm', 'l', 'xl', 'xxl', '3xl'];
      const sizeIndex = sizeOrder.indexOf(size.toLowerCase());
      
      if (sizeIndex >= 2) return 'double'; // M and above
      if (sizeIndex >= 0) return 'single'; // XS, S
      return 'no'; // Unknown size
    }
  
    addPenaltyBasedRequirements(checklist) {
        // Skip adding generic penalty-based requirements
        // The specific VAS requirements already include penalty information
        // This prevents duplicate "Avoid general violations" entries
        return;
      }
  
    calculateRisk(checklist) {
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
  
    getDefaultRules() {
      return {
        hanging: { required: false },
        ticketing: { required: false },
        packaging: { specialRequirements: 'Follow product-specific guidelines' }
      };
    }
  
    // Method to check if we have valid rules loaded
    hasValidRules() {
      return Object.keys(this.rules.productRules).length > 0 || 
             Object.keys(this.rules.hangerChart).length > 0;
    }
  
    // Get rule source information
    getRuleSource() {
      return {
        source: this.rules.metadata.source || 'unknown',
        confidence: this.rules.metadata.confidence || 'low',
        extractedAt: this.rules.metadata.extractedAt || null,
        totalRules: Object.keys(this.rules.productRules).length + Object.keys(this.rules.hangerChart).length
      };
    }
  }