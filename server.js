/**
 * NexaCore IT Solutions — server.js
 * Node.js + Express backend for contact form email
 *
 * ── SETUP INSTRUCTIONS ──
 *
 * 1. Install dependencies:
 *      npm install express nodemailer cors dotenv
 *
 * 2. Create a .env file in the same folder (see .env.example):
 *      SMTP_HOST=smtp.gmail.com
 *      SMTP_PORT=587
 *      SMTP_USER=your@gmail.com
 *      SMTP_PASS=your_app_password   <-- Gmail App Password (not your login password)
 *      MAIL_TO=hello@nexacore.in     <-- Where enquiries should land
 *      PORT=3001
 *
 * 3. For Gmail: enable 2-Step Verification, then create an App Password at
 *    https://myaccount.google.com/apppasswords
 *
 * 4. Run the server:
 *      node server.js
 *
 * 5. The form in script.js already points to http://localhost:3001/send-email
 *    For production, deploy this file (e.g. on Railway, Render, or a VPS)
 *    and update the fetch URL in script.js accordingly.
 */

require('dotenv').config();

const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');

const app  = express();
const PORT = process.env.PORT || 3001;
const DEFAULT_MAILBOX = 'tankuday9059@gmail.com';
const SMTP_USER = process.env.SMTP_USER || DEFAULT_MAILBOX;
const SMTP_PASS = process.env.SMTP_PASS;
const MAIL_TO = process.env.MAIL_TO || DEFAULT_MAILBOX;

// ── Middleware ──
app.use(express.json());
app.use(cors({
  // Edit this to your production domain when deploying
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://127.0.0.1:5501', 'http://localhost:5501', 'https://nexacore.in'],
}));

// ── Nodemailer transporter ──
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST || 'smtp.gmail.com',
  port:   parseInt(process.env.SMTP_PORT || '587'),
  secure: false,   // true for port 465, false for 587
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

// ── POST /send-email ──
app.post('/send-email', async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  // Basic server-side validation
  if (!name || !email || !service || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  if (!SMTP_PASS) {
    return res.status(500).json({
      error: 'SMTP_PASS is missing. Add your Gmail App Password in .env.',
    });
  }

  // Email content sent TO you (the company)
  const mailToCompany = {
    from:    `"SkyFleet Contact Form" <${SMTP_USER}>`,
    to:      MAIL_TO,
    replyTo: SMTP_USER,
    subject: `New Service Enquiry — ${service}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:2rem;background:#0d1117;color:#e8eaf0;border-radius:12px;">
        <h2 style="color:#00d4ff;margin-bottom:1.5rem;">New Enquiry from SkyFleet Website</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#8892a4;width:130px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#8892a4;">Email</td><td style="padding:8px 0;">${email}</td></tr>
          <tr><td style="padding:8px 0;color:#8892a4;">Phone</td><td style="padding:8px 0;">${phone || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#8892a4;">Service</td><td style="padding:8px 0;"><strong style="color:#00d4ff;">${service}</strong></td></tr>
        </table>
        <div style="margin-top:1.5rem;padding:1.25rem;background:#131a24;border-radius:8px;border-left:3px solid #00d4ff;">
          <p style="color:#8892a4;font-size:0.85rem;margin-bottom:0.5rem;">MESSAGE</p>
          <p style="white-space:pre-wrap;">${message}</p>
        </div>
        <p style="margin-top:2rem;font-size:0.75rem;color:#4a5568;">Sent from skyfleet contact form</p>
      </div>
    `,
  };

  // Auto-reply sent TO the enquirer
  const mailToClient = {
    from:    `"SkyFleet Technologies" <${SMTP_USER}>`,
    to:      email,
    replyTo: SMTP_USER,
    subject: `We've received your enquiry — SkyFleet`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:2rem;background:#0d1117;color:#e8eaf0;border-radius:12px;">
        <h2 style="color:#00d4ff;">Thanks for reaching out, ${name}!</h2>
        <p style="margin-top:1rem;color:#8892a4;">We've received your enquiry about <strong style="color:#e8eaf0;">${service}</strong> and our team will get back to you within <strong>1 business day</strong>.</p>
        <div style="margin-top:2rem;padding:1rem;background:#131a24;border-radius:8px;">
          <p style="color:#8892a4;font-size:0.85rem;">Your message:</p>
          <p style="white-space:pre-wrap;margin-top:0.5rem;">${message}</p>
        </div>
        <p style="margin-top:2rem;color:#8892a4;font-size:0.85rem;">If you have any urgent questions, you can reach us at <a href="mailto:${SMTP_USER}" style="color:#00d4ff;">${SMTP_USER}</a>.</p>
        <p style="margin-top:2rem;color:#4a5568;font-size:0.75rem;">© 2026 SkyFleet Technologies. All rights reserved.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailToCompany);
    await transporter.sendMail(mailToClient);
    return res.status(200).json({ message: 'Emails sent successfully.' });
  } catch (err) {
    console.error('Nodemailer error:', err);
    return res.status(500).json({ error: 'Failed to send email. Check server logs.' });
  }
});

// ── Health check ──
app.get('/', (req, res) => res.send('SkyFleet mail server is running.'));

app.listen(PORT, () => {
  console.log(`✅  Mail server running on http://localhost:${PORT}`);
});
