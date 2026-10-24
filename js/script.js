/**
 * =========================================================================
 * 🎄 CONFIGURAÇÃO DA LANDING PAGE
 * (Lê os valores definidos no topo do index.html ou usa os padrões abaixo)
 * =========================================================================
 */
const CFG_LINK_ARVORE = (typeof LINK_ARVORE !== "undefined") ? LINK_ARVORE : "COLE_AQUI_O_LINK";
const CFG_LINK_ARVORE_PAPAIS = (typeof LINK_ARVORE_PAPAIS !== "undefined") ? LINK_ARVORE_PAPAIS : "COLE_AQUI_O_LINK";
const CFG_LINK_KIT_COMPLETO = (typeof LINK_KIT_COMPLETO !== "undefined") ? LINK_KIT_COMPLETO : "COLE_AQUI_O_LINK";
const CFG_LINK_OFERTA_POPUP = (typeof LINK_OFERTA_POPUP !== "undefined") ? LINK_OFERTA_POPUP : "COLE_AQUI_O_LINK";
const CFG_WHATSAPP = (typeof WHATSAPP !== "undefined") ? WHATSAPP : "55DDDNUMERO";
const CFG_PRECO_KIT_COMPLETO = (typeof PRECO_KIT_COMPLETO !== "undefined") ? PRECO_KIT_COMPLETO : "R$ 219,90";

// Variável de controle para desativar o pop-up se o usuário estiver indo comprar
let userIsPurchasing = false;

/**
 * =========================================================================
 * 📊 SISTEMA DE RASTREAMENTO DE EVENTOS (Pixel Meta / Google Tag / Console)
 * =========================================================================
 */
function trackEvent(eventName, eventParams = {}) {
  const timestamp = new Date().toISOString();
  console.log(`%c[Analytics Event: ${eventName}]`, "color: #d4af37; font-weight: bold;", {
    timestamp,
    ...eventParams
  });

  // Integração automática se o Meta Pixel estiver presente
  if (typeof window.fbq === "function") {
    try {
      window.fbq("trackCustom", eventName, eventParams);
    } catch (e) {
      console.warn("Meta Pixel track error:", e);
    }
  }

  // Integração automática se o Google Analytics/GTag estiver presente
  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", eventName, eventParams);
    } catch (e) {
      console.warn("Google Analytics track error:", e);
    }
  }
}

/**
 * =========================================================================
 * 🔗 APLICAÇÃO DINÂMICA DOS LINKS E CONFIGURAÇÕES NO DOM
 * =========================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
  trackEvent("PageView", { page: "Landing Page Árvore de Natal Vermelha" });

  // 1. Atualiza Preço do Kit Completo
  const kitPriceElements = document.querySelectorAll(".preco-kit-dinamico");
  kitPriceElements.forEach(el => {
    el.textContent = CFG_PRECO_KIT_COMPLETO;
  });

  // 2. Mapeamento dos botões de compra para suas respectivas URLs
  const linkMappings = [
    { selector: "#btn-comprar-arvore", url: CFG_LINK_ARVORE, label: "Só a Árvore", price: "R$ 149,96" },
    { selector: "#btn-comprar-papais", url: CFG_LINK_ARVORE_PAPAIS, label: "Árvore + Trio de Papais Noéis", price: "R$ 187,74" },
    { selector: "#btn-comprar-kit", url: CFG_LINK_KIT_COMPLETO, label: "Kit Completo", price: CFG_PRECO_KIT_COMPLETO },
    { selector: "#btn-popup-desconto", url: CFG_LINK_OFERTA_POPUP, label: "Oferta Pop-up Kit Completo", price: "R$ 127,90" }
  ];

  linkMappings.forEach(({ selector, url, label, price }) => {
    const btn = document.querySelector(selector);
    if (btn) {
      btn.setAttribute("href", url);
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener noreferrer");

      btn.addEventListener("click", () => {
        // Marca que o usuário está comprando: impede o popup de saída
        userIsPurchasing = true;
        trackEvent("InitiateCheckout", { product: label, price: price, target_url: url });
      });
    }
  });

  // 3. Links do WhatsApp
  const whatsappUrl = `https://wa.me/${CFG_WHATSAPP}?text=${encodeURIComponent("Olá! Gostaria de saber mais e garantir minha Árvore de Natal Vermelha com preço de antecipação!")}`;
  const whatsappButtons = document.querySelectorAll(".link-whatsapp");
  whatsappButtons.forEach(btn => {
    btn.setAttribute("href", whatsappUrl);
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");
    btn.addEventListener("click", () => {
      userIsPurchasing = true;
      trackEvent("ContactWhatsApp", { number: CFG_WHATSAPP });
    });
  });

  // 4. Inicializa os Módulos
  initUrgencyCountdown();
  initPopupCountdown();
  initExitIntentPopup();
  initFaqAccordion();
  initGalleryLightbox();
  initSnowCanvas();
  initSmoothScroll();
});

/**
 * =========================================================================
 * ⏳ CONTADOR REGRESSIVO DA BARRA DE URGÊNCIA FIXA (15 MINUTOS)
 * (Reinicia a cada visita conforme especificado)
 * =========================================================================
 */
