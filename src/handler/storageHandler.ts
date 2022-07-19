const MIN_TIME = 'minTime'

const saveTimeToLocal = (time: any) => {
    localStorage.setItem(MIN_TIME, time)
}

const getTimeFromLocal = (): number => {
    let mintime = localStorage.getItem(MIN_TIME)
    return mintime ? parseInt(mintime) : 0
}

export {
    saveTimeToLocal,
    getTimeFromLocal
};