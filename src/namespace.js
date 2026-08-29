const LOW_RAM_MODE          = true;
const DISABLE_IMAGES_ON_SCROLL = true;
const ENABLE_COMPACT_MODE   = true;

const _toDataURL          = HTMLCanvasElement.prototype.toDataURL;
const _toBlob             = HTMLCanvasElement.prototype.toBlob;
const _getImageData       = CanvasRenderingContext2D.prototype.getImageData;
const _readPixels         = WebGLRenderingContext.prototype.readPixels;
