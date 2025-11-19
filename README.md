# project
...
Fitur tambahan:

- Riwayat peminjaman disimpan di localStorage dan dapat dilihat pada `history.html`.
- Notifikasi Telegram: letakkan `config.json` di folder yang sama (tidak termasuk di repo) atau edit `notif.js` untuk menambahkan `BOT_TOKEN` dan `CHAT_ID` (tidak direkomendasikan untuk produksi).

Contoh `config.example.json` disertakan sebagai panduan.

Catatan keamanan: menyimpan token bot di client-side tidak aman untuk produksi. Untuk penggunaan nyata, buat endpoint server yang menyimpan token dengan aman dan yang menerima event dari client untuk diteruskan ke Telegram.
