import { TiDeleteOutline } from 'react-icons/ti'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { urlFor } from '../../../lib/client'
import s from './CartItem.module.css'
import { useStateContext } from '../../../context/StateContext'

const CartItem = ({ item }) => {
  const { toggleCartItemQuantity } = useStateContext()
  return (
    <>
      <div className={s.product} key={item._id}>
        <img src={urlFor(item?.image[0])} alt='product' className={s.productImage} />
        <div>
          <div className={`${s.flex} ${s.top}`}>
            <h5>{item.name}</h5>
            <button
              type='button'
              className={s.removeItem}
              onClick=''
            >
              <TiDeleteOutline />
            </button>

          </div>
          <div className={`${s.flex} ${s.bottom}`}>
            <div>
              <p className={s.quantityDesc}>
                <span className={s.minus} onClick={() => toggleCartItemQuantity(item._id, 'decrement')}><AiOutlineMinus /></span>
                <span className={s.num} >{item.quantity}</span>
                <span className={s.plus} onClick={() => toggleCartItemQuantity(item._id, 'increment')}><AiOutlinePlus /></span>
              </p>
            </div>
            <h4>${item.price.toFixed(2)}</h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartItem