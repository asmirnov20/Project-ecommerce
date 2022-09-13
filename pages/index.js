import React from 'react'
import { client } from '../lib/client'
import { Product, FooterBanner, HeroBanner } from '../components'
import { motion } from 'framer-motion'
import {fadeInUp, productsMainAnimate } from '../animations/animations'


const Home = ({ products, bannerData }) => {
  
  return (
    <motion.div
      initial='initial'
      whileInView='animate'
      exit={{ opacity: 0 }}
    >
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <motion.div variants={fadeInUp}>
        <motion.div
          variants={fadeInUp}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
          className='products-heading'
        >
          <h2>Best Selling Products</h2>
          <p>Speakers of any variations</p>
        </motion.div>
        <motion.div
          variants={productsMainAnimate}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
          className='products-container'
        >
          {products?.map(product =>
            <Product key={product._id} product={product}
            />)}

        </motion.div>
      </motion.div>

      <motion.div
        className='footer-wrapper'
      >
        <FooterBanner footerBanner={bannerData && bannerData[0]} />
      </motion.div>

    </motion.div >
  )
}

export const getServerSideProps = async () => {

  const query = '*[_type == "product"]';
  const products = await client.fetch(query)


  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: { products, bannerData }
  }
}


export default Home