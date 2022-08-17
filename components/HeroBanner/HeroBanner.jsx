import Link from 'next/link'
import { urlFor } from '../../lib/client'
import s from './HeroBanner.module.css'
import Countdown from './CountDown'

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className={s.container}>
      <div className={s.flex}>
        <p className={s.beatsSolo}>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image)} alt="headphones" className={s.image} />
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type='button'>{heroBanner.buttonText}</button>
          </Link>
        </div>
      </div>
      <Countdown />
    </div>
  )
}

export default HeroBanner