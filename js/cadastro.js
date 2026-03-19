const form = document.getElementById("formCadastro");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede envio automático

    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const file = document.getElementById("fileInput").files[0];

    // ---- VALIDAÇÃO NOME ----
    if (nome.length < 3) {
        alert("Digite seu nome completo.");
        return;
    }

    // ---- VALIDAÇÃO CPF (apenas números) ----
    const cpfNumerico = cpf.replace(/\D/g, "");
    if (cpfNumerico.length !== 11) {
        alert("O CPF deve conter exatamente 11 números.");
        return;
    }

    // ---- VALIDAÇÃO NÚMERO DE TELEFONE ----
    const numeroNumerico = numero.replace(/\D/g, "");
    if (numeroNumerico.length < 10 || numeroNumerico.length > 11) {
        alert("O número deve conter 10 ou 11 dígitos (com DDD).");
        return;
    }

    // ---- VALIDAÇÃO DE EMAIL ----
    const emailPadrao = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo)\.(com|com\.br)$/;
    if (!emailPadrao.test(email)) {
        alert("Digite um e-mail válido (gmail, hotmail, outlook ou yahoo).");
        return;
    }

    // ---- VALIDAÇÃO DA SENHA ----
    if (senha.length < 4) {
        alert("A senha deve ter pelo menos 4 caracteres.");
        return;
    }

    // ---- VALIDAÇÃO DA IMAGEM ----
    if (!file) {
        alert("Por favor, envie sua arte.");
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function () {
        const imagemBase64 = leitor.result;

        // CRIANDO OBJETO DA OBRA
        const novaObra = {
            artista: nome,
            cpf: cpfNumerico,
            numero: numeroNumerico,
            email: email,
            senha: senha,
            imagem: imagemBase64,
            data: new Date().toLocaleString()
        };

        // PEGAR O QUE JÁ EXISTIA
        let obras = JSON.parse(localStorage.getItem("obras")) || [];

        // SALVAR NOVA OBRA
        obras.push(novaObra);
        localStorage.setItem("obras", JSON.stringify(obras));

        // SALVAR USUÁRIO LOGADO PARA IDENTIFICAR SUAS ARTES
        localStorage.setItem("usuarioAtual", nome);

        // REDIRECIONAR
        window.location.href = "confirmacao.html";
    };

    leitor.readAsDataURL(file);
});