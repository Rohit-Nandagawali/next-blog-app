import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid';
import { storage, db } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/router';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import remarkGfm from 'remark-gfm'

export default function CreatePost({ user }) {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState(null)
    const [imgUrl, setImgUrl] = useState('')

    const router = useRouter();


    // if all data is set, we are running this after image is uploaded
    useEffect(() => {

        const addBlog = async () => {
            if (imgUrl) {
                try {
                    await addDoc(collection(db, "blogs"), {
                        title,
                        body,
                        imageUrl: imgUrl,
                        postedBy: user.uid,
                        publisher: user.displayName,
                        createdAt: serverTimestamp()
                    });

                    toast.success("Blog created successfully");
                    setTitle('')
                    setBody('')
                    setImage(null)
                } catch (error) {
                    toast.error(error.message);
                }
            }
        };

        if (title && body && image) {

            addBlog();
        }
    }, [imgUrl]);



    const submitBlog = () => {
        if (!title || !body || !image) {
            toast.error("Please enter all the fields")
            return

        }

        const storageRef = ref(storage, `images/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (progress == 100)
                    toast.success('Image Uploaded Successfully')

            },
            (error) => {
                // Handle unsuccessful uploads
                toast.error(error.message)
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImgUrl(downloadURL)
                });
            })
    }

    // handle cancel
    const handleCancel = () => {
        setTitle('')
        setBody('')
        setImage(null)
        router.push('/');

    }


    // handle image upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check if the selected file is an image
            if (file.type.startsWith('image/')) {
                // Check the file size
                if (file.size <= 2 * 1024 * 1024) {
                    // File is an image and within the size limit, you can proceed
                    setImage(file);
                    // e.target.value = ''
                } else {
                    // File size exceeds the limit, show an error message
                    toast.error('Please select an image file that is 2 MB or smaller.');
                    e.target.value = ''; // Clear the file input
                }
            } else {
                // File is not an image, show an error message
                toast.error('Please select a valid image file.');
                e.target.value = ''; // Clear the file input
            }
        }
    };




    return (
        <div className="p-4 lg:px-20 lg:py-12 w-full flex flex-col items-center">
            < Toaster />
            <div className=" mt-4 w-full flex flex-col">

                <div className="self-end">

                    <button className="px-6 mt-3 py-2 text-sm font-medium tracking-wide text-gray-500 capitalize transition-colors duration-300 transform bg-gray-100 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" onClick={handleCancel}
                    >
                        Cancel
                    </button>


                    <button className="px-6 ml-4 mt-3 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 shadow-blue-200 shadow-lg" onClick={submitBlog}
                    >
                        Publish
                    </button>
                </div>


                <h1 className='text-2xl max-w-full flex flex-wrap'>{title === '' ? "What's in your mind?" : title}</h1>
                <input className="block w-full px-4 py-2 mt-2 text-gray-700  focus:border-blue-400  placeholder-gray-400/70 bg-white border rounded-lg focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}
                />
                <input type="file" className="block w-fit px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full placeholder-gray-400/70  focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 " accept='image/*' onChange={(e) => handleFileUpload(e)} placeholder='cover photo' />
            </div>
            <div className=" mt-2 w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
                <textarea placeholder="Write markdown..." className="block  mt-2 w-full  placeholder-gray-400/70  rounded-lg border border-gray-200 bg-white px-4 min-h-60 lg:min-h-36 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 " rows={8} value={body} onChange={(e) => setBody(e.target.value)}></textarea>

                <div className="border  px-4 py-2.5 mt-2 rounded-lg">

                    <ReactMarkdown
                        children={body}
                        className='prose'
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        showInlineLineNumbers={true}
                                        {...props}
                                        children={String(children).replace(/\n$/, '')}
                                        style={atomOneDarkReasonable}
                                        language={match[1]}
                                        PreTag="div"
                                    />
                                ) : (
                                    <code {...props} className={className}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    />
                </div>



            </div>


        </div>
    )
}
