# Tibcon Email API

SMTP Email backend for TibconWeb application.

## Environment Variables (Vercel'de ayarlanacak)

```
SMTP_HOST=mail.tibcon.com.tr
SMTP_PORT=587
SMTP_USER=ted01@tibcon.com.tr
SMTP_PASS=şifreniz
```

## API Endpoint

**POST** `/api/send`

```json
{
  "to": "alici@email.com",
  "subject": "Email Başlığı",
  "html": "<h1>HTML içerik</h1>",
  "text": "Plain text içerik"
}
```

## Deploy

```bash
npm install -g vercel
vercel login
vercel --prod
```

## CORS

Sadece `https://webtibcon.web.app` adresinden istek kabul eder.
