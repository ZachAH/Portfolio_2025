import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { Resend } from "resend";

// Helper to turn tech IDs into pretty labels.
// Keep in sync with src/data/templates.js `id` values.
const MAP_LABELS: Record<string, string> = {
  // ── Sprint / Authority templates ──
  "trades-scalable": "TradesPro // Contractor & Home Services",
  "modern-business-elite": "Modern Business Suite // Elite Edition",
  "Prescott-Legal": "Prescott // Law Firm & Legal Services",
  "Rusted-Fork": "Rusty Fork // Restaurant & Hospitality",
  "premium-business": "Premium Corporate // Business & Consulting",
  "Aura": "Aura // Luxury Real Estate & Interiors",
  "saas-obsidian": "Obsidian // SaaS & AI Startup",
  "Lakeside-Wellness": "Lakeside // Medical & Wellness Practice",
  "universal-business": "Universal Business // Starter Foundation",
  "the-foundry": "The Foundry // Industrial & Manufacturing",
  "Personal-Coach": "Influencer Pro // Personal Brand & Creator",
  "brutalist-creative": "Brutalist // Creative & Streetwear",
  "the-storyteller": "The Storyteller // Editorial & Magazine",
  // ── E-Commerce templates ──
  "refined-essentials": "Refined Essentials // Minimalist E-Commerce",
  "ironclad-ecom": "Ironclad // Brutalist E-Commerce",
  // ── Layout toggle options ──
  single: "Standard Layout",
  double: "Dual-View Config",
  triple: "Elite-Tier Triple Layout",
};

