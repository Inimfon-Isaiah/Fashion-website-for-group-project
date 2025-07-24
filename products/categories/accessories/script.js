let cartCount = 0;

function addToCart(name) {
    const toast = document.getElementById("toast");
    toast.textContent = `🎉 ${name} added to cart`
    toast.className = "show";
    cartCount++;
    document.getElementById("cart-count").textContent = cartCount;

    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}