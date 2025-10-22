// ===== HEADER MOBILE =====
class HeaderMobile {
  constructor() {
    this.hamburger = document.querySelector(".header__hamburger");
    this.mobileNav = document.querySelector(".header__mobile-nav");
    this.isOpen = false;
    this.init();
  }

  init() {
    this.hamburger.addEventListener("click", () => this.toggleMenu());
    this.hamburger.addEventListener("keydown", (e) => this.handleKeydown(e));

    document.addEventListener("click", (e) => this.handleClickOutside(e));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isOpen = true;
    this.hamburger.classList.add("header__hamburger--active");
    this.mobileNav.classList.add("header__mobile-nav--active");
    this.hamburger.setAttribute("aria-expanded", "true");

    const firstLink = this.mobileNav.querySelector(".header__mobile-link");
    if (firstLink) {
      firstLink.focus();
    }
  }

  closeMenu() {
    this.isOpen = false;
    this.hamburger.classList.remove("header__hamburger--active");
    this.mobileNav.classList.remove("header__mobile-nav--active");
    this.hamburger.setAttribute("aria-expanded", "false");
    this.hamburger.focus();
  }

  handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.toggleMenu();
    }
  }

  handleClickOutside(event) {
    if (
      this.isOpen &&
      !this.hamburger.contains(event.target) &&
      !this.mobileNav.contains(event.target)
    ) {
      this.closeMenu();
    }
  }
}

// ===== TOGGLES DO RESUMO =====
class SummaryToggles {
  constructor() {
    this.toggleHeaders = document.querySelectorAll(".summary__toggle-header");
    this.init();
  }

  init() {
    this.toggleHeaders.forEach((header) => {
      header.addEventListener("click", () => this.toggleSection(header));
      header.addEventListener("keydown", (e) => this.handleKeydown(e, header));
    });
  }

  toggleSection(header) {
    const content = document.getElementById(
      header.getAttribute("aria-controls")
    );
    const isExpanded = header.getAttribute("aria-expanded") === "true";
    const icon = header.querySelector(".summary__toggle-icon-img");

    header.setAttribute("aria-expanded", !isExpanded);

    if (isExpanded) {
      content.classList.add("summary__toggle-content--hidden");
      icon.src = "assets/icon-minus.svg";
      icon.alt = "Expandir";
    } else {
      content.classList.remove("summary__toggle-content--hidden");
      icon.src = "assets/icon-minus.svg";
      icon.alt = "Recolher";
    }
  }

  handleKeydown(event, header) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.toggleSection(header);
    }
  }
}

// ===== CARROSSEL DE MATERIAL COMPLEMENTAR =====
class MaterialCarousel {
  constructor() {
    this.cards = document.querySelectorAll(".carousel__card");
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.showCard(this.currentIndex);
    this.startAutoPlay();
  }

