import Link from "next/link"
import { urlFor } from "../../lib/client"
import s from './Product.module.css'
import { motion } from 'framer-motion'

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <motion.div>
      <Link href={`/product/${slug.current}`} >
        <motion.div className={s.card} whileHover={{ scale: 1.1, transition: { duration: 0.4 } }} whileTap={{ scale: 0.95 }}>
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
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default Product