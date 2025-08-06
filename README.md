# Dick's Sporting Goods - Smart Compliance Assistant

A React-based web application that provides intelligent compliance guidance for warehouse workers processing retailer orders. Features dynamic PDF processing to extract compliance rules from any retailer's routing guide.

## Problem Statement

Warehouse workers face overwhelming complexity when processing orders:
- 100+ VAS (Value Added Services) requirements across different product categories
- 7 different purchase order types with unique packing rules
- 50+ product-specific ticketing requirements
- Complex compliance penalties ranging from $250-$500+ per violation
- Cognitive overload leading to expensive mistakes and operational inefficiencies

## Solution

The Smart Compliance Assistant provides real-time guidance through a dynamic, PDF-powered rule engine:

- **PDF Processing Engine**: Extracts compliance rules from any retailer's routing guide
- **Dynamic Rule System**: Works with Dick's, Target, Walmart - any retailer
- **Intelligent Analysis**: Automatically determines VAS requirements based on extracted rules
- **Financial Impact Calculator**: Shows real penalty costs from actual routing guides
- **Retailer Agnostic**: Upload new PDF, get instant compliance guidance

## Key Features

### 📄 PDF Processing Engine
- Extracts compliance rules from routing guide PDFs automatically
- Pattern recognition for hanger types, penalty structures, product requirements
- Confidence scoring and validation for extracted data
- Works with any retailer's documentation - completely scalable

### 🎯 Dynamic Product Analysis
- Categorizes products using PDF-extracted rules
- Maps to specific VAS requirements based on document specifications
- Handles multiple order types and retailer-specific exceptions
- Real-time rule loading and application

### 📋 Smart Compliance Checklists
- Generates checklists from extracted PDF requirements
- Highlights critical requirements with actual penalty amounts
- Context-sensitive guidance based on retailer specifications
- Print-optimized for warehouse floor use

### 💰 Penalty Impact Calculator
- Uses penalty structures extracted from routing guides
- Calculates per-unit, per-carton, and per-shipment violations
- Annual impact projections for business case validation
- Interactive violation selection and cost modeling

### 🏷️ Dynamic Hanger Reference
- Populated with hanger specifications from uploaded PDFs
- Searchable database of extracted hanger codes and usage rules
- Updates automatically when new routing guides are processed
- Shows confidence levels for extraction accuracy

## Technology Stack

- **Frontend**: React 18 with functional components and hooks
- **PDF Processing**: PDF.js for client-side document parsing
- **Text Processing**: Custom pattern matching and rule extraction
- **Styling**: CSS3 with responsive design and print optimization
- **State Management**: React hooks with dynamic rule loading
- **Architecture**: Component-based with separation of data extraction and business logic

## Project Structure

