#include "build.h"

#define NAME        "Google — Fast Elegant Debloat (Privacy Edition)"
#define NAMESPACE   "https://github.com/HimadriChakra12/ungoog"
#define DESCRIPTION "Lightweight, theme-aware Google Search cleanup with canvas fingerprint poisoning, storage nuking, referrer stripping, telemetry blocking, and reduced bloat. AI Overview preserved."

listout(MATCH,
        "https://www.google.com/*",
        "https://google.com/*"
       );

listout(GRANT,
        "none"
       );

listout(ORDER,
        "src/namespace.js",
        "src/canvas.js",
        "src/blockedurls.js",
        "src/styles.js",
        "src/cache&cookie.js",
        "src/patch.js",
        "src/sppof.js",
        "src/compactmode.js"
       );

int main(void) {
    build_t b;
    build_init(&b, NULL, "__HLS_SAVER_VERSION__"); /* NULL -> tools/VERSION */

    build_meta_t meta = {
        .name = NAME,
        .namespace_ = NAMESPACE,
        .description = DESCRIPTION,
        .match = MATCH, .match_count = MATCH_COUNT,
        .grant = GRANT, .grant_count = GRANT_COUNT,
        .run_at = "document-start",
    };
    build_userscript_header(&b, &meta);

    build_add_all(&b, ORDER, ORDER_COUNT, "src/");
    build_finish(&b, "dist/ungoog.user.js"); //OUTPUT
    return 0;
}