  setupEventListeners() {
    const prevBtn = document.querySelector(".carousel__arrow--left");
    const nextBtn = document.querySelector(".carousel__arrow--right");

    prevBtn.addEventListener("click", () => this.previousCard());
    nextBtn.addEventListener("click", () => this.nextCard());

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.previousCard();
      if (e.key === "ArrowRight") this.nextCard();
    });

    // Pause autoplay on hover
    const carousel = document.querySelector(".carousel__container");
    carousel.addEventListener("mouseenter", () => this.stopAutoPlay());
    carousel.addEventListener("mouseleave", () => this.startAutoPlay());
  }

  showCard(index) {
    this.cards.forEach((card, i) => {
      card.style.transform = `translateX(${(i - index) * 100}%)`;
      card.style.opacity = i === index ? "1" : "0.3";
      card.style.pointerEvents = i === index ? "all" : "none";
    });
    this.currentIndex = index;
    this.updateIndicator();
  }

  nextCard() {
    const nextIndex = (this.currentIndex + 1) % this.cards.length;
    this.showCard(nextIndex);
  }

  previousCard() {
    const prevIndex =
      (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    this.showCard(prevIndex);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => this.nextCard(), 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  updateIndicator() {
    // Atualizar indicador visual do carrossel
    const indicator = document.querySelector(".carousel__indicator-img");
    // Poderia ser implementado com dots ou números
  }
}

// ===== GERENCIADOR DE CARDS DINÂMICOS =====
class DynamicCardsManager {
  constructor() {
    this.carouselContainer = document.querySelector(".carousel__container");
    this.cardCounter = 3; // Começa com 3 cards existentes
    this.init();
  }

  init() {
    this.setupCardControls();
  }

  setupCardControls() {
    // Adicionar botões de controle se não existirem
    this.addControlButtons();
  }

  addControlButtons() {
    const controlsHTML = `
            <div class="carousel__controls">
                <button class="carousel__add-btn" aria-label="Adicionar novo card">+ Adicionar Card</button>
                <button class="carousel__remove-btn" aria-label="Remover último card">- Remover Card</button>
            </div>
        `;

    const carousel = document.querySelector(".carousel");
    carousel.insertAdjacentHTML("beforeend", controlsHTML);

    // Event listeners para os botões
    document
      .querySelector(".carousel__add-btn")
      .addEventListener("click", () => this.addCard());
    document
      .querySelector(".carousel__remove-btn")
      .addEventListener("click", () => this.removeCard());
  }

  addCard() {
    this.cardCounter++;
    const newCard = this.createCard({
      type: "Artigo",
      title: `Novo Material ${this.cardCounter}`,
      link: "#",
      isNew: true,
    });

    this.carouselContainer.appendChild(newCard);
    this.animateNewCard(newCard);
    this.updateCarousel();
  }

  removeCard() {
    const cards = this.carouselContainer.querySelectorAll(".carousel__card");
    if (cards.length > 1) {
      const lastCard = cards[cards.length - 1];
      this.animateRemoveCard(lastCard);
    }
  }

  createCard(data) {
    const card = document.createElement("div");
    card.className = "carousel__card";
    card.innerHTML = `
            <div class="carousel__tag">
                <div class="carousel__tag-content">
                    <div class="carousel__tag-icon">
                        <img src="assets/icon-monitor-play.svg" alt="Ícone de ${
                          data.type
                        }" class="carousel__tag-icon-img">
                    </div>
                    <span class="carousel__tag-text">${data.type}</span>
                </div>
            </div>
            <a href="${data.link}" class="carousel__link" target="_blank">
                ${data.title} ${
      data.isNew ? '<span class="new-badge">NOVO</span>' : ""
    }
            </a>
        `;
    return card;
  }

  animateNewCard(card) {
    card.style.transform = "scale(0.8)";
    card.style.opacity = "0";

    requestAnimationFrame(() => {
      card.style.transition = "all 0.3s ease";
      card.style.transform = "scale(1)";
      card.style.opacity = "1";
    });
  }

  animateRemoveCard(card) {
    card.style.transition = "all 0.3s ease";
    card.style.transform = "scale(0.8)";
    card.style.opacity = "0";

    setTimeout(() => {
      card.remove();
      this.updateCarousel();
    }, 300);
  }

  updateCarousel() {
    // Atualizar carrossel após modificações
    const carousel = new MaterialCarousel();
  }
}

// ===== EDITOR DE TEXTO DINÂMICO =====
class DynamicTextEditor {
  constructor() {
    this.editableElements = [];
    this.init();
  }

  init() {
    this.makeContentEditable();
    this.setupSaveFunctionality();
  }

  makeContentEditable() {
    // Selecionar elementos principais para edição
    const editableSelectors = [
      ".content__title",
      ".content__description",
      ".objectives__text",
      ".concepts__text",
      ".methods__item",
      ".summary__item",
      ".summary__text",
    ];

    editableSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        element.setAttribute("contenteditable", "true");
        element.setAttribute("data-original-text", element.textContent);
        this.editableElements.push(element);

        this.addEditStyles(element);
        this.addEditListeners(element);
      });
    });
  }

  addEditStyles(element) {
    element.style.cursor = "text";
    element.style.padding = "4px 8px";
    element.style.borderRadius = "4px";
    element.style.transition = "all 0.2s ease";

    element.addEventListener("focus", () => {
      element.style.background = "#f0f8ff";
      element.style.border = "1px dashed #1529FF";
    });

    element.addEventListener("blur", () => {
      element.style.background = "transparent";
      element.style.border = "1px dashed transparent";
    });
  }

  addEditListeners(element) {
    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        element.blur();
      }
    });
  }

  setupSaveFunctionality() {
    const saveBtn = this.createSaveButton();
    document.body.appendChild(saveBtn);
  }

  createSaveButton() {
    const button = document.createElement("button");
    button.textContent = "💾 Salvar Alterações";
    button.className = "save-changes-btn";
    button.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #1529FF;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            z-index: 1000;
            font-family: inherit;
        `;

    button.addEventListener("click", () => this.saveChanges());
    return button;
  }

  saveChanges() {
    const changes = {};
    this.editableElements.forEach((element) => {
      const original = element.getAttribute("data-original-text");
      const current = element.textContent;

      if (original !== current) {
        changes[element.textContent.substring(0, 20) + "..."] = {
          original: original,
          current: current,
        };
        element.setAttribute("data-original-text", current);
      }
    });

    if (Object.keys(changes).length > 0) {
      alert("Alterações salvas com sucesso!");
      console.log("Alterações:", changes);
    } else {
      alert("Nenhuma alteração para salvar.");
    }
  }
}

// ===== SISTEMA DE FEEDBACK =====
class FeedbackSystem {
  constructor() {
    this.feedbackButton = null;
    this.feedbackModal = null;
    this.init();
  }

  init() {
    this.createFeedbackButton();
    this.createFeedbackModal();
  }

  createFeedbackButton() {
    this.feedbackButton = document.createElement("button");
    this.feedbackButton.textContent = "💬 Feedback";
    this.feedbackButton.className = "feedback-btn";
    this.feedbackButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #004AF7;
            color: white;
            border: none;
            padding: 12px 18px;
            border-radius: 25px;
            cursor: pointer;
            z-index: 1000;
            font-family: inherit;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        `;

    this.feedbackButton.addEventListener("click", () => this.toggleModal());
    document.body.appendChild(this.feedbackButton);
  }

  createFeedbackModal() {
    this.feedbackModal = document.createElement("div");
    this.feedbackModal.className = "feedback-modal";
    this.feedbackModal.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 300px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 1001;
            display: none;
        `;

    this.feedbackModal.innerHTML = `
            <h3 style="margin-top: 0; color: #151720;">Deixe seu Feedback</h3>
            <textarea placeholder="O que você achou do conteúdo?" rows="4" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-family: inherit; resize: vertical;"></textarea>
            <div style="margin-top: 10px; display: flex; justify-content: space-between;">
                <button class="submit-feedback" style="background: #004AF7; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Enviar</button>
                <button class="cancel-feedback" style="background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Cancelar</button>
            </div>
        `;

    this.feedbackModal
      .querySelector(".submit-feedback")
      .addEventListener("click", () => this.submitFeedback());
    this.feedbackModal
      .querySelector(".cancel-feedback")
      .addEventListener("click", () => this.toggleModal());

    document.body.appendChild(this.feedbackModal);
  }

  toggleModal() {
    const isVisible = this.feedbackModal.style.display === "block";
    this.feedbackModal.style.display = isVisible ? "none" : "block";
  }

  submitFeedback() {
    const textarea = this.feedbackModal.querySelector("textarea");
    const feedback = textarea.value.trim();

    if (feedback) {
      alert("Obrigado pelo seu feedback!");
      textarea.value = "";
      this.toggleModal();

      // Simular envio para um servidor
      console.log("Feedback enviado:", feedback);
    } else {
      alert("Por favor, digite seu feedback antes de enviar.");
    }
  }
}

// ===== MICROINTERAÇÕES =====
class MicroInteractions {
  constructor() {
    this.init();
  }

  init() {
    this.addHoverEffects();
    this.addClickAnimations();
    this.addScrollAnimations();
    this.addLoadingStates();
  }

  addHoverEffects() {
    // Efeito hover para cards
    const cards = document.querySelectorAll(
      ".carousel__card, .content__card, .summary__toggle"
    );
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-2px)";
        card.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "none";
      });
    });

    // Efeito hover para links
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        link.style.transform = "scale(1.02)";
      });

      link.addEventListener("mouseleave", () => {
        link.style.transform = "scale(1)";
      });
    });
  }

  addClickAnimations() {
    // Animação de clique para botões
    const buttons = document.querySelectorAll("button, .completion__btn");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Efeito de ripple
        const ripple = document.createElement("span");
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                `;

        button.style.position = "relative";
        button.style.overflow = "hidden";
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  addScrollAnimations() {
    // Animação de entrada para elementos
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll(
      ".content__card, .objectives__container, .summary__toggle"
    );
    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "all 0.6s ease";
      observer.observe(el);
    });
  }

  addLoadingStates() {
    // Simular loading para links externos
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const originalText = link.textContent;
        link.textContent = "Carregando...";
        link.style.opacity = "0.7";

        setTimeout(() => {
          link.textContent = originalText;
          link.style.opacity = "1";
        }, 1500);
      });
    });
  }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar todos os sistemas
  new HeaderMobile();
  new SummaryToggles();
  new MaterialCarousel();
  new DynamicCardsManager();
  new DynamicTextEditor();
  new FeedbackSystem();
  new MicroInteractions();

  console.log("🎉 Todas as funcionalidades da Etapa 2 foram carregadas!");
});

// ===== ESTILOS ADICIONAIS PARA ANIMAÇÕES =====
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .new-badge {
        background: #ff4444;
        color: white;
        padding: 2px 6px;
        border-radius: 12px;
        font-size: 10px;
        margin-left: 8px;
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .carousel__card {
        transition: all 0.3s ease !important;
    }
    
    .carousel__controls {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin-top: 20px;
    }
    
    .carousel__add-btn,
    .carousel__remove-btn {
        background: #1529FF;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-family: inherit;
    }
    
    .carousel__remove-btn {
        background: #dc3545;
    }
`;
document.head.appendChild(style);
