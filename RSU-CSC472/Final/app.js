// ============================================================
//  app.js — ตรรกะหลักของระบบแยกขยะ
// ============================================================

// ---------- State ----------
const state = {
  items: [],        // รายการขยะที่ผู้ใช้เพิ่ม
  results: null,    // ผลวิเคราะห์ล่าสุด
  treePath: null,   // Decision tree path
  loading: false,
};

// ---------- DOM refs ----------
const inputEl       = document.getElementById("waste-input");
const addBtn        = document.getElementById("add-btn");
const itemList      = document.getElementById("item-list");
const analyzeBtn    = document.getElementById("analyze-btn");
const resultSection = document.getElementById("result-section");
const resultCards   = document.getElementById("result-cards");
const clearAllBtn   = document.getElementById("clear-all");
const itemCount     = document.getElementById("item-count");
const toast         = document.getElementById("toast");
const keywordSelect = document.getElementById("keyword-select");
const treeModal     = document.getElementById("tree-modal");
const treePathContainer = document.getElementById("tree-path-container");

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  renderList();
  bindEvents();
  populateKeywordSelect();
});

// ---------- Events ----------
function bindEvents() {
  addBtn.addEventListener("click", handleAdd);
  analyzeBtn.addEventListener("click", handleAnalyze);
  clearAllBtn.addEventListener("click", handleClearAll);
  keywordSelect.addEventListener("change", handleKeywordSelect);

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAdd();
  });

  inputEl.addEventListener("input", () => {
    inputEl.classList.remove("error");
  });
}

// ---------- Add Item ----------
function handleAdd() {
  const value = inputEl.value.trim();
  if (!value) {
    inputEl.classList.add("error");
    showToast("กรุณาพิมพ์ชื่อขยะก่อน", "warn");
    return;
  }

  // แยก comma / enter ออกเป็นหลายรายการ
  const newItems = value
    .split(/[,，、\n]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  newItems.forEach(item => {
    if (!state.items.includes(item)) {
      state.items.push(item);
    }
  });

  inputEl.value = "";
  inputEl.focus();
  renderList();
  showToast(`เพิ่ม ${newItems.length} รายการแล้ว ✓`, "success");

  // ล้างผลเก่าถ้ามี
  if (state.results) {
    resultSection.classList.add("hidden");
    state.results = null;
    state.treePath = null;
  }
}

// ---------- Remove single item ----------
function handleRemove(index) {
  const removed = state.items.splice(index, 1);
  renderList();
  if (state.results) {
    resultSection.classList.add("hidden");
    state.results = null;
    state.treePath = null;
  }
  showToast(`ลบ "${removed[0]}" แล้ว`, "info");
}

// ---------- Keyword Select ----------
function populateKeywordSelect() {
  // Collect all unique keywords grouped by category
  const keywordsByCategory = {};
  
  WASTE_CATEGORIES.forEach(cat => {
    keywordsByCategory[cat.name] = cat.keywords || [];
  });

  // Create option groups
  Object.entries(keywordsByCategory).forEach(([catName, keywords]) => {
    const optgroup = document.createElement("optgroup");
    optgroup.label = catName;
    
    keywords.forEach(keyword => {
      const option = document.createElement("option");
      option.value = keyword;
      option.textContent = keyword;
      optgroup.appendChild(option);
    });
    
    keywordSelect.appendChild(optgroup);
  });
}

function handleKeywordSelect() {
  const selectedKeyword = keywordSelect.value;
  if (!selectedKeyword) return;

  // Add to items list if not already there
  if (!state.items.includes(selectedKeyword)) {
    state.items.push(selectedKeyword);
  } else {
    showToast(`"${selectedKeyword}" มีอยู่แล้ว`, "info");
  }

  // Reset dropdown
  keywordSelect.value = "";
  renderList();
  showToast(`เพิ่ม "${selectedKeyword}" แล้ว ✓`, "success");

  // Clear results if any
  if (state.results) {
    resultSection.classList.add("hidden");
    state.results = null;
    state.treePath = null;
  }
}

// ---------- Clear All ----------
function handleClearAll() {
  if (state.items.length === 0) return;
  state.items = [];
  state.results = null;
  state.treePath = null;
  renderList();
  resultSection.classList.add("hidden");
  showToast("ล้างรายการทั้งหมดแล้ว", "info");
}

// ---------- Analyze ----------
function handleAnalyze() {
  if (state.items.length === 0) {
    showToast("ยังไม่มีรายการขยะ กรุณาเพิ่มก่อน", "warn");
    inputEl.focus();
    return;
  }

  state.loading = true;
  analyzeBtn.disabled = true;
  analyzeBtn.innerHTML = `<span class="spinner"></span> กำลังวิเคราะห์...`;

  // จำลอง async เล็กน้อยเพื่อ UX
  setTimeout(() => {
    const combinedText = state.items.join(" ");
    const analysisResult = analyzeWasteWithTree(combinedText);

    state.results = analysisResult.results;
    state.treePath = analysisResult.treePath;
    state.loading = false;
    analyzeBtn.disabled = false;
    analyzeBtn.innerHTML = `<span class="btn-icon">🔍</span> วิเคราะห์ขยะ`;

    renderResults(analysisResult.results, analysisResult.treePath);
  }, 600);
}

// ---------- Render List ----------
function renderList() {
  itemCount.textContent = state.items.length;
  analyzeBtn.disabled = state.items.length === 0;

  if (state.items.length === 0) {
    itemList.innerHTML = `
      <li class="empty-state">
        <span class="empty-icon">📋</span>
        <span>ยังไม่มีรายการ — พิมพ์ชื่อขยะด้านบนแล้วกด "เพิ่ม"</span>
      </li>`;
    return;
  }

  itemList.innerHTML = state.items
    .map(
      (item, i) => `
      <li class="item-pill" style="animation-delay:${i * 0.04}s">
        <span class="pill-text">${escapeHtml(item)}</span>
        <button class="pill-remove" onclick="handleRemove(${i})" title="ลบรายการนี้">✕</button>
      </li>`
    )
    .join("");
}

// ---------- Render Results ----------
function renderResults(results, treePath) {
  resultSection.classList.remove("hidden");
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });

  if (!results || results.length === 0) {
    resultCards.innerHTML = `
      <div class="no-result">
        <span style="font-size:3rem">🤷</span>
        <p>ไม่พบข้อมูลขยะที่ตรงกัน<br>ลองพิมพ์ชื่อขยะให้ละเอียดกว่านี้</p>
      </div>`;
    return;
  }

  const topResult = results[0];

  resultCards.innerHTML = results
    .map((r, idx) => {
      const cat = r.category;
      const isTop = idx === 0;
      const matchedStr = r.matched.slice(0, 5).join(", ");
      const confidence = Math.min(100, Math.round((r.score / (results[0].score || 1)) * 100));

      return `
      <div class="result-card ${isTop ? "result-top" : ""}" 
           style="--cat-color: ${cat.binColor}; animation-delay:${idx * 0.1}s">
        ${isTop ? `<div class="top-badge">แนะนำ ✓</div>` : ""}
        <div class="card-header">
          <span class="cat-icon">${cat.icon}</span>
          <div>
            <h3 class="cat-name">${cat.name}</h3>
            <p class="cat-name-en">${cat.nameEn}</p>
          </div>
        </div>

        <div class="bin-badge" style="background:${cat.binColor}22; border-color:${cat.binColor}55; color:${cat.binColor}">
          🗂️ ทิ้งใน: <strong>${cat.bin}</strong>
        </div>

        <div class="priority-hint">ลำดับความสำคัญ: <strong>${cat.priority ?? "—"}</strong></div>

        <div class="confidence-bar-wrap">
          <span class="confidence-label">ความน่าจะเป็น</span>
          <div class="confidence-bar">
            <div class="confidence-fill" style="width:${confidence}%; background:${cat.binColor}"></div>
          </div>
          <span class="confidence-pct">${confidence}%</span>
        </div>

        <p class="cat-desc">${cat.description}</p>

        <div class="cat-tip">
          <span>💡</span> ${cat.tips}
        </div>

        <div class="params-grid">
          ${buildParams(cat.parameters)}
        </div>

        ${matchedStr ? `<div class="matched-kw"><strong>คำที่จับคู่ได้:</strong> ${escapeHtml(matchedStr)}</div>` : ""}

        ${isTop && treePath ? `<button class="btn btn-outline" style="width:100%; margin-top:1rem; justify-content:center" onclick="showTreeModal()">🌳 ดูต้นไม้การตัดสินใจ</button>` : ""}
      </div>`;
    })
    .join("");
}

