import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker - use the exact version we installed
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

export async function parseRoutingGuide(file) {
  try {
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      // Disable streaming for better compatibility
      disableStream: true,
      // Disable range requests
      disableRange: true
    });
    
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    // Extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Combine text items into readable text
        const pageText = textContent.items
          .map(item => {
            // Handle text items with proper spacing
            return typeof item.str === 'string' ? item.str : '';
          })
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
          
        fullText += pageText + '\n\n';
        
        // Clean up page resources
        page.cleanup();
        
      } catch (pageError) {
        console.warn(`Error processing page ${pageNum}:`, pageError);
        // Continue with other pages even if one fails
      }
    }
    
    if (fullText.trim().length === 0) {
      throw new Error('No text could be extracted from the PDF. The document may be image-based or corrupted.');
    }
    
    // Process the extracted text
    const extractedData = await processRoutingGuideText(fullText);
    
    // Add metadata about the extraction
    extractedData.metadata = {
      ...extractedData.metadata,
      fileName: file.name,
      fileSize: file.size,
      totalPages: pdf.numPages,
      textLength: fullText.length,
      processingDate: new Date().toISOString()
    };
    
    return extractedData;
    
  } catch (error) {
    console.error('PDF parsing error:', error);
    
    // Provide more specific error messages
    if (error.name === 'InvalidPDFException') {
      throw new Error('Invalid PDF file. Please ensure the file is not corrupted.');
    } else if (error.name === 'PasswordException') {
      throw new Error('PDF is password protected. Please provide an unprotected version.');
    } else if (error.message?.includes('version')) {
      throw new Error('PDF version compatibility issue. Please try a different PDF file.');
    } else {
      throw new Error(`Failed to parse PDF: ${error.message || 'Unknown error'}`);
    }
  }
}

// Rest of your existing functions remain the same...
async function processRoutingGuideText(text) {
  const extractedData = {
    hangerChart: {},
    productRules: {},
    penaltyRules: [],
    orderTypeRules: {},
    metadata: {
      extractedAt: new Date().toISOString(),
      confidence: 'medium',
      textSample: text.substring(0, 200) + '...' // First 200 chars for debugging
    }
  };

  try {
    // Extract hanger information
    extractedData.hangerChart = extractHangerChart(text);
    
    // Extract product rules
    extractedData.productRules = extractProductRules(text);
    
    // Extract penalty information
    extractedData.penaltyRules = extractPenaltyRules(text);
    
    // Extract order type rules
    extractedData.orderTypeRules = extractOrderTypeRules(text);
    
    // Calculate overall confidence
    const totalExtracted = Object.keys(extractedData.hangerChart).length + 
                          Object.keys(extractedData.productRules).length + 
                          extractedData.penaltyRules.length;
    
    extractedData.metadata.confidence = totalExtracted > 10 ? 'high' : 
                                       totalExtracted > 5 ? 'medium' : 'low';
    
  } catch (processingError) {
    console.error('Text processing error:', processingError);
    extractedData.metadata.processingError = processingError.message;
  }
  
  return extractedData;
}

