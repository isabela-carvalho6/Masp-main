const cards = document.querySelectorAll(".info-card");

cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.01)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
    });
});