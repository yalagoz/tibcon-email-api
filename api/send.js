const nodemailer = require('nodemailer');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': 'https://webtibcon.web.app',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).set(headers).end();
    return;
  }

  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, subject, html, text } = req.body;

    // Validation
    if (!to || !subject) {
      return res.status(400).json({ error: 'Missing required fields: to, subject' });
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false, // Port 587 = STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false // Şirket sertifikası için
      }
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"TIBCON Enerji" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      text: text || '',
      html: html || ''
    });

    console.log('Email sent:', info.messageId);

    // Set headers manually for response
    Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    return res.status(200).json({ 
      success: true, 
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('Email error:', error);
    
    Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    return res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message 
    });
  }
};
