import { createContext, useContext, useReducer, useState } from "react"
import storageHandler from "../handler/storageHandler";

type ActionTypes = 'start' | 'next_alpha' | 'penalty' | 'reset' | 'success' | 'finish' | 'failed' | undefined;
interface Action {
    type: ActionTypes
    value: {
        letter: string
    } | undefined
}
type Dispatch = (action: Action) => void
type Status =  'success' | 'idle' | 'start' | 'finish' | 'failed'
type State = {
    minTime: number,//in milliseconds
    letter: string | undefined,
    status: Status,
    letterCount: number,
    action: ActionTypes
}
type GameProviderProps = { children: React.ReactNode }

const GameContext = createContext<{ state: State; dispatch: Dispatch | any } | undefined>(undefined)

const getRandomChar = () => {
    return String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1) + 65))
}

const gameReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'start': {
            return {
                minTime: state.minTime,
                letterCount: 1,
                letter: getRandomChar(),
                status: 'start',
                action: action.type,
            }
        }
        case 'next_alpha': {
            return {
                minTime: state.minTime,
                letter: getRandomChar(),
                status: state.status,
                action: action.type,
                letterCount: state.letterCount + 1,

            }
        }
        case 'reset': {
            return {
                minTime: state.minTime,
                letter: getRandomChar(),
                status: 'idle',
                action: action.type,
                letterCount: 0,
            }
        }
        case 'penalty': {
            return {
                minTime: state.minTime,
                letter: state.letter,
                status: 'start',
                action: action.type,
                letterCount: state.letterCount,

            }
        }
        case 'finish': {
            return {
                minTime: state.minTime,                
                letter: state.letter,
                status: 'finish',
                action: action.type,
                letterCount: 0,
            }
        }
        case 'success': {
            let mintime = storageHandler.getTimeFromLocal()
            return {
                minTime: mintime,                
                letter: state.letter,
                status: 'success',
                action: action.type,
                letterCount: 0,
            }
        }
        case 'failed': {
            return {
                minTime: state.minTime,
                letter: state.letter,
                status: 'failed',
                action: action.type,
                letterCount: 0,
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

const GameProvider = ({ children }: GameProviderProps) => {
    const [state, dispatch] = useReducer(gameReducer, {
        minTime: storageHandler.getTimeFromLocal(),
        letter: getRandomChar(),
        status: 'idle',
        action: undefined,
        letterCount: 0,
    })
    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    )
}
const useGameContext = () => {
    const context = useContext(GameContext)
    if (context === undefined) {
        throw new Error('useGameContext must be used within a GameProvider')
    }
    return context
}

export { GameProvider, useGameContext };
export type { ActionTypes,Action };

