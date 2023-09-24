import Link from 'next/link'
import React, { useState } from 'react'
import { auth } from '../../firebase'
import { useRouter } from 'next/router';
import Logo from './Logo';


export default function Navbar({ user }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const router = useRouter();


    const handleSignOut = () => {

        auth.signOut()
        router.push('/');

    }

    return (
        <nav className="relative bg-white shadow ">

            <div className="flex w-full items-center justify-between px-5 lg:px-10 py-2 ">
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <Logo height={50} />
                    </Link>


                </div>

                <div className=" py-2 transition-all duration-300 ease-in-out bg-white lg:opacity-100  flex items-center lg:mr-4">
                    <div className="flex items-center">
                        {
                            user
                                ?
                                <>
                                    <Link href={'/CreatePost'}>
                                        <p className="w-fit px-3 py-2 mx-3 text-white transition-colors duration-300 transform rounded-md  bg-indigo-600 hover:bg-indigo-500 shadow-indigo-200 shadow-lg">Create a Post</p>
                                    </Link>

                                    <div className="flex items-center relative">

                                        <button type="button" className="flex items-center focus:outline-none " onClick={() => setMenuOpen(!menuOpen)}>
                                            <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" className="object-cover w-full h-full" alt="avatar" />
                                            </div>
                                        </button>

                                        {
                                            menuOpen &&
                                            <div className=" border-indigo-400 border-2 absolute top-10 right-0 bg-white p-5 rounded-lg  shadow-lg">
                                                <p className='font-bold text-lg'>{user.displayName}</p>
                                                <p className='font-normal text-sm text-gray-600 mb-2'>{user.email}</p>
                                                <p className="px-3 py-2  mt-3 text-gray-600 transition-colors duration-300 transform border
                                                    rounded-md lg:mt-0  bg-white-600 flex items-center justify-center hover:bg-red-50 cursor-pointer" onClick={handleSignOut}>Sign Out</p>



                                            </div>
                                        }

                                    </div>
                                </>
                                :
                                <>
                                    <Link href={'/Login'}>
                                        <p className="px-3 py-2 mx-3 mt-2 text-white transition-colors  font-medium duration-300 transform rounded-md lg:mt-0 bg-indigo-600 hover:bg-indigo-500 shadow-indigo-200 shadow-lg">Login</p>
                                    </Link>
                                </>
                        }

                    </div>


                </div>

            </div>


        </nav>
    )
}
