// ---------- Данные комплектующих ----------
// Цены примерные, только для демонстрации работы конфигуратора.

const CATEGORIES = [
  {
    id: "cpu",
    title: "Процессор",
    items: [
      { id: "cpu-1", name: "AMD Ryzen 5 7600X", specs: "6 ядер / 12 потоков · 4.7 ГГц", price: 230 },
      { id: "cpu-2", name: "Intel Core i5-14600K", specs: "14 ядер / 20 потоков · 5.3 ГГц", price: 290 },
      { id: "cpu-3", name: "AMD Ryzen 7 7800X3D", specs: "8 ядер / 16 потоков · 5.0 ГГц", price: 380 },
      { id: "cpu-4", name: "Intel Core i9-14900K", specs: "24 ядра / 32 потока · 6.0 ГГц", price: 560 },
    ],
  },
  {
    id: "motherboard",
    title: "Материнская плата",
    items: [
      { id: "mb-1", name: "MSI B650 Gaming Plus", specs: "AM5 · DDR5 · ATX", price: 170 },
      { id: "mb-2", name: "ASUS TUF Z790-Plus", specs: "LGA1700 · DDR5 · ATX", price: 210 },
      { id: "mb-3", name: "Gigabyte B550M AORUS Elite", specs: "AM4 · DDR4 · mATX", price: 120 },
    ],
  },
  {
    id: "gpu",
    title: "Видеокарта",
    items: [
      { id: "gpu-1", name: "NVIDIA GeForce RTX 4060", specs: "8 ГБ GDDR6", price: 300 },
      { id: "gpu-2", name: "NVIDIA GeForce RTX 4070 Super", specs: "12 ГБ GDDR6X", price: 600 },
      { id: "gpu-3", name: "AMD Radeon RX 7800 XT", specs: "16 ГБ GDDR6", price: 500 },
      { id: "gpu-4", name: "NVIDIA GeForce RTX 4090", specs: "24 ГБ GDDR6X", price: 1600 },
    ],
  },
  {
    id: "ram",
    title: "Оперативная память",
    items: [
      { id: "ram-1", name: "Kingston Fury Beast 16GB", specs: "DDR5 · 5200 МГц · 2×8ГБ", price: 55 },
      { id: "ram-2", name: "Corsair Vengeance 32GB", specs: "DDR5 · 6000 МГц · 2×16ГБ", price: 110 },
      { id: "ram-3", name: "G.Skill Trident Z5 64GB", specs: "DDR5 · 6400 МГц · 2×32ГБ", price: 240 },
    ],
  },
  {
    id: "storage",
    title: "Накопитель",
    items: [
      { id: "st-1", name: "Samsung 980 1TB", specs: "NVMe M.2 · 3500 МБ/с", price: 70 },
      { id: "st-2", name: "WD Black SN850X 2TB", specs: "NVMe M.2 · 7300 МБ/с", price: 150 },
      { id: "st-3", name: "Crucial MX500 1TB", specs: "SATA SSD · 560 МБ/с", price: 55 },
    ],
  },
  {
    id: "psu",
    title: "Блок питания",
    items: [
      { id: "psu-1", name: "be quiet! Pure Power 650W", specs: "80+ Gold", price: 85 },
      { id: "psu-2", name: "Corsair RM850x", specs: "850W · 80+ Gold · модульный", price: 140 },
      { id: "psu-3", name: "Seasonic Prime TX-1000", specs: "1000W · 80+ Titanium", price: 260 },
    ],
  },
  {
    id: "case",
    title: "Корпус",
    items: [
      { id: "case-1", name: "NZXT H510 Flow", specs: "ATX Mid Tower", price: 90 },
      { id: "case-2", name: "Lian Li Lancool 216", specs: "ATX Mid Tower · сеть", price: 110 },
      { id: "case-3", name: "Fractal Design North", specs: "ATX Mid Tower · дерево", price: 130 },
    ],
  },
  {
    id: "cooler",
    title: "Охлаждение",
    items: [
      { id: "cool-1", name: "Deepcool AK400", specs: "Башенный воздушный кулер", price: 35 },
      { id: "cool-2", name: "ARCTIC Liquid Freezer III 240", specs: "СЖО · 240мм радиатор", price: 100 },
      { id: "cool-3", name: "NZXT Kraken 360", specs: "СЖО · 360мм радиатор", price: 180 },
    ],
  },
];

