import React from 'react'

export default function BlogCardSkeleton() {
    return (
        <div className='p-3 border shadow-lg animate-pulse rounded-3xl '>
            <div className="object-cover bg-gray-200 object-center w-full h-48 rounded-2xl lg:h-60" />

            <div className="mt-4 rounded-full text-xl w-full font-semibold bg-gray-300 line-clamp-2 h-4" />

            <div className="mt-2 rounded-lg w-full h-10 bg-gray-200 line-clamp-3" />

            <div className="text-lg rounded-full my-2 font-medium bg-gray-300 w-3/4 h-2" />
            <div className="text-sm rounded-full bg-gray-200 my-2  w-2/4 h-2" />

        </div>
    )
}
