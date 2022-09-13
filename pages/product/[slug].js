import { client, urlFor } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Product from '../../components/Product/Product'
import { useState, useEffect } from 'react'
import s from './[slug].module.css'
import { useStateContext } from '../../context/StateContext'
import { motion } from 'framer-motion'
import { productFadeInUp, stagger, fadeInRight, maylikeFadeInUp } from '../../animations/animations'
import { useRouter } from 'next/router'

const ProductDetails = ({ products, product }) => {
    const { image, name, details, price } = product
    const [index, setIndex] = useState(0)
    const { qty, increaseQty, decreaseQty, onAdd, setShowCart, setQty, getOldPrice, oldPrice } = useStateContext()

    const handleBuyNow = () => {
        onAdd(product, qty)
        setShowCart(true)
    }

    useEffect(() => {
        setQty(1)
        getOldPrice(price)
    }, [product])

    const router = useRouter()
    return (
        <motion.div exit={{ opacity: 0 }} initial='initial' animate='animate' key={router.query.slug}>
            <div className={s.container}>
                <motion.div variants={fadeInRight}>
                    <div>
                        <motion.img
                            src={urlFor(image && image[index])}
                            className={s.detailImage}
                            alt='product'
                        />
                    </div>
                    <div className={s.imagesContainer}>
                        {image?.map((item, ind) => (
                            <motion.img
                                key={ind}
                                src={urlFor(item)}
                                className={ind === index
                                    ? `${s.smallImage} ${s.selectedImage}`
                                    : `${s.smallImage}`}
                                onMouseEnter={() => setIndex(ind)
                                }
                                alt='product-image'
                                whileHover={{
                                    scale: 1.1, backgroundColor: '#f02d34', transition: { duration: 0.15 }
                                }}
                            />
                        ))}
                    </div>
                </motion.div>


                <motion.div variants={stagger} className={s.description} >
                    <motion.h1 variants={productFadeInUp} >{name}</motion.h1>
                    <motion.div variants={productFadeInUp} className={s.reviews}>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </motion.div>
                    <motion.h4 variants={productFadeInUp}>Details:</motion.h4>
                    <motion.p variants={productFadeInUp}>{details}</motion.p>
                    <motion.p variants={productFadeInUp} className={s.oldPrice}>{oldPrice}</motion.p>
                    <motion.p variants={productFadeInUp} className={s.price}>${price}</motion.p>

                    <motion.div variants={productFadeInUp} className={s.quantity}>
                        <h3>Quantity:</h3>
                        <p className={s.quantityDesc}>
                            <span className={s.minus} onClick={decreaseQty}><AiOutlineMinus /></span>
                            <span className={s.num}>{qty}</span>
                            <span className={s.plus} onClick={increaseQty}><AiOutlinePlus /></span>
                        </p>
                    </motion.div>
                    <motion.div variants={productFadeInUp} className={s.buttons}>
                        <button type='button' className={s.addToCart} onClick={() => onAdd(product, qty)}>
                            Add to Cart</button>
                        <button type='button' className={s.buyNow} onClick={(handleBuyNow)}>
                            Buy Now</button>
                    </motion.div>
                </motion.div>
            </div>


            <div className={s.maylikeWrapper}>
                <h2>You may also like</h2>
                <motion.div className={s.marquee} variants={maylikeFadeInUp} initial='initial' whileInView='animate'>
                    <motion.div className={`${s.maylikeContainer} ${s.track}`}>
                        {products.map(item => (
                            <Product key={item._id} product={item} />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </motion.div >
    )
}

export const getStaticProps = async ({ params: { slug } }) => {
    // получаем детали о продукте со страницы, на которой мы находимся
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    // получаем похожие продукты
    const productsQuery = '*[_type=="product"]'

    const product = await client.fetch(query)
    const products = await client.fetch(productsQuery)
    return {
        props: { products, product }
    }
}

export const getStaticPaths = async () => {
    // получаем свойство current у slug
    const query = `*[_type == 'product'] {
        slug{
            current
        }
    }`

    const products = await client.fetch(query)
    const paths = products.map(product => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export default ProductDetails