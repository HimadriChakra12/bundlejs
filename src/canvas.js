function noiseCanvas(canvas) {
    try {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const img = ctx.getImageData(0, 0, canvas.width || 1, canvas.height || 1);
        for (let i = 0; i < img.data.length; i += 4) {
            img.data[i]     ^= Math.random() * 2 | 0;
            img.data[i + 1] ^= Math.random() * 2 | 0;
            img.data[i + 2] ^= Math.random() * 2 | 0;
        }
        ctx.putImageData(img, 0, 0);
    } catch {}
}

HTMLCanvasElement.prototype.toDataURL = function(...args) {
    noiseCanvas(this);
    return _toDataURL.apply(this, args);
};

HTMLCanvasElement.prototype.toBlob = function(cb, ...args) {
    noiseCanvas(this);
    return _toBlob.call(this, cb, ...args);
};

CanvasRenderingContext2D.prototype.getImageData = function(...args) {
    const data = _getImageData.apply(this, args);
    for (let i = 0; i < data.data.length; i += 4) {
        data.data[i]     ^= Math.random() * 2 | 0;
        data.data[i + 1] ^= Math.random() * 2 | 0;
        data.data[i + 2] ^= Math.random() * 2 | 0;
    }
    return data;
};

if (window.WebGLRenderingContext) {
    WebGLRenderingContext.prototype.readPixels = function(...args) {
        _readPixels.apply(this, args);
        const buf = args[6];
        if (buf instanceof Uint8Array) {
            for (let i = 0; i < buf.length; i++) {
                buf[i] ^= Math.random() * 2 | 0;
            }
        }
    };
}
