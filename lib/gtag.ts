// @ts-nocheck
export const GA_TRACKING_ID = 'G-YRZENQXNNR';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const consent = (consent: string) => {
  if (['denied', 'granted'].indexOf(consent) !== -1) {
    console.log("configure gtag", GA_TRACKING_ID, consent);
    window.gtag('config', GA_TRACKING_ID, {
      'analytics_storage': consent,
      'functionality_storage': consent,
      'security_storage': consent
    })
  }
}


// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
