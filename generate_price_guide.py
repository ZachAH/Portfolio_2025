#!/usr/bin/env python3
"""Generate the freelance price guide PDF with dark theme matching zachhowell.dev"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import ParagraphStyle

# ── COLORS ──
BG = HexColor("#09090b")
BG_CARD = HexColor("#121214")
BG_ROW_ALT = HexColor("#0f0f11")
WHITE = HexColor("#fafafa")
GRAY = HexColor("#a1a1aa")
GRAY_DIM = HexColor("#71717a")
ORANGE = HexColor("#FF6B35")
BORDER = HexColor("#27272a")
PURPLE = HexColor("#a78bfa")
GREEN = HexColor("#4ade80")
BLUE = HexColor("#60a5fa")

OUTPUT = "src/assets/PriceGuides/freelance_price_guide.pdf"
WIDTH, HEIGHT = letter


def draw_bg(canvas_obj, doc):
    """Draw the dark background on every page."""
    canvas_obj.saveState()
    canvas_obj.setFillColor(BG)
    canvas_obj.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    # Footer
    canvas_obj.setFillColor(GRAY_DIM)
    canvas_obj.setFont("Helvetica", 7)
    canvas_obj.drawCentredString(WIDTH / 2, 30, "zachhowell.dev  |  zachary@zachhowell.dev  |  262-341-7181")
    canvas_obj.restoreState()


def build_pdf():
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=letter,
        topMargin=0.6 * inch,
        bottomMargin=0.7 * inch,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
    )

    # ── STYLES ──
    s_title = ParagraphStyle("Title", fontName="Helvetica-Bold", fontSize=22, textColor=WHITE, alignment=TA_CENTER, spaceAfter=10)
    s_subtitle = ParagraphStyle("Subtitle", fontName="Helvetica", fontSize=11, textColor=GRAY, alignment=TA_CENTER, spaceAfter=2)
    s_intro = ParagraphStyle("Intro", fontName="Helvetica", fontSize=9, textColor=GRAY_DIM, alignment=TA_CENTER, spaceAfter=20, leading=14)
    s_section = ParagraphStyle("Section", fontName="Helvetica-Bold", fontSize=14, textColor=ORANGE, spaceAfter=2, spaceBefore=18)
    s_section_sub = ParagraphStyle("SectionSub", fontName="Helvetica-Oblique", fontSize=9, textColor=GRAY, spaceAfter=10)
    s_body = ParagraphStyle("Body", fontName="Helvetica", fontSize=9, textColor=GRAY, leading=14, spaceAfter=8)
    s_bullet = ParagraphStyle("Bullet", fontName="Helvetica", fontSize=9, textColor=GRAY, leading=14, leftIndent=16, spaceAfter=4)
    s_bullet_bold_label = ParagraphStyle("BulletBold", fontName="Helvetica", fontSize=9, textColor=GRAY, leading=14, leftIndent=16, spaceAfter=4)
    s_note = ParagraphStyle("Note", fontName="Helvetica-Oblique", fontSize=8, textColor=GRAY_DIM, spaceAfter=12, spaceBefore=6)
    s_highlight = ParagraphStyle("Highlight", fontName="Helvetica-Bold", fontSize=10, textColor=ORANGE, spaceAfter=10, spaceBefore=4)
    s_fine_label = ParagraphStyle("FineLabel", fontName="Helvetica-Bold", fontSize=9.5, textColor=WHITE, leading=14, spaceAfter=2, spaceBefore=10)
    s_fine_body = ParagraphStyle("FineBody", fontName="Helvetica", fontSize=9, textColor=GRAY, leading=14, spaceAfter=6, leftIndent=16)

    story = []

    # ── HEADER ──
    story.append(Spacer(1, 20))
    story.append(Paragraph("Zachary Howell", s_title))
    story.append(Paragraph("Web &amp; Digital Solutions", ParagraphStyle("Sub2", fontName="Helvetica", fontSize=13, textColor=ORANGE, alignment=TA_CENTER, spaceAfter=20)))
    story.append(Paragraph("Project Pricing &amp; Services Guide", s_subtitle))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "This guide provides transparent pricing for custom, high-performance web development. "
        "Final investment is determined by project complexity and is confirmed through a formal proposal.",
        s_intro
    ))

    # ── Divider ──
    def divider():
        t = Table([[""]],  colWidths=[doc.width])
        t.setStyle(TableStyle([
            ("LINEBELOW", (0, 0), (-1, -1), 0.5, BORDER),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ]))
        return t

    story.append(divider())

    # ══════════════════════════════════════════════════════════
    # SECTION 1: Base Project Ranges
    # ══════════════════════════════════════════════════════════
    story.append(Paragraph("The Build: Base Project Ranges", s_section))
    story.append(Paragraph("Modern, responsive, and SEO-optimized solutions for growing brands.", s_section_sub))

    table_data = [
        [
            Paragraph("<b>Project Type</b>", ParagraphStyle("TH", fontName="Helvetica-Bold", fontSize=8, textColor=ORANGE)),
            Paragraph("<b>Investment</b>", ParagraphStyle("TH", fontName="Helvetica-Bold", fontSize=8, textColor=ORANGE)),
            Paragraph("<b>Best For...</b>", ParagraphStyle("TH", fontName="Helvetica-Bold", fontSize=8, textColor=ORANGE)),
        ],
        [
            Paragraph("High-Conversion Landing Page", ParagraphStyle("TC", fontName="Helvetica-Bold", fontSize=9, textColor=WHITE)),
            Paragraph("$800 – $1,200", ParagraphStyle("TC", fontName="Helvetica-Bold", fontSize=9, textColor=GREEN)),
            Paragraph("Lead gen, single-product launches, or portfolios.", ParagraphStyle("TC", fontName="Helvetica", fontSize=8, textColor=GRAY)),
        ],
        [
            Paragraph("Professional Business Site (3–6 Pages)", ParagraphStyle("TC", fontName="Helvetica-Bold", fontSize=9, textColor=WHITE)),
            Paragraph("$1,500 – $3,000", ParagraphStyle("TC", fontName="Helvetica-Bold", fontSize=9, textColor=GREEN)),
            Paragraph("Service providers needing a polished, fast online home.", ParagraphStyle("TC", fontName="Helvetica", fontSize=8, textColor=GRAY)),
        ],
        [
            Paragraph("Dynamic Site + Custom CMS", ParagraphStyle("TC", fontName="Helvetica-Bold", fontSize=9, textColor=WHITE)),
            Paragraph("$3,500 – $6,000", ParagraphStyle("TC", fontName="Helvetica-Bold", fontSize=9, textColor=GREEN)),
            Paragraph("Restaurants or agencies needing to update content daily.", ParagraphStyle("TC", fontName="Helvetica", fontSize=8, textColor=GRAY)),
        ],
        [
            Paragraph("E-Commerce / Custom Web App", ParagraphStyle("TC", fontName="Helvetica-Bold", fontSize=9, textColor=WHITE)),
            Paragraph("$5,000 – $8,500+", ParagraphStyle("TC", fontName="Helvetica-Bold", fontSize=9, textColor=GREEN)),
            Paragraph("Full-scale stores or complex logic (React/Next.js).", ParagraphStyle("TC", fontName="Helvetica", fontSize=8, textColor=GRAY)),
        ],
        [
            Paragraph('The "Total Brand" Launch', ParagraphStyle("TC", fontName="Helvetica-Bold", fontSize=9, textColor=WHITE)),
            Paragraph("$6,000 – $9,000+", ParagraphStyle("TC", fontName="Helvetica-Bold", fontSize=9, textColor=GREEN)),
            Paragraph("Website, CMS, Brand Identity, &amp; 3 months of support.", ParagraphStyle("TC", fontName="Helvetica", fontSize=8, textColor=GRAY)),
        ],
    ]

    col_widths = [doc.width * 0.38, doc.width * 0.22, doc.width * 0.40]
    t = Table(table_data, colWidths=col_widths)
    t.setStyle(TableStyle([
        # Header row
        ("BACKGROUND", (0, 0), (-1, 0), BG_CARD),
        ("TOPPADDING", (0, 0), (-1, 0), 8),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
        # Alternating rows
        ("BACKGROUND", (0, 1), (-1, 1), BG_CARD),
        ("BACKGROUND", (0, 2), (-1, 2), BG_ROW_ALT),
        ("BACKGROUND", (0, 3), (-1, 3), BG_CARD),
        ("BACKGROUND", (0, 4), (-1, 4), BG_ROW_ALT),
        ("BACKGROUND", (0, 5), (-1, 5), BG_CARD),
        # Padding
        ("TOPPADDING", (0, 1), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 10),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        # Borders
        ("LINEBELOW", (0, 0), (-1, 0), 1, ORANGE),
        ("BOX", (0, 0), (-1, -1), 0.5, BORDER),
        ("LINEBELOW", (0, 1), (-1, -2), 0.25, BORDER),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(t)

    story.append(Paragraph(
        "Note: Final pricing depends on page count, third-party integrations (Stripe, HungerRush, etc.), and custom logic requirements.",
        s_note
    ))

    story.append(divider())

    # ══════════════════════════════════════════════════════════
    # SECTION 2: Content Management
    # ══════════════════════════════════════════════════════════
    story.append(Paragraph("Content Management", s_section))
    story.append(Paragraph('The "No-Dev-Needed" Dashboard — Stop paying a developer every time you need to change a price or a photo.', s_section_sub))

    story.append(Paragraph(
        "I build custom Admin Dashboards (via Firebase/Firestore) that give you total control. "
        "Unlike clunky builders, these are streamlined for your specific business.",
        s_body
    ))

    bullets_cms = [
        ("<b>Secure Authentication:</b> Only you and your team get in.", s_bullet_bold_label),
        ("<b>Real-Time Updates:</b> Change a menu item or service price; it's live in seconds.", s_bullet_bold_label),
        ("<b>Asset Management:</b> Upload images and manage galleries with ease.", s_bullet_bold_label),
        ("<b>Scalability:</b> We only build the controls you actually need — no bloat.", s_bullet_bold_label),
    ]
    for text, style in bullets_cms:
        story.append(Paragraph("•  " + text, style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("CMS Integration: Add $1,200 – $2,500 to any base project.", s_highlight))

    story.append(divider())

    # ══════════════════════════════════════════════════════════
    # SECTION 3: Anatomy of Your Investment
    # ══════════════════════════════════════════════════════════
    story.append(Paragraph("The Anatomy of Your Investment", s_section))
    story.append(Paragraph("Where your money goes (estimated breakdown for a $4k–$5k project).", s_section_sub))

    breakdown = [
        ("Frontend Architecture ($1,200–$1,800)", "Custom coding with React &amp; TailwindCSS. No templates. Just lightning-fast, accessible code."),
        ("UI/UX Design ($500–$800)", "High-end layouts designed for user flow and conversions."),
        ("Data &amp; CMS Strategy ($1,500–$2,200)", "Database architecture, secure API routes, and admin panel logic."),
        ("Integrations &amp; Forms ($300–$500)", "Custom contact flows, Google Maps, and payment gateway links."),
        ('The "Launch" Sequence ($200–$400)', "Netlify deployment, DNS/Domain routing via Porkbun, and SSL security setup."),
        ("Optimization ($200–$400)", "SEO meta-tagging, image compression, and cross-device testing."),
    ]
    for label, desc in breakdown:
        story.append(Paragraph(f"•  <b>{label}:</b> {desc}", s_bullet_bold_label))

    story.append(divider())

    # ══════════════════════════════════════════════════════════
    # SECTION 4: Growth Add-Ons
    # ══════════════════════════════════════════════════════════
    story.append(Paragraph("Growth Add-Ons", s_section))
    story.append(Spacer(1, 4))

    addons = [
        ("Ownership Handoff &amp; Training ($150)", "1-on-1 walkthrough of your CMS and full GitHub repo transfer."),
        ("Copywriting &amp; SEO Content ($300–$600)", "Professional headers and keyword-optimized text."),
        ("Google Business Profile Setup ($200)", "Get found on Maps and start collecting reviews properly."),
        ("Logo &amp; Visual Identity ($400–$800)", "Custom vector logos and brand style guides."),
    ]
    for label, desc in addons:
        story.append(Paragraph(f"•  <b>{label}:</b> {desc}", s_bullet_bold_label))

    story.append(divider())

    # ══════════════════════════════════════════════════════════
    # SECTION 5: Fine Print
    # ══════════════════════════════════════════════════════════
    story.append(Paragraph('The "Fine Print" (Made Simple)', s_section))
    story.append(Spacer(1, 4))

    story.append(Paragraph("Full Ownership", s_fine_label))
    story.append(Paragraph(
        'Once the final invoice is paid, the code is yours. I don\'t "rent" websites to my clients. '
        "You get the GitHub repo and full admin rights.",
        s_fine_body
    ))

    story.append(Paragraph("Domain &amp; Hosting", s_fine_label))
    story.append(Paragraph(
        "Your domain is registered through Porkbun and your site is deployed on Netlify. "
        "After launch, I push the domain to your Porkbun account and transfer the site to your Netlify dashboard "
        "— you own and control both. Ongoing hosting costs (usually $0–$20/mo depending on traffic) "
        "are paid directly to Netlify.",
        s_fine_body
    ))

    story.append(Paragraph("Support", s_fine_label))
    story.append(Paragraph(
        "These are one-time build costs. For ongoing updates and priority help, see my Monthly Partnership Plans.",
        s_fine_body
    ))

    # ── BUILD ──
    doc.build(story, onFirstPage=draw_bg, onLaterPages=draw_bg)
    print(f"PDF generated: {OUTPUT}")


if __name__ == "__main__":
    build_pdf()
