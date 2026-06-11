const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sendContact = async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required." });
  }

  try {
    // Email to the business
    await transporter.sendMail({
      from: `"DSquare Website" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      subject: `New Enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px;">
          <h2 style="color: #B17457; border-bottom: 1px solid #eee; padding-bottom: 12px;">
            New Contact Enquiry — DSquare Designs
          </h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding:8px 0; font-weight:bold; width:120px;">Name</td><td>${name}</td></tr>
            <tr><td style="padding:8px 0; font-weight:bold;">Phone</td><td>${phone}</td></tr>
            ${email ? `<tr><td style="padding:8px 0; font-weight:bold;">Email</td><td>${email}</td></tr>` : ""}
            ${service ? `<tr><td style="padding:8px 0; font-weight:bold;">Service</td><td>${service}</td></tr>` : ""}
            ${message ? `<tr><td style="padding:8px 0; font-weight:bold; vertical-align:top;">Message</td><td>${message}</td></tr>` : ""}
          </table>
        </div>
      `,
    });

    // Auto-reply to the client (only if they gave an email)
    if (email) {
      await transporter.sendMail({
        from: `"DSquare Designs" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "We received your enquiry — DSquare Designs",
        html: `
          <div style="font-family: sans-serif; color: #333; max-width: 600px;">
            <h2 style="color: #B17457;">Thank you, ${name}!</h2>
            <p>We've received your enquiry and will get back to you within 24 hours.</p>
            <p style="color:#888; font-size:13px;">— Team DSquare Designs, Pune</p>
          </div>
        `,
      });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send failed:", err.message);
    res.status(500).json({ error: "Failed to send message. Please try again." });
  }
};

module.exports = { sendContact };
