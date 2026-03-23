const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeLightbox");
const prevBtn = document.getElementById("prevImg");
const nextBtn = document.getElementById("nextImg");
const thumbnailContainer = document.getElementById("thumbnailContainer");

let currentIndex = 0;
let currentGallery = [];

// Galerias específicas
const galleries = {
    wp: [
        "imagens/banner.png",
        "imagens/sc-especialidade.png",
        "imagens/sc-sobre.png",
        "imagens/sc-porque-escolhe-a-clinica.png",
	"imagens/sc-avaliacoes-de-pacientes.png",
	"imagens/sc-onde-estamos.png",
	"imagens/sc-horarios-e-contato.png",
    ]
};

// Criar miniaturas dinamicamente
function renderThumbnails() {
    thumbnailContainer.innerHTML = "";

    if (currentGallery.length <= 1) {
        thumbnailContainer.style.display = "none";
        return;
    }

    thumbnailContainer.style.display = "flex";

    currentGallery.forEach((src, index) => {
        const thumb = document.createElement("img");
        thumb.src = src;

        if (index === currentIndex) {
            thumb.classList.add("active-thumb");
        }

        thumb.addEventListener("click", () => {
            currentIndex = index;
            updateLightboxImage();
        });

        thumbnailContainer.appendChild(thumb);
    });
}

// Atualizar imagem principal + miniaturas
function updateLightboxImage() {
    lightboxImg.src = currentGallery[currentIndex];
    renderThumbnails();
}

// Abrir imagens
document.querySelectorAll(".zoom-img").forEach(img => {
    img.addEventListener("click", () => {
        const card = img.closest(".project-card");

        if (card && card.dataset.gallery === "wp") {
            currentGallery = galleries.wp;
            currentIndex = 0;
        } else {
            currentGallery = [img.src];
            currentIndex = 0;
        }

        updateLightboxImage();
        lightbox.style.display = "flex";
    });
});

// Navegação
nextBtn.addEventListener("click", () => {
    if (currentGallery.length > 1) {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateLightboxImage();
    }
});

prevBtn.addEventListener("click", () => {
    if (currentGallery.length > 1) {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightboxImage();
    }
});

// Fechar
closeBtn.addEventListener("click", () => lightbox.style.display = "none");
lightbox.addEventListener("click", e => {
    if (e.target === lightbox) lightbox.style.display = "none";
});