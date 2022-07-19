import { useEffect, useRef, useState } from "react";

type UseTimeReturnType = [number,boolean,Function,Function,Function,Function]

const useTimer = ():UseTimeReturnType => {
    
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);

    useEffect(() => {
        //@ts-ignore
        let interval = null;
        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            //@ts-ignore
            clearInterval(interval);
        }
        return () => {
            //@ts-ignore
            clearInterval(interval);
        };
    }, [isActive, isPaused]);

    const startTimer = () => {
        setIsActive(true);
        setIsPaused(false);
    };
    const stop = () => {
        setIsPaused(true);
        setIsActive(false);
        setTime(0)
    };
    const restartTimer = () => {
        setIsActive(false);
        setTime(0);
    };
    const addPenalty = () => {
        setTime(time => time + 5000);
    };

    return [time,isActive,startTimer,stop,restartTimer,addPenalty]
}

export default useTimer;