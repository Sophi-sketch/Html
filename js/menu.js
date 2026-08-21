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
/* ==========================================================================
   Validação Client-Side do Formulário de Contato
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");

    // Limpa erros anteriores
    document.querySelectorAll(".error-message").forEach((span) => {
      span.textContent = "";
    });

    // Função auxiliar para exibir erro
    const showError = (input, msg) => {
      const errorSpan = input.parentElement.querySelector(".error-message");
      if (errorSpan) {
        errorSpan.textContent = msg;
        errorSpan.style.color = "#e74c3c";
        errorSpan.style.fontSize = "0.85rem";
        errorSpan.style.marginTop = "0.25rem";
        errorSpan.style.display = "block";
      }
    };

    // Validação do Nome
    if (name.value.trim().length < 3) {
      showError(name, "Informe seu nome completo.");
      isValid = false;
    }

    // Validação do E-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      showError(email, "Insira um e-mail válido.");
      isValid = false;
    }

    // Validação do Telefone
    if (phone.value.trim().length < 10) {
      showError(phone, "Insira um telefone válido com DDD.");
      isValid = false;
    }

    // Validação da Mensagem
    if (message.value.trim().length < 10) {
      showError(message, "A mensagem deve ter pelo menos 10 caracteres.");
      isValid = false;
    }

    // Sucesso
    if (isValid) {
      alert("Sua mensagem foi enviada com sucesso!");
      form.reset();
    }
  });
});