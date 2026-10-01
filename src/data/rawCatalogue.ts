/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Source: "product list - Copy.pdf"
 * Actual pharmacy catalogue items from uploaded inventory.
 * DO NOT invent products or fake data. Missing fields are strictly null.
 */

export interface RawCatalogueRow {
  id: string;
  name: string;
  packing: string;
  company: string;
  batch?: string;
  exp?: string;
  qty?: number;
  price?: number;
  mrp?: number;
}

export const RAW_CATALOGUE_DATA: RawCatalogueRow[] = [
  // Page 1 - Voglibose, Thyroxine, Atorvastatin, Metformin, Glimepiride
  { id: "1", name: "101-VOGLIBOSE-0.2 TABLETS", packing: "10TAB", company: "CLB" },
  { id: "2", name: "102-VOGLIBOSE-0.3 TABLETS", packing: "10TAB", company: "CLB" },
  { id: "3", name: "104-VOGLIBOSE-MF 0.3 500", packing: "10TAB", company: "CLB" },
  { id: "4", name: "106-VOGLIBOS-GM 0.2/1/500", packing: "10TAB", company: "CLB" },
  { id: "5", name: "113-D3 TABLET", packing: "4TAB", company: "CLB" },
  { id: "6", name: "120-THYROXINE-25 TABLETS", packing: "100TAB", company: "CLB" },
  { id: "7", name: "121-THYROXINE-50 TABLETS", packing: "100TAB", company: "CLB" },
  { id: "8", name: "122-THYROXINE-75 TABLETS", packing: "100TAB", company: "CLB" },
  { id: "9", name: "123-THYROXINE-100 TABLETS", packing: "100TAB", company: "CLB" },
  { id: "10", name: "125-ATORVASTATIN-A20/150 CAPS", packing: "10CAP", company: "CLB" },
  { id: "11", name: "137-GLICLAZIDE-M 30/500 TABLET", packing: "10TAB", company: "CLB" },
  { id: "12", name: "138-METFORMIN-GP 500/60/15 TAB", packing: "10TAB", company: "CLB" },
  { id: "13", name: "139-METFORMIN-GP 500/0.5 TABLE", packing: "10TAB", company: "CLB" },
  { id: "14", name: "141-GLIMEPIRIDE-3 TABLETS", packing: "10TAB", company: "CLB" },
  { id: "15", name: "142-METFORMIN-GP 4/1000 TABLET", packing: "10TAB", company: "CLB" },
  { id: "16", name: "163-SILODOSIN-D8 CAPSULES", packing: "10CAP", company: "CLB" },
  { id: "17", name: "164-SILODOCIN-8 CAPSULES", packing: "10CAP", company: "CLB" },
  { id: "18", name: "168-TENELIGLIPTN-M 20/1000 TAB", packing: "10TAB", company: "CLB" },
  { id: "19", name: "171-TORSEMIDE-SP 5/50 TABLETS", packing: "10TAB", company: "CLB" },
  { id: "20", name: "19-CLOPIDOGREL-AS 75/75 TABLET", packing: "10TAB", company: "CLB" },
  { id: "21", name: "191-VILDAGLIPTIN-D 100 10", packing: "10TAB", company: "CLB" },
  { id: "22", name: "20-CLOPIDOGREL-AS 75/150 TABLE", packing: "10TAB", company: "CLB" },
  { id: "23", name: "25-CARVEDILOL-6.25 TABLET", packing: "10TAB", company: "CLB" },
  { id: "24", name: "28-DEFLAZACORT 6 MG TABLETS", packing: "10TAB", company: "CLB" },
  { id: "25", name: "3-D SKIN CREAM", packing: "10GM", company: "DRM" },
  { id: "26", name: "31-FEBUXOSTAT-40 TABLETS", packing: "10TAB", company: "CLB" },
  { id: "27", name: "32-GLIMEPIRIDE-1 TABLETS", packing: "10TAB", company: "CLB" },
  { id: "28", name: "33-GLIMEPIRIDE-2 TABLETS", packing: "10TAB", company: "CLB" },

  // Page 2 - Rosuvastatin, Metformin, Abdominal Belts
  { id: "29", name: "36-GLIMEPIRIDE-MF 1/1000 TABLE", packing: "10TAB", company: "CLB" },
  { id: "30", name: "37-GLIMEPIRIDE-MF 2/1000 TABLE", packing: "10TAB", company: "CLB" },
  { id: "31", name: "41-GLICLAZIDE-80 TABLETS", packing: "10TAB", company: "CLB" },
  { id: "32", name: "42-GLICLAZIDE-M 60/500 TABLETS", packing: "10TAB", company: "CLB" },
  { id: "33", name: "44-METFORMIN SR-500 TABLE", packing: "10TAB", company: "CLB" },
  { id: "34", name: "45-METFORMIN-850 TABLETS", packing: "10TAB", company: "CLB" },
  { id: "35", name: "46-METFORMIN-1000 TABLETS", packing: "10TAB", company: "CLB" },
  { id: "36", name: "5 MONO 10 TAB", packing: "10TAB", company: "ZDS" },
  { id: "37", name: "5 MONO 20 TAB", packing: "10TAB", company: "ZDS" },
  { id: "38", name: "5 MONO 30 SR TAB", packing: "10TAB", company: "ZYD" },
  { id: "39", name: "66-ROSUVASTATIN-5 TABLETS", packing: "10TAB", company: "CLB" },
  { id: "40", name: "67-ROSUVASTATIN-10 TABLET", packing: "10TAB", company: "CLB" },
  { id: "41", name: "68-ROSUVASTATIN-20 TABLET", packing: "10TAB", company: "CLB" },
  { id: "42", name: "76-VOGLIBOS-GM 0.3 2 500", packing: "10TAB", company: "CLB" },
  { id: "43", name: "77-VOGLIBOS-GM 0.2 2 500", packing: "10TAB", company: "CLB" },
  { id: "44", name: "94-TRAMADOL-P TABLETS", packing: "10TAB", company: "CLB" },
  { id: "45", name: "A COR Z SYP", packing: "200ML", company: "CON" },
  { id: "46", name: "AARMOX-250 CAP", packing: "10CAP", company: "ART" },
  { id: "47", name: "AASTHA VAPORIZER", packing: "1PCS", company: "RVI" },
  { id: "48", name: "ABANA TAB", packing: "60TAB", company: "HIM" },
  { id: "49", name: "ABD PLUS SUSPENSION", packing: "10ML", company: "INA" },
  { id: "50", name: "ABD PLUS TAB", packing: "1TAB", company: "INA" },
  { id: "51", name: "ABD SUSPENSION", packing: "10ML", company: "INA" },
  { id: "52", name: "ABD-400 TAB", packing: "1TAB", company: "INA" },
  { id: "53", name: "ABDOMINAL BELT 2XL", packing: "1PCS", company: "BPP" },
  { id: "54", name: "ABDOMINAL BELT M", packing: "1PCS", company: "BPP" },
  { id: "55", name: "ABDOMINAL BELT XL", packing: "1PCS", company: "BPP" },
  { id: "56", name: "ABHAY TOX AMPOULE", packing: "0.5ML", company: "IDN" },
  { id: "57", name: "ABIDUO GEL", packing: "30GM", company: "DMS" },
  { id: "58", name: "ABOYVIR-200 TAB", packing: "10TAB", company: "ASM" },

  // Page 3 - Acarbose, Aceclofenac, Acetaminophen
  { id: "59", name: "ACARBOSE-25 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "60", name: "ACARBOSE-50 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "61", name: "ACARBOSE-M 50 500 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "62", name: "ACARSAFE-25 TAB", packing: "10TAB", company: "ZDS" },
  { id: "63", name: "ACARSAFE-50 TAB", packing: "10TAB", company: "ZYD" },
  { id: "64", name: "ACCUSURE DIGITAL THRMOMETER", packing: "1PCS", company: "MCRGN" },
  { id: "65", name: "ACEBROLIN 100 CAP", packing: "10CAP", company: "TES" },
  { id: "66", name: "ACEBROPHYLIN-M 200 10 TAB", packing: "10TAB", company: "BPP" },
  { id: "67", name: "ACEBROPHYLLIN-ACETYLCYSTE", packing: "10TAB", company: "BPP" },
  { id: "68", name: "ACEBROPHYLLINE-100 CAPSUL", packing: "10CAP", company: "BPP" },
  { id: "69", name: "ACECLODUS-MR TAB", packing: "10TAB", company: "ZDS" },
  { id: "70", name: "ACECLOFENAC-100 TAB", packing: "10TAB", company: "BPP" },
  { id: "71", name: "ACECLOFENAC-200 SR TAB", packing: "10TAB", company: "BPP" },
  { id: "72", name: "ACECLOFENAC-P TABLET", packing: "10TAB", company: "BPP" },
  { id: "73", name: "ACECLOFENAC-PTH TABLETS", packing: "10TAB", company: "BPP" },
  { id: "74", name: "ACECLOFENAC-RB CAPSULES", packing: "10CAP", company: "BPP" },
  { id: "75", name: "ACECLOFENAC-SP TABLET", packing: "10TAB", company: "BPP" },
  { id: "76", name: "ACECLOFENAC-TH 100 4 TAB", packing: "10TAB", company: "BPP" },
  { id: "77", name: "ACECLONEC-100 TAB", packing: "10TAB", company: "TES" },
  { id: "78", name: "ACENOCOUMAROL 2MG TABLETS", packing: "30TAB", company: "BPP" },
  { id: "79", name: "ACEREST-P TAB", packing: "10TAB", company: "MAP" },
  { id: "80", name: "ACETAMINOPHEN TRAMADOL T", packing: "10TAB", company: "BPP" },
  { id: "81", name: "ACETASMART-250 TAB", packing: "15TAB", company: "HEA" },
  { id: "82", name: "ACETAZOLAMIDE 250 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "83", name: "ACETYLCYSTEIN-600 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "84", name: "ACETYNET-AC TAB", packing: "10TAB", company: "ASM" },
  { id: "85", name: "ACETYNET-T TAB", packing: "10TAB", company: "ASM" },
  { id: "86", name: "ACICLOVIR-400 TABLETS", packing: "5TAB", company: "ASM" },
  { id: "87", name: "ACICLOVIR-800 TABLETS", packing: "5TAB", company: "BPP" },

  // Page 4 - Acneprix, Acnestop, Action-500, Acyclovir Eye Ointment
  { id: "88", name: "ACIMOL SR TAB", packing: "10TAB", company: "LEE" },
  { id: "89", name: "ACINOT SYP", packing: "100ML", company: "MOR" },
  { id: "90", name: "ACIRAFT SYP", packing: "150ML", company: "MDS" },
  { id: "91", name: "ACITEZ PG TABLETS", packing: "10TAB", company: "TES" },
  { id: "92", name: "ACLOMET XL 3D TAB", packing: "10TAB", company: "AJA" },
  { id: "93", name: "ACLONAM-T4 TAB", packing: "10TAB", company: "NAM" },
  { id: "94", name: "ACLONAM-TH TAB", packing: "10TAB", company: "NAM" },
  { id: "95", name: "ACLOPEN PLUS TAB", packing: "10TAB", company: "MOR" },
  { id: "96", name: "ACLOZEST GEL", packing: "30GM", company: "IKO" },
  { id: "97", name: "ACNEPRIX GEL", packing: "20GM", company: "NAM" },
  { id: "98", name: "ACNESTAR GEL", packing: "15GM", company: "MA" },
  { id: "99", name: "ACNESTAR SOAP", packing: "75GM", company: "MA" },
  { id: "100", name: "ACNET SOAP", packing: "75GM", company: "WIL" },
  { id: "101", name: "ACNETOIN-10 CAP", packing: "10CAP", company: "LEE" },
  { id: "102", name: "ACNETOIN-20 CAP", packing: "10CAP", company: "LEE" },
  { id: "103", name: "ACNETOP GEL", packing: "20GM", company: "HEA" },
  { id: "104", name: "ACNETOP S FACE WASH", packing: "60ML", company: "HEA" },
  { id: "105", name: "ACNETOP ULTRA FACEWASH", packing: "100ML", company: "HEA" },
  { id: "106", name: "ACOTIAMIDE 100 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "107", name: "ACTIFIT RAZOR", packing: "1PCS", company: "COM" },
  { id: "108", name: "ACTION-500 TAB", packing: "10TAB", company: "ULS" },
  { id: "109", name: "ACTOHEAL-100 TAB", packing: "10TAB", company: "HEA" },
  { id: "110", name: "ACTON SPRAY", packing: "50GM", company: "AMBIX" },
  { id: "111", name: "ACYCLOVIR 3% EYE OINTMENT", packing: "5GM", company: "BPP" },
  { id: "112", name: "ADAPALENE & CLINDAMYCIN G", packing: "15GM", company: "BPP" },
  { id: "113", name: "ADAPALENE GEL 0.1%", packing: "15GM", company: "BPP" },

  // Page 5 - Adult Diapers, Aerocort, Adulsa, Affexor
  { id: "114", name: "ADHESIVE BANDAGES", packing: "1PCS", company: "BPP" },
  { id: "115", name: "ADHESIVE PAPER TAPE 5*9", packing: "1PCS", company: "BPP" },
  { id: "116", name: "ADHESIVE TAPE 2.5*1", packing: "1PCS", company: "BPP" },
  { id: "117", name: "ADULSA SYP", packing: "100ML", company: "OTC" },
  { id: "118", name: "ADULT DIAPER L BPPI", packing: "5PCS", company: "BPP" },
  { id: "119", name: "ADULT DIAPER M BPPI", packing: "5PCS", company: "BPP" },
  { id: "120", name: "ADULT DIAPER PANT L", packing: "10PCS", company: "BPP" },
  { id: "121", name: "ADULT DIAPER PANT M", packing: "10PCS", company: "BPP" },
  { id: "122", name: "ADULT DIAPER XL BPPI", packing: "5PCS", company: "BPP" },
  { id: "123", name: "ADUSOL SYP", packing: "200ML", company: "OTC" },
  { id: "124", name: "AEROCORT FORTE ROTACAPS", packing: "30CAP", company: "CIP" },
  { id: "125", name: "AEROCORT INHALER", packing: "1PCS", company: "CIP" },
  { id: "126", name: "AEROCORT ROTACAPS", packing: "30CAP", company: "CIP" },
  { id: "127", name: "AFFEXOR-XR 37.50 TAB", packing: "10TAB", company: "HEA" },
  { id: "128", name: "AFFEXOR-XR 75 TAB", packing: "10TAB", company: "HEA" },
  { id: "129", name: "AGEFINE SOAP", packing: "75GM", company: "HEA" },

  // Page 6 - Albendazole, Alkemox, Alcoxib
  { id: "130", name: "AHAGLOW FACEWASH", packing: "100ML", company: "TOR" },
  { id: "131", name: "AIKA HOT BAG ELECTRIC", packing: "1PCS", company: "COM" },
  { id: "132", name: "AIRCOUGH TAB", packing: "10TAB", company: "INV" },
  { id: "133", name: "AIRFLOW 250 ROTACAP", packing: "30CAP", company: "STR" },
  { id: "134", name: "ALBENDAZOLE 400 TAB", packing: "1TAB", company: "BPP" },
  { id: "135", name: "ALBENDAZOLE IVERMACTIN", packing: "1TAB", company: "BPP" },
  { id: "136", name: "ALBENDAZOLE SYP", packing: "10ML", company: "BPP" },
  { id: "137", name: "ALCIFLOX-D EYE DROPS", packing: "10ML", company: "ALK" },
  { id: "138", name: "ALCINAC-RB CAP", packing: "10CAP", company: "LEE" },
  { id: "139", name: "ALCOHOL SWAB", packing: "1PCS", company: "BPP" },
  { id: "140", name: "ALCOXIB-90 TAB", packing: "10TAB", company: "ALK" },
  { id: "141", name: "ALCOXIB-MR TAB", packing: "10TAB", company: "ALK" },
  { id: "142", name: "ALDIGESIC-RAB CAP", packing: "10CAP", company: "ALK" },
  { id: "143", name: "ALENLISER SYP", packing: "200ML", company: "ALR" },

  // Page 7 - Alfuzosin, Alkemox CV-625, Alkof
  { id: "144", name: "ALFUZOSIN-10 TAB", packing: "10TAB", company: "ASM" },
  { id: "145", name: "ALFUZOSIN-D TAB", packing: "10TAB", company: "ASM" },
  { id: "146", name: "ALGAT EYE DROPS", packing: "10ML", company: "ALK" },
  { id: "147", name: "ALKAZIP-B6 SYP", packing: "100ML", company: "LEE" },
  { id: "148", name: "ALKEMOX CV-625 TAB", packing: "10TAB", company: "ALK" },
  { id: "149", name: "ALKEMZYME SYP", packing: "200ML", company: "ALK" },
  { id: "150", name: "ALKOF COLD & FLU TAB", packing: "10TAB", company: "ALK" },
  { id: "151", name: "ALL STAR INSULIN DEVICE", packing: "1PCS", company: "SAN" },
  { id: "152", name: "ALLERGEGRA-120 TAB", packing: "10TAB", company: "HEA" },
  { id: "153", name: "ALLERGEGRA-180 TAB", packing: "10TAB", company: "HEA" },
  { id: "154", name: "ALLERGEGRA-M TAB", packing: "10TAB", company: "HEA" },

  // Page 8 - Allopurinol, Alprazolam, Alveosal Inhaler
  { id: "155", name: "ALLOPURINOL-100 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "156", name: "ALLOPURINOL-300 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "157", name: "ALOE-E CREAM", packing: "50GM", company: "MER" },
  { id: "158", name: "ALOEVERA KANTI SOAP", packing: "3*150G", company: "PAT" },
  { id: "159", name: "ALPRAZOLAM-0.25 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "160", name: "ALPRAZOLAM-0.5 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "161", name: "ALRGEE M TABLETS", packing: "10TAB", company: "MOR" },
  { id: "162", name: "ALRGEE SYP", packing: "60ML", company: "MOR" },
  { id: "163", name: "ALUMINUM MAG SMTHCN SYRUP", packing: "170ML", company: "BPP" },
  { id: "164", name: "ALVEOBEC-LV INHALER", packing: "1PCS", company: "PRE" },
  { id: "165", name: "ALVEOSAL FORT INHALER", packing: "1PCS", company: "PRE" },

  // Page 9 & 10 - Amiodarone, Amlodipine, Amisulpride
  { id: "166", name: "AMIODARONE-100 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "167", name: "AMIODARONE-200 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "168", name: "AMISULPRIDE-50 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "169", name: "AMITRIPTYLINE-10 TABLET", packing: "10TAB", company: "BPP" },
  { id: "170", name: "AMITRIPTYLINE-25 TABLET", packing: "15TAB", company: "BPP" },
  { id: "171", name: "AMLA POWDER", packing: "100GM", company: "COM" },
  { id: "172", name: "AMLIP-10 TAB", packing: "10TAB", company: "CIP" },
  { id: "173", name: "AMLIP-5 TAB", packing: "10TAB", company: "CIP" },
  { id: "174", name: "AMLIP-AT TAB", packing: "10TAB", company: "CIP" },
  { id: "175", name: "AMLODIPINE-10 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "176", name: "AMLODIPINE-5 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "177", name: "AMLODIPINE-AT 5/25 TABLET", packing: "14TAB", company: "BPP" },
  { id: "178", name: "AMLODIPINE-AT 5/50 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "179", name: "AMLODIPINE-H 5 12.5 TABLE", packing: "10TAB", company: "BPP" },
  { id: "180", name: "AMOROLFINE CREAM", packing: "30GM", company: "BPP" },

  // Page 11 - Amoxycillin, Amrutanjan
  { id: "181", name: "AMOXYCILLIN 250 MG CAP", packing: "10CAP", company: "BPP" },
  { id: "182", name: "AMOXYCILLIN 500 CAPSULES", packing: "10CAP", company: "BPP" },
  { id: "183", name: "AMOXYCILLIN CV 457 SUSPENSION", packing: "30 ML", company: "BPP" },
  { id: "184", name: "AMOXYCILLIN-CV 1GM TABLET", packing: "6TAB", company: "BPP" },
  { id: "185", name: "AMOXYCILLIN-CV 625 TAB", packing: "6TAB", company: "BPP" },
  { id: "186", name: "AMOXYCLAV-1GM TAB", packing: "10TAB", company: "ABB" },
  { id: "187", name: "AMOXYCLAV-375 TAB", packing: "10TAB", company: "ABB" },
  { id: "188", name: "AMPICILLIN CLOXA-250 CAP", packing: "10CAP", company: "BPP" },
  { id: "189", name: "AMPICILLIN-500 MG CAPSULE", packing: "10CAP", company: "BPP" },
  { id: "190", name: "AMROX-LS SYP", packing: "100ML", company: "LEE" },
  { id: "191", name: "AMRUTANJAN PAIN BALM", packing: "30ML", company: "AMR" },
  { id: "192", name: "AMRUTANJAN PAIN BALM", packing: "50ML", company: "AMR" },
  { id: "193", name: "AMRUTANJAN ROLL ON", packing: "10ML", company: "AMR" },

  // Page 12 - Anastrozole, Anacid, Antiscab
  { id: "194", name: "ANASTROZOLE 1MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "195", name: "ANGIOTENSIN-2.5 TAB", packing: "10TAB", company: "HEA" },
  { id: "196", name: "ANGIOTENSIN-5 TAB", packing: "10TAB", company: "HEA" },
  { id: "197", name: "ANKLET XL BPPI", packing: "1PCS", company: "BPP" },
  { id: "198", name: "ANOBLISS CREAM", packing: "30GM", company: "SRT" },
  { id: "199", name: "ANTIOXIDANT CAPSULES", packing: "30CAP", company: "BPP" },
  { id: "200", name: "ANTISCAB LOTION", packing: "100ML", company: "SEA" },

  // Page 13 - Apremilast, Apixaban, Arginine
  { id: "201", name: "APREMILAST-10 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "202", name: "APXBAN-2.5 TAB", packing: "10TAB", company: "ASM" },
  { id: "203", name: "APXBAN-5 TAB", packing: "10TAB", company: "ASM" },
  { id: "204", name: "ARGININE SACHET 3GM", packing: "8.5GM", company: "BPP" },
  { id: "205", name: "ARGISTRONG SACHET", packing: "6.5GM", company: "MA" },

  // Page 14 - Aripiprazole, Aristo Dryl, Arm Sling
  { id: "206", name: "ARIPIPRAZOLE-2.5 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "207", name: "ARIPIPRAZOLE-20 MG TABLET", packing: "10TAB", company: "BPP" },
  { id: "208", name: "ARIPIPRAZOLE-5 MG TABLET", packing: "10TAB", company: "BPP" },
  { id: "209", name: "ARISTODRYL PLUS SYP", packing: "100ML", company: "ARI" },
  { id: "210", name: "ARISTOMOX CV-375 TAB", packing: "10TAB", company: "ARI" },
  { id: "211", name: "ARJUNARISHTA SYRUP", packing: "450ML", company: "BAI" },
  { id: "212", name: "ARM SLING L", packing: "1PCS", company: "LEE" },
  { id: "213", name: "ARM SLING POUCH L (BPPI)", packing: "1PCS", company: "BPP" },

  // Page 15 - Ashwagandha, Ascodex, Ascorbic Acid
  { id: "214", name: "ASCODEX DX SYP", packing: "100ML", company: "GLE" },
  { id: "215", name: "ASCODEX-LS SYP", packing: "100ML", company: "GLE" },
  { id: "216", name: "ASCORBIC ACID TAB 100MG", packing: "10TAB", company: "BPP" },
  { id: "217", name: "ASHWAGANDHA 250 TABLETS", packing: "60TAB", company: "BPP" },
  { id: "218", name: "ASHWAGANDHA CHURNA", packing: "60GM", company: "ZAN" },
  { id: "219", name: "ASHWAGANDHA-500 CAP", packing: "60CAP", company: "NAV" },

  // Page 16 - Aspirin, Asthalin, Atenolol, Ativan
  { id: "220", name: "ASPIRIN 325MG TABLETS I.P", packing: "14TAB", company: "BPP" },
  { id: "221", name: "ASPIRIN-150 TABLET", packing: "14TAB", company: "BPP" },
  { id: "222", name: "ASPIRIN-75 TABLET", packing: "14TAB", company: "BPP" },
  { id: "223", name: "ASTHALIN INHALER", packing: "200MET", company: "CIP" },
  { id: "224", name: "ASTHALIN RESPULES", packing: "2ML", company: "CIP" },
  { id: "225", name: "ASTHALIN-4 TAB", packing: "30TAB", company: "CIP" },
  { id: "226", name: "ATENOLOL-25 MG TABLETS", packing: "14TAB", company: "BPP" },
  { id: "227", name: "ATENOLOL-50 MG TABLETS", packing: "14TAB", company: "BPP" },
  { id: "228", name: "ATIVAN-2 TAB", packing: "30TAB", company: "PFI" },

  // Page 17 - Atorvastatin pure & combo formulations
  { id: "229", name: "ATORVASTATIN GOLD 207575", packing: "10CAP", company: "BPP" },
  { id: "230", name: "ATORVASTATIN-10 TABLET", packing: "10TAB", company: "BPP" },
  { id: "231", name: "ATORVASTATIN-20 TABLET", packing: "10TAB", company: "BPP" },
  { id: "232", name: "ATORVASTATIN-40 TABLET", packing: "10TAB", company: "BPP" },
  { id: "233", name: "ATORVASTATIN-ASP10 150 CA", packing: "15CAP", company: "BPP" },
  { id: "234", name: "ATORVASTATIN-ASP10 75 CAP", packing: "10CAP", company: "BPP" },
  { id: "235", name: "ATORVASTATIN-CLP 10 75 CA", packing: "10CAP", company: "BPP" },
  { id: "236", name: "ATORVASTATIN-CLP 20 75 CA", packing: "10CAP", company: "BPP" },
  { id: "237", name: "ATORVASTATIN-F 10 160 TAB", packing: "15TAB", company: "BPP" },
  { id: "238", name: "ATOSKY A-20/150 CAP", packing: "15CAP", company: "DAX" },
  { id: "239", name: "ATOSKY GOLD-10 CAP", packing: "10CAP", company: "DAX" },

  // Page 18 - Avil, Austro Iron
  { id: "240", name: "AVIL-25 TAB", packing: "15TAB", company: "SAN" },
  { id: "241", name: "AVIL-50 TAB", packing: "15TAB", company: "SAN" },
  { id: "242", name: "AVIPATIKAR CHURNA", packing: "50GM", company: "ZAN" },

  // Page 19 & 20 - Azithromycin, Azilsartan
  { id: "243", name: "AZEEVER-500 TAB", packing: "3TAB", company: "VER" },
  { id: "244", name: "AZELASTINE F NASAL SPRAY", packing: "7ML", company: "BPP" },
  { id: "245", name: "AZICIP-200 SYP", packing: "15ML", company: "CI" },
  { id: "246", name: "AZILSARTAN-40 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "247", name: "AZILSARTAN-CH 40 12.5 TAB", packing: "10TAB", company: "BPP" },
  { id: "248", name: "AZITHROMYCIN 100 MG DT TA", packing: "10TAB", company: "BPP" },
  { id: "249", name: "AZITHROMYCIN-250 TABLET", packing: "6TAB", company: "BPP" },
  { id: "250", name: "AZITHROMYCIN-500 TABLET", packing: "3TAB", company: "BPP" },
  { id: "251", name: "AZMARDA-100 TAB", packing: "14TAB", company: "CIP" },

  // Page 21 - B-Complex, B-Tex, Baby Diapers, Bacillus Clausii
  { id: "252", name: "B-COMPLEX FORTE CAP", packing: "15CAP", company: "ELD" },
  { id: "253", name: "B-TEX CREAM", packing: "14GM", company: "OTC" },
  { id: "254", name: "BABULINE GRIPE WATER", packing: "135ML", company: "BAB" },
  { id: "255", name: "BABULINE GRIPE WATER", packing: "220ML", company: "BAB" },
  { id: "256", name: "BABY DIAPER NB", packing: "5PCS", company: "BPP" },
  { id: "257", name: "BABY DIAPERS L SIZE 75PCS", packing: "75PCS", company: "COM" },
  { id: "258", name: "BABY DIAPERS M SIZE 75PCS", packing: "75PCS", company: "COM" },
  { id: "259", name: "BABY DIAPERS SMALL", packing: "5PCS", company: "BPP" },
  { id: "260", name: "BABY FEEDING BOTTLE", packing: "250ML", company: "BPP" },
  { id: "261", name: "BABY WIPES BPPI", packing: "20PCS", company: "BPP" },
  { id: "262", name: "BACILLUS CLAUSI SPORE LIQ", packing: "5ML", company: "BPP" },
  { id: "263", name: "BACLOFEN 10 MG TABLETS IP", packing: "10TAB", company: "BPP" },

  // Page 22 - Bajaj Almond, Bandages, Basalog Insulin, Becadexamin, Beclomethasone
  { id: "264", name: "BAJAJ ALMOND OIL", packing: "100ML", company: "COM" },
  { id: "265", name: "BAND AID", packing: "1PCS", company: "COM" },
  { id: "266", name: "BANDAGE 10*5", packing: "1PCS", company: "SUR" },
  { id: "267", name: "BANDAGE 15CM BPPI", packing: "1PCS", company: "BPP" },
  { id: "268", name: "BANDAGE 7.5 BPPI", packing: "1PCS", company: "BPP" },
  { id: "269", name: "BASALOG INJECTION", packing: "3ML", company: "BCN" },
  { id: "270", name: "BASALOG ONE PEN", packing: "1PEN", company: "BCN" },
  { id: "271", name: "BD INSULIN SYRINGE", packing: "10PCS", company: "BD" },
  { id: "272", name: "BD ULTRA FINE PEN NEEDLES", packing: "5PCS", company: "SUR" },
  { id: "273", name: "BECADEXAMIN-60 CAP", packing: "60CAP", company: "GSK" },
  { id: "274", name: "BECLOMETHASONE-C CREAM", packing: "15GM", company: "BPP" },
  { id: "275", name: "BECLOMETHASONE-CG CREAM", packing: "15GM", company: "BPP" },

  // Page 23 - Bee Honey, Bempedoic Acid, Benidipine
  { id: "276", name: "BEE HONEY", packing: "100GM", company: "GHP" },
  { id: "277", name: "BEE HONEY", packing: "250GM", company: "GHP" },
  { id: "278", name: "BEMPEDOIC ACID 180 MG TAB", packing: "10TAB", company: "BPP" },
  { id: "279", name: "BEMPESTA-180 TAB", packing: "10TAB", company: "TOR" },
  { id: "280", name: "BENIDEP-4 TAB", packing: "10TAB", company: "JLE" },
  { id: "281", name: "BENIDEP-8 TAB", packing: "10TAB", company: "JLE" },

  // Page 24 - Betablock, Betamethasone, Betnovate
  { id: "282", name: "BETABLOCK XL-25 TAB", packing: "10TAB", company: "HEA" },
  { id: "283", name: "BETABLOCK XL-50 TAB", packing: "10TAB", company: "HEA" },
  { id: "284", name: "BETAMETHASONE CREAM 0.1%", packing: "20GM", company: "BPP" },
  { id: "285", name: "BETAMETHASONE-SC OINTMENT", packing: "20GM", company: "BPP" },
  { id: "286", name: "BETNOVATE-C CREAM", packing: "30GM", company: "GSK" },
  { id: "287", name: "BETNOVATE-GM CREAM", packing: "20GM", company: "GSK" },
  { id: "288", name: "BETNOVATE-N CREAM", packing: "20GM", company: "GSK" },

  // Page 25 - BGR-34, Bilastine, Bimatoprost
  { id: "289", name: "BGR-34 TAB", packing: "100TAB", company: "AIM" },
  { id: "290", name: "BICALUTAMIDE 50MG TAB I.P", packing: "10TAB", company: "BPP" },
  { id: "291", name: "BILASTINE-M 20 10 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "292", name: "BIMATOPROST TIMOLOL DROPS", packing: "5ML", company: "BPP" },
  { id: "293", name: "BIO-OIL", packing: "125ML", company: "OTH" },
  { id: "294", name: "BIOCETAMOL-125 SYP", packing: "60ML", company: "ZDS" },

  // Page 26 - Biocetamol, Biodipine, Biotin, Bioval
  { id: "295", name: "BIOCETAMOL-500 TAB", packing: "15TAB", company: "ZDS" },
  { id: "296", name: "BIOCETAMOL-650 TAB", packing: "15TAB", company: "GNO" },
  { id: "297", name: "BIOCIL MPS SYP", packing: "170ML", company: "BIC" },
  { id: "298", name: "BIODIPIN-5 TAB", packing: "10TAB", company: "BIO" },
  { id: "299", name: "BIOTIN-10 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "300", name: "BIOVAL-200 CR TAB", packing: "10TAB", company: "BIO" },

  // Page 27 - Bisacodyl, Bisoprolol
  { id: "301", name: "BISACODYL-5 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "302", name: "BISOPROLOL-5 TAB", packing: "10TAB", company: "BPP" },
  { id: "303", name: "BISOPROLOL-H 5 6.25 TABLE", packing: "10TAB", company: "BPP" },

  // Page 28 - Bonefine, Bonnisan, Boric Acid, Boroline
  { id: "304", name: "BONEFINE-500 TAB", packing: "15TAB", company: "HEA" },
  { id: "305", name: "BONEFINE-D3 CAP", packing: "4CAP", company: "HEA" },
  { id: "306", name: "BONEFINE-D3 NANO SHOT", packing: "5ML", company: "HEA" },
  { id: "307", name: "BONNISAN DROPS", packing: "30ML", company: "HIM" },
  { id: "308", name: "BORIC ACID I.P.", packing: "100GM", company: "OTC" },
  { id: "309", name: "BOROLINE CREAM", packing: "20GM", company: "G.D" },

  // Page 29 - Boroplus, Bournvita, Brimonidine, Brivaracetam
  { id: "310", name: "BOROPLUS CREAM", packing: "19ML", company: "EMA" },
  { id: "311", name: "BOROPLUS CREAM", packing: "40ML", company: "EMA" },
  { id: "312", name: "BOURNVITA POW", packing: "500GM", company: "MON" },
  { id: "313", name: "BP CARE BP MONITOR", packing: "1KIT", company: "XIA" },
  { id: "314", name: "BRESOL TAB", packing: "60TAB", company: "HIM" },
  { id: "315", name: "BRIMONIDINE TIMOLOL DROPS", packing: "5ML", company: "BPP" },
  { id: "316", name: "BRIVARACETAM 50 MG TABLET", packing: "10TAB", company: "BPP" },

  // Page 30 & 31 - Budesonide Inhaler, Budecort, Burnheal
  { id: "317", name: "BUDECORT RESPULES", packing: "1PCS", company: "CIP" },
  { id: "318", name: "BUDESONID-F 400 6 ROTACAP", packing: "30CAP", company: "BPP" },
  { id: "319", name: "BUDESONIDE 100 INHALER", packing: "200MTD", company: "BPP" },
  { id: "320", name: "BUDESONIDE 200 INHALER", packing: "200MTD", company: "BPP" },
  { id: "321", name: "BUDESONIDE RESPULE 0.5MG", packing: "2ML", company: "BPP" },
  { id: "322", name: "BURNHEAL CREAM", packing: "15GM", company: "CI" },

  // Page 32 - Cabergoline, Calamine, Calaptin
  { id: "323", name: "CABERGOLINE 0.50 TABLET", packing: "4TAB", company: "BPP" },
  { id: "324", name: "CALAMINE ALOEVERA LOTION", packing: "100ML", company: "BPP" },
  { id: "325", name: "CALAMINE LOTION IP", packing: "100ML", company: "BPP" },
  { id: "326", name: "CALAPTIN-120 SR TAB", packing: "15TAB", company: "ABB" },
  { id: "327", name: "CALCIBEX 500 TABLETS", packing: "15TAB", company: "COM" },

  // Page 33 & 34 - Calciquick, Calcium + Vit D3, Calpol 250
  { id: "328", name: "CALCIJOINT-D3 NANO SHOT", packing: "5ML", company: "LEE" },
  { id: "329", name: "CALCIQUICK-D3 NANO SHOT", packing: "5ML", company: "MOR" },
  { id: "330", name: "CALCIROL SOFTGELS", packing: "8CAP", company: "CAD" },
  { id: "331", name: "CALCIUM & VIT-D3 CHEWABLE", packing: "30TAB", company: "BPP" },
  { id: "332", name: "CALCIUM ACETATE-667 TABLE", packing: "10TAB", company: "BPP" },
  { id: "333", name: "CALCIUM CALCITROL TABLETS", packing: "15TAB", company: "BPP" },
  { id: "334", name: "CALCIUM VIT-D3 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "335", name: "CALPOL 250 SYP", packing: "60ML", company: "GSK" },

  // Page 35 & 36 - Carbamazepine, Carvedilol, Carespas
  { id: "336", name: "CARBAMAZEPIN-100MG TABLET", packing: "10TAB", company: "BPP" },
  { id: "337", name: "CARBAMAZEPIN-200MG TABLET", packing: "10TAB", company: "BPP" },
  { id: "338", name: "CARBIMAZOLE 5 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "339", name: "CARBONYL IRON FOLIC ACID", packing: "10CAP", company: "BPP" },
  { id: "340", name: "CARBOXYMTHYLCLULOS EYEDRO", packing: "10ML", company: "BPP" },
  { id: "341", name: "CARVEDILOL 3.125 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "342", name: "CARVEDILOL 6.25MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "343", name: "CARESPAS SYP", packing: "60ML", company: "CAR" },

  // Page 37 & 38 - Cefadroxil, Cefixime, Cefpodoxime
  { id: "344", name: "CASTOR OIL", packing: "100ML", company: "COM" },
  { id: "345", name: "CEFADROXIL-500 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "346", name: "CEFIXIME 200 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "347", name: "CEFIXIME CV TABLETS", packing: "10TAB", company: "BPP" },
  { id: "348", name: "CEFPODOXIME 100 MG TABLET", packing: "10TAB", company: "BPP" },
  { id: "349", name: "CEFPODOXIME 200 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "350", name: "CEFPODOXIME CV TABLETS", packing: "6TAB", company: "BPP" },

  // Page 39 & 40 - Cefuroxime, Cerelac, Cervical Collar
  { id: "351", name: "CEFUROXIME-250 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "352", name: "CEFUROXIME-500 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "353", name: "CEFUROXIME-CV 500 TABLETS", packing: "6TAB", company: "BPP" },
  { id: "354", name: "CERELAC 1 R", packing: "300GM", company: "NES" },
  { id: "355", name: "CERELAC 1 W", packing: "300GM", company: "NES" },
  { id: "356", name: "CERELAC 2 W H", packing: "300GM", company: "NES" },
  { id: "357", name: "CERVICAL COLLAR L", packing: "1PCS", company: "BPP" },
  { id: "358", name: "CERVICAL COLLAR M", packing: "1PCS", company: "BPP" },
  { id: "359", name: "CERVICAL COLLAR XL", packing: "1PCS", company: "BPP" },

  // Page 41 & 42 - Cetirizine, Cheston Cold, Chlorhexidine, Cholecalciferol
  { id: "360", name: "CETRIZINE 10MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "361", name: "CHESTON COLD TAB", packing: "10TAB", company: "CIP" },
  { id: "362", name: "CHLORHEXIDINE ANTISEPTIC", packing: "100ML", company: "BPP" },
  { id: "363", name: "CHLORHEXIDINE MOUTHWASH", packing: "100ML", company: "BPP" },
  { id: "364", name: "CHLORTHALIDONE-12.5 TABLE", packing: "10TAB", company: "BPP" },
  { id: "365", name: "CHOLECALCFEROL 60K SACHET", packing: "1GM", company: "BPP" },
  { id: "366", name: "CHOLECALCFEROL 60K TABLET", packing: "4TAB", company: "BPP" },

  // Page 43 & 44 - Chondroitin, Chyawanprash, Cilnidipine, Cilostazol
  { id: "367", name: "CHYAWANPRASH SPECIAL", packing: "1KG", company: "BPP" },
  { id: "368", name: "CHYAWANPRASH SPECIAL", packing: "500GM", company: "BPP" },
  { id: "369", name: "CILACAR-T 20 40 TAB", packing: "14TAB", company: "J.B" },
  { id: "370", name: "CILNIDIPINE 10 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "371", name: "CILNIDIPINE 20 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "372", name: "CILNIDIPINE 5MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "373", name: "CILOSTAZOL 50MG TABLETS I", packing: "10TAB", company: "BPP" },

  // Page 45 & 46 - Cinnarizine, Cinthol, Cipcal, Cipladine, Ciprofloxacin
  { id: "374", name: "CINNARIZINE 25 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "375", name: "CINNARIZINE 75 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "376", name: "CINTHOL SOAP COOL.", packing: "100GM", company: "GOD" },
  { id: "377", name: "CIPCAL-500 TAB", packing: "15TAB", company: "CIP" },
  { id: "378", name: "CIPCAL-D3 SACHET", packing: "1GM", company: "CIP" },
  { id: "379", name: "CIPLADINE OINT", packing: "20GM", company: "CI" },
  { id: "380", name: "CIPLADINE POWDER", packing: "10GM", company: "CI" },
  { id: "381", name: "CIPLOX EYE DROPS", packing: "10ML", company: "CIP" },
  { id: "382", name: "CIPROFLOXACIN 250MG TABLE", packing: "10TAB", company: "BPP" },
  { id: "383", name: "CIPROFLOXACIN 500MG TABLE", packing: "10TAB", company: "BPP" },
  { id: "384", name: "CIPROFLOXACIN EYE DROP", packing: "5ML", company: "BPP" },

  // Page 47 & 48 - Clarithromycin, Clean & Clear, Clindamycin
  { id: "385", name: "CITICOLINE 500MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "386", name: "CLARITHROMYCIN 250 TAB", packing: "10TAB", company: "BPP" },
  { id: "387", name: "CLARITHROMYCIN-500 TAB", packing: "4TAB", company: "BPP" },
  { id: "388", name: "CLEAN N CLEAR FACE WASH", packing: "100ML", company: "JOH" },
  { id: "389", name: "CLINDAMYCIN 300 MGCAPSULE", packing: "10CAP", company: "BPP" },
  { id: "390", name: "CLINDAMYCIN NICOTINAMIDE", packing: "15GM", company: "BPP" },

  // Page 49 & 50 - Clobetasol, Clobazam, Clomiphene
  { id: "391", name: "CLINICPLUS SHAMPOO SL", packing: "175ML", company: "HIN" },
  { id: "392", name: "CLOBAZAM-10 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "393", name: "CLOBETASOL CREAM", packing: "15GM", company: "BPP" },
  { id: "394", name: "CLOBETASOL NEOMYCIN MICON", packing: "20GM", company: "BPP" },
  { id: "395", name: "CLOBETASOL SALICYLIC OINT", packing: "1", company: "BPP" },
  { id: "396", name: "CLOMIPHENE CITRAT 50MG TA", packing: "10TAB", company: "BPP" },

  // Page 51 & 52 - Clonazepam, Clopidogrel, Clotrimazole
  { id: "397", name: "CLONAZEPAM-0.25 MG TABLET", packing: "10TAB", company: "BPP" },
  { id: "398", name: "CLONAZEPAM-0.5 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "399", name: "CLONAZEPAM-1 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "400", name: "CLOPICARD AP-75 TAB", packing: "15TAB", company: "CIP" },
  { id: "401", name: "CLOPIDOGREL-75 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "402", name: "CLOPIDOGREL-ASP 75 150CAP", packing: "15CAP", company: "BPP" },
  { id: "403", name: "CLOTRIMAZOLE CREAM", packing: "20GM", company: "BPP" },
  { id: "404", name: "CLOTRIMAZOLE MOUTH PAINT", packing: "1PCS", company: "BPP" },
  { id: "405", name: "CLOTRIMAZOLE POWDER", packing: "100GM", company: "BPP" },

  // Page 54 & 55 - Cofsils, Coldact/Coldax, Colgate, Complan
  { id: "406", name: "COFSILS LOZENGES", packing: "10LOZE", company: "CIP" },
  { id: "407", name: "COLCHIHEAL-0.5 TAB", packing: "10TAB", company: "HEA" },
  { id: "408", name: "COLGATE TOOTHPASTE", packing: "100GM", company: "COL" },
  { id: "409", name: "COLGATE TOOTHPASTE", packing: "200GM", company: "PRO" },
  { id: "410", name: "COLGATE TOOTHPASTE", packing: "300GM", company: "COL" },
  { id: "411", name: "COMPLAN", packing: "450GM", company: "HEN" },

  // Page 57 & 58 - Cotton Bandage, Crocin Advance, Cremaforce
  { id: "412", name: "COTTON CREPE BANDAGE 10CM", packing: "1PCS", company: "BPP" },
  { id: "413", name: "COTTON CREPE BANDAGE 15CM", packing: "1PCS", company: "BPP" },
  { id: "414", name: "COTTON WOOL BPPI", packing: "200GM", company: "BPP" },
  { id: "415", name: "COTTON WOOL BPPI", packing: "75GM", company: "BPP" },
  { id: "416", name: "COVID-19 DETECTION KIT", packing: "1PCS", company: "BPP" },
  { id: "417", name: "CREMAFORCE PLUS SYP", packing: "225ML", company: "HEA" },
  { id: "418", name: "CROCIN ADVANCE TAB", packing: "20TAB", company: "GSK" },

  // Page 60 & 61 - Cystone, Dabur Honey, Dabur Chyawanprash
  { id: "419", name: "CYPROHEPTADINE TRICHOLIN SYRUP", packing: "200ML", company: "BPP" },
  { id: "420", name: "CYSTONE SYP", packing: "200ML", company: "HIM" },
  { id: "421", name: "CYSTONE TAB", packing: "60TAB", company: "HIM" },
  { id: "422", name: "DABIGATRAN-110 MG CAPSULE", packing: "10CAP", company: "BPP" },
  { id: "423", name: "DABIGATRAN-150 MG CAPSULE", packing: "10CAP", company: "BPP" },
  { id: "424", name: "DABUR AMLA HAIR OIL.", packing: "180ML", company: "DAB" },
  { id: "425", name: "DABUR CHYAWANPRASH", packing: "500GM", company: "DAB" },
  { id: "426", name: "DABUR GULABARI ROSE WATER", packing: "120ML", company: "DAB" },
  { id: "427", name: "DABUR HONEY", packing: "225GM", company: "DAB" },
  { id: "428", name: "DABUR HONEY.", packing: "500GM", company: "DAB" },
  { id: "429", name: "DABUR PUDIN HARA DROPS", packing: "30ML", company: "DAB" },
  { id: "430", name: "DABUR RED TOOTHPASTE", packing: "200GM", company: "DAB" },

  // Page 63 & 64 - Dant Kanti, Dapagliflozin
  { id: "431", name: "DANT AUSHADHI TOOTHPASTE", packing: "100GM", company: "BPP" },
  { id: "432", name: "DANT KANTI DENTAL CREAM", packing: "200GM", company: "PAT" },
  { id: "433", name: "DANT KANTI MEDICATED GEL.", packing: "100GM", company: "PAT" },
  { id: "434", name: "DAPAGLIFLOZIN M 10/500 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "435", name: "DAPAGLIFLOZIN M 5/500 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "436", name: "DAPAGLIFLOZIN-10 MG TABLE", packing: "10TAB", company: "BPP" },
  { id: "437", name: "DAPAGLIFLOZIN-5 MG TABLET", packing: "10TAB", company: "BPP" },
  { id: "438", name: "DAPAFORD-10 TAB", packing: "15TAB", company: "LEE" },
  { id: "439", name: "DAPASMART M 10/500 TABLETS", packing: "10TAB", company: "HEA" },

  // Page 69 & 70 - Dettol Soap, Liquid, Sanitizer, Dexorange
  { id: "440", name: "DETTOL HAND SANITIZER", packing: "200ML", company: "REC" },
  { id: "441", name: "DETTOL HANDWASH", packing: "200ML", company: "MAR" },
  { id: "442", name: "DETTOL LIQ", packing: "250ML", company: "REC" },
  { id: "443", name: "DETTOL LIQ", packing: "500ML", company: "REC" },
  { id: "444", name: "DETTOL SOAP ORIGINAL", packing: "4*125G", company: "REC" },
  { id: "445", name: "DEXORANGE CAP", packing: "30CAP", company: "FRA" },

  // Page 72 - Diclofenac
  { id: "446", name: "DICLOFENAC 50TAB", packing: "10TAB", company: "BPP" },
  { id: "447", name: "DICLOFENAC DIETHYLMIN GEL", packing: "30GM", company: "BPP" },
  { id: "448", name: "DICLOFENAC GEL", packing: "15GM", company: "BPP" },
  { id: "449", name: "DICLOFENAC PARACETAMOL TA", packing: "10TAB", company: "BPP" },
  { id: "450", name: "DICLOFENAC SPRAY", packing: "35GM", company: "BPP" },
  { id: "451", name: "DICLOFENAC SR-100 MG TABL", packing: "10TAB", company: "BPP" },
  { id: "452", name: "DICLOFENAC-MR TABLETS", packing: "10TAB", company: "BPP" },
  { id: "453", name: "DICLOFENAC-SP TABLETS", packing: "10TAB", company: "BPP" },
  { id: "454", name: "DICLOGESIC TAB", packing: "10TAB", company: "TOR" },

  // Page 73 & 74 - Dicyclomine, Digoxin, Diltiazem
  { id: "455", name: "DICYCLOMINE+ACT.DIMETHICO", packing: "10ML", company: "BPP" },
  { id: "456", name: "DIGITAL BP INSTRUMENT", packing: "1PCS", company: "BPP" },
  { id: "457", name: "DIGITAL THERMOMETER", packing: "1PCS", company: "BPP" },
  { id: "458", name: "DIGOXIN-250 MCG TABLET", packing: "10TAB", company: "BPP" },
  { id: "459", name: "DILTIAZEM SR-90 MG TABLET", packing: "10TAB", company: "BPP" },
  { id: "460", name: "DILTIAZEM-60 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "461", name: "DISPOVAN INSULIN SYRINGE", packing: "1PCS", company: "OTH" },

  // Page 75 - Dolo-650, Domperidone, Disprin
  { id: "462", name: "DISPRIN TAB", packing: "10TAB", company: "REC" },
  { id: "463", name: "DOLO-650 TAB", packing: "15TAB", company: "MIC" },
  { id: "464", name: "DOMPERIDONE 10 MG TABLET", packing: "10TAB", company: "BPP" },
  { id: "465", name: "DOMPERIDONE30+PANTOPRZOL4", packing: "10TAB", company: "BPP" },

  // Page 76 & 77 - Dorzolamide, Dove Baby, Doxofylline, Doxycycline
  { id: "466", name: "DORZOLAMIDE EYE DROPS 2%", packing: "5ML", company: "BPP" },
  { id: "467", name: "DOVE BABY SOAP", packing: "75GM", company: "HIN" },
  { id: "468", name: "DOVE SHAMPOO DS", packing: "650ML", company: "HIN" },
  { id: "469", name: "DOVE SOAP", packing: "100GM", company: "HIN" },
  { id: "470", name: "DOXOFYLLINE 400 TABLET", packing: "10TAB", company: "BPP" },
  { id: "471", name: "DOXYCYCLINE 100MG CAPSULE", packing: "10CAP", company: "BPP" },

  // Page 78 & 80 - Dr Ortho, Duphalac, Dutasteride
  { id: "472", name: "DR.MOREPEN BP-09 MONITOR", packing: "1KIT", company: "MOR" },
  { id: "473", name: "DR.ORTHO BALM", packing: "40GM", company: "DVS" },
  { id: "474", name: "DR.ORTHO CAPSULES", packing: "10CAP", company: "DVS" },
  { id: "475", name: "DR.ORTHO OIL", packing: "120ML", company: "DVS" },
  { id: "476", name: "DUPHALAC SOLUTION", packing: "250ML", company: "ABB" },
  { id: "477", name: "DUTASTERIDE-0.5 CAPSULES", packing: "10CAP", company: "BPP" },

  // Page 84 & 85 - Electral, Ecosprin, Evion, Empagliflozin
  { id: "478", name: "ELECTRAL POWDER", packing: "21.80G", company: "FDC" },
  { id: "479", name: "ECOSPRIN-150 TAB", packing: "14TAB", company: "USV" },
  { id: "480", name: "ECOSPRIN-75 TAB", packing: "14TAB", company: "USV" },
  { id: "481", name: "EMPASMART 25 TABLETS", packing: "10TAB", company: "HEA" },
  { id: "482", name: "ENALAPRIL MALEAT 5MG TAB", packing: "10TAB", company: "BPP" },

  // Page 86 & 88 - Eno, Escitalopram, Esomeprazole
  { id: "483", name: "ENO BOTTLE", packing: "100GM", company: "SOU" },
  { id: "484", name: "ENO POUCH", packing: "5GM", company: "SOU" },
  { id: "485", name: "ESCITALOPRAM-10 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "486", name: "ESCITALOPRAM-20 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "487", name: "ESCITALOPRAM-C 10/0.5 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "488", name: "ESOMEPRAZOLE 40MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "489", name: "ESOMEPRAZOLE-DSR CAPSULES", packing: "10CAP", company: "BPP" },

  // Page 90 & 91 - Etoricoxib, Evion
  { id: "490", name: "ETORICOXIB-90 TAB", packing: "10TAB", company: "BPP" },
  { id: "491", name: "ETORICOXIB-120MG TAB", packing: "10TAB", company: "BPP" },
  { id: "492", name: "ETORICOXIB-TH4 TAB", packing: "10TAB", company: "BPP" },
  { id: "493", name: "EVION-400 CAP", packing: "20CAP", company: "MRC" },
  { id: "494", name: "EVION-600 CAP", packing: "10CAP", company: "MRC" },
  { id: "495", name: "EVION-LC TAB", packing: "10TAB", company: "MRC" },

  // Page 98 & 100 - Flamingo Belts, Fluconazole, Fluticasone
  { id: "496", name: "FLAMINGO KNEE CAP XL", packing: "1PAIR", company: "FLM" },
  { id: "497", name: "FLAMINGO LS BELT XL", packing: "1PCS", company: "FLM" },
  { id: "498", name: "FLUCONAZ-150 TAB", packing: "4TAB", company: "HEA" },
  { id: "499", name: "FLUTICASONE NASAL SPRAY", packing: "120MTD", company: "BPP" },

  // Page 101 - Folic Acid, Follikesh
  { id: "500", name: "FOLIC ACID 5MG TABLETS", packing: "15TAB", company: "BPP" },
  { id: "501", name: "FOLLIKESH ONION OIL", packing: "200ML", company: "HEA" },

  // Page 104 & 105 - Gabapentin, Garnier, Gelusil
  { id: "502", name: "GABAPENTIN-100 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "503", name: "GABAPENTIN-300 CAPSULES", packing: "10CAP", company: "BPP" },
  { id: "504", name: "GABAPENTIN-NT 100 10 TABL", packing: "15TAB", company: "BPP" },
  { id: "505", name: "GARNIER FACE WASH", packing: "100GM", company: "GAR" },
  { id: "506", name: "GELUSIL MPS TAB", packing: "15TAB", company: "PFI" },

  // Page 110 & 111 - Gliclazide, Glimepiride
  { id: "507", name: "GILOY GHANVATI TABLET", packing: "60TAB", company: "DIV" },
  { id: "508", name: "GLICLAZIDE-40 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "509", name: "GLICLAZIDE-80 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "510", name: "GLIMEPIRIDE-1 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "511", name: "GLIMEPIRIDE-2 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "512", name: "GLIMEPIRIDE-4 TABLETS", packing: "10TAB", company: "BPP" },

  // Page 116 - Glycomet
  { id: "513", name: "GLYCOMET GP 1 TABLETS", packing: "15TAB", company: "USV" },
  { id: "514", name: "GLYCOMET-500 TAB", packing: "10TAB", company: "USV" },

  // Page 123 & 124 - Himalaya Baby, Hiora, Hipres
  { id: "515", name: "HIMALAYA BABY LOTION", packing: "200ML", company: "HIM" },
  { id: "516", name: "HIMALAYA BABY MASSAGE OIL", packing: "100ML", company: "HIM" },
  { id: "517", name: "HIMALAYA FACEWASH NEEM.", packing: "50ML", company: "HIM" },
  { id: "518", name: "HIPRES-50 TAB", packing: "14TAB", company: "CI" },

  // Page 128 - Ibuprofen, I-Pill
  { id: "519", name: "I-PILL TAB", packing: "1TAB", company: "PIR" },
  { id: "520", name: "IBUGESIC PLUS SYP", packing: "100ML", company: "CIP" },
  { id: "521", name: "IBUPROFEN & PARACETAMOL T", packing: "10TAB", company: "BPP" },
  { id: "522", name: "IBUPROFEN-400 TAB", packing: "10TAB", company: "COM" },

  // Page 130 - Insulin
  { id: "523", name: "INSULIN BIPHASIC 30/70 INJECTI", packing: "10ML", company: "BPP" },
  { id: "524", name: "INSULIN GLARGINE INJ. PEN", packing: "3ML", company: "BPP" },
  { id: "525", name: "INSULIN REGULAR 100IU INJ", packing: "3ML", company: "BPP" },

  // Page 133 - Itraconazole, Ivabradine
  { id: "526", name: "ITRACONAZOLE 100MG CAPSUL", packing: "4TAB", company: "BPP" },
  { id: "527", name: "ITRACONAZOLE 200MG CAPSUL", packing: "4CAP", company: "BPP" },
  { id: "528", name: "IVABRADINE-5 MG TABLETS", packing: "15TAB", company: "BPP" },
  { id: "529", name: "IVERMECTIN 12 MG TABLETS", packing: "10TAB", company: "BPP" },

  // Page 134 - Jalra, Janumet, Januvia
  { id: "530", name: "JALRA-50 TAB", packing: "15TAB", company: "USV" },
  { id: "531", name: "JALRA-M 50 500 TAB", packing: "10TAB", company: "USV" },
  { id: "532", name: "JANUMET 50 500 TAB", packing: "15TAB", company: "OTH" },
  { id: "533", name: "JANUVIA-100 TAB", packing: "7TAB", company: "MSD" },

  // Page 138 & 139 - Kayam Churna, Ketoconazole
  { id: "534", name: "KAYAM CHURNA.", packing: "100GM", company: "SHE" },
  { id: "535", name: "KAYAM TABLET", packing: "30TAB", company: "SHE" },
  { id: "536", name: "KETOCONAZOLE 200 MG TABLE", packing: "10TAB", company: "BPP" },
  { id: "537", name: "KETOCONAZOLE SHAMPOO 2%", packing: "100ML", company: "BPP" },
  { id: "538", name: "KETOCONAZOLE SOAP", packing: "75GM", company: "BPP" },

  // Page 144 & 146 - Lactulose, Lasix
  { id: "539", name: "LACTULOSE SOLUTION", packing: "200ML", company: "BPP" },
  { id: "540", name: "LASIX TAB", packing: "15TAB", company: "SAN" },
  { id: "541", name: "LATANOPROST EYE DROP", packing: "2.5ML", company: "BPP" },

  // Page 150 - Levocetirizine, Levofloxacin
  { id: "542", name: "LEVOCETIRIZINE TABLETS", packing: "10TAB", company: "BPP" },
  { id: "543", name: "LEVOFLOXACIN-500 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "544", name: "LEVOLIN RESPULES", packing: "2.5ML", company: "CIP" },

  // Page 152 & 153 - Linagliptin, Limcee, Lipicard
  { id: "545", name: "LIMCEE TAB", packing: "15TAB", company: "ABB" },
  { id: "546", name: "LINAGLIPTIN 5 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "547", name: "LIPICARD-160 TAB", packing: "10TAB", company: "USV" },

  // Page 154 - Liv-52
  { id: "548", name: "LIV-52 DS TAB", packing: "60TAB", company: "HIM" },
  { id: "549", name: "LIV-52 SYP", packing: "200ML", company: "HIM" },
  { id: "550", name: "LIV-52 TAB", packing: "100TAB", company: "HIM" },

  // Page 156 & 157 - Lorazepam, Losartan
  { id: "551", name: "LORAZEPAM 2 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "552", name: "LOSARTAN-25 TABLET", packing: "10TAB", company: "BPP" },
  { id: "553", name: "LOSARTAN-50 TABLET", packing: "10TAB", company: "BPP" },
  { id: "554", name: "LOSARTAN-AM 50 5 TABLET", packing: "10TAB", company: "BPP" },
  { id: "555", name: "LOSARTAN-H 50 12.5 TABLET", packing: "10TAB", company: "BPP" },

  // Page 158 - Luliconazole, Lumbar Belt
  { id: "556", name: "LULICONAZOLE CREAM 1%", packing: "10GM", company: "BPP" },
  { id: "557", name: "LUMBO SACRAL BELT XL", packing: "1PCS", company: "BPP" },

  // Page 160 & 162 - Manforce, Medimix
  { id: "558", name: "MANFORCE CONDOM", packing: "10PCS", company: "MA" },
  { id: "559", name: "MANFORCE-100 TAB", packing: "4TAB", company: "MA" },
  { id: "560", name: "MANFORCE-50 TAB", packing: "4TAB", company: "MA" },
  { id: "561", name: "MEDIMIX SOAP", packing: "125GM", company: "CHO" },

  // Page 167 - Metformin, Methotrexate, Methylcobalamin
  { id: "562", name: "METFORMIN 1000 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "563", name: "METFORMIN 500 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "564", name: "METFORMIN 500 SR TABLETS", packing: "10TAB", company: "BPP" },
  { id: "565", name: "METFORMIN GP 1/500 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "566", name: "METFORMIN GP 2 500 TABLET", packing: "15TAB", company: "BPP" },
  { id: "567", name: "METHOTREXATE-2.5 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "568", name: "METHYLCOBALAMIN-1500 TABL", packing: "10TAB", company: "BPP" },

  // Page 168 - Metoprolol
  { id: "569", name: "METOPROLOL ER-25 TABLETS", packing: "15TAB", company: "BPP" },
  { id: "570", name: "METOPROLOL PR-50 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "571", name: "METOPROLOL-25 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "572", name: "METOPROLOL-AM 50 5 TABLET", packing: "7TAB", company: "BPP" },

  // Page 169 - Metronidazole, Miconazole
  { id: "573", name: "METROGYL-200 TAB", packing: "20TAB", company: "J.B" },
  { id: "574", name: "METRONIDAZOLE-400 TABLET", packing: "10TAB", company: "BPP" },
  { id: "575", name: "MICONAZOLE-F CREAM", packing: "15GM", company: "BPP" },

  // Page 172 & 173 - Montelukast, Moov
  { id: "576", name: "MONTELUKAST 10 TABLET", packing: "10TAB", company: "BPP" },
  { id: "577", name: "MONTELUKST-LC 10 5 TABLET", packing: "10TAB", company: "BPP" },
  { id: "578", name: "MOOV OINT.", packing: "50GM", company: "REC" },
  { id: "579", name: "MOOV SPRAY", packing: "80GM", company: "REC" },

  // Page 175 - Moxifloxacin
  { id: "580", name: "MOXIFLOXACIN 400MG TABLET", packing: "5TAB", company: "BPP" },
  { id: "581", name: "MOXIFLOXACIN EYE DROPS 0.", packing: "5ML", company: "BPP" },

  // Page 180 - Naproxen
  { id: "582", name: "NAPROXEN-250 MG TABLETS", packing: "15TAB", company: "BPP" },
  { id: "583", name: "NAPROXEN-500 MG TABLETS", packing: "15TAB", company: "BPP" },
  { id: "584", name: "NAPROXEN-D 500 TABLETS", packing: "10TAB", company: "BPP" },

  // Page 181 - Nebivolol
  { id: "585", name: "NEBIVOLOL-2.5 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "586", name: "NEBIVOLOL-5 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "587", name: "NEBIVOLOL-H 5 12.5 TABLET", packing: "10TAB", company: "BPP" },
  { id: "588", name: "NEBULIZER MACHINE", packing: "1PCS", company: "BPP" },

  // Page 183 - Neurobion
  { id: "589", name: "NEUROBION FORTE TAB", packing: "30TAB", company: "PRO" },

  // Page 185 - Nicotine, Nicorandil
  { id: "590", name: "NICORANDIL-10 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "591", name: "NICOTEX-4 GUMS", packing: "9GUMS", company: "CIP" },

  // Page 187 - Nivea, Norfloxacin
  { id: "592", name: "NIVEA BODY LOTION BODY MILK", packing: "75ML", company: "NIV" },
  { id: "593", name: "NIVEA CREAM", packing: "100ML", company: "NIV" },
  { id: "594", name: "NORFLOXACIN-TZ TABLETS", packing: "10TAB", company: "BPP" },

  // Page 191 - Ofloxacin, ORS
  { id: "595", name: "OFLOXACIN 400 TAB", packing: "10TAB", company: "BPP" },
  { id: "596", name: "OFLOXACIN EYE DROPS", packing: "10ML", company: "BPP" },
  { id: "597", name: "OKACET TAB", packing: "10TAB", company: "CIP" },

  // Page 193 & 194 - Olmesartan
  { id: "598", name: "OLMESARTAN-20 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "599", name: "OLMESARTAN-40 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "600", name: "OLMESARTAN-AM 20 5 TABLET", packing: "10TAB", company: "BPP" },
  { id: "601", name: "OLMESARTAN-CH 40 12.5 TAB", packing: "10TAB", company: "BPP" },

  // Page 195 - Omeprazole, Omnigel
  { id: "602", name: "OMEE CAP", packing: "20CAP", company: "ALK" },
  { id: "603", name: "OMEPRAZOLE-20 CAPSULES", packing: "10CAP", company: "BPP" },
  { id: "604", name: "OMEPRAZOLE-D CAPSULES", packing: "15CAP", company: "BPP" },
  { id: "605", name: "OMEZ CHEWABLE TAB", packing: "15TAB", company: "DR." },
  { id: "606", name: "OMNIGEL", packing: "50GM", company: "CI" },
  { id: "607", name: "OMNIGEL SPRAY", packing: "55GM", company: "CIP" },

  // Page 196 & 197 - Ondansetron, ORS
  { id: "608", name: "ONDENSETRON TABLETS", packing: "10TAB", company: "BPP" },
  { id: "609", name: "ORS POUCH BPPI", packing: "20.5GM", company: "BPP" },
  { id: "610", name: "ORS POUCH CIPLA", packing: "21.8GM", company: "CIP" },

  // Page 202 & 203 - Pantoprazole
  { id: "611", name: "PANTOCID DSR CAP", packing: "15CAP", company: "SUN" },
  { id: "612", name: "PANTOPRAZOL-DSR CAPSULES", packing: "10CAP", company: "BPP" },
  { id: "613", name: "PANTOPRAZOLE-40 TABLETS", packing: "10TAB", company: "BPP" },

  // Page 204 - Paracetamol
  { id: "614", name: "PARACETAMOL-650 TAB", packing: "15TAB", company: "BPP" },
  { id: "615", name: "PARACETAMOL-500 TAB", packing: "10TAB", company: "COM" },
  { id: "616", name: "PARACIP-125 SYP", packing: "60ML", company: "CI" },

  // Page 206 - Pears Soap, Peglec
  { id: "617", name: "PEARS SOAP", packing: "125GM", company: "HIN" },
  { id: "618", name: "PEGLEC POWDER", packing: "137.15", company: "TAB" },

  // Page 215 & 216 - Pioglitazone, Povidone Iodine
  { id: "619", name: "PIOGLITAZONE-15 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "620", name: "PIOGLITAZONE-30 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "621", name: "POVIDINE IODINE SOL 5%", packing: "100ML", company: "BPP" },
  { id: "622", name: "POVIDONE IODINE 5%W W OIN", packing: "15GM", company: "BPP" },

  // Page 218 & 219 - Pregabalin, Prega News
  { id: "623", name: "PREGA NEWS", packing: "1KIT", company: "MA" },
  { id: "624", name: "PREGABALIN-75 MG CAPSULES", packing: "10CAP", company: "BPP" },
  { id: "625", name: "PREGABALIN-M 75 1500 TABL", packing: "10TAB", company: "BPP" },

  // Page 221 - Propranolol, Protein Powder
  { id: "626", name: "PROPRANOLOL 20 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "627", name: "PROPRANOLOL 40 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "628", name: "PROTEIN POW DIABETES CARE", packing: "400GM", company: "BPP" },

  // Page 224 & 226 - Rabeprazole, Ramipril, Ranitidine
  { id: "629", name: "RABEPRAZOLE-20 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "630", name: "RABEPRAZOLE-DSR 20 30 CAP", packing: "10CAP", company: "BPP" },
  { id: "631", name: "RAMIPRIL-2.5 TABLET", packing: "10TAB", company: "BPP" },
  { id: "632", name: "RAMIPRIL-5 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "633", name: "RANITIDINE-150 MG TABLETS", packing: "10TAB", company: "BPP" },

  // Page 231 & 232 - Rifaximin, Rivaroxaban
  { id: "634", name: "RIFAXIMIN-400 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "635", name: "RIFAXIMIN-550 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "636", name: "RING GUARD CREAM", packing: "20 GM", company: "REC" },
  { id: "637", name: "RIVAROXABAN-10 TABLETS", packing: "30TAB", company: "BPP" },
  { id: "638", name: "RIVAROXABAN-20 TABLETS", packing: "14TAB", company: "BPP" },

  // Page 234 & 235 - Rosuvastatin
  { id: "639", name: "ROSUVASTATIN-10 TABLETS", packing: "15TAB", company: "BPP" },
  { id: "640", name: "ROSUVASTATIN-20 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "641", name: "ROSUVASTATIN-5 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "642", name: "ROSUVASTATIN GOLD 20/75/75 CAP", packing: "10CAP", company: "BPP" },

  // Page 237 & 238 - Sacubitril Valsartan, Salbutamol, Safi
  { id: "643", name: "SACUBITRIL & VALSARTAN 100 TAB", packing: "14TAB", company: "BPP" },
  { id: "644", name: "SAFI SYP", packing: "500ML", company: "HAM" },
  { id: "645", name: "SALBUTAMOL INHALER", packing: "200MET", company: "BPP" },
  { id: "646", name: "SALBUTAMOL-4 MG TABLETS", packing: "10TAB", company: "BPP" },

  // Page 242 & 244 - Sensodyne, Shilajit
  { id: "647", name: "SENSODYNE FRESH MINT", packing: "75GM", company: "GLA" },
  { id: "648", name: "SENSODYNE RAPID RELIEF", packing: "80GM", company: "GLA" },
  { id: "649", name: "SHILAJIT 500 MG CAPSULE", packing: "60CAP", company: "BPP" },

  // Page 245 & 246 - Sildenafil, Silodosin
  { id: "650", name: "SILDENAFIL 50 MG TABLETS", packing: "4TAB", company: "BPP" },
  { id: "651", name: "SILODOSIN-4 MG CAPSULES", packing: "10CAP", company: "BPP" },
  { id: "652", name: "SILODOSIN-8 MG CAPSULES", packing: "10CAP", company: "BPP" },

  // Page 247 & 248 - Sitagliptin, Skinshine
  { id: "653", name: "SITAGLIPTIN-100 MG TABLET", packing: "10TAB", company: "BPP" },
  { id: "654", name: "SITAGLIPTIN-50 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "655", name: "SKINSHINE CREAM", packing: "15GM", company: "CAD" },

  // Page 250 - Sofosbuvir, Soframycin, Sofy
  { id: "656", name: "SOFOSBUVIR 400MG TABLETS", packing: "28TAB", company: "BPP" },
  { id: "657", name: "SOFRAMYCIN CREAM", packing: "30GM", company: "SAN" },
  { id: "658", name: "SOFY BODYFIT REGULAR", packing: "16PADS", company: "UNI" },

  // Page 252 - Spironolactone, Sporlac
  { id: "659", name: "SPIRONOLACTONE-25 TABLETS", packing: "15TAB", company: "BPP" },
  { id: "660", name: "SPORLAC SACHETS", packing: "1GM", company: "SNZ" },

  // Page 256 - Sunsilk, Sunscreen
  { id: "661", name: "SUNSILK SHAMPOO BS.", packing: "180ML", company: "HIN" },
  { id: "662", name: "SUNSHADE SUNSCREEN LOTION", packing: "100ML", company: "LEE" },

  // Page 259 - Tamsulosin, Tadalafil
  { id: "663", name: "TADALAFIL-20 MG TABLETS", packing: "4TAB", company: "BPP" },
  { id: "664", name: "TAMSULOSIN-0.4 MG CAPSULE", packing: "10CAP", company: "BPP" },
  { id: "665", name: "TAMSULOSIN-D TAB 0.4 0.5", packing: "15TAB", company: "BPP" },

  // Page 262 & 263 - Telmisartan
  { id: "666", name: "TELMA-20 TAB", packing: "15TAB", company: "GLE" },
  { id: "667", name: "TELMA-AM TAB", packing: "15TAB", company: "GLE" },
  { id: "668", name: "TELMISARTAN-20 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "669", name: "TELMISARTAN-40 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "670", name: "TELMISARTAN-80 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "671", name: "TELMISARTAN-AM 40/5 TABLETS", packing: "15TAB", company: "BPP" },
  { id: "672", name: "TELMISARTAN-AMH 40/12.5/5 TAB", packing: "10TAB", company: "BPP" },
  { id: "673", name: "TELMISARTAN-CH 40/12.5 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "674", name: "TELMISARTAN-H 40/12.5 TABLETS", packing: "10TAB", company: "BPP" },

  // Page 263 - Teneligliptin
  { id: "675", name: "TENELIGLIPTIN-20 TABLETS", packing: "10TAB", company: "BPP" },
  { id: "676", name: "TENELIGLIPTN M 20/500 TABLETS", packing: "10TAB", company: "BPP" },

  // Page 264 - Terbinafine, Tentex
  { id: "677", name: "TENTEX ROYAL CAP", packing: "10CAP", company: "HIM" },
  { id: "678", name: "TERBINAFINE TABLETS 250MG", packing: "7TAB", company: "BPP" },

  // Page 267 - Thyroxine Sodium
  { id: "679", name: "THYROXINE SODIUM 100 MCG TABLT", packing: "100TAB", company: "BPP" },
  { id: "680", name: "THYROXINE SODIUM 125 MCG TABLT", packing: "100TAB", company: "BPP" },
  { id: "681", name: "THYROXINE SODIUM 25 MCG TABLET", packing: "100TAB", company: "BPP" },
  { id: "682", name: "THYROXINE SODIUM 50 MCG TABLET", packing: "100TAB", company: "BPP" },
  { id: "683", name: "TICAGRELOR-90 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "684", name: "TIGER BALM", packing: "15GM", company: "RAN" },

  // Page 271 & 272 - Torsemide, Tranexamic Acid
  { id: "685", name: "TORSEMIDE-10 MG TABLETS", packing: "15TAB", company: "BPP" },
  { id: "686", name: "TORSEMIDE-20 TAB", packing: "10TAB", company: "BIO" },
  { id: "687", name: "TORSEMIDE-SP 10 50 TABLET", packing: "15TAB", company: "BPP" },
  { id: "688", name: "TRANEXAMIC ACID 500MG TAB", packing: "10TAB", company: "BPP" },
  { id: "689", name: "TRANEXA-MF TAB", packing: "10TAB", company: "BPP" },

  // Page 274 - Triphala
  { id: "690", name: "TRIPHALA CHURNA.", packing: "200GM", company: "ZAN" },
  { id: "691", name: "TRIPHALA-500 TABLETS", packing: "1", company: "BPP" },

  // Page 277 & 278 - Unwanted 72, Ursodeoxycholic
  { id: "692", name: "UNWANTED-72 TAB.", packing: "1TAB", company: "MA" },
  { id: "693", name: "URSODEOXYCHOLIC 300MG TAB", packing: "10TAB", company: "BPP" },

  // Page 280 - Vaseline, Veet
  { id: "694", name: "VASELINE BODY LOTION", packing: "200ML", company: "HIN" },
  { id: "695", name: "VASELINE ORIGINAL", packing: "50GM", company: "HIN" },
  { id: "696", name: "VEET HAIR REMOVAL CREAM", packing: "50GM", company: "REC" },

  // Page 283 - Vicco, Vicks
  { id: "697", name: "VICCO TURMERIC CREAM.", packing: "50GM", company: "VIC" },
  { id: "698", name: "VICCO VAJRADANTI PASTE.", packing: "100GM", company: "VIC" },
  { id: "699", name: "VICKS ACTION-500 TAB", packing: "10TAB", company: "PRO" },
  { id: "700", name: "VICKS INHALER", packing: "1PCS", company: "PRO" },
  { id: "701", name: "VICKS VAPORUB", packing: "50ML", company: "PRO" },

  // Page 284 & 285 - Vildagliptin, Vitamin A, B, C, D3, E
  { id: "702", name: "VILDAGLIPTN-M 50 1000 TAB", packing: "15TAB", company: "BPP" },
  { id: "703", name: "VILDAGLIPTN-M 50 500 TAB", packing: "15TAB", company: "BPP" },
  { id: "704", name: "VILDASMART-50 TAB", packing: "15TAB", company: "HEA" },
  { id: "705", name: "VITAMIN A CAPSULES", packing: "30CAP", company: "BPP" },
  { id: "706", name: "VITAMIN B-COMPLEX SYP", packing: "200ML", company: "BPP" },
  { id: "707", name: "VITAMIN C-500 MG TABLETS", packing: "15TAB", company: "PVG" },
  { id: "708", name: "VITAMIN D3 NANO SHOT", packing: "5ML", company: "BPP" },
  { id: "709", name: "VITAMIN E 400 MG CAPSULES", packing: "10CAP", company: "BPP" },

  // Page 286 - Voglibose
  { id: "710", name: "VOGLIBOSE-0.2 TABLET", packing: "10TAB", company: "BPP" },
  { id: "711", name: "VOGLIBOSE-0.3 TABLET", packing: "10TAB", company: "BPP" },
  { id: "712", name: "VOGLIBOSE-MF 0.2 500 TABL", packing: "10TAB", company: "BPP" },
  { id: "713", name: "VOGLIBOSE-MF 0.3 500 TABL", packing: "10TAB", company: "BPP" },

  // Page 288 & 289 - Warfarin, Whisper
  { id: "714", name: "WARFARIN-1 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "715", name: "WARFARIN-5 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "716", name: "WHEY PROTEIN POWDER", packing: "1KG", company: "BPP" },
  { id: "717", name: "WHISPER CHOICE WINGS", packing: "8PADS", company: "PRO" },
  { id: "718", name: "WHISPER ULTRA", packing: "30PAD", company: "PRO" },

  // Page 290, 291, 292, 293 - Zandu Balm, Zinc, Zyrik
  { id: "719", name: "WOODWARD S GRIPE WATER", packing: "200ML", company: "OTC" },
  { id: "720", name: "ZANDU BALM", packing: "25ML", company: "EMA" },
  { id: "721", name: "ZANDU BALM", packing: "8ML", company: "EMA" },
  { id: "722", name: "ZINC SULPHATE 20 MG TABLE", packing: "10TAB", company: "BPP" },
  { id: "723", name: "ZOLPIDEM 10 MG TABLETS", packing: "10TAB", company: "BPP" },
  { id: "724", name: "ZON PLUS TAB", packing: "10TAB", company: "EKM" },
  { id: "725", name: "ZOOMOX CV-625 TAB", packing: "10TAB", company: "NAM" },
  { id: "726", name: "ZORIF ADULT DIAPER XL", packing: "10PCS", company: "COM" },
  { id: "727", name: "ZYRIK-100 TAB", packing: "10TAB", company: "CIP" },
  { id: "728", name: "ZYRIK-300 TAB", packing: "10TAB", company: "CIP" },
  { id: "729", name: "ZYTEE SOLUTION", packing: "10ML", company: "RPT" }
];