// Partnership plan display labels
const PARTNERSHIP_LABELS: Record<string, string> = {
  pilot: "The Pilot — $150/mo",
  navigator: "The Navigator — $450/mo",
  copilot: "The Co-Pilot — $950/mo",
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

    // ── BRANCH: Custom Build Discovery Inquiry ───────────────
    // The DiscoveryForm writes into the same Projects collection but
    // tags the doc with type === 'custom_inquiry'. These need a totally
    // different email (lead notification + client confirmation) since
    // they have no template, addons, or sprint clock.
    if (data.type === "custom_inquiry") {
      const inqEmail = data.email || data.emailAddress || "";
      const inqName = data.fullName || "there";
      const inqBusiness = data.businessName || "(no business name)";
      const inqProjectType = data.projectType || "Not specified";
      const inqBudget = data.budgetRange || "Not specified";
      const inqTimeline = data.timeline || "Not specified";
      const inqStage = data.businessStage || "Not specified";
      const inqVision = data.visionPitch || "(none provided)";
      const inqMustHaves = data.mustHaves || "(none provided)";
      const inqInspiration = data.inspiration || "(none provided)";
      const inqAudience = data.audience || "(none provided)";
      const inqAssets = data.hasAssets || "Not specified";
      const inqCallPref = data.callPreference || "Not specified";
      const inqAvailability = data.callAvailability || "(none provided)";
      const inqExtras = data.anythingElse || "(none provided)";
      const inqPhone = data.phone || "Not provided";

      try {
        // 1. Lead notification → me
        await resend.emails.send({
          from: "Zach Howell <zachary@zachhowell.dev>",
          to: ["zachary@zachhowell.dev"],
          replyTo: inqEmail,
          subject: `🛠 New Custom Build Inquiry: ${inqBusiness}`,
          html: `
            <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #050505; color: #fafafa; padding: 60px 20px;">
              <div style="max-width: 640px; margin: 0 auto; background: #09090b; border: 1px solid #27272a; border-radius: 24px; overflow: hidden;">
                <div style="padding: 40px;">
                  <div style="display: inline-block; padding: 8px 16px; background: #FF6B35; border-radius: 99px; font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px;">Custom Build Lead</div>
                  <h1 style="font-size: 32px; font-weight: 900; line-height: 1; text-transform: uppercase; letter-spacing: -1px; margin: 0 0 8px 0;">${inqBusiness}</h1>
                  <p style="font-size: 14px; color: #a1a1aa; margin: 0 0 24px 0;">From <strong style="color:#fff;">${inqName}</strong> · <a href="mailto:${inqEmail}" style="color:#FF6B35;">${inqEmail}</a> · ${inqPhone}</p>

                  <div style="background: #121214; border-radius: 16px; padding: 24px; border: 1px solid #1c1c1f; margin-bottom: 24px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr><td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800;">Project Type</td><td style="padding: 6px 0; font-size: 13px; text-align: right; color: #fff;">${inqProjectType}</td></tr>
                      <tr><td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800;">Budget</td><td style="padding: 6px 0; font-size: 13px; text-align: right; color: #fff;">${inqBudget}</td></tr>
                      <tr><td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800;">Timeline</td><td style="padding: 6px 0; font-size: 13px; text-align: right; color: #fff;">${inqTimeline}</td></tr>
                      <tr><td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800;">Business Stage</td><td style="padding: 6px 0; font-size: 13px; text-align: right; color: #fff;">${inqStage}</td></tr>
                      <tr><td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800;">Has Assets</td><td style="padding: 6px 0; font-size: 13px; text-align: right; color: #fff;">${inqAssets}</td></tr>
                      <tr><td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800;">Call Preference</td><td style="padding: 6px 0; font-size: 13px; text-align: right; color: #fff;">${inqCallPref}</td></tr>
                    </table>
                  </div>

                  <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #FF6B35; margin: 24px 0 8px 0;">The Vision</h3>
                  <p style="font-size: 13px; color: #d4d4d8; line-height: 1.6; margin: 0 0 16px 0; white-space: pre-wrap;">${inqVision}</p>

                  <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #FF6B35; margin: 24px 0 8px 0;">Must-Haves</h3>
                  <p style="font-size: 13px; color: #d4d4d8; line-height: 1.6; margin: 0 0 16px 0; white-space: pre-wrap;">${inqMustHaves}</p>

                  <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #FF6B35; margin: 24px 0 8px 0;">Audience</h3>
                  <p style="font-size: 13px; color: #d4d4d8; line-height: 1.6; margin: 0 0 16px 0;">${inqAudience}</p>

                  <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #FF6B35; margin: 24px 0 8px 0;">Inspiration</h3>
                  <p style="font-size: 13px; color: #d4d4d8; line-height: 1.6; margin: 0 0 16px 0; white-space: pre-wrap;">${inqInspiration}</p>

                  <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #FF6B35; margin: 24px 0 8px 0;">Availability</h3>
                  <p style="font-size: 13px; color: #d4d4d8; line-height: 1.6; margin: 0 0 16px 0; white-space: pre-wrap;">${inqAvailability}</p>

                  <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #FF6B35; margin: 24px 0 8px 0;">Anything Else</h3>
                  <p style="font-size: 13px; color: #d4d4d8; line-height: 1.6; margin: 0 0 24px 0; white-space: pre-wrap;">${inqExtras}</p>
                </div>
              </div>
            </div>
          `,
        });

        // 2. Confirmation → client (only if we have a valid-looking email)
        if (inqEmail && inqEmail.includes("@")) {
          await resend.emails.send({
            from: "Zach Howell <zachary@zachhowell.dev>",
            to: [inqEmail],
            bcc: ["zachary@zachhowell.dev"],
            subject: `Discovery received — let's build ${inqBusiness}`,
            html: `
              <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #050505; color: #fafafa; padding: 60px 20px; text-align: center;">
                <div style="max-width: 600px; margin: 0 auto; background: #09090b; border: 1px solid #27272a; border-radius: 24px; overflow: hidden;">
                  <div style="padding: 48px 40px 24px 40px;">
                    <div style="display: inline-block; padding: 8px 16px; background: #FF6B35; border-radius: 99px; font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px;">Discovery Received</div>
                    <h1 style="font-size: 38px; font-weight: 900; line-height: 0.95; text-transform: uppercase; letter-spacing: -1.5px; margin: 0 0 16px 0;">Got it,<br/>${inqName}.</h1>
                    <p style="font-size: 15px; color: #a1a1aa; line-height: 1.6;">Thanks for taking the time to share your vision for <strong style="color:#fff;">${inqBusiness}</strong>. I've received your discovery details and they're sitting in my inbox.</p>
                  </div>

                  <div style="padding: 0 40px 24px 40px; text-align: left;">
                    <div style="background: #121214; border-radius: 16px; padding: 24px; border: 1px solid #1c1c1f;">
                      <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #FF6B35; margin: 0 0 16px 0;">What Happens Next</h3>
                      <ul style="padding: 0 0 0 18px; margin: 0; color: #a1a1aa; font-size: 13px; line-height: 1.7;">
                        <li style="margin-bottom: 8px;"><strong style="color:#fff;">Within 24 hours:</strong> I'll personally review your vision and reply.</li>
                        <li style="margin-bottom: 8px;"><strong style="color:#fff;">Schedule a call:</strong> We'll lock in a 30-min ${inqCallPref === "teams" ? "Microsoft Teams" : inqCallPref === "phone" ? "phone" : "Zoom"} call to dig in.</li>
                        <li><strong style="color:#fff;">Tailored proposal:</strong> After the call, I'll send fixed pricing and a clear timeline.</li>
                      </ul>
                    </div>
                  </div>

                  <div style="padding: 24px 40px 40px 40px; text-align: center;">
                    <p style="font-size: 12px; color: #71717a; margin: 0 0 8px 0; font-style: italic;">No commitments, no pressure. Discovery is always free.</p>
                  </div>

                  <div style="padding: 24px 40px; border-top: 1px solid #1c1c1f; background: #0c0c0e; text-align: center;">
                    <p style="font-size: 12px; color: #52525b; margin: 0;">
                      Need to reach me sooner? <strong style="color: #a1a1aa;">262-341-7181</strong>
                    </p>
                  </div>
                </div>
              </div>
            `,
          });
        }
        console.log(`Custom inquiry email flow complete for ${inqEmail}`);
      } catch (error) {
        console.error("Failed to send custom inquiry email:", error);
      }
      return; // ⛔ Skip the sprint email path below
    }

    // Mapping fields to ensure no "undefined"
    const clientEmail = data.emailAddress || "";
    const clientName = data.businessName || "Partner";
    const templateLabel = MAP_LABELS[data.templateId] || data.templateId || "Custom Build";
    const configLabel = MAP_LABELS[data.layoutToggle] || "Standard Config";
    const totalDelta = data.total_addon_delta || 0;
    const partnershipPlan = data.partnershipPlan || "none";
    const partnershipLabel = PARTNERSHIP_LABELS[partnershipPlan] || "";

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
                              ${partnershipPlan !== "none" ? `
                              <tr style="border-top: 1px solid #27272a;">
                                  <td style="padding: 16px 0 8px 0; font-size: 11px; text-transform: uppercase; color: #a78bfa; font-weight: 800; letter-spacing: 1px;">Partnership Plan</td>
                                  <td style="padding: 16px 0 8px 0; font-size: 14px; text-align: right; font-weight: 700; color: #a78bfa;">${partnershipLabel}</td>
                              </tr>` : ""}
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
                          <li style="margin-bottom: 10px;">📧 <strong>Asset Check:</strong> Ensure all high-res logos/photos are sent to <a href="mailto:zachary@zachhowell.dev" style="color: #FF6B35; text-decoration: none; font-weight: 600;">zachary@zachhowell.dev</a> or the easiest way is to reply to this email with them.</li>
                          <li style="margin-bottom: 10px;">💳 <strong>Billing:</strong> If you selected premium add-ons, look for a separate Stripe invoice shortly.</li>
                          ${partnershipPlan !== "none" ? `<li>🤝 <strong>Partnership:</strong> Your <strong style="color: #a78bfa;">${partnershipLabel}</strong> subscription link will be sent once your site is live — no charge until launch day.</li>` : ""}
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