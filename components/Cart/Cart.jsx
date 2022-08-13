import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { useStateContext } from '../../context/StateContext'
import CartItem from './CartItem/CartItem'
import s from './Cart.module.css'

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart } = useStateContext()
  return (
    <div className={s.wrapper} ref={cartRef}>
      <button
        type='button'
        className={s.closeBtn}
        onClick={() => setShowCart(false)}
      >
        <AiOutlineLeft />
        <span className={s.heading}>Your Cart</span>
        <span className={s.totalNumber}>({totalQuantities} items)</span>
      </button>

      {/* Если в корзине нет продуктов */}
      {cartItems.length < 1 && (
        <div className={s.empty}>
          <AiOutlineShopping size={150} />
          <h3>Your shopping bag is empty</h3>
          <Link href='/'>
            <button
              type='button'
              onClick={() => setShowCart(false)}
              className={s.button}
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      )}

      {/* если есть */}
      <div className={s.container}>
        {cartItems.length >= 1 && cartItems.map(item =>
          <CartItem key={item._id} item={item} />)}
      </div>

      {/* нижняя часть */}
      <div className={s.bottom}>
        <div className={s.total}>
          <h3>Total:</h3>
          <h3>${totalPrice.toFixed(2)}</h3>
        </div>
        <div className={s.btnContainer}>
          <button
            type='button'
            className={s.button}
            onClick=''>
            Pay with Stripe
          </button>
        </div>
      </div>

    </div>
  )
}

export default Cart