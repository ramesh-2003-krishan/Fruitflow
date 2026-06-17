import { addToCart, getCart, getCartCount, getCartTotal } from "../utils/cart.js"


addToCart(product, 2)


console.log(getCartCount())          
console.log(getCartTotal())         
console.log(getCart())              


updateQuantity("productID", 5)
removeFromCart("productID")
clearCart()