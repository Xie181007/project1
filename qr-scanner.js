// qr-scanner.js
// Handles QR camera init and scan callbacks for qr-scanner.html
(function(){
  // simple cekLogin fallback (mirrors behavior in script.js)
  function cekLogin() {
    if (localStorage.getItem('login') !== 'true') {
      window.location.href = 'index.html';
    }
  }

  // expose init function
  let html5QrScannerPage;

  window.initScannerPage = async function() {
    cekLogin();
    html5QrScannerPage = new Html5Qrcode("reader");
    try {
      const devices = await Html5Qrcode.getCameras();
      const sel = document.getElementById('cameraSelect');
      sel.innerHTML = '';
      devices.forEach((d, i) => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.text = d.label || `Camera ${i+1}`;
        sel.appendChild(opt);
      });
      if (devices.length) {
        startQrCamera(devices[0].id);
        sel.value = devices[0].id;
      }
      sel.onchange = () => {
        const id = sel.value;
        switchQrCamera(id);
      };
    } catch (err) {
      startQrCamera({ facingMode: "environment" });
    }
  };

  function startQrCamera(cameraIdOrConfig) {
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    html5QrScannerPage.start(
      cameraIdOrConfig,
      config,
      (decodedText, decodedResult) => {
        if (typeof window.onScanSuccess === 'function') {
          window.onScanSuccess(decodedText);
        } else {
          const el = document.getElementById('hasil_kode');
          if (el) el.innerText = decodedText;
        }
      },
      (error) => {
        // ignore minor errors
      }
    ).catch(e => console.error('Start QR error', e));
  }

  window.switchQrCamera = async function(newId) {
    try { await html5QrScannerPage.stop(); } catch(e){}
    startQrCamera(newId);
  };

  window.stopQrCamera = function() {
    if (html5QrScannerPage) html5QrScannerPage.stop().catch(e => console.warn('Stop error', e));
  };

  window.confirmPinjamFromScanner = function() {
    const kode = document.getElementById('hasil_kode').innerText;
    if (!kode || kode === '-') { alert('Belum ada hasil scan'); return; }
    const peminjam = prompt('Masukkan nama peminjam:');
    if (!peminjam) return;
    if (typeof window.konfirmasiPinjamByKode === 'function') {
      window.konfirmasiPinjamByKode(kode, peminjam);
    } else {
      alert('Fungsi peminjaman tidak tersedia. Kembali ke dashboard.');
    }
  };

})();
