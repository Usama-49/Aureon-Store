// Central place for all contact emails so you change them in one spot.
export const STORE_ADMIN_EMAIL = "woodorycraft@gmail.com";
export const DEVELOPER_EMAIL = "usamahere49@gmail.com";

// Handy pre-filled mailto helpers
export const adminMailto = (subject = "Support Request") =>
  `mailto:${STORE_ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}`;

export const devMailto = (subject = "Bug Report") =>
  `mailto:${DEVELOPER_EMAIL}?subject=${encodeURIComponent(subject)}`;
