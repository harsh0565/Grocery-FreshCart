// import React from 'react'
// import { assets } from '../assets/assets'
// import { Link } from 'react-router-dom'

// const MainBanner = () => {
//     return (
//         <div className='relative'>
//             <img src={assets.main_banner_bg} alt="" className='w-full hidden md:block' />
//             <img src={assets.main_banner_bg_sm} alt="" className='w-full md:hidden' />
//             <div>
//                 <center className='text-3xl md:text-6xl font-bold text-primary-dull'>Fresh Moments, Smarter Choices. </center>
//             </div>
//             <div>
//                 <Link className='group flex items-center gap-2 px-7 py-3 bg-primary hover:bg-primary-dull text-white transition-all rounded cursor-pointer' to='/products'>
//                     Shop Now
//                     <img src={assets.black_arrow_icon} alt="Arrow" className='md:hidden transition-all group-focus:translate-x-1' />
//                 </Link>
//                 <Link className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer' to='/products'>
//                     Explore Deals
//                     <img src={assets.black_arrow_icon} alt="Arrow" className='transition-all group-focus:translate-x-1' />
//                 </Link>
//             </div>

//         </div>
//     )
// }

import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
    return (
        <div className="relative">
            <img src={assets.main_banner_bg} alt="Main Banner" className="w-full hidden md:block" />
            <img src={assets.main_banner_bg_sm} alt="Main Banner" className="w-full md:hidden" />

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4 sm:px-6 md:px-12 w-full">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight text-primary-dull animate-typing">
                    Fresh Moments, Smarter Choices.
                </h1>

                <div className="flex justify-center gap-6 flex-col md:flex-row">
                    <Link
                        className="group flex items-center  gap-2 px-7 py-3 bg-primary hover:bg-primary-dull text-white transition-all rounded cursor-pointer mb-4 md:mb-0 sm:mb-4"
                        to="/products"
                    >
                        Shop Now
                        <img src={assets.black_arrow_icon} alt="Arrow" className="md:hidden transition-all group-focus:translate-x-1" />
                    </Link>
                    
                    <Link
                        className="group flex items-center gap-2 px-9 py-3 cursor-pointer hover:text-primary  text-black transition-all rounded hidden md:flex"
                        to="/products"
                    >
                        Explore Deals
                        <img src={assets.black_arrow_icon} alt="Arrow" className="transition-all group-focus:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MainBanner
