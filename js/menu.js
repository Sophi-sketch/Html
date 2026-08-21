// Localiza o botão hambúrguer e o menu que será controlado por ele.
const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

// Só registra os comportamentos quando os dois elementos existem na página.
if (menuButton && mainNav) {
  // Fecha o menu e sincroniza os atributos usados por leitores de tela.
  // returnFocus define se o foco do teclado deve voltar para o botão.
  const closeMenu = (returnFocus = false) => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    mainNav.classList.remove("is-open");

    if (returnFocus) {
      menuButton.focus();
    }
  };

  // Alterna o menu entre aberto e fechado a cada clique no botão.
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    // Se o menu já estiver aberto, fecha e encerra esta função.
    if (isOpen) {
      closeMenu();
      return;
    }

    // Se estava fechado, atualiza a acessibilidade e aplica a classe visual.
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Fechar menu");
    mainNav.classList.add("is-open");
  });

  // Fecha o menu assim que o visitante seleciona um de seus links.
  mainNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  // Também fecha quando o visitante clica fora do menu e do botão.
  document.addEventListener("click", (event) => {
    if (!mainNav.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });

  // A tecla Esc fecha o menu e devolve o foco ao botão hambúrguer.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
      closeMenu(true);
    }
  });

  // Limpa o estado mobile quando a janela volta para uma largura de desktop.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
}
