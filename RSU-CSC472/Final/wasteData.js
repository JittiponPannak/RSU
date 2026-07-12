// ============================================================
//  wasteData.js — Registry System สำหรับระบบแยกขยะ
// ============================================================

// ─── Waste Registry Class ───
class WasteRegistry {
  constructor() {
    this.categories = new Map();
    this.initializeDefaultCategories();
  }

  /**
   * Initialize default waste categories
   */
  initializeDefaultCategories() {
    this.addCategory({
      id: "recyclable",
      name: "ขยะรีไซเคิล",
      nameEn: "Recyclable Waste",
      bin: "ถังสีเหลือง",
      binColor: "#F59E0B",
      icon: "♻️",
      description: "วัสดุที่สามารถนำกลับมาใช้ใหม่ได้ผ่านกระบวนการแปรรูป",
      tips: "ล้างให้สะอาดก่อนทิ้ง และแยกฝา/จุกออก",
      priority: 3,
      parameters: {
        material: ["พลาสติก", "แก้ว", "โลหะ", "กระดาษ", "อลูมิเนียม", "เหล็ก", "ทองแดง"],
        condition: ["สะอาด", "แห้ง", "ไม่มีสารปนเปื้อน"],
        recyclability: "สูง",
        decompose_years: null,
        hazardous: false,
      },
      keywords: [
        "ขวดน้ำ", "ขวดพลาสติก", "ขวดแก้ว", "กระป๋องอลูมิเนียม", "กระป๋องเบียร์",
        "กระป๋องน้ำอัดลม", "กระดาษ", "หนังสือพิมพ์", "กล่องกระดาษ", "กล่องนม",
        "ถุงพลาสติก", "โฟม", "ขวดแชมพู", "ขวดครีม", "กระป๋องสเปรย์", "ลัง",
        "แผ่นอลูมิเนียม", "เหล็ก", "ทองแดง", "สังกะสี", "ฝาขวด",
        "ถาดพลาสติก", "ถุงซิป", "ถุงช้อปปิ้ง", "กล่องพิซซ่า", "นิตยสาร",
        "กล่องรองเท้า", "แกนกระดาษทิชชู", "ถ้วยกระดาษ", "กล่องซีเรียล",
        "plastic", "glass", "paper", "metal", "aluminum", "steel",
        "pet", "hdpe", "pp", "ps", "pvc"
      ]
    });

    this.addCategory({
      id: "organic",
      name: "ขยะอินทรีย์",
      nameEn: "Organic / Food Waste",
      bin: "ถังสีเขียว",
      binColor: "#10B981",
      icon: "🌿",
      description: "ขยะที่ย่อยสลายได้ตามธรรมชาติ เหมาะสำหรับทำปุ๋ยหมัก",
      tips: "แยกน้ำออกก่อน จะช่วยลดกลิ่นและน้ำหนัก",
      priority: 4,
      parameters: {
        material: ["อาหาร", "พืช", "ผัก", "ผลไม้", "กิ่งไม้", "ใบไม้", "เศษอาหาร"],
        condition: ["เน่าเสียได้", "ย่อยสลายได้"],
        recyclability: "กลาง (ทำปุ๋ย)",
        decompose_years: 0.08,
        hazardous: false,
      },
      keywords: [
        "เศษอาหาร", "เปลือกผลไม้", "เปลือกส้ม", "เปลือกกล้วย", "ผัก", "ผลไม้",
        "ใบไม้", "กิ่งไม้", "ดอกไม้", "หญ้า", "กาแฟ", "กากชา", "กากกาแฟ",
        "ข้าว", "ขนมปัง", "เนื้อสัตว์", "ปลา", "ไข่", "เปลือกไข่", "นม",
        "ชีส", "โยเกิร์ต", "ข้าวเหลือ", "กับข้าวเหลือ", "น้ำมันพืช",
        "ซากพืช", "รากไม้", "ฟาง", "แกลบ", "มูลสัตว์",
        "food", "vegetable", "fruit", "leaf", "grass", "compost", "organic"
      ]
    });

    this.addCategory({
      id: "general",
      name: "ขยะทั่วไป",
      nameEn: "General Waste",
      bin: "ถังสีน้ำเงิน",
      binColor: "#3B82F6",
      icon: "🗑️",
      description: "ขยะที่ไม่สามารถรีไซเคิลหรือย่อยสลายได้ง่าย ต้องนำไปกำจัดในหลุมฝังกลบ",
      tips: "ลดการใช้ให้น้อยที่สุด เพราะย่อยสลายได้ยาก",
      priority: 5,
      parameters: {
        material: ["พลาสติกผสม", "ยาง", "เซรามิก", "ผ้า", "โฟมที่ปนเปื้อน"],
        condition: ["ปนเปื้อน", "ใช้แล้ว", "ซับซ้อน"],
        recyclability: "ต่ำ",
        decompose_years: 500,
        hazardous: false,
      },
      keywords: [
        "ถุงพลาสติกปนเปื้อน", "กล่องโฟมอาหาร", "หลอดดูด", "ช้อนพลาสติก", "ส้อมพลาสติก",
        "ผ้าอ้อม", "แผ่นอนามัย", "ทิชชู", "กระดาษทิชชู", "สำลี",
        "ซองขนม", "ถุงขนม", "ซองบะหมี่", "ซองกาแฟ", "ซองซอส",
        "ยางรัด", "เทปกาว", "กาว", "ดินสอ", "ปากกา", "แปรงสีฟัน",
        "รองเท้า", "เสื้อผ้าเก่า", "ผ้าขาดๆ", "พรม", "ม่าน",
        "กระถางดิน", "เซรามิก", "กระเบื้อง", "ชามแตก", "แก้วแตก",
        "straw", "foam", "diaper", "tissue", "napkin", "wrapper"
      ]
    });

    this.addCategory({
      id: "hazardous",
      name: "ขยะอันตราย",
      nameEn: "Hazardous Waste",
      bin: "ถังสีแดง / จุดรับพิเศษ",
      binColor: "#EF4444",
      icon: "⚠️",
      description: "ขยะที่มีสารพิษ สารเคมี หรืออันตรายต่อสุขภาพและสิ่งแวดล้อม ต้องกำจัดพิเศษ",
      tips: "ห้ามทิ้งรวมกับขยะทั่วไปเด็ดขาด ติดต่อจุดรับขยะอันตรายในพื้นที่",
      priority: 1,
      parameters: {
        material: ["สารเคมี", "โลหะหนัก", "สารกัมมันตรังสี", "ตะกั่ว", "ปรอท", "สารกำจัดแมลง"],
        condition: ["อันตราย", "มีพิษ", "กัดกร่อน", "ติดไฟ"],
        recyclability: "ต้องกำจัดพิเศษ",
        decompose_years: null,
        hazardous: true,
      },
      keywords: [
        "แบตเตอรี่", "ถ่านไฟฉาย", "หลอดไฟ", "หลอดฟลูออเรสเซนต์", "หลอด LED",
        "สี", "สีทาบ้าน", "น้ำมันเครื่อง", "ยาเก่า", "ยาหมดอายุ",
        "สารเคมีทำความสะอาด", "น้ำยาล้างห้องน้ำ", "น้ำยากำจัดแมลง", "ยาฆ่าแมลง",
        "ปุ๋ยเคมี", "กาวซุปเปอร์", "ทินเนอร์", "น้ำมันเบนซิน", "แอลกอฮอล์อุตสาหกรรม",
        "กระป๋องสีสเปรย์", "เทอร์โมมิเตอร์", "ปรอท", "ตะกั่ว", "แคดเมียม",
        "มือถือเก่า", "คอมพิวเตอร์เก่า", "โทรทัศน์เก่า", "เครื่องใช้ไฟฟ้าเก่า",
        "หมึกปริ้นเตอร์", "หมึกตลับ", "แผงวงจร",
        "battery", "chemical", "paint", "medicine", "pesticide", "mercury",
        "lead", "acid", "toxic", "flammable", "corrosive", "e-waste"
      ]
    });

    this.addCategory({
      id: "electronic",
      name: "ขยะอิเล็กทรอนิกส์",
      nameEn: "E-Waste",
      bin: "จุดรับ E-Waste พิเศษ",
      binColor: "#8B5CF6",
      icon: "💻",
      description: "อุปกรณ์อิเล็กทรอนิกส์เก่าหรือชำรุด ที่มีส่วนประกอบที่รีไซเคิลได้และอันตราย",
      tips: "นำไปคืนที่ร้านค้าหรือศูนย์บริการ หรือหน่วยงานรับขยะอิเล็กทรอนิกส์",
      priority: 2,
      parameters: {
        material: ["แผงวงจร", "โลหะหายาก", "พลาสติก", "แก้ว", "ตะกั่ว", "ทองคำ", "เงิน"],
        condition: ["ชำรุด", "เก่า", "ใช้งานไม่ได้"],
        recyclability: "สูง (ต้องกำจัดพิเศษ)",
        decompose_years: 1000,
        hazardous: true,
      },
      keywords: [
        "โทรศัพท์มือถือ", "สมาร์ทโฟน", "แท็บเล็ต", "คอมพิวเตอร์", "แล็ปท็อป",
        "โทรทัศน์", "จอมอนิเตอร์", "เครื่องปริ้นเตอร์", "เครื่องสแกน",
        "กล้องถ่ายรูป", "กล้องวิดีโอ", "เครื่องเล่น MP3", "หูฟัง",
        "เมาส์", "คีย์บอร์ด", "เราเตอร์", "โมเด็ม", "สายชาร์จ",
        "หม้อแปลง", "แผงโซลาร์", "เครื่องซักผ้า", "ตู้เย็น", "เครื่องปรับอากาศ",
        "ไมโครเวฟ", "เตาไฟฟ้า", "เครื่องดูดฝุ่น", "พัดลม", "เครื่องทำน้ำร้อน",
        "phone", "laptop", "computer", "tablet", "tv", "monitor", "printer",
        "camera", "charger", "router", "appliance", "circuit board"
      ]
    });
  }

