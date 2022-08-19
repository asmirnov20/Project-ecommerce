import Link from 'next/link'
import { urlFor } from '../../lib/client'
import s from './HeroBanner.module.css'
import Countdown from './CountDown'
import { motion } from 'framer-motion'
import { stagger, fadeInUp } from '../../animations/animations'

const HeroBanner = ({ heroBanner }) => {
  return (
    <motion.div variants={stagger}>
      <motion.div className={s.container} variants={fadeInUp} >
        <motion.div className={s.flex} variants={stagger} >
          <p className={s.beatsSolo}>{heroBanner.smallText}</p>
          <h3>{heroBanner.midText}</h3>
          <h1>{heroBanner.largeText1}</h1>
          <motion.img src={urlFor(heroBanner.image)} alt="headphones" className={s.image} variants={fadeInUp} />

          <Link href={`/product/${heroBanner.product}`}>
            <button type='button'>{heroBanner.buttonText}</button>
          </Link>

        </motion.div>

        <motion.div variants={fadeInUp}>
          <Countdown />
        </motion.div>

      </motion.div>
    </motion.div>
  )
}

export default HeroBanner