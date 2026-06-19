import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    {
      name: "clean-urls-redirect",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const urlPath = req.url.split("?")[0];
          const cleanPaths = [
            "/about",
            "/features",
            "/pricing",
            "/blog",
            "/contact",
            "/checkout",
            "/services/brand-creative",
            "/services/social-media",
            "/services/performance-marketing",
            "/services/content-marketing",
            "/services/video-multimedia",
            "/services/business-growth",
            "/services/local-marketing",
            "/services/emerging-services",
            "/services/email-automation",
          ];

          if (cleanPaths.includes(urlPath)) {
            const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
            res.writeHead(301, { Location: urlPath + "/" + query });
            res.end();
            return;
          }
          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        features: resolve(__dirname, "features/index.html"),
        about: resolve(__dirname, "about/index.html"),
        pricing: resolve(__dirname, "pricing/index.html"),
        blog: resolve(__dirname, "blog/index.html"),
        contact: resolve(__dirname, "contact/index.html"),
        checkout: resolve(__dirname, "checkout/index.html"),
        "services-brand-creative": resolve(__dirname, "services/brand-creative/index.html"),
        "services-social-media": resolve(__dirname, "services/social-media/index.html"),
        "services-performance-marketing": resolve(
          __dirname,
          "services/performance-marketing/index.html"
        ),
        "services-content-marketing": resolve(__dirname, "services/content-marketing/index.html"),
        "services-video-multimedia": resolve(__dirname, "services/video-multimedia/index.html"),
        "services-business-growth": resolve(__dirname, "services/business-growth/index.html"),
        "services-local-marketing": resolve(__dirname, "services/local-marketing/index.html"),
        "services-emerging-services": resolve(__dirname, "services/emerging-services/index.html"),
        "services-email-automation": resolve(__dirname, "services/email-automation/index.html"),
      },
    },
  },
});
