document.addEventListener("DOMContentLoaded", function () {
  // 1- Criação de um array de produtos fictícios (15 itens) a partir de um modelo padrão
  const productsData = [];
  const productTemplate = {
    imgSrc: "/assets/images/modelo-card-carrosel.png",
    imgAlt: "Modelo vestindo camiseta branca",
    title: "Lorem ipsum dolor sit amet consectetuer adipiscing elit",
    oldPrice: "R$ 100,00",
    newPrice: "R$ 79,90",
    discount: "10% OFF",
    installments: "10x de R$ 7,90",
    isNew: true,
    productUrl: "#",
  };

  for (let i = 0; i < 15; i++) {
    productsData.push({ ...productTemplate });
  }

  // --- 2. Configurações ---
  const itemsPerSlideDesktop = 5;
  const itemsPerSlideMobile = 2;
  const totalIndicators = 3;

  // --- 3. Função para Gerar o HTML de um Card de Produto  ---
  function createProductCardHTML(product, index, itemsPerSlideLg) {
    const isInitiallyHiddenOnMobile =
      index % itemsPerSlideLg >= itemsPerSlideMobile;
    const hiddenClass = isInitiallyHiddenOnMobile ? "d-none d-lg-block" : "";
    const newBadgeHTML = product.isNew
      ? '<span class="badge position-absolute top-0 start-0 m-2 novo-badge">NOVO</span>'
      : "";

    return `
      <div class="col-6 col-lg product-card-wrapper ${hiddenClass}">
        <div class="card h-100 position-relative">
          ${newBadgeHTML}
          <img src="${product.imgSrc}" class="card-img-top" alt="${product.imgAlt}" />
          <div class="card-body d-flex flex-column">
            <h3 class="card-title fs-14 fw-bold">
              ${product.title}
            </h3>
            <div class="mt-auto">
              <div class="price-section d-flex mb-2">
                <div class="price-values d-flex flex-column justify-content-center">
                  <span class="text-muted text-decoration-line-through fs-12">${product.oldPrice}</span>
                  <p class="fw-bold fs-16 mb-0">${product.newPrice}</p>
                </div>
                <span class="badge discount-badge ms-2 align-self-center">${product.discount}</span>
              </div>
              <p class="fs-12 text text-muted mb-3">
                Ou em até <strong>${product.installments}</strong>
              </p>
              <button class="btn btn-primary w-100 mb-0">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- 4. Função Principal para Criar e Popular um Carrossel  ---
  function initializeCarousel(carouselId, carouselTitle, productList) {
    const carouselElement = document.getElementById(carouselId);
    if (!carouselElement) {
      console.error(
        `Elemento do carrossel com ID #${carouselId} não encontrado.`
      );
      return;
    }

    const carouselInner = carouselElement.querySelector(".carousel-inner");
    const carouselIndicators = carouselElement.querySelector(
      ".carousel-indicators"
    );
    const headerTitle = carouselElement
      .closest(".carousel-section")
      .querySelector(".header-carousel h2");

    if (!carouselInner || !carouselIndicators || !headerTitle) {
      console.error(
        `Estrutura interna do carrossel #${carouselId} está incompleta.`
      );
      return;
    }

    carouselInner.innerHTML = "";
    carouselIndicators.innerHTML = "";
    headerTitle.textContent = carouselTitle;

    const productsPerFullSlide = itemsPerSlideDesktop;
    const totalSlides = totalIndicators;

    for (let i = 0; i < totalSlides; i++) {
      const carouselItem = document.createElement("div");
      carouselItem.className = `carousel-item ${i === 0 ? "active" : ""}`;

      const row = document.createElement("div");
      row.className = "row g-3";

      const startIndex = i * productsPerFullSlide;
      const endIndex = startIndex + productsPerFullSlide;
      const slideProducts = productList.slice(startIndex, endIndex);

      // Checa se realmente há produtos para este slide antes de iterar
      if (slideProducts.length > 0) {
        slideProducts.forEach((product, productIndex) => {
          row.innerHTML += createProductCardHTML(
            product,
            productIndex,
            productsPerFullSlide
          );
        });
      } else {
        console.warn(
          `Slide ${
            i + 1
          } para o carrossel #${carouselId} não tem produtos suficientes.`
        );
      }

      carouselItem.appendChild(row);
      carouselInner.appendChild(carouselItem);
    }

    for (let i = 0; i < totalSlides; i++) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.bsTarget = `#${carouselId}`;
      button.dataset.bsSlideTo = i.toString();
      button.setAttribute("aria-label", `Slide ${i + 1}`);
      if (i === 0) {
        button.className = "active";
        button.setAttribute("aria-current", "true");
      }
      carouselIndicators.appendChild(button);
    }

    new bootstrap.Carousel(carouselElement, {
      interval: false,
    });
  }

  // --- 5. Inicializar os Carrosséis na Página ---
  initializeCarousel("carouselInstance1", "Lançamentos", productsData);

  initializeCarousel("carouselInstance2", "Lançamentos", productsData);
});
