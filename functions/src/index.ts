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
    // ── BRANCH: Free Website Audit Request ────────────────
    if (data.type === "website_audit") {
      const auditEmail = data.email || "";
      const auditName = data.name || "Someone";
      const auditUrl = data.websiteUrl || "(no URL provided)";

      try {
        // 1. Lead notification → me
        await resend.emails.send({
          from: "Zach Howell <zachary@zachhowell.dev>",
          to: ["zachary@zachhowell.dev"],
          replyTo: auditEmail,
          subject: `🔍 Free Audit Request: ${auditUrl}`,
          html: `
            <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #050505; color: #fafafa; padding: 60px 20px;">
              <div style="max-width: 640px; margin: 0 auto; background: #09090b; border: 1px solid #27272a; border-radius: 24px; overflow: hidden;">
                <div style="padding: 40px;">
                  <div style="display: inline-block; padding: 8px 16px; background: #FF6B35; border-radius: 99px; font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px;">Website Audit</div>
                  <h1 style="font-size: 28px; font-weight: 900; line-height: 1.1; text-transform: uppercase; letter-spacing: -1px; margin: 0 0 24px 0;">New Audit Request</h1>

                  <div style="background: #121214; border-radius: 16px; padding: 24px; border: 1px solid #1c1c1f; margin-bottom: 24px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800;">Website</td>
                        <td style="padding: 8px 0; font-size: 14px; text-align: right;"><a href="${auditUrl}" style="color: #FF6B35; text-decoration: none; font-weight: 600;">${auditUrl}</a></td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800;">Name</td>
                        <td style="padding: 8px 0; font-size: 14px; text-align: right; color: #fff;">${auditName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800;">Email</td>
                        <td style="padding: 8px 0; font-size: 14px; text-align: right;"><a href="mailto:${auditEmail}" style="color: #FF6B35; text-decoration: none;">${auditEmail}</a></td>
                      </tr>
                    </table>
                  </div>

                  <p style="font-size: 13px; color: #71717a; margin: 0;">Hit <strong style="color: #a1a1aa;">Reply</strong> to respond directly to ${auditName}.</p>
                </div>
              </div>
            </div>
          `,
        });

        // 2. Confirmation → customer
        if (auditEmail && auditEmail.includes("@")) {
          await resend.emails.send({
            from: "Zach Howell <zachary@zachhowell.dev>",
            to: [auditEmail],
            bcc: ["zachary@zachhowell.dev"],
            subject: `Your free website audit is on the way`,
            html: `
              <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #050505; color: #fafafa; padding: 60px 20px; text-align: center;">
                <div style="max-width: 600px; margin: 0 auto; background: #09090b; border: 1px solid #27272a; border-radius: 24px; overflow: hidden;">
                  <div style="padding: 48px 40px 24px 40px;">
                    <div style="display: inline-block; padding: 8px 16px; background: #FF6B35; border-radius: 99px; font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px;">Audit Received</div>
                    <h1 style="font-size: 38px; font-weight: 900; line-height: 0.95; text-transform: uppercase; letter-spacing: -1.5px; margin: 0 0 16px 0;">Got it,<br/>${auditName}.</h1>
                    <p style="font-size: 15px; color: #a1a1aa; line-height: 1.6;">I've received your audit request for <strong style="color:#fff;">${auditUrl}</strong> and it's in my queue.</p>
                  </div>

                  <div style="padding: 0 40px 24px 40px; text-align: left;">
                    <div style="background: #121214; border-radius: 16px; padding: 24px; border: 1px solid #1c1c1f;">
                      <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #FF6B35; margin: 0 0 16px 0;">What I'll Review</h3>
                      <ul style="padding: 0 0 0 18px; margin: 0; color: #a1a1aa; font-size: 13px; line-height: 1.7;">
                        <li style="margin-bottom: 8px;"><strong style="color:#fff;">Performance & Speed:</strong> PageSpeed score, load times, and Core Web Vitals.</li>
                        <li style="margin-bottom: 8px;"><strong style="color:#fff;">SEO Health:</strong> Meta tags, heading structure, schema markup, and indexability.</li>
                        <li style="margin-bottom: 8px;"><strong style="color:#fff;">Mobile & Accessibility:</strong> Responsiveness, tap targets, contrast, and WCAG compliance.</li>
                        <li style="margin-bottom: 8px;"><strong style="color:#fff;">Security:</strong> SSL enforcement, mixed content, and vulnerability flags.</li>
                        <li><strong style="color:#fff;">Conversion Readiness:</strong> CTA placement, trust signals, and user flow.</li>
                      </ul>
                    </div>
                  </div>

                  <div style="padding: 24px 40px 40px 40px; text-align: center;">
                    <p style="font-size: 14px; color: #fff; font-weight: 700; margin: 0 0 4px 0;">Expect your report within 48 hours.</p>
                    <p style="font-size: 12px; color: #71717a; margin: 0; font-style: italic;">No strings attached — if your site is already solid, I'll tell you that too.</p>
                  </div>

                </div>
              </div>
            `,
          });
        }

        console.log(`Audit email flow complete for ${auditUrl}`);
      } catch (error) {
        console.error("Failed to send audit email:", error);
      }
      return;
    }

    // ── BRANCH: Custom Build Discovery Inquiry ───────────────
    if (data.type === "custom_inquiry") {
      const inqEmail = data.email || data.emailAddress || "";
      const inqName = data.fullName || "there";
      const inqBusiness = data.businessName || "(no business name)";
      const inqSummary =
        data.howCanIHelp ||
        data.projectSummary ||
        data.visionPitch ||
        "(none provided)";
      const inqPhone = data.phone || "Not provided";
      const inqSourcePage = data.sourcePage || "";
      const inqServiceArea = data.serviceArea || "";

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
                      <tr><td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800;">Business</td><td style="padding: 6px 0; font-size: 13px; text-align: right; color: #fff;">${inqBusiness}</td></tr>
                      <tr><td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800;">Name</td><td style="padding: 6px 0; font-size: 13px; text-align: right; color: #fff;">${inqName}</td></tr>
                      <tr><td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800;">Email</td><td style="padding: 6px 0; font-size: 13px; text-align: right;"><a href="mailto:${inqEmail}" style="color:#FF6B35; text-decoration: none;">${inqEmail}</a></td></tr>
                      <tr><td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800;">Phone</td><td style="padding: 6px 0; font-size: 13px; text-align: right; color: #fff;">${inqPhone}</td></tr>
                      <tr><td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800;">Service Area</td><td style="padding: 6px 0; font-size: 13px; text-align: right; color: #fff;">${inqServiceArea || "General inquiry"}</td></tr>
                      <tr><td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; color: #52525b; font-weight: 800;">Source Page</td><td style="padding: 6px 0; font-size: 13px; text-align: right; color: #fff;">${inqSourcePage || "/custom-discovery"}</td></tr>
                    </table>
                  </div>

                  <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #FF6B35; margin: 24px 0 8px 0;">How Can I Help?</h3>
                  <p style="font-size: 13px; color: #d4d4d8; line-height: 1.6; margin: 0 0 24px 0; white-space: pre-wrap;">${inqSummary}</p>
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
                        <li style="margin-bottom: 8px;"><strong style="color:#fff;">Within 24 hours:</strong> I'll personally review your request and reply.</li>
                        <li style="margin-bottom: 8px;"><strong style="color:#fff;">Fast follow-up:</strong> If needed, I'll suggest a call or send a few scoping questions by email.</li>
                        <li><strong style="color:#fff;">Clear next step:</strong> You'll get either a recommendation, a quote range, or a path to a proper proposal.</li>
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
        subject: `⚡ Project Confirmed: ${clientName} 72h Sprint Started!`,
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
                          <li style="margin-bottom: 10px;">⚡ <strong>Development Phase:</strong> I am currently building and deploying your site.</li>
                          <li style="margin-bottom: 10px;">📧 <strong>Asset Check:</strong> Ensure all high-res logos/photos are sent to <a href="mailto:zachary@zachhowell.dev" style="color: #FF6B35; text-decoration: none; font-weight: 600;">zachary@zachhowell.dev</a> or the easiest way is to reply to this email with them.</li>
                          <li style="margin-bottom: 10px;">🌐 <strong>Domain Handoff:</strong> Make sure you have a <strong style="color: #fff;">Porkbun</strong> account ready — I'll push your domain to your account after launch so you own it outright.</li>
                          <li style="margin-bottom: 10px;">🚀 <strong>Hosting Transfer:</strong> Make sure you have a <strong style="color: #fff;">Netlify</strong> account ready — I'll transfer your live site to your dashboard so you control the production environment.</li>
                          <li style="margin-bottom: 10px;">💳 <strong>Billing:</strong> If you selected premium add-ons, look for a separate Stripe invoice shortly.</li>
                          ${partnershipPlan !== "none" ? `<li>🤝 <strong>Partnership:</strong> Your <strong style="color: #a78bfa;">${partnershipLabel}</strong> subscription link will be sent once your site is live — no charge until launch day.</li>` : ""}
                      </ul>
                  </div>

                  <div style="padding: 30px 40px; border-top: 1px solid #1c1c1f; background: #0c0c0e; text-align: center;">
                      <p style="font-size: 12px; color: #52525b; margin: 0;">
                          Questions? Call or Text: <strong style="color: #a1a1aa;">262-341-7181</strong><br/>
                          <span style="font-style: italic; font-size: 10px;">You are receiving this because you initiated a 72h Sprint build.</span>
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
