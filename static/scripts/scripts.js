console.log("javaScript dando certo");

const formulario = document.getElementById("cadastroForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const ConSenha = document.getElementById("ConSenha");
const Celular = document.getElementById("Celular");
const CPF = document.getElementById("CPF");
const RG = document.getElementById("RG");
const msgError = document.getElementsByClassName("msgError");

const createDisplayMsgError = (mensagem) => {
  msgError[0].textContent = mensagem;
};

const checkNome = () => {
  const nomeRegex = /^[A-Za-zÁ-ÿ\s]+$/;
  return nomeRegex.test(nome.value);
};

const checkEmail = (email) => {
  const partesEmail = email.split("@");

  if (
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "gmail.com") ||
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "outlook.com") ||
    (partesEmail.length === 2 && partesEmail[1].toLowerCase() === "hotmail.com")
  ) {
    return true;
  } else {
    return false;
  }
};

function XXX() {}

function maskPhoneNumber(event) {
  let celular = event.target.value;

  if (/[A-Za-zÁ-ÿ]/.test(celular)) {
    createDisplayMsgError("O celular deve conter apenas números!");
  } else {
    createDisplayMsgError("");
  }
  celular = celular.replace(/\D/g, "");

  if (celular.length > 11) {
    celular = celular.substring(0, 11);
  }

  if (celular.length > 2) {
    celular = `(${celular.substring(0, 2)}) ${celular.substring(2)}`;
  }

  if (celular.length > 10) {
    celular = celular.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3");
  }

  event.target.value = celular;
}

function checkPasswordStrength(senha) {
  if (!/[a-z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra minúscula!";
  }
  if (!/[A-Z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra maiúscula!";
  }
  if (!/[W_]/.test(senha)) {
    return "A senha deve ter pelo menos um caracter especial!";
  }
  if (!/\d/.test(senha)) {
    return "A senha deve ter pelo menos um numero!";
  }
  if (senha.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres!";
  }

  return null;
}

function fetchDatas(event) {
  event.preventDefault();

  if (!checkNome) {
    createDisplayMsgError(
      "O nome não pode conter numeros ou caracteres especiais"
    );
    return;
  }

  if (!checkEmail(email.value)) {
    createDisplayMsgError(
      "O nome não pode conter numeros ou caracteres especiais"
    );
    return;
  }
  if (!checkPasswordMatch()) {
    createDisplayMsgError("As senhas digitadas não são iguais");
    return;
  }
  const senhaError = checkPasswordStrength(senha.value);
  if (senhaError) {
    createDisplayMsgError(senhaError);
    return;
  }
  if (!checkNome) {
    createDisplayMsgError(
      "O nome não pode conter numeros ou caracteres especiais"
    );
    return;
  }
  if (celular.value && /[A-Za-zÁ-ÿ]/.test(celular.value)) {
    createDisplayMsgError("O telefone deve conter apenas numeros");
    return;
  }

  const formData = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
    Celular: Celular.value,
    CPF: CPF.value,
    RG: RG.value,
  };

  console.log("formulario enviado:", JSON.stringify(formData, null, 2));
}

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(nome.value);
  console.log(email.value);
  console.log(senha.value);
  console.log(ConSenha.value);
  console.log(Celular.value);
  console.log(CPF.value);
  console.log(RG.value);
  console.log(msgError.value);
});

nome.addEventListener("input", () => {
  if (nome.value && !checkNome()) {
    createDisplayMsgError(
      "O nome não pode conter numeros ou caracteres especiais!"
    );
  } else {
    createDisplayMsgError("");
  }
});

email.addEventListener("input", () => {
  if (email.value && !checkEmail(email.value)) {
    createDisplayMsgError("O email digitado não e valido!");
  } else {
    createDisplayMsgError("");
  }
});

senha.addEventListener("input", () => {
  if (senha.value && checkPasswordStrength(senha.value)) {
    createDisplayMsgError(checkPasswordStrength(senha.value));
  } else {
    createDisplayMsgError("");
  }
});
Celular.addEventListener("input", maskPhoneNumber);