  /**
   * Add a new waste category to the registry
   * @param {Object} category - Category configuration
   */
  addCategory(category) {
    if (!category.id || !category.name) {
      throw new Error("Category must have 'id' and 'name'");
    }
    
    if (!category.keywords) {
      category.keywords = [];
    }
    
    this.categories.set(category.id, category);
    return this;
  }

  /**
   * Add keyword(s) to a specific waste category
   * @param {string} categoryId - Category ID (e.g., "recyclable", "organic", etc.)
   * @param {string|Array} keywords - Single keyword or array of keywords
   */
  addKeyword(categoryId, keywords) {
    const category = this.categories.get(categoryId);
    if (!category) {
      throw new Error(`Category "${categoryId}" not found`);
    }

    if (typeof keywords === "string") {
      keywords = [keywords];
    }

    if (!Array.isArray(keywords)) {
      throw new Error("Keywords must be a string or array of strings");
    }

    keywords.forEach(kw => {
      if (!category.keywords.includes(kw)) {
        category.keywords.push(kw);
      }
    });

    return this;
  }

  /**
   * Add keywords to multiple categories at once
   * @param {Object} keywordMap - Object mapping category IDs to keywords
   */
  addKeywords(keywordMap) {
    Object.entries(keywordMap).forEach(([categoryId, keywords]) => {
      this.addKeyword(categoryId, keywords);
    });
    return this;
  }

