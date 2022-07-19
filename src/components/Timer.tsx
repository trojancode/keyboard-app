import React, { useEffect } from 'react'
import {  useGameContext } from '../Context/GameContext'
import { getTimeFromLocal, saveTimeToLocal } from '../handler';
import { useTimer } from '../hooks';


const Timer = () => {
    let gameContext = useGameContext();
    const [time, isActive, startTimer, stop, restartTimer, addPenalty] = useTimer();
    useEffect(() => {
        if (gameContext.state.status == "start" && gameContext.state.action == "penalty") {
            console.log("Penalty");
            if (!isActive) startTimer()
            addPenalty()
        }
        if (gameContext.state.status == "start" && !isActive) {
            console.log("timer start", isActive);
            startTimer()
        }
        if (gameContext.state.action == "reset" && isActive) {
            restartTimer()
        }
        if (gameContext.state.status === "finish" && isActive) {
            console.log("timer end");
            let localMinTime = getTimeFromLocal();
            if (localMinTime === 0 || time < localMinTime) {
                saveTimeToLocal(time)
                gameContext.dispatch({
                    type: "success"
                })
            } else {
                console.log("game failed");
                gameContext.dispatch({
                    type: "failed"
                })
            }
            stop()
        }
    }, [gameContext])

    /**
     * @param time time in milliseconds
     * @returns Formatted time as string `%min% %sec%.%ms% s`
     */
    const formatTime = (time: number) => {
        let _ft = {
            ms: Math.floor((time % 1000) / 10),
            sec: Math.floor((time / 1000) % 60),
            min: Math.floor((time / 1000 / 60) % 60)
        }
        return `${_ft.min > 0 ? ` ${_ft.min}m ` : ""}${_ft.sec}.${_ft.ms}s`
    }

    return (
        <div className='text-center text-white'>
            <p className='my-3'>Time:{formatTime(time)}</p>
            <p className=' opacity-70 my-3'>my best time: {formatTime(gameContext.state.minTime)}!</p>
        </div>
    )
}

export default Timer