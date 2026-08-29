// Kill timezone leak
const _DateTimeFormat = Intl.DateTimeFormat;
Intl.DateTimeFormat = function(locale, opts = {}) {
    opts.timeZone = opts.timeZone || 'UTC';
    return new _DateTimeFormat(locale, opts);
};
Intl.DateTimeFormat.prototype = _DateTimeFormat.prototype;

const BLOCKED_COOKIE_NAMES = [
    'NID', 'CONSENT', 'SOCS', '1P_JAR',
    'AEC', 'ANID', 'DSID', 'IDE',
    'DV', 'HSID', 'SSID', 'APISID',
    'SAPISID', '__Secure-1PAPISID',
    '__Secure-3PAPISID', '__Secure-1PSID',
    '__Secure-3PSID', 'SID',
];

const _cookieDesc = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie')
    || Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

if (_cookieDesc && _cookieDesc.set) {
    Object.defineProperty(document, 'cookie', {
        get: _cookieDesc.get,
        set(val) {
            const name = val.split('=')[0].trim();
            if (BLOCKED_COOKIE_NAMES.some(b => name === b || name.startsWith('__utm'))) {
                return; // silently drop
            }
            _cookieDesc.set.call(document, val);
        },
        configurable: true
    });
}

try { localStorage.clear(); }   catch {}
try { sessionStorage.clear(); } catch {}

try {
    indexedDB.databases().then(dbs => {
        dbs.forEach(db => indexedDB.deleteDatabase(db.name));
    });
} catch {}

if (window.caches) {
    caches.keys().then(keys => keys.forEach(k => caches.delete(k))).catch(() => {});
}

const PURGE_CACHE = new WeakSet();

function purge() {
    const nodes = document.querySelectorAll(REMOVE.join(','));
    for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i];
        if (!PURGE_CACHE.has(el)) {
            PURGE_CACHE.add(el);
            el.remove();
        }
    }
}

document.addEventListener('DOMContentLoaded', purge);

if (LOW_RAM_MODE) {
    setInterval(purge, 2000);
} else {
    const obs = new MutationObserver(() => {
        setTimeout(purge, 0);
    });
    document.addEventListener('DOMContentLoaded', () => {
        obs.observe(document.body, { childList: true, subtree: true });
    });
}
