function setCookie(event) {
  event.preventDefault();

  const { cookieName, cookieValue, cookiePartitioned } = Object.fromEntries(new FormData(event.target));

  console.log({ cookieName, cookieValue, cookiePartitioned });

  if (!cookieName || !cookieValue) {
    return;
  }

  document.cookie = `${cookieName}=${cookieValue}; SameSite=None; Secure`;

  alert('Cookie created!');

  readCookies();
}

async function onLoad() {
  const header = document.querySelector('header');
  const welcomeMessage = document.querySelector('main > h1');
  const isIframe = window !== window.parent;

  if (isIframe) {
    header.classList.add('hidden');
    welcomeMessage.classList.add('hidden');
  }

  storageAccess();
}

async function storageAccess() {
  console.log('Handling storage access');

  const hasAccess = await document.hasStorageAccess();

  if (hasAccess) {
    // Do nothing, reading third-party cookies will work already
    readCookies();
  } else {
    // Requests storage access in order to read third-party cookies
    const permission = await navigator.permissions.query({ name: 'storage-access' });

    if (permission.state === 'granted') {
      // User already granted permission, storage access can be requested right away
      await document.requestStorageAccess();
      readCookies();
    } else if (permission.state === 'prompt') {
      // User has not given permission, appends button to request user permission
      const button = document.createElement('button');
      button.innerText = 'Grant Access';
      button.onclick = async () => {
        await document.requestStorageAccess();
        readCookies();
      };
      document.body.appendChild(button);
    }
  }
}

function readCookies() {
  console.log('Reading cookies');

  const cookies = (document.cookie && document.cookie.split(';')) || [];
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

  const cookiesObj = cookies.reduce((obj, cookie) => {
    const [key, value] = cookie.split('=');

    return { ...obj, [key]: value };
  }, {});

  setBackground(cookiesObj.backgroundColor);
}

function setBackground(backgroundColor) {
  const el = document.querySelector('.cookies');

  if (backgroundColor && el) {
    el.style.backgroundColor = backgroundColor;
  }
}