function initUrgencyCountdown() {
  const timerElement = document.getElementById("urgencyTimer");
  if (!timerElement) return;

  const DURATION_SECONDS = 15 * 60; // 15 minutos
  let remaining = DURATION_SECONDS;

  function update() {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    timerElement.textContent = `${String(mins).padStart(2, "0")}m ${String(secs).padStart(2, "0")}s`;

    if (remaining > 0) {
      remaining--;
    } else {
      // Quando zera, reinicia para manter a urgência constante
      remaining = DURATION_SECONDS;
    }
  }

  update();
  setInterval(update, 1000);
}

/**
 * =========================================================================
 * ⏳ CONTADOR REGRESSIVO DO POP-UP (10 MINUTOS)
 * =========================================================================
 */
function initPopupCountdown() {
  const timerElement = document.getElementById("popupTimer");
  if (!timerElement) return;

  let remaining = 10 * 60; // 10 minutos

  function update() {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    timerElement.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    if (remaining > 0) {
      remaining--;
    } else {
      remaining = 10 * 60;
    }
  }

  update();
  setInterval(update, 1000);
}

/**
 * =========================================================================
 * 🎁 POP-UP DE SAÍDA (EXIT INTENT) ROBUSTO
 * Dispara de todas as formas:
 * a) Desktop: mouseleave pelo topo
 * b) Celular: clique no botão voltar (history.pushState)
 * c) Celular: rolagem rápida para cima
 * d) Troca de aba / minimização (visibilitychange)
 * e) Inatividade de 40s
 * f) Tentativa de fechar aba (beforeunload)
 * Regra: máx 1x, exceto se tentar sair de novo após fechar (máx 2x no total)
 * =========================================================================
 */
function initExitIntentPopup() {
  const popupBackdrop = document.getElementById("exitPopup");
  const closeBtn = document.getElementById("popupCloseBtn");
  const dismissLink = document.getElementById("popupDismissLink");

  if (!popupBackdrop) return;

  const STORAGE_KEY = "arvore_natal_popup_views";
  const MAX_TOTAL_VIEWS = 2; // Máximo de 2 vezes no total por sessão

  function getViewsCount() {
    return parseInt(sessionStorage.getItem(STORAGE_KEY) || "0", 10);
  }

  function incrementViewsCount() {
    const current = getViewsCount();
    sessionStorage.setItem(STORAGE_KEY, (current + 1).toString());
  }

  let isPopupOpen = false;

  function showPopup(triggerReason) {
    // Não abre se já estiver aberto ou se o usuário estiver em processo de compra
    if (isPopupOpen || userIsPurchasing) return;

    const currentViews = getViewsCount();
    if (currentViews >= MAX_TOTAL_VIEWS) return;

    isPopupOpen = true;
    incrementViewsCount();

    popupBackdrop.classList.add("active");
    trackEvent("PopupOpened", {
      reason: triggerReason,
      viewNumber: currentViews + 1
    });
  }

  function hidePopup() {
    if (!isPopupOpen) return;
    isPopupOpen = false;
    popupBackdrop.classList.remove("active");
    trackEvent("PopupClosed", { action: "User dismissed popup" });
  }

  // Fechar ao clicar no X, no link ou fora do card
  if (closeBtn) closeBtn.addEventListener("click", hidePopup);
  if (dismissLink) dismissLink.addEventListener("click", hidePopup);
  popupBackdrop.addEventListener("click", (e) => {
    if (e.target === popupBackdrop) {
      hidePopup();
    }
  });

  // Fechar com a tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isPopupOpen) {
      hidePopup();
    }
  });

  // --- a) Desktop: mouse saindo pelo topo da página (mouseleave)
  document.addEventListener("mouseleave", (e) => {
    if (e.clientY <= 10) {
      showPopup("desktop_mouseleave_top");
    }
  });

  // --- b) Celular: botão voltar do navegador (pushState + popstate)
  try {
    window.history.pushState({ page: "landing" }, "", window.location.href);
    window.addEventListener("popstate", () => {
      if (!userIsPurchasing && getViewsCount() < MAX_TOTAL_VIEWS) {
        showPopup("mobile_back_button");
        // Recoloca o estado para permitir navegação subsequente
        window.history.pushState({ page: "landing" }, "", window.location.href);
      }
    });
  } catch (err) {
    console.debug("History pushState notice:", err);
  }

  // --- c) Celular: rolagem rápida para cima
  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let lastScrollTime = Date.now();

  window.addEventListener("scroll", () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const currentTime = Date.now();
    const timeDiff = currentTime - lastScrollTime;

    if (timeDiff > 30 && timeDiff < 400) {
      const scrollDiff = lastScrollTop - currentScrollTop; // Positivo se rolar para CIMA
      const velocity = scrollDiff / timeDiff; // pixels por milissegundo

      // Se estiver rolando para cima com alta velocidade e não estiver no topo absoluto
      if (velocity > 1.8 && currentScrollTop > 250) {
        showPopup("mobile_fast_scroll_up");
      }
    }

    lastScrollTop = currentScrollTop;
    lastScrollTime = currentTime;
  }, { passive: true });

  // --- d) Troca de aba ou minimização (visibilitychange)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      // Ao retornar para a aba, dispara o pop-up
      showPopup("tab_returned_visible");
    }
  });

  // --- e) Inatividade de 40 segundos sem interação
  let idleTimer = null;
  function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      showPopup("inactivity_40s");
    }, 40000); // 40 segundos
  }

  ["mousemove", "mousedown", "touchstart", "touchmove", "keydown", "scroll"].forEach(evt => {
    window.addEventListener(evt, resetIdleTimer, { passive: true });
  });
  resetIdleTimer();

  // --- f) Tentativa de fechar a aba (beforeunload)
  window.addEventListener("beforeunload", () => {
    if (!userIsPurchasing && getViewsCount() < MAX_TOTAL_VIEWS) {
      showPopup("beforeunload");
    }
  });
}

