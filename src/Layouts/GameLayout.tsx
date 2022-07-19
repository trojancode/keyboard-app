import React from 'react'

const GameLayout = ({children}:{children:any}) => {
  return (
    <div className='w-full h-screen bg-deepBlue'>
        {children}
    </div>
  )
}

export default GameLayout