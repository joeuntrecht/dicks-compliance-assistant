// Based on Exhibit F from Dick's Routing Guide
export const hangerChart = {
    '484': {
      name: 'Standard Top Hanger',
      description: 'Black GS1 standard hanger for tops',
      usedFor: ['Mens Tops', 'Womens Tops', 'Life Jackets', 'Wetsuits'],
      sizerRequired: true,
      image: '👔'
    },
    '485': {
      name: 'Youth Top Hanger',
      description: 'Black GS1 standard hanger for youth tops',
      usedFor: ['Youth Tops (XS-XL)', 'Youth Athletic Jackets'],
      sizerRequired: true,
      image: '👕'
    },
    '498': {
      name: 'Sports Bra/Toddler Hanger',
      description: 'Black GS1 standard hanger for sports bras and toddler items',
      usedFor: ['Sports Bras', 'Toddler Tops', 'Swim (1 piece)'],
      sizerRequired: true,
      specialInstructions: 'Sports bras: right side up. Swim tops: upside-down (as of Jan 1, 2021)',
      image: '👶'
    },
    '479': {
      name: 'Extended Size Hanger',
      description: 'Black GS1 standard hanger for extended sizes',
      usedFor: ['Mens Extended (3X or larger)', 'Plus Size Items'],
      sizerRequired: true,
      image: '👔'
    },
    '6012': {
      name: 'Mens Bottom Hanger',
      description: 'Black GS1 standard bottom hanger for mens bottoms',
      usedFor: ['Mens Bottoms', 'Mens Athletic Bottoms', 'Hunting Pants'],
      sizerRequired: true,
      presentation: 'closed',
      tuckingRequired: true,
      image: '👖'
    },
    '6010': {
      name: 'Womens/Youth Bottom Hanger',
      description: 'Black GS1 standard bottom hanger for womens and youth',
      usedFor: ['Womens Bottoms', 'Youth Bottoms', 'Swim Bottoms (upside-down)'],
      sizerRequired: true,
      presentation: 'closed',
      tuckingRequired: true,
      specialInstructions: 'Swim bottoms: hang upside-down as of Jan 1, 2021',
      image: '👖'
    },
    '6008': {
      name: 'Toddler Bottom Hanger',
      description: 'Black GS1 standard bottom hanger for toddler sizes',
      usedFor: ['Toddler Bottoms (2T-4T)'],
      sizerRequired: true,
      presentation: 'closed',
      tuckingRequired: false,
      image: '🩳'
    },
    '6014': {
      name: 'Extended Bottom Hanger',
      description: 'Black GS1 standard bottom hanger for extended sizes',
      usedFor: ['Mens Extended Bottoms (3X or larger)'],
      sizerRequired: true,
      presentation: 'closed',
      tuckingRequired: true,
      image: '👖'
    },
    '3328': {
      name: 'Fleece/Outerwear Hanger',
      description: 'Black GS1 standard hanger for fleece and outerwear',
      usedFor: ['Fleece Tops', 'Outerwear', 'Hunting Jackets', 'Hunting Bibs'],
      sizerRequired: true,
      image: '🧥'
    },
    '3315': {
      name: 'Youth/Toddler Fleece Hanger',
      description: 'Black GS1 standard hanger for youth and toddler fleece',
      usedFor: ['Youth Fleece', 'Toddler Fleece', 'Youth Outerwear'],
      sizerRequired: true,
      image: '🧥'
    },
    '3319': {
      name: 'Extended Fleece Hanger',
      description: 'Black GS1 standard hanger for extended size fleece',
      usedFor: ['Extended Size Fleece', 'Extended Size Outerwear'],
      sizerRequired: true,
      image: '🧥'
    },
    '7012': {
      name: 'Specialty Mens Bottom Hanger',
      description: 'Black GS1 standard hanger for specialty mens bottoms',
      usedFor: ['Hunting Pants', 'Sportsman Casual Pants'],
      sizerRequired: true,
      presentation: 'closed',
      tuckingRequired: true,
      image: '👖'
    },
    '7010': {
      name: 'Specialty Womens Bottom Hanger',
      description: 'Black GS1 standard hanger for specialty womens bottoms',
      usedFor: ['Hunting Pants', 'Sportsman Casual Pants'],
      sizerRequired: true,
      presentation: 'closed',
      tuckingRequired: true,
      image: '👖'
    },
    '7014': {
      name: 'Extended Specialty Bottom Hanger',
      description: 'Black GS1 standard hanger for extended specialty bottoms',
      usedFor: ['Extended Size Hunting Pants', 'Extended Sportsman Pants'],
      sizerRequired: true,
      presentation: 'closed',
      tuckingRequired: true,
      image: '👖'
    }
  };
  
  export const tuckingRules = {
    doubleTuck: {
      description: 'Clips inside, required unless product type or smaller sizes won\'t accommodate',
      sizes: ['M and up for most categories'],
      instruction: 'Start at front using 1.5" fabric as guide, move to back, apply double tuck if excess material'
    },
    singleTuck: {
      description: 'Single tuck in front, clips one in/one out with exposed clip in back',
      sizes: ['XS-S for most categories'],
      instruction: 'Start at back clipping one in/one out, work to front and pull tight'
    },
    noTuck: {
      description: 'Clip one in/one out on all sides, no tucking required',
      sizes: ['XXS and very small items'],
      instruction: 'All exposed clips should face behind garment when hung on rack'
    }
  };
  
  export const specialRules = {
    openPresentation: [
      'Youth Baseball Pants (elastic waist pull up)',
      'Football Girdles', 
      'Skorts/Skirts',
      'Hunting Pants',
      'Ski Pants',
      'Underwear/Bikini Bottoms',
      'Youth Bottoms (size XXS only)',
      'Youth Compression Bottoms (size XS and XXS only)'
    ],
    noSizerRequired: [
      'Life Jackets (can have hangers placed in carton instead of on garment)'
    ],
    upsideDownHanging: [
      'Swim Tops (Bikini Tops) - as of January 1, 2021'
    ]
  };