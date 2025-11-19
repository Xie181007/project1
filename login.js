// login.js
document.addEventListener('DOMContentLoaded', () => {
  // toggle open/close behaviour
  const loginContainer = document.getElementById('loginContainer');
  const closedIcon = document.getElementById('closedIcon');
  let isOpen = false;
  if (closedIcon && loginContainer) {
    closedIcon.addEventListener('click', () => {
      if (!isOpen) {
        loginContainer.classList.add('open');
        isOpen = true;
          // dispatch event so other components (brand) can react
          document.dispatchEvent(new CustomEvent('login-toggle', { detail: { open: true } }));
      } else {
        loginContainer.classList.remove('open');
        isOpen = false;
        document.dispatchEvent(new CustomEvent('login-toggle', { detail: { open: false } }));
      }
    });
  }

  // login logic
  const btn = document.getElementById('btnLogin');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const u = document.getElementById('user').value.trim();
    const p = document.getElementById('pass').value.trim();
    if (u === 'admin' && p === 'tkj123') {
      localStorage.setItem('login', 'true');
      window.location.href = 'dashboard.html';
    } else {
      alert('Username atau password salah!');
    }
  });
});