// ---------- Build Params ----------
function buildParams(params) {
  const rows = [
    { label: "วัสดุหลัก", value: Array.isArray(params.material) ? params.material.slice(0, 4).join(", ") : params.material },
    { label: "รีไซเคิลได้", value: params.recyclability },
    { label: "อันตราย", value: params.hazardous ? "⚠️ ใช่" : "✅ ไม่" },
    {
      label: "ย่อยสลาย (ปี)",
      value:
        params.decompose_years === null
          ? "—"
          : params.decompose_years < 1
          ? `~${Math.round(params.decompose_years * 12)} เดือน`
          : `~${params.decompose_years} ปี`,
    },
  ];

  return rows
    .map(
      r => `
    <div class="param-item">
      <span class="param-label">${r.label}</span>
      <span class="param-value">${r.value}</span>
    </div>`
    )
    .join("");
}

// ---------- Toast ----------
let toastTimer;
function showToast(msg, type = "info") {
  toast.className = `toast toast-${type} show`;
  toast.textContent = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

// ---------- Decision Tree Modal ----------
function showTreeModal() {
  if (!state.treePath) {
    showToast("ยังไม่มีข้อมูลต้นไม้การตัดสินใจ", "warn");
    return;
  }

  const primaryCat = state.results?.[0]?.category;
  let html = '';

  // Render tree steps
  state.treePath.forEach((step, idx) => {
    html += `
      <div class="tree-step">
        <div class="tree-step-question">❓ ${escapeHtml(step.question)}</div>
        <div class="tree-step-answer">${escapeHtml(step.answer)}</div>
      </div>`;
  });

  // Add result box
  if (primaryCat) {
    html += `
      <div class="tree-result-box">
        <span class="tree-result-icon">${primaryCat.icon}</span>
        <div class="tree-result-category">✓ ${escapeHtml(primaryCat.name)}</div>
        <div class="tree-result-bin">🗂️ ${escapeHtml(primaryCat.bin)}</div>
      </div>`;
  }

  treePathContainer.innerHTML = html;
  treeModal.classList.add("show");
}

function closeTreeModal() {
  treeModal.classList.remove("show");
}

// Close modal when clicking outside
treeModal.addEventListener("click", (e) => {
  if (e.target === treeModal) {
    closeTreeModal();
  }
});

// ---------- Util ----------
function escapeHtml(text) {
  const d = document.createElement("div");
  d.textContent = text;
  return d.innerHTML;
}