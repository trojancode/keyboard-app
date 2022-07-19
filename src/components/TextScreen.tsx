import React from 'react'
import { useGameContext } from '../Context/GameContext'
import { FAILED, IDLE, STARTED, SUCCESS } from '../Context/statusTypes'

const TextScreen = () => {
    let gameContext = useGameContext()
    return (
        <div className=' bg-white rounded-[18px]  p-6 py-14 max-w-lg mt-6 mb-8 mx-4 md:mx-auto text-center'>
            {
                gameContext.state.status === SUCCESS && (
                    <h1 className=' font-extrabold text-5xl text-green-600'>Success</h1>
                )
            }
            {
                gameContext.state.status === FAILED && (
                    <h1 className=' font-extrabold text-5xl text-green-600'>Failed</h1>
                )
            }
            {
                (gameContext.state.status === STARTED || gameContext.state.status === IDLE) && (
                    <h1 className=' font-extrabold text-5xl text-green-600'>{gameContext.state.letter}</h1>
                )
            }

        </div>
    )
}

export default TextScreen