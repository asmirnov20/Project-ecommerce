import { client, urlFor } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Product from '../../components/Product/Product'
import { useState } from 'react'
import s from './[slug].module.css'
import { useStateContext } from '../../context/StateContext'

const ProductDetails = ({ products, product }) => {
    const { image, name, details, price } = product
    const [index, setIndex] = useState(0)
    const { qty, increaseQty, decreaseQty, onAdd } = useStateContext()


    return (
        <div>
            <div className={s.container}>
                <div>
                    <div>
                        <img
                            src={urlFor(image && image[index])}
                            className={s.detailImage}
                            alt='product'
                        />
                    </div>
                    <div className={s.imagesContainer}>
                        {image?.map((item, ind) => (
                            <img
                                key={ind}
                                src={urlFor(item)}
                                className={ind === index
                                    ? `${s.smallImage} ${s.selectedImage}`
                                    : `${s.smallImage}`}
                                onMouseEnter={() => setIndex(ind)
                                }
                                alt='product-image'
                            />
                        ))}
                    </div>
                </div>

                <div className={s.description}>
                    <h1>{name}</h1>
                    <div className={s.reviews}>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details:</h4>
                    <p>{details}</p>
                    <p className={s.oldPrice}>$15.99</p>
                    <p className={s.price}>${price}</p>

                    <div className={s.quantity}>
                        <h3>Quantity:</h3>
                        <p className={s.quantityDesc}>
                            <span className={s.minus} onClick={decreaseQty}><AiOutlineMinus /></span>
                            <span className={s.num}>{qty}</span>
                            <span className={s.plus} onClick={increaseQty}><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className={s.buttons}>
                        <button type='button' className={s.addToCart} onClick={() => onAdd(product, qty)}>
                            Add to Cart</button>
                        <button type='button' className={s.buyNow} onClick=''>
                            Buy Now</button>
                    </div>
                </div>
            </div>

            <div className={s.maylikeWrapper}>
                <h2>You may also like</h2>
                <div className={s.marquee}>
                    <div className={`${s.maylikeContainer} ${s.track}`}>
                        {products.map(item => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type=="product"]'

    const product = await client.fetch(query)
    const products = await client.fetch(productsQuery)

    return {
        props: { products, product }
    }
}

export const getStaticPaths = async () => {
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