// Keep all your existing helper functions exactly as they are
function extractHangerChart(text) {
  const hangerChart = {};
  
  // Pattern for hanger codes (3-4 digits)
  const hangerPattern = /(?:hanger|type)\s*(?:code|#)?\s*(\d{3,4})/gi;
  const matches = [...text.matchAll(hangerPattern)];
  
  matches.forEach(match => {
    const code = match[1];
    const context = extractContext(text, match.index, 200);
    
    hangerChart[code] = {
      name: extractHangerName(context, code),
      description: extractDescription(context),
      usedFor: extractUsageInfo(context),
      sizerRequired: context.toLowerCase().includes('sizer'),
      extractedFrom: 'pdf-parser',
      confidence: calculateConfidence(context)
    };
  });
  
  return hangerChart;
}

function extractProductRules(text) {
  const productRules = {};
  
  // Common product categories
  const categories = [
    'apparel-tops', 'apparel-bottoms', 'footwear', 
    'accessories', 'equipment', 'outerwear'
  ];
  
  categories.forEach(category => {
    productRules[category] = extractCategoryRules(text, category);
  });
  
  return productRules;
}

function extractPenaltyRules(text) {
  const penalties = [];
  
  // Pattern for penalty amounts
  const penaltyPattern = /\$(\d+(?:\.\d+)?)\s*(?:per|\/)\s*(unit|carton|shipment|invoice)/gi;
  const matches = [...text.matchAll(penaltyPattern)];
  
  matches.forEach(match => {
    const amount = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    const context = extractContext(text, match.index, 150);
    
    penalties.push({
      amount: amount,
      unit: unit,
      description: extractPenaltyDescription(context),
      violation: extractViolationType(context)
    });
  });
  
  return penalties;
}

function extractOrderTypeRules(text) {
  const orderTypes = {};
  
  const types = ['bulk', 'single-store', 'direct-to-store', 'ecommerce'];
  
  types.forEach(type => {
    const pattern = new RegExp(type.replace('-', '\\s*'), 'gi');
    if (pattern.test(text)) {
      orderTypes[type] = extractOrderSpecificRules(text, type);
    }
  });
  
  return orderTypes;
}

function extractOrderSpecificRules(text, orderType) {
  const rules = {
    packing: 'standard',
    mixing: false,
    specialRequirements: [],
    extractedFrom: 'pdf-parser'
  };

  // Convert order type to search patterns
  const searchPatterns = {
    'bulk': ['bulk', 'single sku', 'master case'],
    'single-store': ['single store', 'mixed upc', 'store order'],
    'direct-to-store': ['direct to store', 'dts', 'packing slip'],
    'ecommerce': ['ecommerce', 'e-commerce', 'online', 'web order']
  };

  const patterns = searchPatterns[orderType] || [orderType];
  
  // Find sections related to this order type
  patterns.forEach(pattern => {
    const regex = new RegExp(pattern.replace(/\s+/g, '\\s+'), 'gi');
    const matches = [...text.matchAll(regex)];
    
    matches.forEach(match => {
      const context = extractContext(text, match.index, 300);
      
      // Extract specific rules from context
      if (context.toLowerCase().includes('mixed')) {
        rules.mixing = true;
        rules.packing = 'mixed_upc_allowed';
      }
      
      if (context.toLowerCase().includes('single sku')) {
        rules.packing = 'single_upc_per_carton';
      }
      
      if (context.toLowerCase().includes('packing slip')) {
        rules.packingSlipRequired = true;
      }
      
      if (context.toLowerCase().includes('carton') && context.toLowerCase().includes('mark')) {
        rules.cartonMarking = 'carton_x_of_y_required';
      }
      
      if (context.toLowerCase().includes('polybag')) {
        rules.polybagRequired = true;
      }
      
      // Extract weight limits
      const weightMatch = context.match(/(\d+)\s*(?:lb|pound)/i);
      if (weightMatch) {
        rules.maxWeight = `${weightMatch[1]}_pounds`;
      }
    });
  });

  return rules;
}

// Helper functions for text extraction
function extractContext(text, index, radius = 100) {
  const start = Math.max(0, index - radius);
  const end = Math.min(text.length, index + radius);
  return text.slice(start, end);
}

function extractHangerName(context, code) {
  // Look for descriptive text near hanger code
  const patterns = [
    new RegExp(`${code}[^a-zA-Z]*([A-Z][a-z]+(?:\\s+[A-Z][a-z]+)*)`),
    /(?:for|used for)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i
  ];
  
  for (const pattern of patterns) {
    const match = context.match(pattern);
    if (match) return match[1];
  }
  
  return `Hanger Type ${code}`;
}

function extractDescription(context) {
  // Extract descriptive sentences
  const sentences = context.match(/[A-Z][^.!?]*[.!?]/g) || [];
  return sentences.length > 0 ? sentences[0] : 'Standard GS1 hanger';
}

function extractUsageInfo(context) {
  const usageKeywords = ['mens', 'womens', 'youth', 'tops', 'bottoms', 'outerwear'];
  const found = [];
  
  usageKeywords.forEach(keyword => {
    if (context.toLowerCase().includes(keyword)) {
      found.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
    }
  });
  
  return found.length > 0 ? found : ['General Use'];
}

function extractCategoryRules(text, category) {
  // Simplified rule extraction - would be more sophisticated in production
  return {
    hanging: { required: text.includes('hang') },
    ticketing: { required: text.includes('ticket') || text.includes('price') },
    packaging: { specialRequirements: 'Extracted from PDF' },
    extractedFrom: 'pdf-parser'
  };
}

function extractPenaltyDescription(context) {
  const sentences = context.match(/[A-Z][^.!?]*[.!?]/g) || [];
  return sentences.length > 0 ? sentences[0] : 'Compliance violation';
}

function extractViolationType(context) {
  const violations = ['label', 'hanger', 'ticket', 'packaging', 'shipment'];
  
  for (const violation of violations) {
    if (context.toLowerCase().includes(violation)) {
      return violation;
    }
  }
  
  return 'general';
}

function calculateConfidence(context) {
  // Simple confidence scoring based on context richness
  const indicators = ['hanger', 'type', 'required', 'use', 'standard'];
  const score = indicators.filter(indicator => 
    context.toLowerCase().includes(indicator)
  ).length;
  
  return score > 3 ? 'high' : score > 1 ? 'medium' : 'low';
}