import Link from "next/link"
import { urlFor } from "../../lib/client"
import s from './FooterBanner.module.css'

const FooterBanner = ({ footerBanner: { discount, largeText1, largeText2, saletime, smallText, midText, desc, product, buttonText, image } }) => {
  return (
    <div className={s.container}>
      <div className={s.desc}>
        <div className={s.left}>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saletime}</p>
        </div>
        <div className={s.right}>
          <p>{smallText}</p>
          <p>{midText}</p>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <img src={urlFor(image)} className={s.image} />
      </div>
    </div>
  )
}

export default FooterBanner