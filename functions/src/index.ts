import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { Resend } from "resend";

export const sendOnboardingEmail = onDocumentCreated(
  {
    document: "Projects/{projectId}",
    secrets: ["RESEND_API_KEY"],
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) return;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = snapshot.data();
    const clientEmail = data.emailAddress;
    const businessName = data.businessName;
    const totalDelta = data.total_addon_delta || 0;

    try {
      await resend.emails.send({
        from: "Zach Howell <zach@zachhowell.dev>",
        to: [clientEmail],
        bcc: ["zach@zachhowell.dev"],
        subject: `⚡ Project Confirmed: ${businessName} 48h Sprint Started!`,
        html: `
          <div style="font-family: sans-serif; background: #09090b; color: #ffffff; padding: 40px; border-radius: 20px;">
              <h1 style="text-transform: uppercase; letter-spacing: -1px;">Clock Started.</h1>
              <p style="color: #a1a1aa;">Hey ${businessName}, your onboarding is officially complete.</p>
              <hr style="border: 0; border-top: 1px solid #27272a; margin: 20px 0;" />
              <p><strong>Foundation:</strong> ${data.templateId}</p>
              <p><strong>Config:</strong> ${data.layoutToggle}</p>
              <p style="color: #f59e0b;"><strong>Premium Delta:</strong> $${totalDelta}</p>
              <p style="font-size: 12px; color: #71717a; margin-top: 30px;">
                  Thank you so much for your business, I am so excited to work with you and bring your vision to life. If you added premium configuration additions expect a stripe invoice shortly. If you have any questions or want to chat about the project, just hit reply on this email or give me a call 262-341-7181. Talk soon!
              </p>
          </div>
        `,
      });
      console.log(`Email sent successfully to ${clientEmail}`);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  }
);