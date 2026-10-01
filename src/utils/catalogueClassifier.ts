/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductCategory, ProductItem, AvailabilityStatus } from '../types/pharmacy';

// Deterministic medical salt/brand rules for safe category assignment
const CATEGORY_RULES: { category: ProductCategory; keywords: string[] }[] = [
  {
    category: 'Diabetes',
    keywords: [
      'METFORMIN', 'GLIMEPIRIDE', 'VOGLIBOSE', 'VOGLIBOS', 'GLICLAZIDE', 'GLIP', 'GLIPTIN',
      'DAPAGLIFLOZIN', 'DAPAGLI', 'VILDAGLIPTIN', 'TENELIGLIPTIN', 'TENELIGLIPTN', 'SITAGLIPTIN',
      'EMPAGLIFLOZIN', 'ACARBOSE', 'INSULIN', 'GLARGINE', 'MIXTARD', 'ACTRAPID', 'BASALOG',
      'GLIBENCLAMIDE', 'PIOGLITAZONE', 'PIOGLAR', 'JALRA', 'JANUVIA', 'GLYCOMET', 'GLYCIMET',
      'DAPAFORD', 'DAPASMART', 'VILDASMART', 'SITASMART', 'FORAGLIM', 'GLIMQUIP', 'GLYCOHEAL',
      'ZUCATOR', 'SUGAR CARE', 'SUGAR FREE', 'DIABECON', 'DIABASCAN'
    ]
  },
  {
    category: 'Blood Pressure',
    keywords: [
      'TELMISARTAN', 'LOSARTAN', 'OLMESARTAN', 'AMLODIPINE', 'CILNIDIPINE', 'NEBIVOLOL',
      'BISOPROLOL', 'METOPROLOL', 'RAMIPRIL', 'ENALAPRIL', 'DILTIAZEM', 'TORSEMIDE', 'TORASEMIDE',
      'TELMA', 'CILACAR', 'DILVAS', 'HYDROCHLOROTHIAZIDE', 'CHLORTHALIDONE', 'INDAPAMIDE', 'VERAPAMIL',
      'ATENOLOL', 'CARVEDILOL', 'LISINOPRIL', 'PERINDOPRIL'
    ]
  },
  {
    category: 'Cardiac & Heart',
    keywords: [
      'ATORVASTATIN', 'ROSUVASTATIN', 'CLOPIDOGREL', 'TICAGRELOR', 'DIGOXIN', 'SACUBITRIL',
      'VALSARTAN', 'CLOPIDAX', 'CARDIO', 'ECOSPRIN', 'NICORANDIL', 'BEMPEDOIC', 'BEMPESTA',
      'IVABRADINE', 'PRASUGREL', 'NITROGLYCERIN', 'ISOSORBIDE', 'WARFARIN', 'RIVAROXABAN', 'DABIGATRAN',
      'AMIODARONE', 'SORBITRATE', 'STATIN'
    ]
  },
  {
    category: 'Thyroid',
    keywords: [
      'THYROXINE', 'THYRONORM', 'ELTROXIN', 'CARBIMAZOLE', 'THYRODAX', 'THYRORELL', 'THYRORISE', 'THYROWEL'
    ]
  },
  {
    category: 'Fever',
    keywords: [
      'PARACETAMOL', 'DOLO-650', 'DOLO', 'CALPOL', 'BIOCETAMOL', 'CROCIN', 'DEEMOL',
      'PAREST', 'PCM', 'FEVER', 'PARABOOST', 'POLYMOL'
    ]
  },
  {
    category: 'Pain Relief',
    keywords: [
      'ACECLOFENAC', 'DICLOFENAC', 'TRAMADOL', 'ETORICOXIB', 'NAPROXEN', 'IBUPROFEN',
      'KETOROLAC', 'THIOCOLCHICOSIDE', 'COMBIPAIN', 'SARIDON', 'VOLIGESIC', 'MOOV',
      'IODEX', 'FAST RELIEF', 'PAIN BALM', 'PAINBYE', 'PAINXPERT', 'ZANDU BALM', 'RUMALAYA',
      'NIMESULIDE', 'MEFENAMIC', 'SPAS', 'DICLOGESIC', 'VOVEDIC', 'PIROX', 'ETODOLAC',
      'MAHAGESIC', 'CHYMOFORCE', 'CHYMOMERG', 'TRYPSIN', 'ANACIN'
    ]
  },
  {
    category: 'Respiratory',
    keywords: [
      'RESPULES', 'INHALER', 'ASTHALIN', 'BUDESONIDE', 'FORMOTEROL', 'SALBUTAMOL',
      'IPRATROPIUM', 'DUOLIN', 'FORACORT', 'LEVOLIN', 'SEROFLO', 'ROTACAP', 'ROTACAPS',
      'BUDEPRESS', 'BUDXPAND', 'TIOTROPIUM', 'THEOPHYLLINE', 'DOXOFYLLINE', 'ACEBROPHYLLINE'
    ]
  },
  {
    category: 'Cold & Cough',
    keywords: [
      'CETIRIZINE', 'LEVOCETIRIZINE', 'MONTELUKAST', 'AMBROXOL', 'DEXTROMETHORPHAN',
      'PHENYLEPHRINE', 'COUGH', 'COF', 'KOF', 'TUSSEX', 'ASCODEX', 'CHESTON', 'SNEEZY',
      'HONITUS', 'ADULSA', 'KOFJAN', 'LEEKUF', 'TOSSEX', 'ALRGEE', 'BENADRYL', 'VICKS',
      'BRO-COF', 'SINUS'
    ]
  },
  {
    category: 'ENT',
    keywords: [
      'EAR DROP', 'EAR DROPS', 'EARDROP', 'NASAL', 'NASAL SPRAY', 'NASAL DROP', 'OTIBID', 'OTOBIT',
      'XYLOMETAZOLINE', 'WAX', 'SOLIWAX', 'CLEARWAX', 'OTOGIC'
    ]
  },
  {
    category: 'Gastro',
    keywords: [
      'PANTOPRAZOLE', 'OMEPRAZOLE', 'RABEPRAZOLE', 'ESOMEPRAZOLE', 'SUCRALFATE', 'SUCRACHEM',
      'ANTACID', 'GELUSIL', 'GASEX', 'DIGEST', 'LACTULOSE', 'DUPHALAC', 'ITOPRIDE',
      'DOMPERIDONE', 'ONDANSETRON', 'OMEZ', 'PANTAFOL', 'PANTOSEC', 'RABESEC', 'ESOHEAL',
      'PEPTIC', 'ACID', 'P-CID', 'ZENCID', 'GASOWEL', 'KAYAM', 'PET SAFA', 'ISABGOL',
      'ENZYME', 'BACILLUS', 'PROBIOTIC', 'LIVER', 'LIV-52', 'PANCREATIN'
    ]
  },
  {
    category: 'Vitamins & Supplements',
    keywords: [
      'VITAMIN', 'D3', 'B-COMPLEX', 'CALCIUM', 'ZINC', 'FOLIC ACID', 'METHYLCOBALAMIN',
      'EVION', 'LIMCEE', 'MULTIVIT', 'NEUROBION', 'CALCIROL', 'BIOTIN', 'CALCIQUICK',
      'BONEFINE', 'NEUROPM', 'LYCOZON', 'REVITAL', 'GLUCOSE', 'VITAPLUS', 'FERROUS',
      'IRON', 'NUTRITION', 'PROTIN', 'PROTEIN', 'OMEGA-3', 'COD LIVER', 'FOLIC'
    ]
  },
  {
    category: 'Skin Care',
    keywords: [
      'CREAM', 'OINTMENT', 'OINT', 'LOTION', 'CLOTRIMAZOLE', 'KETOCONAZOLE', 'CLOBETASOL',
      'MOMETASONE', 'BETAMETHASONE', 'LULICONAZOLE', 'PERMETHRIN', 'FUSIDIC', 'BOROLINE',
      'BOROPLUS', 'ACNE', 'ITCH', 'ITCHGUARD', 'SCABIES', 'DERMI', 'NADIMIN', 'KOJIC',
      'SUNSCREEN', 'SUNBEAT', 'SKINSHINE', 'FAIR & LOVELY', 'GLOW', 'TRETIHEAL', 'ADAPALENE',
      'EBERCONAZOLE', 'TACROLIMUS', 'SILVER NITRATE', 'BURNS'
    ]
  },
  {
    category: 'Eye Care',
    keywords: [
      'EYE DROP', 'EYE DROPS', 'EYEDROP', 'OPHTHALMIC', 'TEARS', 'MOXIFLOXACIN',
      'CARBOXYMETHYL', 'TIMOLOL', 'BRIMONIDINE', 'NEPAFENAC', 'LUBRICAT', 'EYE OINTMENT',
      'CIPLOX', 'GATIQUIN', 'LOTEWAY', 'TOBAZEX', 'ITONE', 'CATARACT', 'RETINA'
    ]
  },
  {
    category: 'Baby Care',
    keywords: [
      'BABY', 'DIAPER', 'GRIPE WATER', 'BABULINE', 'CERELAC', 'FEEDING BOTTLE', 'SOOTHER',
      'TEETHER', 'JOHNSON', 'HIMALAYA BABY', 'PAMPERS', 'MAMYPOKO', 'TEDDYY', 'WOODWARD'
    ]
  },
  {
    category: 'Medical Devices',
    keywords: [
      'MONITOR', 'BP', 'GLUCOMETER', 'STRIPS', 'THERMOMETER', 'NEBULIZER', 'SYRINGE',
      'NEEDLE', 'VAPORIZER', 'BELT', 'KNEE CAP', 'WRIST', 'ANKLET', 'COLLAR', 'OXYMETER',
      'SPIROMETER', 'STETHOSCOPE', 'WALKER', 'CATHATER', 'CATHETER', 'VAPORISER', 'HOT WATER BAG'
    ]
  },
  {
    category: 'First Aid',
    keywords: [
      'BANDAGE', 'GAUZE', 'COTTON', 'SWAB', 'ANTISEPTIC', 'POVIDONE', 'POVIDINE',
      'SAVELON', 'SAVLON', 'DETTOL', 'ADHESIVE TAPE', 'HANSAPLAST', 'FIRST AID',
      'BETADINE', 'CIPLADINE', 'HYDROGEN PEROXIDE', 'PLASTER'
    ]
  },
  {
    category: "Women's Health",
    keywords: [
      'SANITARY', 'NAPKIN', 'MENSTRUAL CUP', 'WHISPER', 'SOFY', 'PREGA NEWS', 'OVULATION',
      'PROGESTERONE', 'DYDOHORM', 'I-PILL', 'UNWANTED', 'MALA-D', 'ESTRADIOL', 'LETROZOLE',
      'CABERGOLINE', 'FEMALE', 'VAGINAL', 'V-WASH', 'INTIMATE WASH'
    ]
  },
  {
    category: "Men's Health",
    keywords: [
      'MANFORCE', 'SILDENAFIL', 'TADALAFIL', 'VIGORA',
      'FINASTERIDE', 'MINOXIDIL', 'TENTEX', 'SPEMAN', 'DUREX', 'CONDOM', 'KOHINOOR',
      'SILODOSIN', 'TAMSULOSIN', 'DUTASTERIDE', 'ALFUZOSIN'
    ]
  },
  {
    category: 'Personal Care',
    keywords: [
      'TOOTHPASTE', 'TOOTHBRUSH', 'SOAP', 'SHAMPOO', 'HAIR OIL', 'DEO', 'PERFUME',
      'TALC', 'HAIR COLOR', 'HEENA', 'COLGATE', 'SENSODYNE', 'DANT KANTI', 'CINTHOL',
      'PEARS', 'MEDIMIX', 'LIFEBUOY', 'SUNSILK', 'DOVE', 'HEAD & SHOU', 'SHAVING', 'RAZOR', 'BLADE'
    ]
  },
  {
    category: 'OTC',
    keywords: [
      'BALM', 'CHURNA', 'HONEY', 'HERBAL', 'AYURVEDIC', 'VASELINE', 'VICKS', 'ENO',
      'PUDIN HARA', 'SAFI', 'CHYAWANPRASH', 'GLUCOVITA', 'ORANGE DRINK', 'ROSE WATER'
    ]
  }
];

