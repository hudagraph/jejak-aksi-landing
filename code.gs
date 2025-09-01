
/** ====== KONFIG ====== **/
const SHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';
const SHEET_NAME = 'Leads'; // buat sheet bernama Leads dengan header: Timestamp, Nama, Email, WhatsApp, Domisili, Peran, Consent

/** ====== ROUTER ====== **/
function doGet() {
  const tpl = HtmlService.createTemplateFromFile('index');
  return tpl.evaluate()
    .setTitle('Jejak Aksi — Melangkah Bersama, Menorehkan Manfaat')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/** ====== DATA HANDLER ====== **/
function submitForm(payload) {
  if (!payload) throw new Error('Payload kosong.');
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) throw new Error('Sheet '+SHEET_NAME+' tidak ditemukan.');

  const { nama, email, wa, domisili, peran, consent } = payload;

  // Validasi minimal
  if (!nama || !email || !wa || !domisili || !peran) {
    throw new Error('Mohon lengkapi semua field wajib.');
  }
  if (consent !== true) {
    throw new Error('Anda harus menyetujui kebijakan privasi.');
  }

  const row = [
    new Date(),
    nama.trim(),
    email.trim(),
    wa.trim(),
    domisili.trim(),
    peran.trim(),
    consent ? 'Ya' : 'Tidak'
  ];

  sh.appendRow(row);
  return { ok: true, message: 'Terima kasih! Data kamu sudah kami terima.' };
}