  /**
   * Remove keyword from category
   * @param {string} categoryId - Category ID
   * @param {string} keyword - Keyword to remove
   */
  removeKeyword(categoryId, keyword) {
    const category = this.categories.get(categoryId);
    if (!category) {
      throw new Error(`Category "${categoryId}" not found`);
    }

    const index = category.keywords.indexOf(keyword);
    if (index > -1) {
      category.keywords.splice(index, 1);
    }

    return this;
  }

  /**
   * Get category by ID
   * @param {string} categoryId - Category ID
   */
  getCategory(categoryId) {
    return this.categories.get(categoryId);
  }

  /**
   * Get all categories as array
   */
  getAllCategories() {
    return Array.from(this.categories.values());
  }

  /**
   * Get all keywords for a category
   * @param {string} categoryId - Category ID
   */
  getKeywords(categoryId) {
    const category = this.categories.get(categoryId);
    return category ? [...category.keywords] : [];
  }

  /**
   * Check if category exists
   * @param {string} categoryId - Category ID
   */
  hasCategory(categoryId) {
    return this.categories.has(categoryId);
  }

  /**
   * Get category count
   */
  getCategoryCount() {
    return this.categories.size;
  }

  /**
   * Clear all categories
   */
  clear() {
    this.categories.clear();
    return this;
  }
}

