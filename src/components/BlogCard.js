import Link from 'next/link'
import React from 'react'

const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };

export default function BlogCard({ blog }) {
    return (
        <div className='p-3 border shadow-lg rounded-3xl '>
            <img className="object-cover object-center w-full h-48 rounded-2xl lg:h-60" src={blog.imageUrl} alt={blog.title} />

            <div className="mt-8">
                <h1 className="mt-4 text-xl font-semibold text-gray-800 line-clamp-2 h-14">
                    {blog.title}
                </h1>

                <p className="mt-2 text-gray-500 line-clamp-3">
                    {blog.body}
                </p>

                <div className="flex items-center justify-between mt-4">
                    <div>
                        <a href="#" className="text-lg font-medium text-gray-700  hover:underline hover:text-gray-500">
                            {blog.publisher}
                        </a>

                        <p className="text-sm text-gray-500 ">{new Date(blog.createdAt).toLocaleDateString('en-US', options)}</p>
                    </div>

                    <Link href={`/blogs/${blog.id}`}><p className="inline-block text-blue-500 underline hover:text-blue-400">Read more</p></Link>
                </div>

            </div>
        </div>
    )
}
