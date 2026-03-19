
const btn = document.getElementById("btnCadastro");

function mostrarBotao() {
    btn.classList.add("show");
}

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) mostrarBotao();
});

setTimeout(mostrarBotao, 2500);

const fileInput = document.getElementById('fileInput');
    const fileName = document.getElementById('fileName');

    fileInput.addEventListener('change', function () {
        if (fileInput.files.length > 0) {
            fileName.textContent = fileInput.files[0].name;
        } else {
            fileName.textContent = "Nenhum arquivo selecionado";
        }
    });

    onst fileInput = document.getElementById("fileInput");
    const fileName = document.getElementById("fileName");

    fileInput.addEventListener("change", () => {
        fileName.textContent = fileInput.files[0]?.name || "Nenhum arquivo selecionado";
    });

    document.getElementById("formCadastro").addEventListener("submit", (e) => {
        e.preventDefault();

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function () {
            const novoCard = {
                nome: document.getElementById("nome").value,
                cpf: document.getElementById("cpf").value,
                numero: document.getElementById("numero").value,
                email: document.getElementById("email").value,
                senha: document.getElementById("senha").value,
                imagem: reader.result,
                data: new Date().toLocaleString()
            };

            // Pega cards antigos
            let cards = JSON.parse(localStorage.getItem("galeria")) || [];

            // Adiciona novo
            cards.push(novoCard);

            // Salva
            localStorage.setItem("galeria", JSON.stringify(cards));

            // Vai para a galeria
            window.location.href = "galeria.html";
        };

        reader.readAsDataURL(file);
    });