/**
 * บริการคำนวณวัสดุก่อสร้าง — DIY & Material Calculator
 *
 * สูตรคำนวณ:
 *  - ปูนซีเมนต์: ปริมาตร × ความหนาแน่น × อัตราส่วน → จำนวนถุง 50 กก.
 *  - สีทาบ้าน:   พื้นที่ × จำนวนรอบทา ÷ อัตราปูของสี → จำนวนแกลลอน
 *  - กระเบื้อง:  พื้นที่ ÷ ขนาดกระเบื้อง × ตัวคูณเผื่อเสีย → จำนวนแผ่น
 */

/**
 * คำนวณจำนวนถุงปูนซีเมนต์
 * @param {number} areaSqm — พื้นที่ (ตร.ม.)
 * @param {number} [thicknessCm=10] — ความหนักของพื้น (ซม.)
 * @returns {{ quantity: number, unit: string, productId: string, detail: string }}
 */
export function calculateCement(areaSqm, thicknessCm = 10) {
  const thicknessM = thicknessCm / 100;
  const volumeM3 = areaSqm * thicknessM;
  // คอนกรีตใช้ปูนประมาณ 300 กก./ลบ.ม.
  const cementKg = volumeM3 * 300;
  const bags = Math.ceil(cementKg / 50);

  return {
    quantity: bags,
    unit: 'ถุง (50 กก.)',
    productId: 'cement-50kg',
    detail:
      `พื้นที่ ${areaSqm} ตร.ม. หนา ${thicknessCm} ซม.\n` +
      `ปริมาตร = ${volumeM3.toFixed(2)} ลบ.ม.\n` +
      `ต้องใช้ปูนซีเมนต์ประมาณ ${cementKg.toFixed(0)} กก.\n` +
      `= ${bags} ถุง (ถุงละ 50 กก.)`,
  };
}

/**
 * คำนวณจำนวนถังสี
 * @param {number} areaSqm — พื้นที่ผนัง (ตร.ม.)
 * @param {number} [coats=2] — จำนวนรอบทา
 * @returns {{ quantity: number, unit: string, productId: string, detail: string }}
 */
export function calculatePaint(areaSqm, coats = 2) {
  // สี 1 แกลลอน (5 ลิตร) ทาได้ ~35 ตร.ม./รอบ
  const coveragePerGallon = 35;
  const totalArea = areaSqm * coats;
  const gallons = Math.ceil(totalArea / coveragePerGallon);

  return {
    quantity: gallons,
    unit: 'ถัง (5 ลิตร)',
    productId: 'paint-white-5l',
    detail:
      `พื้นที่ ${areaSqm} ตร.ม. ทา ${coats} รอบ\n` +
      `พื้นที่รวม = ${totalArea} ตร.ม.\n` +
      `ต้องใช้สีประมาณ ${gallons} ถัง (ถังละ 5 ลิตร)`,
  };
}

/**
 * คำนวณจำนวนแผ่นกระเบื้อง
 * @param {number} areaSqm — พื้นที่ (ตร.ม.)
 * @param {number} [tileSizeCm=30] — ขนาดกระเบื้อง (ซม.)
 * @returns {{ quantity: number, unit: string, productId: string, detail: string }}
 */
export function calculateTiles(areaSqm, tileSizeCm = 30) {
  const tileSizeM = tileSizeCm / 100;
  const tileAreaSqm = tileSizeM * tileSizeM;
  const tilesNeeded = areaSqm / tileAreaSqm;
  // เผื่อเสีย 10%
  const withWaste = Math.ceil(tilesNeeded * 1.10);

  return {
    quantity: withWaste,
    unit: 'แผ่น',
    productId: 'tile-30x30',
    detail:
      `พื้นที่ ${areaSqm} ตร.ม.\n` +
      `กระเบื้อง ${tileSizeCm}×${tileSizeCm} ซม.\n` +
      `ต้องใช้ ~${Math.ceil(tilesNeeded)} แผ่น (เผื่อเสีย 10% = ${withWaste} แผ่น)`,
  };
}
