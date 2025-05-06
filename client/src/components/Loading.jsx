import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';

const Loading = () => {
    const {navigate} = useAppContext();
    let {search} = useLocation();
    const query = new URLSearchParams(search);
    const nextUrl = query.get('next');

    useEffect(() => {
        if (nextUrl) {
            setTimeout(() => {
                navigate(`/${nextUrl}`);
            }, 2000);
        }
    }, [nextUrl]);
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='animate-spin rounded-full h-24 w-24 border-5 border-gray-400 border-t-primary'>

      </div>
    </div>
  )
}

export default Loading
