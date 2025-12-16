function calculateHealthRisk(data) {
   const { C, IR, EF, ED, BW, AT, RfD, SF } = data;
 
   if (C < 0 || IR <= 0 || BW <= 0) {
     throw new Error("Некоректні вхідні параметри");
   }
 
   const CDI = (C * IR * EF * ED) / (BW * AT);
   const HQ = CDI / RfD;
   const HI = HQ;
   const CR = SF ? CDI * SF : null;
 
   return { CDI, HQ, HI, CR };
 }
 
 module.exports = calculateHealthRisk;
 