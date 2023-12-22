const EleProductsContainer = document.getElementById("products");
const EleSearchInput = document.getElementById("search-input");
const EleListMenu = document.getElementById("list-menu");
const EleGridMenu = document.getElementById("grid-menu");



// list Menu
EleListMenu.onclick = () => {
    EleProductsContainer.classList.add("list-menu");
};

// grid Menu
EleGridMenu.onclick = () => {
    EleProductsContainer.classList.remove("list-menu");
};

// search input
EleSearchInput.addEventListener("change", (e) => {
    const elements = document.getElementsByClassName("variants");
    for (let i = 0; i < elements.length; i++) {
        const EleVariantElement = elements[i];
        if (e.target.value !== "") {
            if (
                EleVariantElement.textContent
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            ) {
                EleVariantElement.classList.add("selected");
            } else {
                EleVariantElement.classList.remove("selected");
            }
        } else {
            EleVariantElement.classList.remove("selected");
        }
    }
});

function productCard(product) {
    const {
        product_badge,
        product_image,
        product_title,
        product_variants
    } =
    product;

    const EleProductCardContainer = document.createElement("div"); // product card container
    EleProductCardContainer.classList.add("product-card");
    //   section 1
    const EleProductImgContainer = document.createElement("div");
    EleProductImgContainer.classList.add("product-img-container");
    //
    const EleBadgeContainer = document.createElement("div");
    EleBadgeContainer.classList.add('bg')
    EleProductImgContainer.appendChild(EleBadgeContainer)

    // badge
    const EleBadgeElement = document.createElement("a");
    EleBadgeElement.textContent = product_badge;
    EleBadgeElement.classList.add("badge");
    EleBadgeContainer.appendChild(EleBadgeElement);
    // img
    let EleImg = 'https://via.placeholder.com/175x175'
    const EleImageElement = document.createElement("img");
    
    // check Img URL
    fetch(product_image)
    .then(response => {
        if (response.ok) {
        console.log('Image URL is valid');
        EleImageElement.src = product_image;
        } else {
        console.log('Image URL is invalid');
        EleImageElement.src = EleImg;
        }
    })
    .catch(error => {
        console.error('Error validating image URL:', error);
    });

    EleImageElement.alt = 'product-img';
    EleImageElement.classList.add("image");
    EleProductImgContainer.appendChild(EleImageElement);
    EleProductCardContainer.appendChild(EleProductImgContainer);
    //   section 2
    const EleProductDetailsContainer = document.createElement("div");
    EleProductDetailsContainer.classList.add("product-details-container");
    //   title
    const TitleElement = document.createElement("h1");
    TitleElement.textContent = product_title.toUpperCase();
    TitleElement.classList.add("title");
    EleProductDetailsContainer.appendChild(TitleElement);
    // variants
    for (let i = 0; i < product_variants.length; i++) {
        const element = product_variants[i];
        const EleVariant = document.createElement("p");
        EleVariant.classList.add("variants");
        EleVariant.textContent = element["v" + (i + 1)].toUpperCase(); //uppercase
        EleProductDetailsContainer.appendChild(EleVariant);
    }
    EleProductCardContainer.appendChild(EleProductDetailsContainer);
    EleProductsContainer.appendChild(EleProductCardContainer);
}

// get data from server
async function getAPiData() {
    const res = await fetch("https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093");
    const {
        data
    } = await res.json();
    for (let i = 0; i < data.length; i++) {
        const productData = data[i];
        productCard(productData);
    }
}
getAPiData();