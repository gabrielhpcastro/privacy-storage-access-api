# 🍪 Storage Access API

Storage Access API makes it possible for websites to use third-party cookies when
embedded into an iframe by explicitly asking the user permission for that.

Check more details at the references:

- **Related website sets:** https://developers.google.com/privacy-sandbox/3pcd/related-website-sets
- **Related website sets guide:** https://developers.google.com/privacy-sandbox/3pcd/related-website-sets-integration
- **Storage Access API:** https://developers.google.com/privacy-sandbox/3pcd/storage-access-api

## How to run

- Add the following lines to the `hosts` file:

```txt
127.0.0.1 sitea.com
127.0.0.1 siteb.com
```

- Generate a self signed ssl certificate and save it at `reverseProxy/ssl`

```shell
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.crt
```

- Run the project with docker compose:

```shell
docker-compose up -d
```

## How to test

#### 🧪 Third party cookies allowed

- With third-party cookies enabled go to Site B and set a cookie called `backgroundColor` with a valid CSS color value
- Visit Site A and check that the cookie set on Site B is available to the iframe and the background color is applied

#### 🧪 Third party cookies blocked

- With third-party cookies enabled go to Site B and set a cookie called `backgroundColor` with a valid CSS color value
- Visit Site A and check that the cookie set on Site B is not available to the iframe and the background color is not applied
- Scroll the iframe to the bottom, click on the "Grant access" button and accept the prompt
- Check that once you allow the access to the Storage Access API, Site B is able to access its own cookies via the iframe
  and the background color is applied

#### 🧪 Third party cookies blocked (extra)

- Change the `backgroundColor` cookie value via the iframe on Site A
- Visit Site B and check that the cookie set via the iframe also applies to Site B

## Notes

- Storage Access API only work using secure connections, so make sure to access the websites using `https`
- If websites using the Storage Access API are within the same Related Websites Set, prompting the user is
  not required, access is granted by default