/**
 * =========================================================================
 * ❓ FAQ ACCORDION INTERATIVO
 * =========================================================================
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const wasActive = item.classList.contains("active");

      // Fecha todos os outros itens
      faqItems.forEach(otherItem => otherItem.classList.remove("active"));

      // Alterna o clicado
      if (!wasActive) {
        item.classList.add("active");
        trackEvent("FaqExpanded", { question: questionBtn.textContent.trim() });
      }
    });
  });
}

/**
 * =========================================================================
 * 🖼️ GALERIA LIGHTBOX COM VISUALIZAÇÃO EM ALTA DEFINIÇÃO
 * =========================================================================
 */
function initGalleryLightbox() {
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("lightboxImage");
  const closeBtn = document.getElementById("lightboxClose");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!lightbox || !lightboxImg) return;

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "Detalhe da Árvore de Natal";
        lightbox.classList.add("active");
        trackEvent("GalleryImageViewed", { src: img.src });
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
  }

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

/**
 * =========================================================================
 * ❄️ CANVAS DE NEVE SUTIL E BOKEH DOURADO NATALINO
 * (Otimizado a 60fps, ultra-leve para smartphones)
 * =========================================================================
 */
function initSnowCanvas() {
  const canvas = document.getElementById("snowCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Quantidade de partículas adaptada ao tamanho da tela
  const flakeCount = width < 768 ? 32 : 60;
  const flakes = [];

  for (let i = 0; i < flakeCount; i++) {
    const isGoldSparkle = Math.random() > 0.82; // Partículas douradas mágicas
    flakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.5 + 0.8,
      d: Math.random() * flakeCount,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.6 + 0.2,
      isGold: isGoldSparkle
    });
  }

  let angle = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);
    angle += 0.008;

    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, false);

      if (f.isGold) {
        ctx.fillStyle = `rgba(247, 228, 154, ${f.opacity})`;
        ctx.shadowColor = "rgba(212, 175, 55, 0.8)";
        ctx.shadowBlur = 6;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.shadowBlur = 0;
      }

      ctx.fill();

      // Movimentação suave
      f.y += f.speedY;
      f.x += Math.sin(angle + f.d) * 0.4 + f.speedX;

      // Reposicionamento suave ao sair da tela
      if (f.y > height) {
        f.y = -10;
        f.x = Math.random() * width;
      }
      if (f.x > width + 10) f.x = -10;
      if (f.x < -10) f.x = width + 10;
    }

    requestAnimationFrame(render);
  }

  render();
}

/**
 * =========================================================================
 * 🎯 ROLAGEM SUAVE DO HERO ATÉ AS OFERTAS
 * =========================================================================
 */
function initSmoothScroll() {
  const scrollBtn = document.getElementById("heroScrollBtn");
  const offersSection = document.getElementById("ofertas");

  if (scrollBtn && offersSection) {
    scrollBtn.addEventListener("click", (e) => {
      e.preventDefault();
      trackEvent("HeroScrollClicked");
      offersSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}
