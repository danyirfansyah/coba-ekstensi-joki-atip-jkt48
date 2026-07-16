// Data dummy untuk website tes ekstensi
const PHOTOBOOKS = [
  { code: "EX3721", title: "JKT48 Personal Meet and Greet Festival: LOVE DREAM PASSION" },
  { code: "EX3725", title: "We Are Love, Dream Team, Passion On Fire!" },
  { code: "EX3726", title: "Love Dream Passion - Music Video Behind the Scenes (Without Bonus Video Call)" },
  { code: "EX3727", title: "Love Dream Passion - Music Video Behind the Scenes" },
  { code: "EX3730", title: "JKT48 Request Hour 2026 Setlist Best 40" },
];

const SCHEDULE = [
  {
    date: "2026-07-25",
    label: "Sabtu, 25 Juli 2026",
    sessions: [
      { name: "Sesi 1", time: "16:00 - 17:00", members: ["Catherina Vallencia", "Abigail Rachel"] },
      { name: "Sesi 2", time: "18:00 - 19:00", members: ["Catherina Vallencia", "Abigail Rachel"] },
    ],
  },
  {
    date: "2026-07-26",
    label: "Minggu, 26 Juli 2026",
    sessions: [
      { name: "Sesi 1", time: "16:00 - 17:00", members: ["Oline Manuel"] },
      { name: "Sesi 2", time: "18:00 - 19:00", members: ["Oline Manuel"] },
    ],
  },
];

const ALL_MEMBERS = ["Catherina Vallencia", "Abigail Rachel", "Oline Manuel"];

const MAX_TICKETS = 5;

function getPhotobook(code) {
  return PHOTOBOOKS.find((p) => p.code === code) || PHOTOBOOKS[0];
}

// sold-out simulation (disimpan di localStorage biar tahan reload halaman)
function getSoldOutMap() {
  try {
    return JSON.parse(localStorage.getItem("soldout") || "{}");
  } catch {
    return {};
  }
}
function setSoldOut(member, value) {
  const map = getSoldOutMap();
  map[member] = value;
  localStorage.setItem("soldout", JSON.stringify(map));
}
function isSoldOut(member) {
  return !!getSoldOutMap()[member];
}

// riwayat pembelian
function getHistory() {
  try {
    return JSON.parse(localStorage.getItem("history") || "[]");
  } catch {
    return [];
  }
}
function addHistory(item) {
  const h = getHistory();
  h.push(item);
  localStorage.setItem("history", JSON.stringify(h));
}
function clearHistory() {
  localStorage.removeItem("history");
}
