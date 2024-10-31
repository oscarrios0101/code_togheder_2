const products = [
  {
    name: "Camisa negra bonita",
    price: 4,
    image: "img/black_shirt.jpg",
    quantity: 1,
    stock: 10,
    id: generateShortId(),
  },
  {
    name: "hoodie cafe",
    price: 2,
    image: "img/brown_hoddie.jpg",
    quantity: 1,
    stock: 10,
    id: generateShortId(),
  },
  {
    name: "Camisa ramen bonita",
    price: 1,
    image: "img/ramen_shirt.jpg",
    quantity: 1,
    stock: 10,
    id: generateShortId(),
  },
];

let cartItems = [];

//create an unique id
function generateShortId() {
  const fullId = crypto.randomUUID();
  // Extract and truncate the ID to 10 digits
  return fullId.slice(0, 20);
}

const productsSection = document.querySelector(".products");
const productTemplate = document.querySelector(".grid__product");

function updateBadge() {
  const cartBadge = document.querySelector(".cart-badge");
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  if (totalQuantity === 0) {
    cartBadge.style.display = "none";
  } else {
    cartBadge.style.display = "block";
    cartBadge.textContent = totalQuantity.toString();
  }
}

//function to render products in cart

function renderCartItems() {
  updateBadge();
  const cartElements = document.querySelector(".cart__elements");
  const cartTemplate = document.querySelector(".cart-template");

  // Clear the cart elements
  cartElements.innerHTML = "";

  // Iterate over cart items and clone template
  cartItems.forEach((item) => {
    const cartItem = cartTemplate.content.cloneNode(true);
    // Populate the cloned template
    cartItem.querySelector(".cart__img").src = item.image;
    cartItem.querySelector(".cart__name").textContent = item.name;
    cartItem.querySelector(
      ".cart__price"
    ).textContent = `Precio: $${item.price}`;
    cartItem.querySelector(
      ".cart__quantity"
    ).textContent = `Cantidad: ${item.quantity}`;
    cartItem.querySelector(".cart__subtotal").textContent = `Subtotal: $${
      item.price * item.quantity
    }`;

    // Append the cloned template to the cart elements
    cartElements.appendChild(cartItem);
    feather.replace();
  });
}

function createProductCart(product) {
  const productCard = productTemplate.content.cloneNode(true);
  productCard.querySelector(".product__img").src = product.image;
  productCard.querySelector(".product__name").textContent = product.name;
  productCard.querySelector(
    ".product__price"
  ).textContent = `$${product.price}`;
  productCard.querySelector(".product").dataset.productId = product.id;
  productsSection.appendChild(productCard);
}

// Function to create a product article and append it to the products section

products.forEach((product) => {
  createProductCart(product);
  // console.log(product);
});

// alert("javascript is loading");

productsSection.addEventListener("click", (event) => {
  if (event.target.classList.contains("product__button")) {
    console.log("clicked");
    const productId = event.target.closest(".product").dataset.productId;
    const product = products.find((p) => p.id === productId);

    checkProductInCart(product);
  }
});

// function to check if a product is already in the cart and update the quantity if is already in the cart

function checkProductInCart(product) {
  const productInCart = cartItems.find((p) => p.id === product.id);
  if (productInCart) {
    productInCart.quantity++;
    renderCartItems();
    calculateTotalPrice();
  } else {
    cartItems.push(product);
    renderCartItems();
    calculateTotalPrice();
  }
}

//function to show cart

document.querySelector("header").addEventListener("click", (event) => {
  if (event.target.id === "shopping-cart") {
    const cart = document.querySelector(".cart");
    cart.classList.toggle("show");
  }
});
//function to close cart
document.querySelector(".cart").addEventListener("click", (event) => {
  if (event.target.classList.contains("close-button")) {
    const cart = document.querySelector(".cart");
    cart.classList.toggle("show");
  }
});

//function to calculate total price of cart

function calculateTotalPrice() {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });
  console.log(total);
  document.querySelector(".cart__total").textContent = `Total: $${total}`;
}

//function to add the event listeners to the cart elements
function addEventListenersToCartElements() {
  const cartElements = document.querySelector(".cart__elements");

  cartElements.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("add-product")) {
      const productId = target.closest(".cart__item").dataset.productId;
      const product = cartItems.find((p) => p.id === productId);
      product.quantity++;
      renderCartItems();
      calculateTotalPrice();
    } else if (target.classList.contains("remove-product")) {
      const productId = target.closest(".cart__item").dataset.productId;
      const product = cartItems.find((p) => p.id === productId);
      if (product.quantity > 1) {
        product.quantity--;
      } else {
        cartItems = cartItems.filter((p) => p.id !== productId);
      }
      renderCartItems();
      calculateTotalPrice();
    } else if (target.classList.contains("delete-product")) {
      const productId = target.closest(".cart__item").dataset.productId;
      cartItems = cartItems.filter((p) => p.id !== productId);
      renderCartItems();
      calculateTotalPrice();
    }
  });
}