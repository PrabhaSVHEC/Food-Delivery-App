// Home page
if (document.getElementById("restaurantList")) {
  const container = document.getElementById("restaurantList");
  restaurants.forEach(res => {
    const div = document.createElement("div");
    div.className = "restaurant";
    div.innerHTML = `
      <h3>${res.name}</h3>
      <button onclick="window.location.href='restaurant.html?rid=${res.id}'">View Menu</button>
    `;
    container.appendChild(div);
  });
}

// Restaurant page
const params = new URLSearchParams(window.location.search);
const rid = params.get("rid");
if (rid) {
  const restaurant = restaurants.find(r => r.id == rid);
  if (restaurant) {
    document.getElementById("restaurantName").innerText = restaurant.name;
    const menuList = document.getElementById("menuItems");
    restaurant.menu.forEach(item => {
      const div = document.createElement("div");
      div.className = "menu-item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="menu-img">
        <p><strong>${item.name}</strong> - ₹${item.price}</p>
        <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
      `;
      menuList.appendChild(div);
    });
  }
}

// Cart Logic
let cart = [];
function addToCart(name, price) {
  cart.push({ name, price });
  displayCart();
}
function displayCart() {
  const list = document.getElementById("cartItems");
  list.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    list.appendChild(li);
  });
}
function placeOrder() {
  alert("Your order has been placed! 🎉");
  cart = [];
  displayCart();
}
