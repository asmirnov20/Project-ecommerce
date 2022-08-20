import Link from 'next/link'
import { urlFor } from '../../lib/client'
import s from './HeroBanner.module.css'
import Countdown from './CountDown'
import { motion } from 'framer-motion'
import { stagger, mainStagger, fadeInUp, fadeInRight, productFadeInUp } from '../../animations/animations'

const HeroBanner = ({ heroBanner }) => {
  return (
    <motion.div variants={stagger}>
      <motion.div className={s.container} variants={fadeInUp} >
        <motion.div className={s.flex} variants={mainStagger} >
          <motion.p className={s.beatsSolo} variants={fadeInRight}>{heroBanner.smallText} </motion.p>
          <motion.h3 variants={fadeInRight}>{heroBanner.midText}</motion.h3>
          <motion.h1 variants={fadeInRight}>{heroBanner.largeText1}</motion.h1>
          <motion.img src={urlFor(heroBanner.image)} alt="headphones" className={s.image} variants={productFadeInUp} />

          <Link href={`/product/${heroBanner.product}`}>
            <motion.button type='button' variants={fadeInRight}
              whileHover={{ scale: 1.15, textShadow: '0px 0px 3px rgb(255,255,255)', boxShadow: '0px 0px 8px rgb(0,0,0)' }}
              whileTap={{ scale: 0.8 }}
            >{heroBanner.buttonText}</motion.button>
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