/**
 * Mock Product Database — ฐานข้อมูลสินค้าร้านวัสดุก่อสร้าง (จำลอง)
 */

const products = [
  {
    id: 'cement-50kg',
    name: 'ปูนซีเมนต์ 50 กก.',
    keywords: ['ปูน', 'ซีเมนต์', 'cement', 'ปูนซีเมนต์'],
    price: 165,
    unit: 'ถุง',
    image: 'https://static-marketing-2.onestockhome.com/products/67480428/images/39893_l.webp',
    category: 'วัสดุก่อสร้าง',
    description: 'ปูนซีเมนต์ปอร์ตแลนด์ ประเภท 1 ขนาด 50 กก.',
    inStock: true,
  },
  {
    id: 'pvc-pipe-4inch',
    name: 'ท่อ PVC 4 นิ้ว ยาว 4 ม.',
    keywords: ['ท่อ', 'pvc', 'ท่อ pvc', 'ท่อพีวีซี'],
    price: 189,
    unit: 'ท่อน',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQrmulUJpMPh5NVTc33leNAiEyTQMjzBCwDCfwbjSaVw&s=10',
    category: 'ประปา',
    description: 'ท่อ PVC ชั้น 8.5 ขนาด 4 นิ้ว ยาว 4 เมตร สีฟ้า',
    inStock: true,
  },
  {
    id: 'hammer-steel',
    name: 'ค้อนหงอน ด้ามไฟเบอร์',
    keywords: ['ค้อน', 'ค้อนหงอน', 'hammer'],
    price: 220,
    unit: 'อัน',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Claw-hammer.jpg/220px-Claw-hammer.jpg',
    category: 'เครื่องมือช่าง',
    description: 'ค้อนหงอน หัวเหล็กกล้า ด้ามไฟเบอร์กลาส น้ำหนัก 16 ออนซ์',
    inStock: true,
  },
  {
    id: 'nails-2inch',
    name: 'ตะปูเหล็ก 2 นิ้ว (1 กก.)',
    keywords: ['ตะปู', 'nail', 'nails'],
    price: 45,
    unit: 'ถุง',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Nail_%28fastener%29.jpg/220px-Nail_%28fastener%29.jpg',
    category: 'วัสดุก่อสร้าง',
    description: 'ตะปูเหล็กขนาด 2 นิ้ว บรรจุ 1 กิโลกรัม',
    inStock: true,
  },
  {
    id: 'paint-white-5l',
    name: 'สีทาบ้าน สีขาว 5 ลิตร',
    keywords: ['สี', 'สีทาบ้าน', 'paint', 'สีขาว', 'ทาสี'],
    price: 650,
    unit: 'ถัง',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Paint_Cans.jpg/220px-Paint_Cans.jpg',
    category: 'สี',
    description: 'สีน้ำอะคริลิก สีขาว ขนาด 5 ลิตร ทาภายใน-ภายนอก',
    inStock: true,
  },
  {
    id: 'drill-cordless',
    name: 'สว่านไร้สาย 12V',
    keywords: ['สว่าน', 'drill', 'สว่านไร้สาย'],
    price: 1890,
    unit: 'ชุด',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Akkuschrauber.jpg/220px-Akkuschrauber.jpg',
    category: 'เครื่องมือไฟฟ้า',
    description: 'สว่านไร้สาย 12V พร้อมแบตเตอรี่ 2 ก้อน และที่ชาร์จ',
    inStock: true,
  },
  {
    id: 'sandpaper-pack',
    name: 'กระดาษทราย เบอร์ 120 (แพ็ค 10)',
    keywords: ['กระดาษทราย', 'ทราย', 'sandpaper'],
    price: 65,
    unit: 'แพ็ค',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Sandpaper.jpg/220px-Sandpaper.jpg',
    category: 'วัสดุก่อสร้าง',
    description: 'กระดาษทรายขัดไม้/เหล็ก เบอร์ 120 แพ็ค 10 แผ่น',
    inStock: true,
  },
  {
    id: 'tile-30x30',
    name: 'กระเบื้องปูพื้น 30×30 ซม.',
    keywords: ['กระเบื้อง', 'tile', 'กระเบื้องปูพื้น'],
    price: 18,
    unit: 'แผ่น',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Fliesen.jpg/220px-Fliesen.jpg',
    category: 'กระเบื้อง',
    description: 'กระเบื้องเซรามิก 30×30 ซม. ลายหินแกรนิต ผิวด้าน',
    inStock: true,
  },
  {
    id: 'wire-thw-25mm',
    name: 'สายไฟ THW 2.5 มม. (100 ม.)',
    keywords: ['สายไฟ', 'wire', 'thw', 'ไฟ'],
    price: 1150,
    unit: 'ขด',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Electrical_wires.jpg/220px-Electrical_wires.jpg',
    category: 'ไฟฟ้า',
    description: 'สายไฟ THW 2.5 มม.² สีดำ ยาว 100 เมตร มอก.',
    inStock: false,
  },
  {
    id: 'tape-measure-5m',
    name: 'ตลับเมตร 5 เมตร',
    keywords: ['ตลับเมตร', 'เมตร', 'tape', 'measure', 'วัด'],
    price: 95,
    unit: 'อัน',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Tape_measure.jpg/220px-Tape_measure.jpg',
    category: 'เครื่องมือช่าง',
    description: 'ตลับเมตร 5 เมตร หน้ากว้าง 19 มม. มีล็อค',
    inStock: true,
  },
];

/**
 * ค้นหาสินค้าจาก keyword (ชื่อไทย)
 * @param {string} query — ข้อความที่ผู้ใช้พิมพ์
 * @returns {object[]} รายการสินค้าที่ตรงกัน
 */
export function searchProduct(query) {
  const q = query.toLowerCase().trim();
  return products.filter((p) =>
    p.keywords.some((kw) => q.includes(kw) || kw.includes(q))
  );
}

/**
 * ดึงสินค้าจาก ID
 */
export function getProductById(id) {
  return products.find((p) => p.id === id) ?? null;
}

/**
 * ดึงสินค้าทั้งหมด
 */
export function getAllProducts() {
  return products;
}

/**
 * ดึงรายชื่อหมวดหมู่ทั้งหมด (ไม่ซ้ำ)
 * @returns {string[]}
 */
export function getCategories() {
  return [...new Set(products.map((p) => p.category))];
}

/**
 * ดึงสินค้าตามหมวดหมู่
 * @param {string} category — ชื่อหมวดหมู่
 * @returns {object[]}
 */
export function getProductsByCategory(category) {
  return products.filter((p) => p.category === category);
}
