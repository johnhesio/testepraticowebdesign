// Menu Mobile Hamburguer
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

    // Fecha menu ao clicar fora
    document.addEventListener("click", (e) => this.handleClickOutside(e));

    // Fecha menu com ESC
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

    // Foca no primeiro link do menu mobile
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

    // Devolve foco para o hamburger
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

// Inicializa quando DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  new HeaderMobile();
});

// Toggles do Resumo do Percurso
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

    // Alterna estado
    header.setAttribute("aria-expanded", !isExpanded);

    if (isExpanded) {
      // Fecha
      content.classList.add("summary__toggle-content--hidden");
      icon.src = "assets/icon-minus.svg";
      icon.alt = "Expandir";
    } else {
      // Abre
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

// Inicializar quando DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  // ... código anterior do header mobile ...

  // Inicializar toggles do resumo
  new SummaryToggles();
});