// Keywords indicating prescription necessity (Schedule H/H1, steroids, cardiac, antibiotics, sedatives)
const RX_KEYWORDS = [
  'TABLET', 'CAPSULE', 'INJECTION', 'INJ', 'MG', 'MCG',
  'AMOXYCILLIN', 'CEFIXIME', 'CIPROFLOXACIN', 'AZITHROMYCIN', 'LEVOFLOXACIN',
  'OFLOXACIN', 'METFORMIN', 'GLIMEPIRIDE', 'TELMISARTAN', 'ATORVASTATIN',
  'ROSUVASTATIN', 'AMLODIPINE', 'PANTOPRAZOLE', 'RABEPRAZOLE', 'LOSARTAN',
  'CLONAZEPAM', 'ALPRAZOLAM', 'ZOLPIDEM', 'ESCITALOPRAM', 'SERTRALINE',
  'PREGABALIN', 'GABAPENTIN', 'INSULIN', 'THYROXINE', 'METHOTREXATE',
  'DEFLAZACORT', 'PREDNISOLONE', 'CLOPIDOGREL', 'ETORICOXIB', 'TRAMADOL'
];

const NON_RX_KEYWORDS = [
  'SOAP', 'SHAMPOO', 'TOOTHPASTE', 'TOOTHBRUSH', 'BALM', 'CHURNA', 'HONEY',
  'BANDAGE', 'TAPE', 'GAUZE', 'COTTON', 'DIAPER', 'FEEDING BOTTLE',
  'MONITOR', 'THERMOMETER', 'NEBULIZER', 'VAPORIZER', 'SANITY', 'NAPKIN',
  'MENSTRUAL', 'CONDOM', 'GELUSIL', 'SAVLON', 'DETTOL', 'BOROLINE', 'MOOV',
  'IODEX', 'SUGAR FREE', 'GLUCOSE', 'VICKS', 'LOZENGES'
];

