import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'
import { useStateContext } from '../context/StateContext'
import { runFireworks } from '../lib/utils'
import s from './success.module.css'

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks()
    }, [setCartItems, setTotalPrice, setTotalQuantities])

    return (
        <div className={s.wrapper}>
            <div className={s.success}>
                <p className={s.icon}>
                    <BsBagCheckFill />
                </p>
                <h2>Thank you for your order!</h2>
                <p className={s.emailMessage}>Check your email inbox for the receipt</p>
                <p className={s.description}>
                    If you have any questions, please email
                    <a className={s.email} href='mailto:order@example.com'>
                        order@example.com
                    </a>
                </p>
                <Link href='/'>
                    <button type='button' className={s.btn}>
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success