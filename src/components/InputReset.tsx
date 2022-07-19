import React, { ChangeEvent, useEffect, useRef } from 'react'
import { useGameContext } from '../Context/GameContext'

const InputReset = () => {
    let inputRef = useRef(null)

    let gameContext = useGameContext()
    const handleResetButton = (e: any) => {
        gameContext.dispatch({
            type: 'reset'
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
      if(gameContext.state.status=== "finish" ){
        resetInput()
      }
    }, [gameContext])
    

    const handleInput =async (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.toUpperCase()
        //prevent input after success or failer. user need to reset to play again.
        if(gameContext.state.status==="success"||gameContext.state.status==="failed"){
            return;
        }
        //incase of wrong character input
        if (value[value.length - 1] != gameContext.state.letter) {
            gameContext.dispatch({
                type: 'penalty'
            })
            return;
        }

        //incase of finish
        if (value[value.length - 1] === gameContext.state.letter && gameContext.state.letterCount > 18) {
            gameContext.dispatch({
                type:"finish"
            })
        }
        //starting on input 
        if (value.length === 1) {
            gameContext.dispatch({
                type: 'start',
                value: {
                    letter: value[0]
                }
            })
        } else if (value.length > 1) {
            gameContext.dispatch({
                type: 'next_alpha',
                value: {
                    letter: value[value.length - 1]
                }
            })
        }
    }

    return (
        <div className="justify-center text-center mt-10 flex text-sm">
            <input onChange={handleInput} ref={inputRef} type="text" className=' w-full max-w-sm py-1 px-3 outline-none text-center font-bold bg-orange-100 placeholder:text-center  text-black placeholder:text-gray-600 ' placeholder='Type here..!' />
            <button className=' uppercase py-1 px-3 bg-rose-500 text-white' onClick={handleResetButton}>Reset</button>
        </div>
    )
}

export default InputReset