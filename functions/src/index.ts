import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { Resend } from "resend";

// Helper to turn tech IDs into pretty labels
const MAP_LABELS: Record<string, string> = {
  buisness_modern: "Universal Business",
  buisness_template2: "Clean Corporate",
  construction_template: "The Contractor",
  saas_template: "Modern Business Elite",
  single: "Standard Layout",
  double: "Dual-View Config",
  triple: "Elite-Tier Triple Layout"
};

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

    // Mapping fields to ensure no "undefined"
    const clientEmail = data.emailAddress || "";
    const clientName = data.businessName || "Partner"; 
    const templateLabel = MAP_LABELS[data.templateId] || "Custom Build";
    const configLabel = MAP_LABELS[data.layoutToggle] || "Standard Config";
    const totalDelta = data.total_addon_delta || 0;
    
    // Domain Summary (based on our previous updates)
    const domain1 = data.domainChoice || "TBD (Zach's Choice)";

    try {
      await resend.emails.send({
        from: "Zach Howell <zachary@zachhowell.dev>",
        to: [clientEmail],
        bcc: ["zachary@zachhowell.dev"],
        subject: `⚡ Project Confirmed: ${clientName} 48h Sprint Started!`,
        html: `
          <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #050505; color: #fafafa; padding: 60px 20px; text-align: center;">
              <div style="max-width: 600px; margin: 0 auto; background: #09090b; border: 1px solid #27272a; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
                  
                  <div style="padding: 40px 40px 20px 40px;">
                      <div style="display: inline-block; padding: 8px 16px; background: #616B59; border-radius: 99px; font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px;">Sprint Active</div>
                      <h1 style="font-size: 42px; font-weight: 900; line-height: 0.9; text-transform: uppercase; letter-spacing: -2px; margin: 0 0 16px 0;">Clock<br/>Started.</h1>
                      <p style="font-size: 16px; color: #a1a1aa; line-height: 1.5;">Hey ${clientName}, your onboarding is complete. I'm officially moving your project into the development queue.</p>
                  </div>

                  <div style="padding: 0 40px; text-align: left;">
                      <div style="background: #121214; border-radius: 16px; padding: 24px; border: 1px solid #1c1c1f;">
                          <table style="width: 100%; border-collapse: collapse;">
                              <tr>
                                  <td style="padding: 8px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800; letter-spacing: 1px;">Foundation</td>
                                  <td style="padding: 8px 0; font-size: 14px; text-align: right; font-weight: 600; color: #fff;">${templateLabel}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 8px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800; letter-spacing: 1px;">Configuration</td>
                                  <td style="padding: 8px 0; font-size: 14px; text-align: right; font-weight: 600; color: #fff;">${configLabel}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 8px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800; letter-spacing: 1px;">Primary Domain</td>
                                  <td style="padding: 8px 0; font-size: 14px; text-align: right; font-weight: 600; color: #fff;">${domain1}</td>
                              </tr>
                              <tr style="border-top: 1px solid #27272a;">
                                  <td style="padding: 16px 0 8px 0; font-size: 11px; text-transform: uppercase; color: #f59e0b; font-weight: 800; letter-spacing: 1px;">Premium Add-ons</td>
                                  <td style="padding: 16px 0 8px 0; font-size: 18px; text-align: right; font-weight: 900; color: #f59e0b;">$${totalDelta}</td>
                              </tr>
                          </table>
                      </div>
                  </div>

                  <div style="padding: 40px; text-align: left;">
                      <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #fff; margin-bottom: 12px;">What Happens Next?</h3>
                      <ul style="padding: 0; margin: 0; list-style: none; color: #71717a; font-size: 13px; line-height: 1.6;">
                          <li style="margin-bottom: 10px;">⚡ <strong>Development Phase:</strong> I am currently setting up your hosting and core architecture.</li>
                          <li style="margin-bottom: 10px;">📧 <strong>Asset Check:</strong> Ensure all high-res logos/photos are sent to <strong>zachary@zachhowell.dev</strong> or the easiest way is to reply to this email with them.</li>
                          <li>💳 <strong>Billing:</strong> If you selected premium add-ons, look for a separate Stripe invoice shortly.</li>
                      </ul>
                  </div>

                  <div style="padding: 30px 40px; border-top: 1px solid #1c1c1f; background: #0c0c0e; text-align: center;">
                      <p style="font-size: 12px; color: #52525b; margin: 0;">
                          Questions? Call or Text: <strong style="color: #a1a1aa;">262-341-7181</strong><br/>
                          <span style="font-style: italic; font-size: 10px;">You are receiving this because you initiated a 48h Sprint build.</span>
                      </p>
                  </div>
              </div>
          </div>
        `,
      });
      console.log(`Email sent successfully to ${clientEmail}`);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  }
);