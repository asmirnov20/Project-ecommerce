import { createContext, useContext, useState, useEffect } from "react";
// pop-up уведомление после добавления продукта
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    // local storage 
    useEffect(() => {
        const data = localStorage.getItem('cartItems')
        console.log(data)
        if (data) {
            setCartItems(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    // сохранение цены и количества в local storage
    useEffect(() => {
        if (cartItems.length > 0) {
            const storageQuant = [...cartItems]
            const quant = []
            storageQuant.forEach(item => quant.push(item.quantity))
            setTotalQuantities(quant.reduce((prev, curr) => prev + curr))

            const storagePrice = [...cartItems]
            const totPrice = []
            storagePrice.forEach(item => totPrice.push(item.price * item.quantity))
            setTotalPrice(totPrice.reduce((prev, curr) => prev + curr))
        }
    }, [cartItems])

    const onAdd = (product, quantity) => {
        const isProductInCart = cartItems.find(item => product._id === item._id)

        setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity)

        // если продукт в корзине, то обновляем его количество
        if (isProductInCart) {
            const updatedCartItems = cartItems.map(cartProduct => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems)
            // добавляем продукт с обновленным количеством
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }])
        }
        toast.success(`${qty} ${product.name} added to the cart`)
    }

    let foundProduct;
    let index;

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find(item => item._id === id)
        index = cartItems.findIndex(product => product._id === id)

        //обновляем количество
        if (value === 'increment') {

            setCartItems(cartItems =>
                cartItems.map(item =>
                    item._id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item))

            setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        }
        else if (value === 'decrement') {

            if (foundProduct.quantity > 1) {
                setCartItems(cartItems =>
                    cartItems.map(item =>
                        item._id === id
                            ? { ...item, quantity: item.quantity - 1 }
                            : item))

                setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            } else if (foundProduct.quantity == 1) {
                onRemove(foundProduct)
            }
        }
    }

    const onRemove = (product) => {
        const foundProduct = cartItems.find(item => item._id === product._id)
        const newCartItems = cartItems.filter(item => item._id !== product._id)

        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)
        setCartItems(newCartItems)

        localStorage.removeItem('cartItems', product)
    }

    const increaseQty = () => {
        setQty(prevQty => prevQty + 1)
    }

    const decreaseQty = () => {
        setQty(prevQty => {
            if (prevQty - 1 < 1) return 1
            return prevQty - 1
        })
    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                increaseQty,
                decreaseQty,
                onAdd,
                setShowCart,
                toggleCartItemQuantity,
                onRemove,
                setTotalPrice,
                setTotalQuantities,
                setCartItems,
                setQty
            }}
        >
            {children}
        </Context.Provider >
    )
}

export const useStateContext = () => useContext(Context)