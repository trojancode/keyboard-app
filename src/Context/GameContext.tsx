import { createContext, useContext, useReducer } from "react"
import { getTimeFromLocal } from "../handler";
import { ADD_PENALTY, FAILED_GAME, FINISH_GAME, NEXT_ALPHA, RESET_GAME, START_GAME, SUCCESS_GAME } from "./actionTypes";
import { FAILED, FINISHED, IDLE, STARTED, SUCCESS } from "./statusTypes";

type ActionTypes = 'start' | 'next_alpha' | 'penalty' | 'reset' | 'success' | 'finish' | 'failed' | undefined;
type Action = {
    type: ActionTypes
    value?: {
        letter: string
    } | undefined | null
}
type Dispatch = (action: Action) => void
type Status = 'success' | 'idle' | 'started' | 'finished' | 'failed'
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
        case  START_GAME: {
            return {
                minTime: state.minTime,
                letterCount: 1,
                letter: getRandomChar(),
                status: STARTED,
                action: action.type,
            }
        }
        case NEXT_ALPHA: {
            return {
                minTime: state.minTime,
                letter: getRandomChar(),
                status: state.status,
                action: action.type,
                letterCount: state.letterCount + 1,

            }
        }
        case RESET_GAME: {
            return {
                minTime: state.minTime,
                letter: getRandomChar(),
                status: IDLE,
                action: action.type,
                letterCount: 0,
            }
        }
        case ADD_PENALTY: {
            return {
                minTime: state.minTime,
                letter: state.letter,
                status: STARTED,
                action: action.type,
                letterCount: state.letterCount,

            }
        }
        case FINISH_GAME: {
            return {
                minTime: state.minTime,
                letter: state.letter,
                status: FINISHED,
                action: action.type,
                letterCount: 0,
            }
        }
        case SUCCESS_GAME: {
            let mintime = getTimeFromLocal()
            return {
                minTime: mintime,
                letter: state.letter,
                status: SUCCESS,
                action: action.type,
                letterCount: 0,
            }
        }
        case FAILED_GAME: {
            return {
                minTime: state.minTime,
                letter: state.letter,
                status: FAILED,
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
        minTime: getTimeFromLocal(),
        letter: getRandomChar(),
        status: IDLE,
        action: undefined,
        letterCount: 0,
    })
    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    )
}
const useGameContext = (): { state: State, dispatch: Dispatch } => {
    const context = useContext(GameContext)
    if (context === undefined) {
        throw new Error('useGameContext must be used within a GameProvider')
    }
    return context
}

export { GameProvider, useGameContext };
export type { ActionTypes, Action };