/**
 * Classify product category based strictly on product name and keywords.
 * Returns 'Other' if no reliable classification can be made.
 */
export function classifyCategory(productName: string): ProductCategory {
  const upper = productName.toUpperCase();

  for (const rule of CATEGORY_RULES) {
    for (const kw of rule.keywords) {
      if (upper.includes(kw)) {
        return rule.category;
      }
    }
  }

  return 'Other';
}

/**
 * Determine whether a medicine requires a doctor's prescription.
 */
export function isPrescriptionRequired(productName: string, category: ProductCategory): boolean {
  const upper = productName.toUpperCase();

  // If clearly non-Rx OTC consumer/surgical/personal care product
  for (const nrx of NON_RX_KEYWORDS) {
    if (upper.includes(nrx)) return false;
  }

  if (
    category === 'Personal Care' ||
    category === 'Baby Care' ||
    category === 'First Aid' ||
    category === 'Medical Devices'
  ) {
    return false;
  }

  // Prescription required categories
  if (
    category === 'Diabetes' ||
    category === 'Cardiac & Heart' ||
    category === 'Blood Pressure' ||
    upper.includes('TAB') ||
    upper.includes('CAP') ||
    upper.includes('INJ')
  ) {
    for (const rx of RX_KEYWORDS) {
      if (upper.includes(rx)) return true;
    }
  }

  return false;
}

