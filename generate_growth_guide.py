#!/usr/bin/env python3
"""Generate the Growth Plans PDF — clean white theme matching the original."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, black
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER

# ── COLORS ──
DARK = HexColor("#1a1a1a")
GRAY = HexColor("#555555")
GRAY_LIGHT = HexColor("#888888")
ORANGE = HexColor("#FF6B35")
RED = HexColor("#DC3545")
BORDER = HexColor("#dddddd")
BG_LIGHT = HexColor("#f8f8f8")
BG_ORANGE_LIGHT = HexColor("#FFF3ED")
BORDER_ORANGE = HexColor("#FFD4BF")

OUTPUT = "src/assets/PriceGuides/Growth_Plans.pdf"
WIDTH, HEIGHT = letter


def draw_footer(c, doc):
    c.saveState()
    c.setFillColor(GRAY_LIGHT)
    c.setFont("Helvetica", 7)
    c.drawCentredString(WIDTH / 2, 30, "zachhowell.dev  |  zachary@zachhowell.dev  |  New Berlin, WI")
    c.restoreState()


def build_pdf():
    doc = SimpleDocTemplate(
        OUTPUT, pagesize=letter,
        topMargin=0.6 * inch, bottomMargin=0.7 * inch,
        leftMargin=0.75 * inch, rightMargin=0.75 * inch,
    )

    # ── STYLES ──
    s_title = ParagraphStyle("Title", fontName="Helvetica-Bold", fontSize=22, textColor=DARK, spaceAfter=12)
    s_subtitle = ParagraphStyle("Subtitle", fontName="Helvetica-Bold", fontSize=13, textColor=DARK, spaceAfter=10)
    s_body = ParagraphStyle("Body", fontName="Helvetica", fontSize=10, textColor=GRAY, leading=15, spaceAfter=8)
    s_body_bold = ParagraphStyle("BodyBold", fontName="Helvetica-Bold", fontSize=10, textColor=DARK, leading=15, spaceAfter=4)
    s_section = ParagraphStyle("Section", fontName="Helvetica-Bold", fontSize=16, textColor=DARK, spaceBefore=16, spaceAfter=6)
    s_section_sub = ParagraphStyle("SectionSub", fontName="Helvetica-Bold", fontSize=13, textColor=DARK, spaceBefore=12, spaceAfter=4)
    s_bullet = ParagraphStyle("Bullet", fontName="Helvetica", fontSize=10, textColor=GRAY, leading=15, leftIndent=20, spaceAfter=4)
    s_italic = ParagraphStyle("Italic", fontName="Helvetica-Oblique", fontSize=10, textColor=GRAY, leading=15, spaceAfter=8)
    th = ParagraphStyle("TH", fontName="Helvetica-Bold", fontSize=10, textColor=DARK)
    td = ParagraphStyle("TD", fontName="Helvetica", fontSize=10, textColor=DARK, leading=14)
    td_bold = ParagraphStyle("TDB", fontName="Helvetica-Bold", fontSize=10, textColor=DARK, leading=14)

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
    story.append(Paragraph("Zach Howell – Web &amp; Digital Solutions", s_title))
    story.append(Paragraph("Monthly Partnership &amp; Growth Plans", s_subtitle))
    story.append(Paragraph(
        'Building your site is just Phase 1. These plans are designed to ensure your digital investment stays fast, '
        'secure, and ahead of the competition while giving you an "on-call" developer without the $100k salary.',
        s_body
    ))

    story.append(divider())

    # Support Level Table
    story.append(Paragraph("Select Your Support Level", s_section))

    tier_data = [
        [Paragraph("<b>Plan</b>", th), Paragraph("<b>Investment</b>", th), Paragraph("<b>Focus</b>", th)],
        [Paragraph("The Pilot", td_bold), Paragraph("$150 / mo", td), Paragraph("Security, Hosting Management, &amp; Peace of Mind.", td)],
        [Paragraph("The Navigator", td_bold), Paragraph("$450 / mo", td), Paragraph("Active Growth, SEO Health, &amp; Content Updates.", td)],
        [Paragraph("The Co-Pilot", td_bold), Paragraph("$950 / mo", td), Paragraph("Priority Dev Time, Strategy, &amp; Performance Scaling.", td)],
    ]
    tier_table = Table(tier_data, colWidths=[doc.width * 0.22, doc.width * 0.22, doc.width * 0.56])
    tier_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), BG_LIGHT),
        ("LINEBELOW", (0, 0), (-1, 0), 1, DARK),
        ("LINEBELOW", (0, 1), (-1, -1), 0.5, BORDER),
        ("BOX", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(tier_table)

    story.append(divider())

    # Zach Advantage
    story.append(Paragraph('The "Zach" Advantage: Efficiency Over Hours', s_section))

    story.append(Paragraph(
        '<b>A Note on Billing:</b> I don\'t move like a "traditional" developer. Because I build with modern frameworks '
        'like <b>React, TypeScript, and TailwindCSS</b>, I am significantly faster than developers using legacy builders or bloated templates.',
        s_body
    ))
    story.append(Paragraph("<b>What does this mean for you?</b>", s_body_bold))
    story.append(Paragraph(
        'An "hour" of my time usually covers what takes other agencies three. Whether it\'s a UI tweak, a new CMS field, '
        'or an API integration, I focus on <b>high-velocity output</b>. You aren\'t paying for me to sit around — '
        'you\'re paying for rapid, professional execution.',
        s_body
    ))

    story.append(divider())

    # Plan Breakdowns
    story.append(Paragraph("Plan Breakdowns", s_section))

    story.append(Paragraph("The Pilot ($150/mo)", s_section_sub))
    story.append(Paragraph('<i>Best for small businesses that need a "Set it and Forget it" solution.</i>', s_body))
    for label, desc in [
        ("Hosting &amp; Domain Oversight:", "I manage Netlify hosting and DNS on your behalf."),
        ("Uptime Monitoring:", "24/7 alerts. If it goes down, I'm already fixing it."),
        ("Security &amp; Patching:", "Monthly audits of code dependencies to prevent vulnerabilities."),
        ('1 "Expert Hour" per month:', "Perfect for quick text swaps, price changes, or new photos."),
    ]:
        story.append(Paragraph(f"•  <b>{label}</b> {desc}", s_bullet))

    # ══════════════════════════════════════════════════════════
    # PAGE 2
    # ══════════════════════════════════════════════════════════
    story.append(PageBreak())

    story.append(Paragraph("The Navigator ($450/mo)", s_section_sub))
    story.append(Paragraph("<i>Best for growing brands that need regular site improvements.</i>", s_body))
    for label, desc in [
        ("Includes everything in the Pilot Plan.", ""),
        ('4 "Expert Hours" per month:', "Enough for new landing pages, contact flows, or adding CMS sections."),
        ("SEO &amp; Speed Audit:", "Monthly report on your Google PageSpeed scores and search rankings."),
        ("Priority Support:", "24-hour guaranteed response time."),
    ]:
        if desc:
            story.append(Paragraph(f"•  <b>{label}</b> {desc}", s_bullet))
        else:
            story.append(Paragraph(f"•  <b>{label}</b>", s_bullet))

    story.append(Spacer(1, 6))

    story.append(Paragraph("The Co-Pilot ($950/mo)", s_section_sub))
    story.append(Paragraph("<i>Best for e-commerce or high-traffic apps requiring a dedicated partner.</i>", s_body))
    for label, desc in [
        ("Includes everything in the Navigator Plan.", ""),
        ('10 "Expert Hours" per month:', "Full-scale feature development and UI overhauls."),
        ("Strategy Sessions:", "A monthly 30-minute sync to discuss your digital roadmap."),
        ("Instant Access:", 'Direct text/Slack line for urgent requests and "brainstorming" sessions.'),
    ]:
        if desc:
            story.append(Paragraph(f"•  <b>{label}</b> {desc}", s_bullet))
        else:
            story.append(Paragraph(f"•  <b>{label}</b>", s_bullet))

    story.append(divider())

    # Partnership Terms
    story.append(Paragraph("Partnership Terms", s_section))
    for label, desc in [
        ("No Long-Term Contracts:", "All plans are month-to-month. I stay because I provide value, not because you're locked in."),
        ("Use It or Lose It:", "To keep my schedule predictable for all partners, hours do not roll over month-to-month."),
        ("Ownership Always:", "You always maintain 100% ownership of your code and data."),
    ]:
        story.append(Paragraph(f"•  <b>{label}</b> {desc}", s_bullet))

    story.append(divider())

    # ── BUILD ──
    doc.build(story, onFirstPage=draw_footer, onLaterPages=draw_footer)
    print(f"PDF generated: {OUTPUT}")


if __name__ == "__main__":
    build_pdf()
