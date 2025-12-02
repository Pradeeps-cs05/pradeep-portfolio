// api/contact.js  – Simple backend for your portfolio contact form on Vercel

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method Not Allowed" });
  }

  try {
    const { name, email, message } = req.body || {};

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        ok: false,
        message: "Please fill in name, email and message.",
      });
    }

    // Simple email check
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({
        ok: false,
        message: "Please enter a valid email address.",
      });
    }

    // For now, just log it on the server
    console.log("New portfolio contact:", { name, email, message });

    // Send success response
    return res.status(200).json({
      ok: true,
      message: "Message received successfully.",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong on the server.",
    });
  }
}
