const REMOVE = [
    'iframe[src*="youtube"]',
    'iframe[src*="google.com/ads"]',
    '[jscontroller*="M6B6Be"]',
    '[jscontroller*="Vj6r2c"]',
    '.m6B6Be',

    /* ads */
    '[aria-label="Ads"]',
    '[data-text-ad]',
    '.commercial-unit-desktop-top',
    '.commercial-unit-mobile-top',
    '.commercial-unit-mobile-bottom',
    '#tvcap',
    '#bottomads',

    /* people also ask */
    '.related-question-pair',
    '[jscontroller="ge3PVe"]',

    /* shopping spam */
    '.pla-unit-container',

    /* giant carousels */
    'g-scrolling-carousel',

    /* twitter/x embeds */
    '.eejeod',

    /* footer */
    '#foot',
    '#footcnt',
    '#fbar',
    '#mfooter',
];

const style = document.createElement('style');
style.textContent = `
    :root {
      --debloat-width: 760px;
      --debloat-gap: 16px;
      --border-light: rgba(0,0,0,.08);
      --border-dark:  rgba(255,255,255,.08);
      --wiki-light:   rgba(0,0,0,.03);
      --wiki-dark:    rgba(255,255,255,.03);
    }

    ${REMOVE.join(',')} { display: none !important; }

    div[id="uOz6nd"],
    div[id="aaLvqc"]{ display: none; }

    @media screen and (min-width: 1600px) {
      #tsf, .GG4mbd, #rcnt {
        margin-left: calc((100vw - 692px) / 2 - 300px);
      }
      #fbar, .GeEc1b, .B4GxFc {
        display: flex;
        justify-content: center;
      }
    }

    @media screen { #fsl { margin-left: -27px; } }

    #search, #rcnt, #center_col {
      max-width: var(--debloat-width) !important;
      margin: auto !important;
      width: 100% !important;
      float: none !important;
    }

    #rcnt { padding: 0 16px !important; }

    .RNNXgb, .SDkEP, .A8SBwf {
      border-radius: 999px !important;
      box-shadow: none !important;
    }

    @media (prefers-color-scheme: dark) {
      .RNNXgb, .SDkEP, .A8SBwf {
        border: 1px solid rgba(255,255,255,.08) !important;
      }
    }
    @media (prefers-color-scheme: light) {
      .RNNXgb, .SDkEP, .A8SBwf {
        border: 1px solid rgba(0,0,0,.08) !important;
      }
    }

    .g, .tF2Cxc {
      margin-bottom: var(--debloat-gap) !important;
      padding-bottom: 14px !important;
      background: transparent !important;
      box-shadow: none !important;
    }

    @media (prefers-color-scheme: dark) {
      .g:not(:last-child), .tF2Cxc:not(:last-child) {
        border-bottom: 1px solid var(--border-dark) !important;
      }
    }
    @media (prefers-color-scheme: light) {
      .g:not(:last-child), .tF2Cxc:not(:last-child) {
        border-bottom: 1px solid var(--border-light) !important;
      }
    }

    h3, .LC20lb {
      font-size: 1.05rem !important;
      font-weight: 500 !important;
      line-height: 1.35 !important;
    }

    .VwiC3b, .s3v9rd, .st {
      line-height: 1.55 !important;
      opacity: .92;
    }

    cite, .TbwUpd { opacity: .72; }

    #rhs .kp-wholepage,
    #rhs .knowledge-panel,
    #rhs [data-attrid] {
      border-radius: 14px !important;
      padding: 10px !important;
    }

    @media (prefers-color-scheme: dark) {
      #rhs .kp-wholepage,
      #rhs .knowledge-panel,
      #rhs [data-attrid] {
        background: var(--wiki-dark) !important;
        border: 1px solid rgba(255,255,255,.05) !important;
      }
    }
    @media (prefers-color-scheme: light) {
      #rhs .kp-wholepage,
      #rhs .knowledge-panel,
      #rhs [data-attrid] {
        background: var(--wiki-light) !important;
        border: 1px solid rgba(0,0,0,.05) !important;
      }
    }

    body.debloat-compact .g,
    body.debloat-compact .tF2Cxc {
      margin-bottom: 6px !important;
      padding-bottom: 6px !important;
    }

    body {
      text-rendering: optimizeSpeed;
      -webkit-font-smoothing: antialiased;
    }

    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-thumb {
      background: rgba(127,127,127,.25);
      border-radius: 999px;
    }
  `;

document.documentElement.appendChild(style);
