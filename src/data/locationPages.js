export const SERVICE_AREA_NAMES = [
  'New Berlin',
  'Brookfield',
  'Milwaukee',
  'Mequon',
  'Elm Grove',
  'Waukesha',
  'West Bend',
  'Whitefish Bay',
  'Fox Point',
];

export const locationPages = [
  {
    slug: 'milwaukee',
    city: 'Milwaukee',
    focusKeyword: 'Enterprise Modernization',
    metaDescription:
      'Looking for a web developer in Milwaukee? ZH Web Solutions builds high-performance, GSAP-powered websites and custom React applications to help Milwaukee businesses modernize, rank, and convert.',
    heroLead:
      'Milwaukee companies need more than a polished homepage. They need systems that load fast, tell a sharper story, and support real pipeline growth across search, referrals, and repeat traffic.',
    serviceDescription:
      'My Milwaukee web development approach is built around Enterprise Modernization: replacing dated UX, brittle codebases, and generic agency output with custom React builds that feel premium, move quickly, and scale cleanly.',
    marketInsight:
      'For Milwaukee brands competing in legal, healthcare, manufacturing, real estate, and professional services, the site has to communicate operational maturity. That means performance budgets, trust-building motion, clear information architecture, and strong local SEO signals.',
    proofPoints: [
      'Custom React and Vite builds tuned for performance',
      'GSAP motion used intentionally to reinforce premium positioning',
      'Local SEO architecture for service-driven lead generation',
      'Technical cleanup for outdated sites that are slowing down growth',
    ],
  },
  {
    slug: 'brookfield',
    city: 'Brookfield',
    focusKeyword: 'Local Business Growth',
    metaDescription:
      'Looking for a web developer in Brookfield? ZH Web Solutions provides high-performance, GSAP-powered websites to help Brookfield businesses dominate their local market.',
    heroLead:
      'Brookfield businesses win when their websites feel as polished as the in-person experience. The standard is higher here, which means your site has to build trust immediately and move qualified visitors toward action.',
    serviceDescription:
      'For Brookfield clients, I center the build around Local Business Growth: fast-loading pages, clear service positioning, and conversion-focused layouts that turn local search traffic into calls, quote requests, and booked consultations.',
    marketInsight:
      'That usually means tighter messaging, stronger service-page structure, higher-end motion treatment, and a clearer separation between what you do, why you are credible, and how quickly a prospect can take the next step.',
    proofPoints: [
      'Premium service-page architecture for local rankings',
      'Sharper CTA flow for calls, consultations, and estimate forms',
      'Brand presentation calibrated for affluent suburban buyers',
      'Technical SEO and schema support for map-pack relevance',
    ],
  },
  {
    slug: 'mequon',
    city: 'Mequon',
    focusKeyword: 'Boutique Performance',
    metaDescription:
      'Looking for a web developer in Mequon? ZH Web Solutions creates high-performance, GSAP-powered websites for Mequon businesses that need boutique execution and premium positioning.',
    heroLead:
      'Mequon businesses often compete on trust, discretion, and polish. A generic site undercuts all three. The build has to feel refined while still being technically sharp enough to win search visibility.',
    serviceDescription:
      'In Mequon, my work is guided by Boutique Performance: custom design and development that feels elevated on the surface, but is backed by disciplined engineering, fast page speed, and conversion-first structure underneath.',
    marketInsight:
      'That is especially useful for boutique firms, specialty practices, and premium service brands that need to look established without feeling overbuilt or corporate.',
    proofPoints: [
      'High-trust layouts for premium service businesses',
      'Elegant motion and typography without performance drag',
      'Conversion flow designed for high-intent, high-value leads',
      'Local search structure tailored to affluent service areas',
    ],
  },
  {
    slug: 'elm-grove',
    city: 'Elm Grove',
    focusKeyword: 'Neighborhood Authority',
    metaDescription:
      'Looking for a web developer in Elm Grove? ZH Web Solutions builds premium React websites and GSAP-powered digital experiences that help Elm Grove businesses earn local authority.',
    heroLead:
      'Elm Grove is a small market with high expectations. Businesses here do not need volume for the sake of volume. They need the right local signal, the right message, and a site that feels credible immediately.',
    serviceDescription:
      'For Elm Grove companies, I emphasize Neighborhood Authority: a highly intentional web presence that makes the business look established, locally trusted, and meaningfully better than the average competitor.',
    marketInsight:
      'That usually translates into stronger trust assets, cleaner service narratives, and a more deliberate mobile experience so local visitors can validate the business quickly and reach out without friction.',
    proofPoints: [
      'High-trust local pages built for service-based businesses',
      'Lean site architecture with clear conversion intent',
      'Polished visual execution suited for smaller affluent markets',
      'Schema and metadata tuned for hyperlocal relevance',
    ],
  },
  {
    slug: 'whitefish-bay',
    city: 'Whitefish Bay',
    focusKeyword: 'Premium Service Positioning',
    metaDescription:
      'Looking for a web developer in Whitefish Bay? ZH Web Solutions builds high-performance, GSAP-powered websites to help Whitefish Bay businesses stand out with premium service positioning.',
    heroLead:
      'Whitefish Bay businesses benefit from a web presence that feels concise, premium, and unmistakably professional. In a market where presentation matters, the site has to carry the same standard as the service itself.',
    serviceDescription:
      'My Whitefish Bay strategy is built around Premium Service Positioning: tightening the brand story, elevating the visual finish, and making every page support a stronger perception of quality.',
    marketInsight:
      'That is particularly effective for practices and firms that rely on reputation, referrals, and high-trust client relationships rather than broad commodity traffic.',
    proofPoints: [
      'Refined design systems for premium local brands',
      'Messaging hierarchy that supports higher-ticket sales',
      'Fast mobile UX for busy local decision-makers',
      'Search-ready service pages without thin SEO filler',
    ],
  },
  {
    slug: 'west-bend',
    city: 'West Bend',
    focusKeyword: 'Regional Lead Capture',
    metaDescription:
      'Looking for a web developer in West Bend? ZH Web Solutions provides high-performance, GSAP-powered websites to help West Bend businesses capture more regional leads.',
    heroLead:
      'West Bend businesses often need a site that balances local credibility with broader regional reach. The goal is not just to look modern. It is to make the website pull harder as a sales asset.',
    serviceDescription:
      'For West Bend, I focus on Regional Lead Capture: building custom service pages, stronger search intent alignment, and cleaner call-to-action paths so the site works harder across surrounding markets as well.',
    marketInsight:
      'That helps owner-led companies that want to compete beyond a single zip code without losing the local trust signals that still drive conversions.',
    proofPoints: [
      'Lead-generation pages aligned to regional service demand',
      'Performance-first builds that hold up on mobile networks',
      'Technical SEO support for broader surrounding-market visibility',
      'Custom code foundations that are easy to extend later',
    ],
  },
];

export const locationPageMap = Object.fromEntries(
  locationPages.map((page) => [page.slug, page])
);

export const getLocationPath = (slug) => `/locations/${slug}-web-design`;
