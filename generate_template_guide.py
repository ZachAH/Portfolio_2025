#!/usr/bin/env python3
"""Generate the Template Price Guide PDF — white theme matching the original."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, black, white
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak,
    KeepTogether
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER

# ── COLORS ──
ORANGE = HexColor("#FF6B35")
DARK = HexColor("#1a1a1a")
GRAY = HexColor("#555555")
GRAY_LIGHT = HexColor("#888888")
BORDER = HexColor("#dddddd")
BG_LIGHT = HexColor("#f8f8f8")
BG_ORANGE_LIGHT = HexColor("#FFF3ED")
BORDER_ORANGE = HexColor("#FFD4BF")

OUTPUT = "src/assets/PriceGuides/Template_Price_Guide.pdf"
WIDTH, HEIGHT = letter


def draw_footer(canvas_obj, doc):
    canvas_obj.saveState()
    canvas_obj.setFillColor(GRAY_LIGHT)
    canvas_obj.setFont("Helvetica", 7)
    canvas_obj.drawCentredString(WIDTH / 2, 30, "zachhowell.dev  |  zachary@zachhowell.dev  |  New Berlin, WI")
    canvas_obj.restoreState()


def build_pdf():
    doc = SimpleDocTemplate(
        OUTPUT, pagesize=letter,
        topMargin=0.6 * inch, bottomMargin=0.7 * inch,
        leftMargin=0.75 * inch, rightMargin=0.75 * inch,
    )

    # ── STYLES ──
    s_title = ParagraphStyle("Title", fontName="Helvetica-Bold", fontSize=24, textColor=DARK, spaceAfter=12)
    s_subtitle = ParagraphStyle("Subtitle", fontName="Helvetica-Bold", fontSize=13, textColor=DARK, spaceAfter=10)
    s_body = ParagraphStyle("Body", fontName="Helvetica", fontSize=10, textColor=GRAY, leading=15, spaceAfter=8)
    s_body_bold = ParagraphStyle("BodyBold", fontName="Helvetica-Bold", fontSize=10, textColor=DARK, leading=15, spaceAfter=8)
    s_section = ParagraphStyle("Section", fontName="Helvetica-Bold", fontSize=18, textColor=DARK, spaceBefore=14, spaceAfter=4)
    s_section_sub = ParagraphStyle("SectionSub", fontName="Helvetica-Bold", fontSize=12, textColor=DARK, spaceBefore=14, spaceAfter=6)
    s_bullet = ParagraphStyle("Bullet", fontName="Helvetica", fontSize=10, textColor=GRAY, leading=15, leftIndent=20, spaceAfter=4)
    s_note = ParagraphStyle("Note", fontName="Helvetica-Oblique", fontSize=8.5, textColor=GRAY_LIGHT, spaceAfter=8, spaceBefore=6)
    s_guarantee = ParagraphStyle("Guarantee", fontName="Helvetica-Bold", fontSize=10, textColor=ORANGE, alignment=TA_CENTER, leading=14)
    s_tos_head = ParagraphStyle("TOSHead", fontName="Helvetica-Bold", fontSize=8, textColor=DARK, spaceBefore=8, spaceAfter=2)
    s_tos_body = ParagraphStyle("TOSBody", fontName="Helvetica", fontSize=7.5, textColor=GRAY, leading=11, spaceAfter=4)
    s_tag = ParagraphStyle("Tag", fontName="Helvetica-Bold", fontSize=10, textColor=ORANGE, spaceAfter=0)

    story = []

    def divider():
        t = Table([[""]], colWidths=[doc.width])
        t.setStyle(TableStyle([
            ("LINEBELOW", (0, 0), (-1, -1), 0.5, BORDER),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ]))
        return t

    # ══════════════════════════════════════════════════════════
    # PAGE 1
    # ══════════════════════════════════════════════════════════
    story.append(Paragraph("Zach Howell — Web &amp; Digital Solutions", s_title))
    story.append(Paragraph("High-Performance Launch: Template-Based Packages", s_subtitle))
    story.append(Paragraph(
        'Get a pro-level digital presence without the 4-week wait. These aren\'t "drag-and-drop" builders — '
        'these are high-end foundations built with <b>React, TypeScript, Vite, and Framer Motion</b>. '
        'Professional aesthetics, elite performance, and a site that\'s live in days, not months.',
        s_body
    ))

    # Launch pricing banner
    banner_data = [[Paragraph(
        '<b>Launch Pricing</b> — The $700 introductory rate locks in through <b>May 10, 2026</b>.',
        ParagraphStyle("Banner", fontName="Helvetica-Bold", fontSize=10, textColor=ORANGE, alignment=TA_CENTER)
    )]]
    banner = Table(banner_data, colWidths=[doc.width - 40])
    banner.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BG_ORANGE_LIGHT),
        ("BOX", (0, 0), (-1, -1), 1, BORDER_ORANGE),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ("LEFTPADDING", (0, 0), (-1, -1), 16),
        ("RIGHTPADDING", (0, 0), (-1, -1), 16),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
    ]))
    story.append(Spacer(1, 10))
    story.append(banner)

    # Tier table
    story.append(Paragraph("Select Your Launch Tier", s_section))
    th = ParagraphStyle("TH", fontName="Helvetica-Bold", fontSize=9, textColor=DARK)
    td = ParagraphStyle("TD", fontName="Helvetica", fontSize=9.5, textColor=DARK, leading=13)
    td_bold = ParagraphStyle("TDB", fontName="Helvetica-Bold", fontSize=9.5, textColor=DARK, leading=13)

    tier_data = [
        [Paragraph("<b>Package</b>", th), Paragraph("<b>Investment</b>", th), Paragraph("<b>Turnaround</b>", th), Paragraph("<b>Best For...</b>", th)],
        [Paragraph("The 48h Sprint", td_bold), Paragraph("$700", td), Paragraph("48 Hours", td), Paragraph("Service pros and contractors needing immediate market presence.", td)],
        [Paragraph("Modern Edge", td_bold), Paragraph("$900", td), Paragraph("72 Hours", td), Paragraph("Brands needing high-impact UI and complex motion logic.", td)],
        [Paragraph("Commerce Launch", td_bold), Paragraph("$1,900", td), Paragraph("7 Days", td), Paragraph("Brands selling physical or digital products via Stripe.", td)],
    ]
    tier_table = Table(tier_data, colWidths=[doc.width * 0.22, doc.width * 0.18, doc.width * 0.18, doc.width * 0.42])
    tier_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), BG_LIGHT),
        ("LINEBELOW", (0, 0), (-1, 0), 1, DARK),
        ("LINEBELOW", (0, 1), (-1, -1), 0.5, BORDER),
        ("BOX", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(tier_table)
    story.append(Spacer(1, 10))

    # Sprint
    story.append(Paragraph('The 48h Sprint — $700 <font color="#FF6B35">[MOST POPULAR]</font>', s_section))
    story.append(Paragraph(
        '<i>Velocity as a Service.</i> I take your selected foundation and transform it into a high-performance, '
        'live brand in exactly 48 hours. One fixed price — no hidden fees, no recurring charges.',
        s_body
    ))
    story.append(Paragraph("What's Included:", s_body_bold))
    for b in [
        "Full Source Code Ownership — yours on day one",
        "Brand DNA &amp; Asset Integration",
        "White-Glove DNS &amp; Infrastructure Setup",
        "Domain pushed to your Porkbun account, site transferred to your Netlify dashboard",
        "2-Day Deployment Guaranteed",
        "Local SEO Metadata Injection",
        "Google PageSpeed 90+ Score Guaranteed",
    ]:
        story.append(Paragraph(f"•  {b}", s_bullet))

    story.append(Paragraph("What's NOT Included:", s_body_bold))
    for b in [
        "Custom feature development",
        "Ongoing hosting (available via Growth Plans)",
        "Stock photography or copywriting",
    ]:
        story.append(Paragraph(f"•  {b}", s_bullet))

    # Guarantee banner
    g_data = [[Paragraph(
        "48-hour deadline or double credit back. 90+ Google PageSpeed score or full refund.",
        s_guarantee
    )]]
    g_table = Table(g_data, colWidths=[doc.width - 40])
    g_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BG_ORANGE_LIGHT),
        ("BOX", (0, 0), (-1, -1), 1, BORDER_ORANGE),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    story.append(Spacer(1, 6))
    story.append(g_table)

    # ══════════════════════════════════════════════════════════
    # PAGE 2 (flows naturally)
    # ══════════════════════════════════════════════════════════

    # Modern Edge
    story.append(Paragraph("Modern Edge — $900", s_section))
    story.append(Paragraph(
        "For brands that need to command attention. High-impact UI paired with complex motion logic "
        "to establish immediate market authority.",
        s_body
    ))
    story.append(Paragraph("What's Included:", s_body_bold))
    for b in ["Elite Source Code Access", "Aggressive GSAP Motion Engine", "GA4 &amp; Search Console Infrastructure",
              "Technical SEO &amp; Core Web Vitals Audit", "Advanced Brand DNA Sculpting"]:
        story.append(Paragraph(f"•  {b}", s_bullet))

    story.append(Paragraph("What's NOT Included:", s_body_bold))
    for b in ["E-commerce / payment integration", "Ongoing hosting (available via Growth Plans)"]:
        story.append(Paragraph(f"•  {b}", s_bullet))

    story.append(divider())

    # Commerce Launch
    story.append(Paragraph("Commerce Launch — $1,900", s_section))
    story.append(Paragraph(
        "A secure revenue machine. I'll deploy your full shop with functional cart and inventory logic.",
        s_body
    ))
    story.append(Paragraph("What's Included:", s_body_bold))
    for b in ["Choice of Elite E-Com Foundation", "Strategic Inventory &amp; SKU Setup",
              "Secure Stripe Merchant Integration", "Conversion-First Checkout Flow",
              "7-Day Post-Launch Support Window"]:
        story.append(Paragraph(f"•  {b}", s_bullet))

    story.append(Paragraph(
        '<b>Collaboration Note:</b> Because we are dealing with financial accounts and payment processing, '
        'the Commerce Launch requires a <b>7-day window</b>. I work closely with you to verify your Stripe identity, '
        'set up bank transfers, and configure live shipping rates to ensure your security.',
        ParagraphStyle("Note2", fontName="Helvetica", fontSize=9, textColor=GRAY, leading=13, spaceAfter=8, spaceBefore=6)
    ))

    story.append(divider())

    # 48-Hour Roadmap
    story.append(Paragraph("Your 48-Hour Roadmap", s_section))
    story.append(Paragraph(
        "Every hour is accounted for. Speed isn't cutting corners — it's the result of a refined, "
        "specialized system built to deliver professional results on a predictable timeline.",
        s_body
    ))

    roadmap_data = [
        [Paragraph("<b>Stage</b>", th), Paragraph("<b>Timeframe</b>", th), Paragraph("<b>What Happens</b>", th)],
        [Paragraph("Onboarding", td_bold), Paragraph("Hour 0 - 4", td), Paragraph("Intake form, brand asset audit, and initial brief confirmation.", td)],
        [Paragraph("Development", td_bold), Paragraph("Hour 4 - 24", td), Paragraph("Template customization, content integration, SEO infrastructure, and DNS setup.", td)],
        [Paragraph("Review", td_bold), Paragraph("Hour 24 - 36", td), Paragraph("Live preview link for your feedback. Consolidated revision requests.", td)],
        [Paragraph("Deployment", td_bold), Paragraph("Hour 36 - 48", td), Paragraph("Domain connection, final QA, and your site goes live worldwide.", td)],
    ]
    roadmap = Table(roadmap_data, colWidths=[doc.width * 0.18, doc.width * 0.18, doc.width * 0.64])
    roadmap.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), BG_LIGHT),
        ("LINEBELOW", (0, 0), (-1, 0), 1, DARK),
        ("LINEBELOW", (0, 1), (-1, -1), 0.5, BORDER),
        ("BOX", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(roadmap)

    # ══════════════════════════════════════════════════════════
    # PAGE 3
    # ══════════════════════════════════════════════════════════
    story.append(PageBreak())

    story.append(Paragraph('Why a "Zach Howell" Build Is Different', s_section))
    story.append(Paragraph("Why $700 — Not $200?", s_section_sub))
    story.append(Paragraph(
        'A $200 website uses bloated page builders with slow load times, missing metadata, and zero SEO — '
        'leaving you with technical debt that costs more to fix than it did to build. The 48h Sprint delivers a '
        'hand-coded React/TypeScript site with professional DNS configuration, secure infrastructure, and a '
        'guaranteed 90+ PageSpeed score — the same foundation agencies charge $3,000+ for.',
        s_body
    ))
    for label, desc in [
        ("Velocity as a Service:", "I take your selected foundation and transform it into a high-performance brand in as little as 48 hours."),
        ("Aggressive Performance:", "Every site is tuned for Core Web Vitals and utilizes engines like GSAP for high-impact motion."),
        ("Full Ownership:", 'Once launched, you own the code. No monthly "platform fees" just to exist (unlike Shopify or Wix).'),
        ("Infrastructure &amp; SEO:", "I handle the domain routing, SSL security, CDN, and Local SEO Metadata Injection out of the box."),
    ]:
        story.append(Paragraph(f"•  <b>{label}</b> {desc}", s_bullet))

    story.append(divider())

    # White-Glove Deployment — UPDATED FOR PORKBUN/NETLIFY
    story.append(Paragraph("White-Glove Deployment — Everything Included", s_section))
    story.append(Paragraph(
        "Buying a template package isn't just buying code. I personally handle the domain, hosting, DNS, "
        "deployment, and brand integration — you get a fully-live website, not a zip file.",
        s_body
    ))
    for label, desc in [
        ("Domain Purchase (Porkbun):", 'I register your .com (or .whatever) and after launch, I "push" the domain to your Porkbun account. You own it outright and handle the annual renewal (~$10-$15/yr).'),
        ("Hosting &amp; Deployment (Netlify):", "Production-grade hosting configured with SSL and CDN. After launch, I transfer the site to your Netlify dashboard so you own the production environment."),
        ("DNS &amp; CNAME Config:", "A-records, CNAMEs, email forwarding, www redirects — I handle every knob."),
        ("Full Deployment:", "Code written, branded, optimized, and pushed live. No handoff headaches."),
        ("Local SEO Metadata:", "Schema, Open Graph, sitemap, and Google Search Console baked in."),
        ("Source Code Ownership:", "You keep 100% of the code on launch day. Zero vendor lock-in, ever."),
    ]:
        story.append(Paragraph(f"•  <b>{label}</b> {desc}", s_bullet))

    story.append(Spacer(1, 4))
    # Client action callout
    action_data = [[Paragraph(
        '<b>Action Required:</b> To ensure a smooth handoff, please create free accounts at '
        '<b>Porkbun.com</b> (for your domain) and <b>Netlify.com</b> (for your hosting) before or during onboarding. '
        'I will transfer full ownership of both to your accounts after launch.',
        ParagraphStyle("Action", fontName="Helvetica", fontSize=9, textColor=ORANGE, leading=13, alignment=TA_CENTER)
    )]]
    action_table = Table(action_data, colWidths=[doc.width - 40])
    action_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BG_ORANGE_LIGHT),
        ("BOX", (0, 0), (-1, -1), 1, BORDER_ORANGE),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
    ]))
    story.append(action_table)

    story.append(divider())

    # Growth Plans
    story.append(Paragraph("Optional Growth Plans", s_section))
    story.append(Paragraph("<i>Peace of mind and active scaling for your digital assets.</i>", s_body))

    story.append(Paragraph("The Pilot — $150/mo", s_section_sub))
    story.append(Paragraph('<i>Peace of mind for business owners who want their site "always on."</i>', s_body))
    for b in ["24/7 Uptime Monitor", "Hosting &amp; DNS Management", "Security Patching", "1 Expert Hour / month for updates"]:
        story.append(Paragraph(f"•  {b}", s_bullet))

    story.append(Paragraph("The Navigator — $450/mo", s_section_sub))
    story.append(Paragraph("<i>Active scaling for brands that need regular feature updates and SEO.</i>", s_body))
    for b in ["Includes everything in the Pilot Plan", '4 Expert Hours per month (can also use to add new pages)',
              "Monthly SEO Health Audit", "Priority 24h Support"]:
        story.append(Paragraph(f"•  {b}", s_bullet))

    # ══════════════════════════════════════════════════════════
    # PAGE 4
    # ══════════════════════════════════════════════════════════
    story.append(PageBreak())

    story.append(Paragraph("The Co-Pilot — $950/mo", s_section_sub))
    story.append(Paragraph("<i>A dedicated full-stack partner for high-traffic or E-commerce brands.</i>", s_body))
    for b in ["Includes everything in the Navigator Plan", "10 Expert Hours / month",
              "Strategy Sync Calls", "Direct Slack/Text Access"]:
        story.append(Paragraph(f"•  {b}", s_bullet))

    story.append(divider())

    # Terms of Service
    story.append(Paragraph("Terms of Service", s_section))
    story.append(Spacer(1, 4))

    tos_items = [
        ("1. THE SPRINT CLOCK",
         "The development window (48h for Sprint, 72h for Modern Edge) begins ONLY once the onboarding form is fully completed AND all required high-resolution assets (logos, photos, copy, brand guidelines) have been received and confirmed by Zach Howell via email. Delays in asset delivery pause the clock — the 48/72-hour guarantee applies to active build time, not calendar time from purchase."),
        ("2. DNS PROPAGATION",
         "DNS changes can take up to 24-72 hours to propagate globally after deployment. This propagation window is controlled entirely by third-party DNS providers and ISPs — it is outside the scope of the 48-hour delivery guarantee. Your site will be deployed and accessible via the hosting URL within the guaranteed window; worldwide domain resolution may take additional time beyond Zach Howell's control."),
        ("3. THIRD-PARTY SERVICES",
         "This engagement relies on third-party platforms including but not limited to Porkbun (domain registrar), Netlify (hosting &amp; deployment), CDN networks, Stripe, Google Search Console, and email providers. Zach Howell is not liable for outages, policy changes, service interruptions, delayed verifications, or account-level restrictions imposed by any third-party platform."),
        ("4. DOMAIN DISCRETION",
         "If your domain choices are unavailable, restricted, or exceed standard registration costs (typically $10-$20/year for .com), Zach Howell will notify you and propose the closest available alternative. If no agreement is reached within 24 hours, Zach Howell reserves the right to proceed with the best available option."),
        ("5. ASSET REQUIREMENTS",
         "The client is solely responsible for providing all content, media, logos, copy, and brand assets. Zach Howell does not provide copywriting, professional photography, or stock imagery unless explicitly agreed upon in writing. If assets are not delivered within 7 calendar days of purchase, the project may be placed on hold."),
        ("6. REVISION SCOPE",
         "The Sprint package includes one consolidated round of revisions during the Review phase (Hours 24-36). Requests that materially alter the scope beyond the original template foundation may be subject to additional charges."),
        ("7. SECONDARY INVOICING",
         "Add-ons are billed via a secondary Stripe invoice. Work on add-on features begins only after payment is confirmed."),
        ("8. HOSTING &amp; ONGOING COSTS",
         "Zach Howell is not responsible for ongoing hosting fees, domain renewal costs, SSL certificate renewals, or any recurring charges from third-party services after the project hand-off."),
        ("9. PERFORMANCE GUARANTEE",
         "The 90+ Google PageSpeed score guarantee applies to the site as delivered at launch. The guarantee does not cover performance degradation caused by client modifications or third-party scripts added post-launch."),
        ("10. INTELLECTUAL PROPERTY",
         "Upon full payment, the client receives 100% ownership of the delivered source code. Zach Howell retains the right to display the project in his portfolio unless the client requests otherwise in writing."),
        ("11. LIMITATION OF LIABILITY",
         "Zach Howell's total liability shall not exceed the total amount paid for the package purchased. Zach Howell is not liable for lost revenue, lost data, business interruption, or any indirect or consequential damages."),
        ("12. REFUND POLICY",
         "All payments are non-refundable once development has commenced. If no development work has been performed, a full refund may be issued at Zach Howell's discretion."),
        ("13. GOVERNING LAW",
         "These terms are governed by the laws of the State of Wisconsin. Disputes shall be resolved in the courts of Waukesha County, Wisconsin."),
    ]

    for title, body in tos_items:
        story.append(Paragraph(title, s_tos_head))
        story.append(Paragraph(body, s_tos_body))

    # ── BUILD ──
    doc.build(story, onFirstPage=draw_footer, onLaterPages=draw_footer)
    print(f"PDF generated: {OUTPUT}")


if __name__ == "__main__":
    build_pdf()
