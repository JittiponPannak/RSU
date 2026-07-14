/**
 * ดึงราคาทองจาก Public API (ไม่ต้องใช้ API key)
 * - ราคาทอง: https://mintedmetal.com/api/prices.json (LBMA spot, USD/oz)
 * - อัตราแลกเปลี่ยน: https://api.frankfurter.app (USD → THB)
 */
const GOLD_API = "https://mintedmetal.com/api/prices.json";
const FX_API = "https://api.frankfurter.app/latest?from=USD&to=THB";

export async function fetchGoldPrice() {
  const [goldRes, fxRes] = await Promise.all([fetch(GOLD_API), fetch(FX_API)]);

  if (!goldRes.ok) {
    throw new Error("ดึงราคาทองไม่สำเร็จ");
  }

  const goldData = await goldRes.json();
  const priceUsd = goldData.metals?.gold?.price;

  if (priceUsd == null) {
    throw new Error("ไม่พบข้อมูลราคาทองใน API");
  }

  let priceThb = null;
  let usdThbRate = null;

  if (fxRes.ok) {
    const fxData = await fxRes.json();
    usdThbRate = fxData.rates?.THB;
    if (usdThbRate) {
      priceThb = priceUsd * usdThbRate;
    }
  }

  return {
    priceUsd,
    priceThb,
    usdThbRate,
    unit: "ต่อทรอยออนซ์",
    updatedAt: goldData.updatedAt ?? new Date().toISOString(),
    source: "Minted Metal (LBMA)",
  };
}
