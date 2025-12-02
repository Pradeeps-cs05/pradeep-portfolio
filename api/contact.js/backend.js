// api/contact.js – Vercel Function using the new fetch handler

export default {
  async fetch(request) {
    // Allow only POST
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ ok: false, message: "Method Not Allowed" }),
        {
          status: 405,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    try {
      let body = {};
      try {
        body = await request.json();
      } catch {
        // no / invalid JSON
      }

      const { name, email, message } = body || {};

      // Basic validation
      if (!name || !email || !message) {
        return new Response(
          JSON.stringify({
            ok: false,
            message: "Please fill in name, email and message.",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailPattern.test(email)) {
        return new Response(
          JSON.stringify({
            ok: false,
            message: "Please enter a valid email address.",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Just log for now (later we can add DB / email)
      console.log("New portfolio contact:", { name, email, message });

      return new Response(
        JSON.stringify({
          ok: true,
          message: "Message received successfully.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      console.error("Contact API error:", err);
      return new Response(
        JSON.stringify({
          ok: false,
          message: "Something went wrong on the server.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
};
