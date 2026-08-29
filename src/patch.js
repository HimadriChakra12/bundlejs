// Meta tag approach (works for page navigations)
const metaRef = document.createElement('meta');
metaRef.name    = 'referrer';
metaRef.content = 'no-referrer';
(document.head || document.documentElement).appendChild(metaRef);

// Also patch individual link clicks
document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (a) a.referrerPolicy = 'no-referrer';
}, true);


// Kill beacon entirely — no opt-out, it's pure telemetry
navigator.sendBeacon = () => true;

const TRACKING_PARAMS = [
    'ved','ei','usg','source','sxsrf','oq',
    'aqs','gs_lcp','gs_lp','uact','sca_esv',
    'sa','rlz','ie','oe',
];

document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    try {
        const url = new URL(a.href);
        TRACKING_PARAMS.forEach(p => url.searchParams.delete(p));
        a.href = url.toString();
        a.referrerPolicy = 'no-referrer'; // belt-and-suspenders
    } catch {}
}, true);

function memoryHint() {
    try { if (window.gc) window.gc(); } catch {}
    document.querySelectorAll('iframe, video').forEach(el => {
        el.loading = 'lazy';
    });
}
setInterval(memoryHint, 15000);

// Remove speculative rules & ad prefetches
document.querySelectorAll('script[type="speculationrules"]').forEach(el => el.remove());
document.querySelectorAll('link[rel="prefetch"], link[rel="preload"]').forEach(el => {
    const href = el.href || '';
    if (href.includes('googleads') || href.includes('doubleclick')) el.remove();
});

if (DISABLE_IMAGES_ON_SCROLL) {
    document.addEventListener('scroll', () => {
        document.querySelectorAll('img').forEach(img => {
            if (!img.dataset.src) {
                img.loading  = 'lazy';
                img.decoding = 'async';
            }
        });
    }, { passive: true });
}
