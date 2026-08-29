const BLOCKED_URLS = [
    'doubleclick',
    'googlesyndication',
    'pagead',
    'adservice',
    'google-analytics',
    'googletagmanager',
    'googletagservices',
    'stats.g.doubleclick',
    '/gen_204',
    '/log?',
    '/cspreport',
    'metrics.gstatic',
    'ssl.gstatic.com/gb/js', // gmail tracking beacon
    'play.google.com/log',
    'jnn-pa.googleapis.com',
];

function isBlocked(url) {
    return BLOCKED_URLS.some(p => url.includes(p));
}

const _fetch = window.fetch;
window.fetch = function(resource, init) {
    const url = typeof resource === 'string' ? resource : (resource.url || '');
    if (isBlocked(url)) {
        return Promise.resolve(new Response('', { status: 204 }));
    }
    return _fetch.call(this, resource, init);
};

const _xhrOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    if (typeof url === 'string' && isBlocked(url)) {
        // redirect to a dead endpoint instead of throwing
        return _xhrOpen.call(this, method, 'about:blank', ...rest);
    }
    return _xhrOpen.call(this, method, url, ...rest);
};
