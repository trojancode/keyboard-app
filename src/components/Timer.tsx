import React, { useEffect } from 'react'
import { ADD_PENALTY, FAILED_GAME, RESET_GAME, SUCCESS_GAME } from '../Context/actionTypes';
import { useGameContext } from '../Context/GameContext'
import { FINISHED, STARTED } from '../Context/statusTypes';
import { getTimeFromLocal, saveTimeToLocal } from '../handler';
import { useTimer } from '../hooks';


const Timer = () => {
    let gameContext = useGameContext();
    const [time, isActive, startTimer, stop, restartTimer, addPenalty] = useTimer();
    useEffect(() => {
        //when ADD_PENALTY is dispatched 
        if (gameContext.state.status === STARTED && gameContext.state.action === ADD_PENALTY) {
            if (!isActive) startTimer()
            addPenalty()
            return;
        }
        //When Game Starts
        if (gameContext.state.status === STARTED && !isActive) {
            startTimer()
            return;
        }
        //When Game is running and resets
        if (gameContext.state.action === RESET_GAME && isActive) {
            restartTimer()
            return;

        }
        //when FINISH_GAME is dispatched
        if (gameContext.state.status === FINISHED && isActive) {
            let localMinTime = getTimeFromLocal();
            if (localMinTime === 0 || time < localMinTime) {
                //game success
                saveTimeToLocal(time)
                gameContext.dispatch({
                    type: SUCCESS_GAME
                })
            } else {
                //game failed
                gameContext.dispatch({
                    type: FAILED_GAME
                })
            }
            stop()
            return;
        }
        // eslint-disable-next-line
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