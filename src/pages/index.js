import Image from 'next/image'
import { Inter } from 'next/font/google'
import { collection, query, getDocs, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from '../../firebase';
import Link from 'next/link';
import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import BlogCardSkeleton from '@/components/BlogCardSkeleton';


const inter = Inter({ subsets: ['latin'] })

export default function Home({ allBlogs }) {

  const [blogs, setAllBlogs] = useState(allBlogs)
  const [reachedEnd, setReachedEnd] = useState(false)

  const loadMoreBlogs = async () => {
    const last = blogs[blogs.length - 1]
    const q = query(collection(db, "blogs"), orderBy("createdAt", 'desc'), startAfter(new Date(last.createdAt)), limit(3));

    const querySnapshot = await getDocs(q);

    const newBlogs = querySnapshot.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toMillis(),
        id: docSnap.id
      }
    })

    setAllBlogs(blogs.concat(newBlogs))

    // we have fetched new blogs, and it has length smaller than 3 means we have reached the end 
    if (newBlogs.length < 3) {
      setReachedEnd(true)
    }

  }

  // console.log(allBlogs);
  console.log("hello", process.env.APP_NAME);

  return (
    <div className='flex flex-col'>

      <div className="grid grid-cols-1 gap-8 my-8 md:my-14 md:grid-cols-3 px-6 lg:px-14">
        {blogs.length < 1 ?
          <>
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </> :
          blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))

        }

      </div>
      {
        !reachedEnd && <p className="px-3 py-4 self-center mx-3 mt-2 mb-8 w-2/4 text-gray-600 transition-colors duration-300 transform rounded-md lg:mt-0 cursor-pointer bg-gray-200 hover:bg-gray-100 border border-gray-400 hover:border hover:border-gray-600 text-center" onClick={loadMoreBlogs}>Load more blogs</p>
      }

    </div>
  )
}

export async function getServerSideProps() {
  const q = query(collection(db, "blogs"), orderBy("createdAt", 'desc'), limit(3));
  const querySnapshot = await getDocs(q);

  const allBlogs = querySnapshot.docs.map(docSnap => {
    return {
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id
    }
  })
  // this data will be logged on server side
  // console.log(allBlogs)
  return {
    props: { allBlogs }
  }
}