/**
 * Detect dosage formulation
 */
export function detectFormulation(productName: string, packing: string): string {
  const text = (productName + ' ' + packing).toUpperCase();
  if (text.includes('TAB') || text.includes('TABLET')) return 'Tablet';
  if (text.includes('CAP') || text.includes('CAPSULE')) return 'Capsule';
  if (text.includes('SYP') || text.includes('SYRUP') || text.includes('SUSPENSION')) return 'Syrup / Liquid';
  if (text.includes('GEL') || text.includes('CREAM') || text.includes('OINT') || text.includes('OINTMENT')) return 'Cream / Ointment / Gel';
  if (text.includes('DROP') || text.includes('DROPS')) return 'Drops';
  if (text.includes('INJ') || text.includes('INJECTION')) return 'Injection';
  if (text.includes('INHALER') || text.includes('ROTACAP') || text.includes('RESPULES')) return 'Inhaler / Respules';
  if (text.includes('POW') || text.includes('POWDER') || text.includes('SACHET')) return 'Powder / Sachet';
  if (text.includes('PCS') || text.includes('KIT') || text.includes('BELT') || text.includes('BANDAGE')) return 'Device / Surgical';
  return 'Medicine';
}

/**
 * Check if a product is expired according to current date.
 * If expiry is "2024-05", compared to 2026-09-28, it is expired.
 */
export function checkIsExpired(expiry: string | null | undefined): boolean {
  if (!expiry) return false;
  try {
    const trimmed = expiry.trim();
    // Handle formats: "MM/YY", "MM/YYYY", "YYYY-MM", "YYYY-MM-DD"
    let expYear: number | null = null;
    let expMonth: number | null = null;

    if (trimmed.includes('/')) {
      const parts = trimmed.split('/');
      if (parts.length === 2) {
        expMonth = parseInt(parts[0], 10);
        const y = parseInt(parts[1], 10);
        expYear = y < 100 ? 2000 + y : y;
      }
    } else if (trimmed.includes('-')) {
      const parts = trimmed.split('-');
      if (parts.length >= 2) {
        expYear = parseInt(parts[0], 10);
        expMonth = parseInt(parts[1], 10);
      }
    }

    if (expYear && expMonth) {
      // Current year/month: Sep 2026
      const currentYear = 2026;
      const currentMonth = 9;
      if (expYear < currentYear) return true;
      if (expYear === currentYear && expMonth < currentMonth) return true;
    }
  } catch {
    return false;
  }
  return false;
}

/**
 * Determine customer-friendly availability status
 */
export function determineAvailability(
  quantity: number | null | undefined,
  expiry: string | null | undefined
): AvailabilityStatus {
  if (checkIsExpired(expiry)) {
    return 'OUT_OF_STOCK';
  }
  if (quantity === null || quantity === undefined) {
    return 'IN_STOCK';
  }
  if (quantity <= 0) return 'OUT_OF_STOCK';
  if (quantity < 10) return 'LIMITED';
  return 'IN_STOCK';
}
