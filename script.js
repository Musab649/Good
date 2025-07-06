let users = JSON.parse(localStorage.getItem("users")) || [
  { id: "70062", name: "Musab Ali", role: "admin", site: "" }
];
let sites = JSON.parse(localStorage.getItem("sites")) || [];
let animals = JSON.parse(localStorage.getItem("animals")) || [];
let cuttings = JSON.parse(localStorage.getItem("cuttings")) || [];
let prices = JSON.parse(localStorage.getItem("prices")) || {};
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
let currentUser = null;

window.onload = () => {
  let logo = localStorage.getItem("logo");
  if (logo) document.getElementById("splashLogo").src = logo;

  setTimeout(() => showSection("login"), 2000);

  fillSelects();
  refreshUsers();
};

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function login() {
  let id = document.getElementById("employeeId").value.trim();
  let u = users.find(x => x.id === id);
  if (!u) return alert("غير موجود");
  currentUser = u;
  document.getElementById("username").textContent = u.name;
  document.getElementById("siteTitle").textContent = u.role === "admin" ? "إدخال بيانات" : `الموقع: ${u.site}`;
  showSection("dashboard");
}

function logout() {
  currentUser = null;
  showSection("login");
}

function closeProgram() {
  alert("شكرًا لاستخدامك النظام.");
  window.close();
}

function addSite() {
  sites.push(document.getElementById("newSite").value);
  localStorage.setItem("sites", JSON.stringify(sites));
}

function addAnimal() {
  animals.push(document.getElementById("newAnimal").value);
  localStorage.setItem("animals", JSON.stringify(animals));
  fillSelects();
}

function addCutting() {
  cuttings.push(document.getElementById("newCutting").value);
  localStorage.setItem("cuttings", JSON.stringify(cuttings));
  fillSelects();
}

function setPrice() {
  prices[`${document.getElementById("priceAnimal").value}_${document.getElementById("priceCutting").value}`] = +document.getElementById("priceValue").value;
  localStorage.setItem("prices", JSON.stringify(prices));
}

function uploadLogo(e) {
  let reader = new FileReader();
  reader.onload = () => {
    localStorage.setItem("logo", reader.result);
    alert("تم رفع الشعار");
  };
  reader.readAsDataURL(e.target.files[0]);
}

function addUser() {
  users.push({
    id: document.getElementById("newUserId").value,
    name: document.getElementById("newUserName").value,
    role: document.getElementById("newUserRole").value,
    site: document.getElementById("newUserSite").value
  });
  localStorage.setItem("users", JSON.stringify(users));
  refreshUsers();
}

function refreshUsers() {
  let t = document.querySelector("#usersTable tbody");
  t.innerHTML = "";
  users.forEach(u => {
    let r = t.insertRow();
    r.insertCell().textContent = u.id;
    r.insertCell().textContent = u.name;
    r.insertCell().textContent = u.role;
    r.insertCell().textContent = u.site;
  });

  let s = document.getElementById("newUserSite");
  s.innerHTML = "";
  sites.forEach(site => {
    let opt = document.createElement("option");
    opt.textContent = site;
    s.appendChild(opt);
  });
}

function fillSelects() {
  let a = document.getElementById("animalType");
  let c = document.getElementById("cuttingType");
  let pa = document.getElementById("priceAnimal");
  let pc = document.getElementById("priceCutting");
  [a, pa].forEach(sel => sel.innerHTML = animals.map(v => `<option>${v}</option>`).join(""));
  [c, pc].forEach(sel => sel.innerHTML = cuttings.map(v => `<option>${v}</option>`).join(""));
}

function updatePrice() {
  let p = prices[`${document.getElementById("animalType").value}_${document.getElementById("cuttingType").value}`];
  let qty = +document.getElementById("quantity").value;
  document.getElementById("unitPrice").value = p || 0;
  document.getElementById("totalPrice").value = p * qty;
}

function saveInvoice() {
  invoices.push({
    name: document.getElementById("clientName").value,
    phone: document.getElementById("phone").value,
    animal: document.getElementById("animalType").value,
    cutting: document.getElementById("cuttingType").value,
    qty: document.getElementById("quantity").value,
    unit: document.getElementById("unitPrice").value,
    total: document.getElementById("totalPrice").value
  });
  localStorage.setItem("invoices", JSON.stringify(invoices));
}
