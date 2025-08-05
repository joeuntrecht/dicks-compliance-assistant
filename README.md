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