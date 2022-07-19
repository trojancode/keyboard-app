const MIN_TIME = 'minTime'

const saveTimeToLocal = (time: any) => {
    if (typeof window !== undefined) {
        window.localStorage.setItem(MIN_TIME, time)
    }
}

const getTimeFromLocal = ():number => {
    if (typeof window !== undefined) {
        let mintime=window.localStorage.getItem(MIN_TIME)
        return mintime?parseInt(mintime):0
    }
    return 0;
}

export  {
    saveTimeToLocal,
    getTimeFromLocal
};