// ─── Global Registry Instance ───
const wasteRegistry = new WasteRegistry();
const WASTE_CATEGORIES = wasteRegistry.getAllCategories();

// ฟังก์ชัน helper สำหรับค้นหา
function analyzeWaste(inputText) {
  const text = inputText.toLowerCase().trim();
  const words = text.split(/[\s,，、]+/).filter(w => w.length > 0);
  const scores = {};

  const categories = wasteRegistry.getAllCategories();
  categories.forEach(cat => {
    scores[cat.id] = { category: cat, score: 0, matched: [] };
  });

  words.forEach(word => {
    categories.forEach(cat => {
      cat.keywords.forEach(kw => {
        const kwLower = kw.toLowerCase();
        if (kwLower.includes(word) || word.includes(kwLower)) {
          scores[cat.id].score += kwLower === word ? 10 : 5;
          if (!scores[cat.id].matched.includes(kw)) {
            scores[cat.id].matched.push(kw);
          }
        }
      });
    });
  });

  const results = Object.values(scores)
    .filter(r => r.score > 0)
    .sort((a, b) => {
      // First sort by priority (lower number = higher priority)
      if (a.category.priority !== b.category.priority) {
        return a.category.priority - b.category.priority;
      }
      // Then sort by score (higher score first)
      return b.score - a.score;
    });

  return results.length > 0 ? results : null;
}

// ฟังก์ชันสำหรับใช้ decision tree ในการวิเคราะห์
function analyzeWasteWithTree(inputText) {
  // ใช้ keyword matching เพื่อหาคะแนน
  const allResults = analyzeWaste(inputText);
  if (!allResults || allResults.length === 0) return null;

  // เลือกเฉพาะผลลัพธ์ที่สูงสุด (priority แรก)
  const topResult = allResults[0];
  const results = [topResult];
  
  // หาหมวดกด primary
  const primaryCategory = topResult.category;
  
  // สร้าง decision path โดยใช้ keywords
  const text = inputText.toLowerCase().trim();
  const treePath = generateTreePath(primaryCategory, text);

  // ส่งคืน results พร้อม tree path
  return {
    results: results,
    treePath: treePath,
    primaryCategory: primaryCategory
  };
}

// สร้าง decision tree path
function generateTreePath(category, text) {
  const path = [];
  
  // Get keywords from registry instead of hardcoded lists
  const hazardousKeywords = wasteRegistry.getKeywords("hazardous");
  const electronicKeywords = wasteRegistry.getKeywords("electronic");
  const organicKeywords = wasteRegistry.getKeywords("organic");
  const recyclableKeywords = wasteRegistry.getKeywords("recyclable");

  path.push({ question: "ขยะชิ้นนี้คืออะไร?", answer: category.name });

  const isHazardous = hazardousKeywords.some(kw => text.includes(kw)) || category.parameters.hazardous;
  path.push({ 
    question: "มีสารพิษหรือเป็นอันตรายต่อสุขภาพหรือไม่?", 
    answer: isHazardous ? "ใช่ ⚠️" : "ไม่ ✓" 
  });

  if (isHazardous) {
    const isElectronic = electronicKeywords.some(kw => text.includes(kw)) || category.id === "electronic";
    path.push({ 
      question: "เป็นอุปกรณ์อิเล็กทรอนิกส์หรือไม่?", 
      answer: isElectronic ? "ใช่ ⚠️" : "ไม่ ⚠️" 
    });
  } else {
    const isOrganic = organicKeywords.some(kw => text.includes(kw)) || category.id === "organic";
    path.push({ 
      question: "เป็นเศษอาหารหรือพืชหรือไม่?", 
      answer: isOrganic ? "ใช่ 🌿" : "ไม่" 
    });

    if (!isOrganic) {
      const isRecyclable = recyclableKeywords.some(kw => text.includes(kw)) || category.id === "recyclable";
      path.push({ 
        question: "สามารถรีไซเคิลได้หรือไม่?", 
        answer: isRecyclable ? "ใช่ ♻️" : "ไม่" 
      });
    }
  }

  return path;
}

// Export
if (typeof module !== "undefined") {
  module.exports = { 
    WasteRegistry,
    wasteRegistry,
    WASTE_CATEGORIES, 
    analyzeWaste, 
    analyzeWasteWithTree,
    generateTreePath
  };
}