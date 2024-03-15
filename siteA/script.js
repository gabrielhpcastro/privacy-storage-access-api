function setCookie(event) {
  event.preventDefault();

  const { cookieName, cookieValue } = Object.fromEntries(new FormData(event.target));

  if (!cookieName || !cookieValue) {
    return;
  }

  document.cookie = `${cookieName}=${cookieValue}`;
  alert('Cookie created!');

  readCookies();
}

function readCookies() {
  const cookies = document.cookie && document.cookie.split(';');
  const el = document.getElementById('cookies');

  if (el) {
    el.innerHTML = '';

    if (cookies.length) {
      cookies.forEach((cookie) => {
        const p = document.createElement('p');
        p.innerText = cookie;
        el.appendChild(p);
      });
    } else {
      el.innerText = 'No cookies set';
    }
  }
}
