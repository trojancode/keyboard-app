import React, { useEffect } from 'react'
import { useGameContext } from '../Context/GameContext'

const TextScreen = () => {
    let gameContext = useGameContext()
    return (
        <div className=' bg-white rounded-xl  p-6 py-14 max-w-lg mt-6 mb-8 mx-4 md:mx-auto text-center'>

            {
                gameContext.state.status === "success" && (
                    <h1 className=' font-extrabold text-5xl text-green-600'>Success</h1>
                )
            }
            {
                gameContext.state.status === "failed" && (
                    <h1 className=' font-extrabold text-5xl text-green-600'>Failed</h1>
                )
            }
            {
                (gameContext.state.status === "start" || gameContext.state.status === "idle") && (
                    <h1 className=' font-extrabold text-5xl text-green-600'>{gameContext.state.letter}</h1>
                )
            }

        </div>
    )
}

export default TextScreen