// ---------- Состояние ----------

const selected = {}; // { categoryId: itemId }

const el = {
  categories: document.getElementById("categories"),
  summaryList: document.getElementById("summaryList"),
  summaryEmpty: document.getElementById("summaryEmpty"),
  totalPrice: document.getElementById("totalPrice"),
  summaryTotal: document.getElementById("summaryTotal"),
  progressCount: document.getElementById("progressCount"),
  resetBtn: document.getElementById("resetBtn"),
};

function formatPrice(n) {
  return "$" + n.toLocaleString("en-US");
}

function findItem(catId, itemId) {
  const cat = CATEGORIES.find((c) => c.id === catId);
  return cat ? cat.items.find((i) => i.id === itemId) : null;
}

// ---------- Рендер категорий и карточек ----------

function renderCategories() {
  el.categories.innerHTML = "";

  CATEGORIES.forEach((cat, index) => {
    const section = document.createElement("section");
    section.className = "category";

    const head = document.createElement("div");
    head.className = "category__head";
    head.innerHTML = `
      <span class="category__index">${String(index + 1).padStart(2, "0")}</span>
      <h2 class="category__title">${cat.title}</h2>
      <span class="category__required">1 из ${cat.items.length}</span>
    `;
    section.appendChild(head);

    const grid = document.createElement("div");
    grid.className = "card-grid";

    cat.items.forEach((item) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "card";
      card.dataset.cat = cat.id;
      card.dataset.item = item.id;
      card.setAttribute("aria-pressed", "false");
      card.innerHTML = `
        <p class="card__name">${item.name}</p>
        <p class="card__specs">${item.specs}</p>
        <p class="card__price">${formatPrice(item.price)}</p>
      `;
      card.addEventListener("click", () => toggleSelect(cat.id, item.id));
      grid.appendChild(card);
    });

    section.appendChild(grid);
    el.categories.appendChild(section);
  });
}

function toggleSelect(catId, itemId) {
  if (selected[catId] === itemId) {
    delete selected[catId];
  } else {
    selected[catId] = itemId;
  }
  syncCardStates();
  renderSummary();
}

function syncCardStates() {
  document.querySelectorAll(".card").forEach((card) => {
    const isSelected = selected[card.dataset.cat] === card.dataset.item;
    card.classList.toggle("card--selected", isSelected);
    card.setAttribute("aria-pressed", String(isSelected));
  });
}

// ---------- Итог и сайдбар ----------

function renderSummary() {
  const chosenIds = Object.keys(selected);
  let total = 0;

  el.summaryList.innerHTML = "";

  if (chosenIds.length === 0) {
    el.summaryList.appendChild(el.summaryEmpty);
  } else {
    CATEGORIES.forEach((cat) => {
      const itemId = selected[cat.id];
      if (!itemId) return;
      const item = findItem(cat.id, itemId);
      if (!item) return;
      total += item.price;

      const row = document.createElement("div");
      row.className = "summary__item";
      row.innerHTML = `
        <span class="summary__item-text">
          <span class="summary__item-cat">${cat.title}</span>
          <span class="summary__item-name">${item.name}</span>
        </span>
        <span class="summary__item-price">${formatPrice(item.price)}</span>
      `;
      el.summaryList.appendChild(row);
    });
  }

  el.totalPrice.textContent = formatPrice(total);
  el.summaryTotal.textContent = formatPrice(total);
  el.progressCount.textContent = String(chosenIds.length);
}

function resetAll() {
  Object.keys(selected).forEach((k) => delete selected[k]);
  syncCardStates();
  renderSummary();
}

el.resetBtn.addEventListener("click", resetAll);

// ---------- Инициализация ----------

renderCategories();
renderSummary();
