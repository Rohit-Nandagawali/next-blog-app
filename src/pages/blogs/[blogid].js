import React, { useState } from 'react'
import { db } from '../../../firebase';
import { collection, doc, addDoc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import remarkGfm from 'remark-gfm'

const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };

export default function BlogPage({ blog, user, allComments }) {

    const [comment, setComment] = useState("")
    const [allCommentsBlog, setAllCommentsBlog] = useState(allComments)
    const router = useRouter()
    const { blogid } = router.query

    const makeComment = async () => {

        if (comment === "") {
            toast.error("Comment is empty")
            return
        }

        await addDoc(collection(db, "blogs", blogid, "comments"), {
            text: comment,
            user: user.displayName
        });

        setComment("")
        toast.success("Your comment added successfully")


        // showing newly added comment
        const commentsCollectionRef = collection(db, "blogs", blogid, "comments");

        const allCommentSnap = await getDocs(commentsCollectionRef);

        setAllCommentsBlog(allCommentSnap.docs.map(commdocSnap => commdocSnap.data()))



    }

    return (
        <div className='w-full flex justify-center'>
            <Toaster />
            <div className="w-full p-6 lg:w-2/4 lg:py-16">
                <h1 className="text-3xl mb-4 font-bold text-gray-800 capitalize lg:text-5xl">{blog.title}</h1>
                <p className="text-lg font-semibold text-gray-800">{blog.publisher}</p>
                <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString('en-US', options)}</p>

                <img className="object-cover border mt-8 object-center w-full h-80 xl:h-[28rem] rounded-xl" src={blog.imageUrl} alt={blog.title} />

                <div className=" text-xl text-gray-800 mt-4">
                    <ReactMarkdown
                        className='prose'
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        showInlineLineNumbers={true}
                                        {...props}
                                        style={atomOneDarkReasonable}
                                        language={match[1]}
                                        PreTag="div"
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code {...props} className={className}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {blog.body}
                    </ReactMarkdown>

                </div>

                <div className="mt-6 flex flex-col">
                    <hr />
                    <h1 className='text-2xl font-semibold mt-4'>Comments</h1>
                    {
                        user ?
                            <>
                                <input className="block w-full px-4 py-2 mt-3 text-gray-700  focus:border-blue-400  placeholder-gray-400/70 bg-white border rounded-lg focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" placeholder="Comment your thoughts" value={comment} onChange={(e) => setComment(e.target.value)}
                                />
                                <button className="px-6 mt-2 self-end w-fit py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50  shadow-blue-200 shadow-lg" onClick={makeComment}
                                >
                                    Comment
                                </button>
                            </>
                            : <Link href={'/Login'} className="px-6 mt-2 self-end w-fit py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                            >
                                Login to comment
                            </Link>

                    }


                    {
                        allCommentsBlog.map((comment, index) => (
                            <div key={index} className="my-3 ">
                                <h6 className='font-semibold'>{'@'}{comment.user}</h6>
                                <p>{comment.text}</p>

                            </div>
                        ))
                    }

                </div>

            </div>



        </div>
    )
}


// this 'params' is comming from the 'blogid' file name
export async function getServerSideProps({ params: { blogid } }) {

    // getting commnets
    const commentsCollectionRef = collection(db, "blogs", blogid, "comments");

    const allCommentSnap = await getDocs(commentsCollectionRef);

    const allComments = allCommentSnap.docs.map(commdocSnap => commdocSnap.data())


    // getting single blog
    const docRef = doc(db, "blogs", blogid);

    const result = await getDoc(docRef);
    // console.log(allComments);
    return {
        props: {
            blog: {
                ...result.data(),
                createdAt: result.data().createdAt.toMillis(),
            },
            allComments
        }
    }
}
// this is commment