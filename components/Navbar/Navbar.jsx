import Link from "next/link"
import { AiOutlineShopping } from 'react-icons/ai'
import logoImage from '../../../../assets/my_logo.png'
import s from './Navbar.module.css'

const Navbar = () => {
  return (
    <div className={s.container}>
      <Link href='/'>
        <img src={logoImage.src} alt='logo' className={s.logo} />
      </Link>

      <button
        className={s.cartIcon}
        onClick=''>
        <AiOutlineShopping />
        <span className={s.quantity}>3</span>
      </button>
    </div>
  )
}

export default Navbar