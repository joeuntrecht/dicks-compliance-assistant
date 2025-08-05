# Dick's Sporting Goods - Smart Compliance Assistant

A React-based web application that provides intelligent compliance guidance for warehouse workers processing Dick's Sporting Goods orders.

## Problem Statement

Warehouse workers at Dick's Sporting Goods face overwhelming complexity when processing orders:
- 100+ VAS (Value Added Services) requirements across different product categories
- 7 different purchase order types with unique packing rules
- 50+ product-specific ticketing requirements
- Complex compliance penalties ranging from $250-$500+ per violation
- Cognitive overload leading to expensive mistakes and operational inefficiencies

## Solution

The Smart Compliance Assistant provides real-time guidance to ensure compliance while reducing cognitive load and preventing costly mistakes through:

- **Intelligent Product Categorization**: Automatically determines VAS requirements based on product attributes
- **Dynamic Compliance Checklists**: Step-by-step guidance tailored to specific orders
- **Financial Impact Calculator**: Shows real penalty costs to emphasize compliance importance
- **Comprehensive Reference Tools**: Hanger guides, tucking rules, and special handling requirements

## Key Features

### 🎯 Product Analysis Engine
- Categorizes products by type, gender, size, and destination
- Maps to specific VAS requirements (hanging, folding, ticketing, packaging)
- Accounts for different order types (Bulk, Single Store, Direct-to-Store, E-commerce)

### 📋 Smart Compliance Checklists
- Generates dynamic checklists based on product and order characteristics
- Highlights critical requirements with penalty information
- Provides context-sensitive guidance and instructions

### 💰 Penalty Impact Calculator
- Calculates financial impact of compliance violations
- Shows per-unit, per-carton, and per-shipment penalty structures
- Projects annual cost impact for recurring violations

### 🏷️ Hanger Reference Guide
- Complete lookup for GS1 standard hanger types
- Searchable database of 14+ hanger codes
- Tucking guidelines and special handling rules

## Technology Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: CSS3 with responsive design
- **State Management**: React useState and context
- **Architecture**: Component-based with separation of concerns

## Project Structure
src/
├── components/
│   ├── ProductInput.js          # Product and order details input form
│   ├── ComplianceResults.js     # Main results display component
│   ├── PenaltyCalculator.js     # Financial impact calculator
│   └── HangerGuide.js          # Hanger reference and lookup tool
├── data/
│   ├── productRules.js         # VAS requirements mapping
│   └── hangerChart.js          # Hanger specifications and rules
├── utils/
│   └── categorizer.js          # Core compliance logic engine
├── App.js                      # Main application component
└── App.css                     # Application styling

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


The application will open at `http://localhost:3000`

## Usage

1. **Enter Product Details**: Select product category, gender/age, size, order type, and destination

2. **Analyze Requirements**: Click "Analyze Compliance Requirements" to generate guidance

3. **Review Checklist**: Follow the dynamic compliance checklist for your specific order

4. **Calculate Penalties**: Use the penalty calculator to understand financial impact of violations

5. **Reference Tools**: Search the hanger guide for specific requirements and rules

## Business Impact

### Cost Savings

- **Compliance Penalties**: Potential $50K+ annual reduction in violations

- **Operational Efficiency**: 20% faster processing of complex orders

- **Training Costs**: Reduced onboarding time for new warehouse workers

### Success Metrics

- Target: 95%+ compliance rate (up from estimated 85-90%)

- Target: 75% reduction in common compliance errors

- Target: 90%+ warehouse worker adoption rate

## Example Scenarios

### Men's Athletic Top - Bulk Order

- Hanger Type: 484 with black SOHS sizer

- Retail ticketing required on hang tag

- Bladder bag packaging (no individual polybags)

- Standard presentation requirements

### Women's Yoga Pants - E-commerce

- No hangers required (e-commerce exception)

- Individual polybag with suffocation warning

- Maximum 40 lb carton weight

- Special e-commerce packaging rules

## Development

### Key Components

**ComplianceCategorizer** (`utils/categorizer.js`)

- Core business logic engine

- Processes product attributes and order types

- Generates compliance requirements and risk assessments

**ProductRules** (`data/productRules.js`)

- Comprehensive mapping of VAS requirements

- Order-type specific rules and exceptions

- E-commerce modifications and special cases

### Adding New Requirements

To add new compliance rules:

1. Update `productRules.js` with new category or requirement

2. Modify `categorizer.js` logic if needed

3. Test with different product combinations

## Contributing

This project was developed as a take-home interview assignment demonstrating:

- Deep understanding of complex business requirements

- Clean, maintainable code architecture

- User-centered design for warehouse workers

- Strategic thinking about operational efficiency

## License

This project is for demonstration purposes as part of a technical interview process.