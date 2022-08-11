import Link from "next/link"
import { urlFor } from "../../lib/client"
import s from './Product.module.css'

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className={s.card}>
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className={s.image}
          />
          <div>
            <p className={s.name}>{name}</p>
            <p className={s.price}>${price}</p>
          </div>
        </div>

      </Link>
    </div>
  )
}

export default Product