import { parseRoutingGuide } from './pdfProcessor';

export class PDFLoader {
  static async loadRetailerRules(retailer) {
    try {
      // Fetch the PDF from the public directory
      const response = await fetch(retailer.pdfPath);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${retailer.name} routing guide: ${response.status}`);
      }

      // Convert response to blob, then to file-like object
      const blob = await response.blob();
      const file = new File([blob], `${retailer.id}_guide.pdf`, { type: 'application/pdf' });

      // Use existing PDF processor to extract rules
      const extractedData = await parseRoutingGuide(file);

      // Add retailer metadata
      extractedData.metadata = {
        ...extractedData.metadata,
        retailerId: retailer.id,
        retailerName: retailer.name,
        source: 'pre-loaded',
        loadedAt: new Date().toISOString()
      };

      return extractedData;

    } catch (error) {
      console.error(`Error loading ${retailer.name} rules:`, error);
      throw new Error(`Failed to load compliance rules for ${retailer.name}. Please contact support.`);
    }
  }

  static getAvailableRetailers() {
    return [
      {
        id: 'dicks',
        name: 'Dick\'s Sporting Goods',
        pdfPath: '/pdfs/dicks_guide.pdf',
        description: 'Complete VAS requirements and compliance rules'
      }
      // Easy to add more retailers:
      // {
      //   id: 'target',
      //   name: 'Target Corporation', 
      //   pdfPath: '/pdfs/target_guide.pdf',
      //   description: 'Target-specific packaging and labeling requirements'
      // }
    ];
  }
}