```
src/
├── components/
│   ├── ProductInput.js          # Product and order details input form
│   ├── ComplianceResults.js     # Main results display component
│   ├── PDFParser.js            # PDF upload and processing interface
│   ├── PenaltyCalculator.js     # Financial impact calculator
│   └── HangerGuide.js          # Dynamic hanger reference tool
├── utils/
│   ├── dynamicRuleEngine.js    # Core compliance logic with PDF rule support
│   └── pdfProcessor.js         # PDF parsing and text extraction engine
├── App.js                      # Main application with PDF rule management
└── App.css                     # Complete responsive styling
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/dicks-compliance-assistant.git
cd dicks-compliance-assistant

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

## Usage

### PDF-Powered Workflow

1. **Upload Routing Guide**: Select any retailer's routing guide PDF for processing

2. **Automatic Extraction**: Watch as the system extracts hanger types, product rules, and penalties

3. **Validation & Preview**: Review extracted data and confidence scores

4. **Product Analysis**: Enter product details to get retailer-specific compliance guidance

5. **Dynamic Results**: Receive compliance checklists based on the uploaded retailer's requirements

### Core Features

1. **PDF Processing**: Upload routing guides to extract compliance rules automatically

2. **Product Analysis**: Select category, gender/age, size, order type, and destination

3. **Compliance Guidance**: Get dynamic checklists based on extracted retailer requirements

4. **Penalty Calculation**: Understand financial impact using actual penalty structures

5. **Reference Tools**: Access hanger guides and requirements extracted from documents

## Business Impact

### Revolutionary Approach

- **Any Retailer Support**: Single system works with Dick's, Target, Walmart, any retailer
- **No Code Changes**: Upload new PDF, instant compliance for different retailer
- **Source Document Accuracy**: Rules extracted directly from official routing guides
- **Automatic Updates**: Process revised routing guides without development work

### Cost Savings

- **Compliance Penalties**: Potential $50K+ annual reduction per retailer
- **Operational Efficiency**: 20% faster processing across different retailer requirements  
- **Training Costs**: Single system for multiple retailer compliance needs
- **Scalability**: Add new retailers without custom development

### Success Metrics

- Target: 95%+ compliance rate across multiple retailers
- Target: 75% reduction in retailer-specific compliance errors
- Target: 90%+ warehouse worker adoption across different clients
- Target: 80%+ PDF extraction accuracy for routing guide processing

## Example Scenarios

### Dynamic Multi-Retailer Support

**Dick's Sporting Goods - Women's Athletic Leggings**
- Upload Dick's routing guide PDF
- System extracts: Hanger type 6010, double tuck rules, retail ticketing requirements
- Generates Dick's-specific compliance checklist

**Target Corporation - Same Product**  
- Upload Target's routing guide PDF
- System extracts: Different hanger requirements, Target-specific packaging rules
- Generates Target-specific compliance checklist automatically

### PDF Processing Examples

**Document Types Supported:**
- Routing guides and vendor manuals
- Compliance requirements documents  
- Packaging and labeling specifications
- Penalty and fee schedules

## Advanced Features

### PDF Processing Engine

**Text Extraction:**
- Multi-page document processing with PDF.js
- Pattern recognition for hanger codes (3-4 digit patterns)
- Penalty amount extraction ($X.XX per unit/carton/shipment)
- Product category and VAS requirement mapping

**Data Validation:**
- Confidence scoring for extraction accuracy
- Multiple pattern matching for reliability
- Fallback rules for incomplete extractions
- Error handling for corrupted or image-based PDFs

**Rule Conversion:**
- Transforms PDF text into structured application rules
- Normalizes different retailer terminology and formats
- Maps extracted data to consistent internal schema
- Maintains source document traceability

### System Architecture

**Dynamic Rule Engine:**
- PDF-extracted rules replace static hardcoded data
- Retailer-agnostic business logic processes any rule set
- Real-time rule loading without application restart
- Separation of data extraction from compliance logic

**Scalability Design:**
- Single codebase supports unlimited retailers
- No custom development for new retailer onboarding
- Consistent user experience across different compliance requirements
- Extensible architecture for additional document types

## Development

### Key Components

**DynamicRuleEngine** (`utils/dynamicRuleEngine.js`)
- Core business logic that processes extracted PDF rules
- Retailer-agnostic compliance analysis and risk assessment
- Handles rule application regardless of source retailer

**PDFProcessor** (`utils/pdfProcessor.js`)  
- PDF parsing and text extraction using PDF.js
- Pattern matching for compliance rules and requirements
- Confidence scoring and validation of extracted data

**PDFParser** (`components/PDFParser.js`)
- User interface for PDF upload and processing
- Progress indicators and extraction result display
- Error handling and user feedback for processing issues

### Adding New Retailers

To support a new retailer:
1. Upload their routing guide PDF through the interface
2. System automatically extracts and processes compliance rules
3. Validate extraction accuracy and confidence scores
4. Begin using immediately - no code changes required

### Future Enhancements

**Advanced PDF Processing:**
- OCR support for image-based/scanned routing guides
- Machine learning models for improved pattern recognition
- Multi-language support for international retailers
- Document versioning and change detection

**Integration Capabilities:**
- API endpoints for warehouse management system integration
- Real-time rule updates when retailers publish new guides
- Multi-tenant architecture for service provider use cases
- Analytics and compliance reporting across retailers

## Contributing

This project demonstrates advanced technical capabilities:

- **PDF Processing**: Client-side document parsing and text extraction
- **Pattern Recognition**: Complex rule extraction from unstructured text
- **System Architecture**: Scalable, data-driven compliance engine
- **Business Logic**: Separation of concerns between extraction and application
- **User Experience**: Intuitive interface for complex B2B workflows

## Architecture Benefits

- **Retailer Agnostic**: Works with any routing guide without custom development
- **Source Document Accuracy**: Rules extracted directly from official documents
- **Automatic Scalability**: Add retailers by uploading PDFs, not writing code
- **Maintainable**: Clear separation between document processing and business logic
- **Future-Proof**: Extensible architecture supports additional document types and features

## License

This project is for demonstration purposes as part of a technical interview process, showcasing advanced PDF processing, dynamic rule systems, and scalable architecture design.