import React from 'react'

const Title = (props) => {
  return (
    
      <div className='text-3xl mb-3'>
        <p><span className='font-light mr-2'>{props.first}</span>
        <span className='font-medium'>{props.second}</span></p>      
      </div>
    
  )
}

export default Title
