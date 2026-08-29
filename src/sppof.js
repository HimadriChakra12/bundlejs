const spoof = (obj, prop, val) => {
    try {
        Object.defineProperty(obj, prop, {
            get: () => val,
            configurable: true
        });
    } catch {}
};

// Spoof hardware concurrency and memory (common fingerprint vectors)
spoof(navigator, 'hardwareConcurrency', 4);
spoof(navigator, 'deviceMemory', 8);
spoof(navigator, 'platform', 'Win32');

// Empty plugin list — real Brave/FF fingerprint target
spoof(navigator, 'plugins', {
    length: 0,
    item: () => null,
    namedItem: () => null,
    [Symbol.iterator]: function*() {}
});

spoof(navigator, 'mimeTypes', {
    length: 0,
    item: () => null,
    namedItem: () => null,
    [Symbol.iterator]: function*() {}
});

// Spoof screen to common 1920×1080, hide real resolution
spoof(screen, 'width',       1920);
spoof(screen, 'height',      1080);
spoof(screen, 'availWidth',  1920);
spoof(screen, 'availHeight', 1040);
spoof(screen, 'colorDepth',  24);
spoof(screen, 'pixelDepth',  24);

