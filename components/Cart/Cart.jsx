import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { useStateContext } from '../../context/StateContext'
import CartItem from './CartItem/CartItem'
import s from './Cart.module.css'
import getStripe from '../../lib/getStripe'

const Cart = () => {
  const { totalPrice, totalQuantities, cartItems, setShowCart } = useStateContext()

  async function handleCheckout() {
    // получаем инстанс страйп промиса
    const stripe = await getStripe()
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems)
    })

    if (response.statusCode === 500) return

    const data = await response.json()

    toast.loading('Redicrecting...')

    // информация будет храниться в бекенде даже если пользователь выйдет, а потом захочет продолжить
    stripe.redirectToCheckout({ sessionId: data.id })
    console.log(data);
  }

  const wrapperRef = useRef()
  useEffect(() => {
    const handleClickOutside = e => {
      if (wrapperRef.current == e.target) {
        setShowCart(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })

  return (
    <div className={s.wrapper} ref={wrapperRef}>
      <div className={s.mainContainer}>
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
        <div className={s.itemContainer}>
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
              disabled={cartItems.length === 0 ? true : false}
              className={cartItems.length === 0 ? `${s.disabled} ${s.button}` : `${s.button} `}
              onClick={handleCheckout}>
              Pay with Stripe
            </button>
          </div>
        </div>
      </div>

    </div >
  )
}

export default Cart