/* notif.js */
/* Peringatan: memasukkan BOT_TOKEN pada client-side tidak aman.
   Hanya gunakan untuk demo lokal. Untuk produksi, buat endpoint server. */

const BOT_TOKEN = 'MASUKKAN_TOKEN_BOT_ANDA_DI_SINI'; // contoh: '123456789:ABC...'
const CHAT_ID  = 'MASUKKAN_CHAT_ID_DI_SINI';        // misal: '123456789' atau '-100xxxxxx' untuk grup

async function sendTelegramMessage(message) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('BOT_TOKEN atau CHAT_ID belum diset di notif.js');
    return null;
  }
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('Error kirim Telegram:', err);
    return null;
  }
}

window.notifPinjam = async function(namaBarang, peminjam, kode) {
  const waktu = new Date().toLocaleString();
  const pesan = `📦 <b>BARANG DIPINJAM</b>\nNama: <b>${namaBarang}</b>\nKode: <b>${kode}</b>\nPeminjam: <b>${peminjam}</b>\nWaktu: ${waktu}`;
  await sendTelegramMessage(pesan);
  alert('Notifikasi pinjam terkirim ke Telegram (jika token valid).');
};

window.notifRusak = async function(namaBarang, keterangan, kode) {
  const waktu = new Date().toLocaleString();
  const pesan = `⚠️ <b>LAPORAN BARANG RUSAK</b>\nNama: <b>${namaBarang}</b>\nKode: <b>${kode}</b>\nKerusakan: ${keterangan}\nWaktu: ${waktu}`;
  await sendTelegramMessage(pesan);
  alert('Notifikasi rusak terkirim ke Telegram (jika token valid).');
};
