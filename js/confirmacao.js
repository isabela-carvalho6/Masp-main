// ================= CONFETES =================
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const confettis = [];
const colors = ["#d60000", "#000000", "#ffffff", "#f2c94c", "#2f80ed"];

for (let i = 0; i < 150; i++) {
    confettis.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettis.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    requestAnimationFrame(animate);
}

animate();

// ================= DOWNLOAD + REDIRECIONAMENTO =================
const btnDownload = document.getElementById("btnDownload");

btnDownload.addEventListener("click", function (e) {
    e.preventDefault();

    const link = document.createElement("a");
    link.href = "img/ingresso-masp.png";
    link.download = "ingresso-masp.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
        window.location.href = "galeria.html";
    }, 1200);
});