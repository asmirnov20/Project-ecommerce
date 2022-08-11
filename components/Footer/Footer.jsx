import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'
import s from './Footer.module.css'

const Footer = () => {
  return (
    <div className={s.container}>
      <p>2022 AS Headphones All rights reserved</p>
      <p className={s.icons}>
        <a href='https://www.instagram.com' target='_blank' rel='noreferrer'>
          <AiFillInstagram />
        </a>
        <a href='https://www.twitter.com/' target='_blank' rel='noreferrer'>
          <AiOutlineTwitter />
        </a>
      </p>
    </div>
  )
}

export default Footer