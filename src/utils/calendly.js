export const CALENDLY_URL = 'https://calendly.com/zachary-zachhowell/30min';

// Lazily inject Calendly's popup widget assets (once) so the booking
// overlay can open on the page without the visitor ever leaving.
export const ensureCalendly = () => {
  if (typeof document === 'undefined') return;

  if (!document.querySelector('link[data-calendly]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.setAttribute('data-calendly', 'true');
    document.head.appendChild(link);
  }

  if (!document.querySelector('script[data-calendly]')) {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.setAttribute('data-calendly', 'true');
    document.body.appendChild(script);
  }
};

// Open the Calendly popup, falling back to a new tab if the widget
// assets haven't finished loading yet.
export const openCalendly = (e) => {
  if (e) e.preventDefault();
  ensureCalendly();
  if (typeof window !== 'undefined' && window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
  }
};
