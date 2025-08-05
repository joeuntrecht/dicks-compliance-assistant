// VAS requirements based on Dick's Sporting Goods routing guide
export const productRules = {
    'apparel-tops': {
      mens: {
        hanging: {
          required: true,
          hangerType: '484',
          sizerRequired: true,
          presentation: 'standard'
        },
        ticketing: {
          required: true,
          location: 'hang_tag_near_upc',
          retailPriceRequired: true
        },
        packaging: {
          individualPolybag: false,
          bladderBag: true
        }
      },
      womens: {
        hanging: {
          required: true,
          hangerType: '484',
          sizerRequired: true,
          presentation: 'standard'
        },
        ticketing: {
          required: true,
          location: 'hang_tag_near_upc',
          retailPriceRequired: true
        },
        packaging: {
          individualPolybag: false,
          bladderBag: true
        }
      },
      youth: {
        hanging: {
          required: true,
          hangerType: '485',
          sizerRequired: true,
          presentation: 'standard'
        },
        ticketing: {
          required: true,
          location: 'hang_tag_near_upc',
          retailPriceRequired: true
        },
        packaging: {
          individualPolybag: false,
          bladderBag: true
        }
      },
      toddler: {
        hanging: {
          required: true,
          hangerType: '498',
          sizerRequired: true,
          presentation: 'standard'
        },
        ticketing: {
          required: true,
          location: 'hang_tag_near_upc',
          retailPriceRequired: true
        },
        packaging: {
          individualPolybag: false,
          bladderBag: true
        }
      }
    },
    'apparel-bottoms': {
      mens: {
        hanging: {
          required: true,
          hangerType: '6012',
          sizerRequired: true,
          presentation: 'closed',
          tuckingRequired: true,
          tuckingType: 'double' // Based on size, but defaulting to double
        },
        ticketing: {
          required: true,
          location: 'hang_tag_near_upc',
          retailPriceRequired: true
        },
        packaging: {
          individualPolybag: false,
          bladderBag: true
        }
      },
      womens: {
        hanging: {
          required: true,
          hangerType: '6010',
          sizerRequired: true,
          presentation: 'closed',
          tuckingRequired: true,
          tuckingType: 'double'
        },
        ticketing: {
          required: true,
          location: 'hang_tag_near_upc',
          retailPriceRequired: true
        },
        packaging: {
          individualPolybag: false,
          bladderBag: true
        }
      },
      youth: {
        hanging: {
          required: true,
          hangerType: '6010',
          sizerRequired: true,
          presentation: 'closed',
          tuckingRequired: true,
          tuckingType: 'single'
        },
        ticketing: {
          required: true,
          location: 'hang_tag_near_upc',
          retailPriceRequired: true
        },
        packaging: {
          individualPolybag: false,
          bladderBag: true
        }
      },
      toddler: {
        hanging: {
          required: true,
          hangerType: '6008',
          sizerRequired: true,
          presentation: 'closed',
          tuckingRequired: false
        },
        ticketing: {
          required: true,
          location: 'hang_tag_near_upc',
          retailPriceRequired: true
        },
        packaging: {
          individualPolybag: false,
          bladderBag: true
        }
      }
    },
    'footwear': {
      all: {
        hanging: {
          required: false
        },
        ticketing: {
          required: false, // Depends on if boxed or unboxed
          location: 'end_of_box_near_upc'
        },
        packaging: {
          specialRequirements: 'unboxed_footwear_requires_polybag_and_secure_fastening'
        }
      }
    },
    'accessories': {
      all: {
        hanging: {
          required: false
        },
        ticketing: {
          required: true,
          location: 'hang_tag_near_upc_or_front_of_package',
          retailPriceRequired: true
        },
        packaging: {
          individualPolybag: false,
          specialRequirements: 'varies_by_product_type'
        }
      }
    },
    'equipment': {
      all: {
        hanging: {
          required: false
        },
        ticketing: {
          required: false,
          specialRequirements: 'varies_by_equipment_type'
        },
        packaging: {
          specialRequirements: 'follow_product_specific_guidelines'
        }
      }
    }
  };
  
  // Order type specific requirements
  export const orderTypeRules = {
    'bulk': {
      packing: 'single_upc_per_carton',
      casepack: 'standard_casepack_required',
      mixing: false
    },
    'single-store': {
      packing: 'mixed_upc_allowed',
      casepack: 'casepack_equals_1',
      mixing: true,
      minimizeCartons: true
    },
    'direct-to-store': {
      packing: 'mixed_upc_allowed',
      casepack: 'casepack_equals_1',
      mixing: true,
      packingSlipRequired: true,
      cartonMarking: 'carton_x_of_y_required'
    },
    'ecommerce': {
      packing: 'one_sku_per_carton_preferred',
      maxWeight: '40_pounds',
      polybagRequired: true,
      specialPackaging: true,
      noHangers: true
    }
  };
  
  // E-commerce specific requirements
  export const ecommerceRules = {
    polybagRequired: [
      'softlines_accessories',
      'apparel',
      'socks',
      'headwear',
      'gloves',
      'towels',
      'belts',
      'scarves',
      'facemasks',
      'visors',
      'shoe_laces',
      'arm_sleeves'
    ],
    polybagWarning: 'WARNING – To avoid danger of suffocation; keep away from babies and children. Do not use in cribs, beds or play pens. This bag is not a toy.',
    maxCartonWeight: 40,
    noHangersRule: true
  };