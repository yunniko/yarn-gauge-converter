// Source: Craft Yarn Council Standard Yarn Weight System
// https://www.craftyarncouncil.com/standards/yarn-weight-system (retrieved 2026-09-07)
// The 0-7 category numbers, US names, and gauge/hook/needle figures below are
// that official standard. The "ukAu" column is NOT part of any official
// cross-body standard -- there is no single body that maps US categories onto
// UK/Australian ply and word names -- it's a best-effort synthesis of several
// independent guides (Craft Yarn Council's own "YDKWYDK" blog post, LoveCrafts'
// "Yarn Weights Translated", Handy Little Me's yarn weight guide), all of which
// carry some version of the same disclaimer: regional yarn naming isn't
// strictly standardized and varies by brand. Treat the ukAu field as a common
// approximation, not an exact equivalence -- always check a specific yarn's
// gauge/ply on its own label when it matters.

export type YarnWeight = {
  category: number;
  usName: string;
  otherUsNames: string;
  ukAu: string;
  knitGauge: string; // stitches per 4in (10cm) stockinette
  crochetGauge: string; // stitches per 4in (10cm), single/double crochet
  needleUs: string;
  needleMm: string;
  hookUs: string;
  hookMm: string;
  confidence: "standard" | "approximate";
};

export const YARN_WEIGHTS: YarnWeight[] = [
  {
    category: 0,
    usName: "Lace",
    otherUsNames: "Fingering (10-count crochet thread)",
    ukAu: "Lace / 1-2 ply",
    knitGauge: "33-40 sts",
    crochetGauge: "32-42 sts",
    needleUs: "000-1",
    needleMm: "1.5-2.25",
    hookUs: "Steel 6-8, Regular B-1",
    hookMm: "1.4-2.25",
    confidence: "standard",
  },
  {
    category: 1,
    usName: "Super Fine",
    otherUsNames: "Sock, Fingering, Baby",
    ukAu: "4 ply",
    knitGauge: "27-32 sts",
    crochetGauge: "21-32 sts",
    needleUs: "1-3",
    needleMm: "2.25-3.25",
    hookUs: "B-1 to E-4",
    hookMm: "2.25-3.5",
    confidence: "standard",
  },
  {
    category: 2,
    usName: "Fine",
    otherUsNames: "Sport, Baby",
    ukAu: "5 ply",
    knitGauge: "23-26 sts",
    crochetGauge: "16-20 sts",
    needleUs: "3-5",
    needleMm: "3.25-3.75",
    hookUs: "E-4 to 7",
    hookMm: "3.5-4.5",
    confidence: "approximate",
  },
  {
    category: 3,
    usName: "Light",
    otherUsNames: "DK, Light Worsted",
    ukAu: "DK (Double Knitting) / 8 ply",
    knitGauge: "21-24 sts",
    crochetGauge: "12-17 sts",
    needleUs: "5-7",
    needleMm: "3.75-4.5",
    hookUs: "7 to I-9",
    hookMm: "4.5-5.5",
    confidence: "standard",
  },
  {
    category: 4,
    usName: "Medium",
    otherUsNames: "Worsted, Afghan, Aran",
    ukAu: "Aran / 10 ply",
    knitGauge: "16-20 sts",
    crochetGauge: "11-14 sts",
    needleUs: "7-9",
    needleMm: "4.5-5.5",
    hookUs: "I-9 to K-10.5",
    hookMm: "5.5-6.5",
    confidence: "standard",
  },
  {
    category: 5,
    usName: "Bulky",
    otherUsNames: "Chunky, Craft, Rug",
    ukAu: "Chunky / 12 ply",
    knitGauge: "12-15 sts",
    crochetGauge: "8-11 sts",
    needleUs: "9-11",
    needleMm: "5.5-8",
    hookUs: "K-10.5 to M-13",
    hookMm: "6.5-9",
    confidence: "approximate",
  },
  {
    category: 6,
    usName: "Super Bulky",
    otherUsNames: "Super Bulky, Roving",
    ukAu: "Super Chunky / 14+ ply",
    knitGauge: "7-11 sts",
    crochetGauge: "7-9 sts",
    needleUs: "11-17",
    needleMm: "8-12.75",
    hookUs: "M-13 to Q",
    hookMm: "9-15",
    confidence: "approximate",
  },
  {
    category: 7,
    usName: "Jumbo",
    otherUsNames: "Jumbo, Roving",
    ukAu: "Super Chunky+ / 16+ ply",
    knitGauge: "6 sts and fewer",
    crochetGauge: "6 sts and fewer",
    needleUs: "17 and larger",
    needleMm: "12.75mm and larger",
    hookUs: "Q and larger",
    hookMm: "15mm and larger",
    confidence: "approximate",
  },
];

export function findYarnWeightByCategory(category: number): YarnWeight | undefined {
  return YARN_WEIGHTS.find((w) => w.category === category);
}
