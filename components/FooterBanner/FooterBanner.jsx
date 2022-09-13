import Link from "next/link"
import { urlFor } from "../../lib/client"
import s from './FooterBanner.module.css'
import { motion } from 'framer-motion'
import { fadeInLeft, fadeInRight, fadeInUp, footerImageAnimate, mainStagger } from "../../animations/animations"
import Countdown from "./Countdown"

const FooterBanner = ({ footerBanner: { discount, largeText1, largeText2, saletime, smallText, midText, desc, product, buttonText, image } }) => {
  return (
    <motion.div className={s.container} variants={fadeInUp}
      initial='initial'
      whileInView='animate'
      viewport={{ once: true }}>
      <div className={s.desc} >
        <motion.div className={s.left} variants={mainStagger}>
          <motion.p variants={fadeInRight}>{discount}</motion.p>
          <motion.h3 variants={fadeInRight}>{largeText1}</motion.h3>
          <motion.h3 variants={fadeInRight}>{largeText2}</motion.h3>
          <motion.p variants={fadeInRight}>{saletime}</motion.p>
        </motion.div>

        <Countdown />

        <motion.div className={s.right} variants={mainStagger}>
          <motion.img src={urlFor(image)} className={s.image} variants={footerImageAnimate} />
          <Link href={`/product/${product}`}>
            <motion.button type="button"
              variants={fadeInLeft}
              whileHover={{
                scale: 1.1, textShadow: '0px 0px 1px #f02d34', boxShadow: '0px 0px 10px rgb(0,0,0)'
              }}
              whileTap={{
                scale: 0.9
              }}
            >
              {buttonText}
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </motion.div>
  )
}

export default FooterBanner