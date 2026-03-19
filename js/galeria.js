const galeria = document.getElementById("galeria");
let obras = JSON.parse(localStorage.getItem("obras")) || [];
const usuarioAtual = localStorage.getItem("usuarioAtual");

// Carregar galeria
function carregarGaleria() {
    galeria.innerHTML = "";

    obras.forEach((obra, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        let botoes = "";

        // SOMENTE O DONO PODE REMOVER A OBRA
        if (obra.artista === usuarioAtual) {
            botoes = `
                <button class="btn-remover" onclick="removerObra(${index})">
                    Remover Arte
                </button>
            `;
        }

        card.innerHTML = `
            <img src="${obra.imagem}">
            ${botoes}
        `;

        card.addEventListener("click", () => abrirModal(index));
        galeria.appendChild(card);
    });
}

// Remover arte
function removerObra(i) {
    if (!confirm("Tem certeza que deseja remover sua arte?")) return;

    obras.splice(i, 1);
    localStorage.setItem("obras", JSON.stringify(obras));
    carregarGaleria();
}

// Abrir modal
function abrirModal(index) {
    const obra = obras[index];

    document.getElementById("modalImg").src = obra.imagem;
    document.getElementById("modalArtista").innerText = obra.artista;
    document.getElementById("modalData").innerText = obra.data;

    document.getElementById("modal").style.display = "flex";
}

// Fechar modal
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

window.onclick = (e) => {
    if (e.target.id === "modal") {
        document.getElementById("modal").style.display = "none";
    }
};

carregarGaleria();
