import { useState } from "react"
import Link from "next/link"

import { auth } from '../../firebase'
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useRouter } from 'next/router';
import Logo from "@/components/Logo";



export default function Login({ user }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    // if user is already logged in

    const router = useRouter();

    if (user) {
        router.push('/');
    }


    const handleLogin = async () => {

        try {

            const result = await signInWithEmailAndPassword(auth, email, password)

            router.push('/');

            // alert(result.user.displayName)
        }
        catch (err) {
            alert(err.message)
        }
    }


    return (
        <div className="w-full flex justify-center">
            <div className="w-full mt-6 lg:max-w-sm  mx-4 border overflow-hidden bg-white rounded-lg shadow-md
        ">
                <div className="px-6 py-4">
                    <div className="flex justify-center mx-auto">
                        <Logo height={50} />
                    </div>

                    <h3 className="mt-1 text-xl font-medium text-center text-gray-600">Welcome Back</h3>

                    <p className="mt-1 text-center text-gray-500 ">Login or create account</p>

                    <div>
                        <div className="w-full mt-4">
                            <input className="block w-full px-4 py-2 mt-2 text-gray-700  focus:border-blue-400  placeholder-gray-500 bg-white border rounded-lg focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} aria-label="Email Address" />
                        </div>

                        <div className="w-full mt-2 flex flex-col">
                            <input className="block w-full px-4 py-2 mt-2 text-gray-700  placeholder-gray-500 bg-white border rounded-lg focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} aria-label="Password" />
                            <p className="self-end text-xs cursor-pointer text-blue-500 mt-1" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "hide" : "show"} password</p>
                        </div>

                        <div className="flex items-center justify-end mt-4">


                            <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-500 rounded-lg hover:bg-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50 shadow-indigo-200 shadow-lg"
                                onClick={handleLogin}
                            >
                                Log In
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center py-4 text-center bg-gray-50">
                    <span className="text-sm text-gray-600 ">Don't have an account? </span>

                    <Link href={'/Register'}><p className="mx-2 text-sm font-bold text-blue-500 underline">Register</p></Link>
                </div>
            </div>
        </div>
    )
}

// this is login