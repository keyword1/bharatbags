import React from 'react'
import icons from '../assets/icons/icons'
const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-40 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
           {icons.exchange_icon("w-16 h-16 m-auto mb-5")} 
           <p className='font-semibold'>Easy exchange policy</p>
           <p className='text-gray-400'>We offer hazzle free exchange policy</p>
        </div>

        <div>
           {icons.quality_icon("w-16 h-16 m-auto mb-5")} 
           <p className='font-semibold'>7 Days return policy</p>
           <p className='text-gray-400'>We provide 7 days free return policy</p>
        </div>

        <div>
           {icons.support_icon("w-16 h-16 m-auto mb-5")} 
           <p className='font-semibold'>Best customer support</p>
           <p className='text-gray-400'>We provide 24/7 customer support</p>
        </div>
      
    </div>
  )
}

export default OurPolicy
