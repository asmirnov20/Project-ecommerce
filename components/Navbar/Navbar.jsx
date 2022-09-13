import Link from "next/link"
import { AiOutlineShopping } from 'react-icons/ai'
import logoImage from '../../public/my_logo.png'
import Cart from "../Cart/Cart"
import s from './Navbar.module.css'
import { useStateContext } from "../../context/StateContext"
import { AnimatePresence } from 'framer-motion'

const Navbar = () => {

  const { showCart, setShowCart, totalQuantities } = useStateContext()
  return (
    <div className={s.container}>
      <Link href='/'>
        <img src={logoImage.src} alt='logo' className={s.logo} />
      </Link>

      <button
        className={s.cartIcon}
        onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className={s.quantity}>{totalQuantities}</span>
      </button>

      <AnimatePresence>
        {showCart && <Cart />}
      </AnimatePresence>
    </div>
  )
}

export default Navbar