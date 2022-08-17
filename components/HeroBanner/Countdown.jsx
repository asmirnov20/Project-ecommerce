import { useState, useEffect, useRef } from "react";
import s from './Countdown.module.css'

const Countdown = () => {
    const [timerDays, setTimerDays] = useState('00')
    const [timerHours, setTimerours] = useState('00')
    const [timerMinutes, setTimerMinutes] = useState('00')
    const [timerSeconds, setTimerSeconds] = useState('00')

    let interval = useRef()

    function startTimer() {
        const futureDate = new Date(2022, 8, 30, 12, 0, 0).getTime()

        interval = setInterval(() => {
            const today = new Date().getTime()
            const distance = futureDate - today

            const oneDay = 24 * 60 * 60 * 1000;
            const oneHour = 60 * 60 * 1000;
            const oneMinute = 60 * 1000;
            const oneSecond = 1000;

            // поделить на 1 час остаток от  t/oneDay 
            const days = Math.floor(distance / oneDay);
            const hours = Math.floor((distance % oneDay) / oneHour);
            const minutes = Math.floor((distance % oneHour) / oneMinute);
            const seconds = Math.floor((distance % oneMinute) / oneSecond);

            const formatDate = item => item < 10 ? `0${item}` : item

            if (distance < 0) {
                clearInterval(interval.current)
            } else {
                setTimerDays(formatDate(days))
                setTimerours(formatDate(hours))
                setTimerMinutes(formatDate(minutes))
                setTimerSeconds(formatDate(seconds))
            }
        }, 1000)
    };

    useEffect(() => {
        const someref = interval.current
        startTimer();
        return () => {
            clearInterval(someref)
        }
    })

    return (
        <div className={s.wrapper}>
            <div className={s.name}>Sale ends in:</div>
            <div className={s.deadline}>
                <div className={s.format}>
                    <div>
                        <h4>{timerDays}</h4>
                        <span>{timerDays == 1 ? 'day' : 'days'}</span>
                    </div>
                </div>

                <div className={s.format}>
                    <div>
                        <h4>{timerHours}:</h4>
                        <span>{timerHours == 1 ? 'hour' : 'hours'}</span>
                    </div>
                </div>

                <div className={s.format}>
                    <div>
                        <h4>{timerMinutes}:</h4>
                        <span>{timerMinutes == 1 ? 'minute' : 'minutes'}</span>
                    </div>
                </div>

                <div className={s.format}>
                    <div>
                        <h4>{timerSeconds}</h4>
                        <span>{timerSeconds == 1 ? 'second' : 'seconds'}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Countdown