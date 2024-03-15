# 🍪 CHIPS (Cookies Having Independent Partitioned State)

Is a privacy sandbox initiative to prevent the usage of third-party cookies for
cross-site tracking.

With chips, in order to be able to set a third-party cookie, the application needs
to provide a `Partitioned` attribute to the cookie. By using this parameter, cookies
will only be available at the host site where the cookie was set.

Check more details at the reference: https://developers.google.com/privacy-sandbox/3pcd/chips

## How to run

- Add the following lines to the `hosts` file:

```txt
127.0.0.1 sitea.com
127.0.0.1 siteb.com
127.0.0.1 sitec.com
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

- With third-party cookies enabled go to Site A and set a cookie using Site C (via the iframe)
- Check that the cookie set on Site A is also available when you navigate to Site B or Site C

#### 🧪 Third party cookies blocked

- With third-party cookies disabled go to Site A and set a cookie using Site C (via the iframe)
  - If you don't check the **Partitioned** checkbox, no cookie will be set
  - If you check the **Partitioned** checkbox, a cookie will be set
- Check that the cookie set on Site A is not available when you navigate to Site B or Site C

## Notes

- CHIPS only work using secure connections, so make sure to access the websites using `https`
