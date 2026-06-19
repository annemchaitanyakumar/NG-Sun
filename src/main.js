document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initCartDrawer();
  initScrollAnimations();
  initLogoMarquee();
  initActiveNavLinks();
});

/**
 * Mobile Navigation Menu Toggling
 */
function initMobileMenu() {
  const menuButton = document.querySelector(".menu-button");
  const navMenu = document.querySelector(".nav-menu");
  
  if (menuButton && navMenu) {
    menuButton.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = navMenu.classList.contains("w--open");
      
      if (isOpen) {
        navMenu.classList.remove("w--open");
        menuButton.classList.remove("w--open");
        navMenu.style.display = "none";
      } else {
        navMenu.classList.add("w--open");
        menuButton.classList.add("w--open");
        navMenu.style.display = "block";
      }
    });
  }
}

/**
 * Cart Drawer Overlay Toggle
 */
function initCartDrawer() {
  const cartButton = document.querySelector(".cart-button");
  const cartWrapper = document.querySelector(".w-commerce-commercecartcontainerwrapper");
  const closeCartButton = document.querySelector(".w-commerce-commercecartcloselink");
  
  if (cartButton && cartWrapper) {
    cartButton.addEventListener("click", (e) => {
      e.preventDefault();
      cartWrapper.style.display = "block";
      document.body.style.overflow = "hidden"; // Disable scroll when cart is open
    });
  }
  
  if (closeCartButton && cartWrapper) {
    closeCartButton.addEventListener("click", (e) => {
      e.preventDefault();
      cartWrapper.style.display = "none";
      document.body.style.overflow = ""; // Re-enable scroll
    });
    
    // Also close cart when clicking on the overlay background
    cartWrapper.addEventListener("click", (e) => {
      if (e.target === cartWrapper) {
        cartWrapper.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }
}

/**
 * Scroll and Page Load Entrance Animations
 */
function initScrollAnimations() {
  // 1. Entrance Animations on Load
  const anim01 = document.querySelector(".animate-on-load-01");
  const anim02 = document.querySelector(".animate-on-load-02");
  const anim03 = document.querySelector(".animate-on-load-03");
  const anim04 = document.querySelector(".animate-on-load-04");
  const anim05 = document.querySelector(".animate-on-load-05");
  const appHolder = document.querySelector(".app-holder");
  const circleContainer = document.querySelector(".circle-container");
  const redGlow = document.querySelector(".red-glow");
  const whiteGlow = document.querySelector(".white-glow");

  // Trigger stagger fade-in using CSS inline transition styles on load
  setTimeout(() => {
    const entranceElements = [
      { el: anim01, delay: 100 },
      { el: anim02, delay: 250 },
      { el: anim03, delay: 400 },
      { el: anim04, delay: 550 },
      { el: anim05, delay: 700 },
    ];

    entranceElements.forEach(({ el, delay }) => {
      if (el) {
        el.style.transition = "transform 1.2s cubic-bezier(0.19, 1, 0.22, 1), opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1)";
        el.style.transitionDelay = `${delay}ms`;
        el.style.transform = "translate3d(0, 0, 0) scale3d(1, 1, 1)";
        el.style.opacity = "1";
      }
    });
    
    // Animate App and background circle in Hero
    setTimeout(() => {
      if (appHolder) {
        appHolder.style.transition = "transform 1.8s cubic-bezier(0.19, 1, 0.22, 1), opacity 1.8s cubic-bezier(0.19, 1, 0.22, 1)";
        appHolder.style.transform = "translate3d(0, 0, 0) scale3d(1, 1, 1)";
        appHolder.style.opacity = "1";
      }
      if (circleContainer) {
        circleContainer.style.transition = "transform 2s cubic-bezier(0.19, 1, 0.22, 1), opacity 2s cubic-bezier(0.19, 1, 0.22, 1)";
        circleContainer.style.transform = "translate3d(0, 0, 0) scale3d(1, 1, 1) rotateZ(0deg)";
        circleContainer.style.opacity = "1";
      }
      if (redGlow) {
        redGlow.style.transition = "transform 2s cubic-bezier(0.19, 1, 0.22, 1), opacity 2s cubic-bezier(0.19, 1, 0.22, 1)";
        redGlow.style.transform = "translate3d(-248px, 95px, 0) scale3d(1, 1, 1) rotateZ(-26deg)";
        redGlow.style.opacity = "1";
      }
      if (whiteGlow) {
        whiteGlow.style.transition = "transform 2s cubic-bezier(0.19, 1, 0.22, 1), opacity 2s cubic-bezier(0.19, 1, 0.22, 1)";
        whiteGlow.style.transform = "translate3d(-248px, 95px, 0) scale3d(1, 1, 1) rotateZ(-26deg)";
        whiteGlow.style.opacity = "1";
      }
    }, 450);
  }, 100);

  // 2. Parallax rotation of the Hero Circle Background on Scroll
  if (circleContainer) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      // Rotate slowly based on scroll
      circleContainer.style.transform = `translate3d(0, 0, 0) scale3d(1, 1, 1) rotateZ(${scrollY * -0.1}deg)`;
    });
  }

  // 3. Scroll Entrance Animations using IntersectionObserver
  const scrollElements = document.querySelectorAll(".fade-in-on-scroll, .home-grid-image, .feature-image, .pricing-holder, .blog-card");
  
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.style.transition = "transform 1.2s cubic-bezier(0.19, 1, 0.22, 1), opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1)";
          target.style.transform = "translate3d(0, 0, 0) scale3d(1, 1, 1)";
          target.style.opacity = "1";
          observer.unobserve(target);
        }
      });
    }, observerOptions);

    scrollElements.forEach((el) => {
      // Set initial styles for observation
      el.style.opacity = "0";
      el.style.transform = "translate3d(0, 40px, 0)";
      observer.observe(el);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    scrollElements.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "translate3d(0, 0, 0)";
    });
  }
}

/**
 * Seamless Infinite Marquee for Trusted By logos
 */
function initLogoMarquee() {
  const logoContainers = document.querySelectorAll(".company-logo-container");
  
  logoContainers.forEach(container => {
    // Add custom flex layouts and absolute translations in style.css,
    // or configure simple styling if not already set by original stylesheet.
    container.style.display = "flex";
    container.style.flexShrink = "0";
    container.style.minWidth = "100%";
    container.style.justifyContent = "space-around";
  });
}

/**
 * Dynamic Active Navigation Links
 */
function initActiveNavLinks() {
  // Normalize current path (e.g. "/about/" -> "/about", "/index.html" -> "/")
  let currentPath = window.location.pathname;
  if (currentPath.endsWith("/")) {
    currentPath = currentPath.slice(0, -1);
  }
  if (currentPath === "" || currentPath === "/index.html") {
    currentPath = "/";
  }

  const navLinks = document.querySelectorAll(".nav-link");
  
  navLinks.forEach(link => {
    let href = link.getAttribute("href");
    if (!href) return;
    
    // Normalize link href
    if (href.endsWith("/")) {
      href = href.slice(0, -1);
    }
    if (href === "" || href === "/index.html") {
      href = "/";
    }

    // Toggle current classes
    if (currentPath === href) {
      link.classList.add("w--current");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("w--current");
      link.removeAttribute("aria-current");
    }
  });
}
