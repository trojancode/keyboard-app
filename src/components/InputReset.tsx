import React, { ChangeEvent, useEffect, useRef } from 'react'
import { ADD_PENALTY, FINISH_GAME, NEXT_ALPHA, RESET_GAME, START_GAME } from '../Context/actionTypes'
import { useGameContext } from '../Context/GameContext'
import { FAILED, SUCCESS } from '../Context/statusTypes'

const InputReset = () => {
    let inputRef = useRef(null)
    let gameContext = useGameContext()
    const handleResetButton = (e: any) => {
        gameContext.dispatch({
            type: RESET_GAME
        })
        resetInput()
    }

    const resetInput=()=>{
        if(inputRef){
            //@ts-ignore
            inputRef.current.value=''
        }
    }

    useEffect(() => {
      if(gameContext.state.status=== FAILED ||  gameContext.state.status=== SUCCESS ){
        resetInput()
      }
    }, [gameContext])
    

    const handleInput =async (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.toUpperCase()
        //prevent input after success or failer. user need to reset to play again.
        if(gameContext.state.status===SUCCESS||gameContext.state.status===FAILED){
            return;
        }
        //incase of wrong character input
        if (value[value.length - 1] !== gameContext.state.letter) {
            gameContext.dispatch({
                type: ADD_PENALTY
            })
            return;
        }

        //incase of finish
        if (value[value.length - 1] === gameContext.state.letter && gameContext.state.letterCount > 18) {
            gameContext.dispatch({
                type:FINISH_GAME
            })
        }
        //starting  
        if (value.length === 1) {
            gameContext.dispatch({
                type: START_GAME,
                value: {
                    letter: value[0]
                }
            })
        } else if (value.length > 1) {
            gameContext.dispatch({
                type: NEXT_ALPHA,
                value: {
                    letter: value[value.length - 1]
                }
            })
        }
    }

    return (
        <div className="justify-center text-center mt-10 flex text-sm">
            <input onChange={handleInput} ref={inputRef} type="text" className=' uppercase w-full max-w-sm py-1 px-3 outline-none text-center font-bold bg-warmWhite placeholder:text-center  text-black placeholder:text-gray-400 ' placeholder='Type here..!' />
            <button className=' font-bold py-2 px-4 bg-rose-500 text-white' onClick={handleResetButton}>Reset</button>
        </div>
    )
}

export default InputReset