const CART_KEY = "cart"

export function getCart() {
    try {
        let cart = localStorage.getItem(CART_KEY)
        return cart ? JSON.parse(cart) : []
    } catch (error) {
        console.error("Error getting cart:", error)
        return []
    }
}

export function addToCart(product, quantity) {
    try {
        if (!product || !product.productID) {
            console.error("Invalid product")
            return false
        }

        if (quantity < 1 || !Number.isInteger(quantity)) {
            console.error("Invalid quantity")
            return false
        }

        let cart = getCart()

        const existingItem = cart.find(
            (item) => item.productID === product.productID
        )

        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            cart.push({
                productID: product.productID,
                name: product.name,
                price: product.price,
                lablePrice: product.lablePrice || product.price,
                image: product.images?.[0] || product.image,
                quantity: quantity
            })
        }

        localStorage.setItem(CART_KEY, JSON.stringify(cart))
        return true
    } catch (error) {
        console.error("Error adding to cart:", error)
        return false
    }
}

export function removeFromCart(productID) {
    try {
        if (!productID) {
            console.error("Product ID is required")
            return false
        }

        let cart = getCart()
        const newCart = cart.filter((item) => item.productID !== productID)

        if (newCart.length === cart.length) {
            console.warn(`Product ${productID} not found in cart`)
            return false
        }

        localStorage.setItem(CART_KEY, JSON.stringify(newCart))
        return true
    } catch (error) {
        console.error("Error removing from cart:", error)
        return false
    }
}

export function updateQuantity(productID, quantity) {
    try {
        if (!productID || quantity < 1) {
            console.error("Invalid product ID or quantity")
            return false
        }

        let cart = getCart()
        const item = cart.find((item) => item.productID === productID)

        if (!item) {
            console.error(`Product ${productID} not found in cart`)
            return false
        }

        if (quantity === 0) {
            return removeFromCart(productID)
        }

        item.quantity = quantity
        localStorage.setItem(CART_KEY, JSON.stringify(cart))
        return true
    } catch (error) {
        console.error("Error updating quantity:", error)
        return false
    }
}

export function getCartCount() {
    try {
        const cart = getCart()
        return cart.reduce((total, item) => total + item.quantity, 0)
    } catch (error) {
        console.error("Error getting cart count:", error)
        return 0
    }
}

export function getCartSubtotal() {
    try {
        const cart = getCart()
        return cart.reduce((total, item) => total + item.price * item.quantity, 0)
    } catch (error) {
        console.error("Error calculating subtotal:", error)
        return 0
    }
}

export function getCartTotal() {
    try {
        const cart = getCart()
        let subtotal = 0
        let savings = 0

        cart.forEach((item) => {
            const itemTotal = item.price * item.quantity
            const originalTotal = (item.lablePrice || item.price) * item.quantity
            subtotal += itemTotal
            savings += originalTotal - itemTotal
        })

        return {
            subtotal: parseFloat(subtotal.toFixed(2)),
            savings: parseFloat(savings.toFixed(2)),
            total: parseFloat((subtotal).toFixed(2))
        }
    } catch (error) {
        console.error("Error calculating total:", error)
        return { subtotal: 0, savings: 0, total: 0 }
    }
}

export function isInCart(productID) {
    try {
        const cart = getCart()
        return cart.some((item) => item.productID === productID)
    } catch (error) {
        console.error("Error checking cart:", error)
        return false
    }
}

export function getCartItem(productID) {
    try {
        const cart = getCart()
        return cart.find((item) => item.productID === productID) || null
    } catch (error) {
        console.error("Error getting cart item:", error)
        return null
    }
}

export function clearCart() {
    try {
        localStorage.removeItem(CART_KEY)
        return true
    } catch (error) {
        console.error("Error clearing cart:", error)
        return false
    }
}

export function getCartItemCount() {
    try {
        const cart = getCart()
        return cart.length
    } catch (error) {
        console.error("Error getting item count:", error)
        return 0
    }
}

export function validateCart() {
    try {
        let cart = getCart()
        const originalLength = cart.length

        cart = cart.filter(
            (item) =>
                item.productID &&
                item.name &&
                item.price >= 0 &&
                item.quantity > 0
        )

        localStorage.setItem(CART_KEY, JSON.stringify(cart))
        return originalLength - cart.length
    } catch (error) {
        console.error("Error validating cart:", error)
        return 0
    }
}

export function exportCart() {
    try {
        return getCart()
    } catch (error) {
        console.error("Error exporting cart:", error)
        return []
    }
}