/**
 * ดึงราคาทองจาก Public API (ไม่ต้องใช้ API key)
 * - ราคาทอง: https://mintedmetal.com/api/prices.json (LBMA spot, USD/oz)
 * - อัตราแลกเปลี่ยน: https://api.frankfurter.app (USD → THB)
 */
const GOLD_API = "https://mintedmetal.com/api/prices.json";
const OIL_API = "https://oil-price.bangchak.co.th/ApiOilPrice2/th";
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

  return [{
    priceUsd,
    priceThb,
    usdThbRate,
    unit: "ต่อทรอยออนซ์",
    updatedAt: goldData.updatedAt ?? new Date().toISOString(),
    source: "Minted Metal (LBMA)",
  }];
}

export async function fetchThaiOilPrices() {
  const oilRes = await fetch(OIL_API);

  if (!oilRes.ok) {
    throw new Error("ดึงราคาน้ำมันไม่สำเร็จ");
  }

  const oilData = await oilRes.json();

  if (!Array.isArray(oilData) || oilData.length === 0) {
    throw new Error("ไม่พบข้อมูลราคาน้ำมันใน API");
  }

  const data = oilData[0];
  let oilList = [];

  if (data.OilList) {
    try {
      oilList = typeof data.OilList === "string" ? JSON.parse(data.OilList) : data.OilList;
    } catch (e) {
      console.error("Failed to parse OilList:", e);
    }
  }

  return {
    oilPriceId: data.OilPriceID,
    banner: data.Banner,
    bannerPoint: data.BannerPoint,
    bannerUrlPoint: data.BannerUrlPoint,
    oilDateNow: data.OilDateNow,
    oilPriceDate: data.OilPriceDate,
    oilPriceTime: data.OilPriceTime,
    oilRemark: data.OilRemark,
    oilRemark2: data.OilRemark2,
    oilList: oilList.map((oil) => ({
      name: oil.OilName,
      priceYesterday: Number(oil.PriceYesterday),
      priceToday: Number(oil.PriceToday),
      priceTomorrow: Number(oil.PriceTomorrow),
      priceDifYesterday: Number(oil.PriceDifYesterday),
      priceDifTomorrow: Number(oil.PriceDifTomorrow),
      icon: oil.Icon,
    })),
    source: "บางจาก (bangchak)",
  };
}

export async function fetchPreciousMetalsPrices() {
  const [metalRes, fxRes] = await Promise.all([fetch(GOLD_API), fetch(FX_API)]);

  if (!metalRes.ok) {
    throw new Error("ดึงข้อมูลราคาโลหะมีค่าไม่สำเร็จ");
  }

  const metalData = await metalRes.json();
  let usdThbRate = null;

  if (fxRes.ok) {
    const fxData = await fxRes.json();
    usdThbRate = fxData.rates?.THB;
  }

  const getMetalInfo = (key, name) => {
    const metal = metalData.metals?.[key];
    if (!metal) return null;
    const priceUsd = metal.price;
    const priceThb = (priceUsd != null && usdThbRate != null) ? priceUsd * usdThbRate : null;
    return {
      key,
      name,
      priceUsd,
      priceThb,
      unit: "ต่อทรอยออนซ์",
    };
  };

  return {
    metals: [
      getMetalInfo("gold", "ทองคำ (Gold)"),
      getMetalInfo("silver", "เงิน (Silver)"),
      getMetalInfo("platinum", "แพลทินัม (Platinum)"),
    ].filter(Boolean),
    usdThbRate,
    updatedAt: metalData.updatedAt ?? new Date().toISOString(),
    source: "Minted Metal (LBMA)",
  };
}