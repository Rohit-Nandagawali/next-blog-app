# Vichaar - The Next.js Blogging App 🚀

Welcome to the Vichaar - The Next.js Blogging App repository! This web application is a feature-rich blogging platform built using Next.js, Meraki UI, Tailwind CSS, React, and Firebase as the backend. It offers a wide range of functionalities to create, manage, and interact with blogs and comments.

## Demo
https://github.com/Rohit-Nandagawali/next-blog-app/assets/85486891/768abf81-f871-4f81-a59b-77edc9e2a16d

## Features 🌟

- **User Authentication**: Users can register and log in to the platform securely.

- **View Blogs**: Users can browse and view a collection of blogs.

- **Comments on Blogs**: Users can leave comments on individual blog posts.

- **Create Blog**: Authenticated users can create and publish their own blog posts.

- **Pagination**: Blogs are paginated to enhance the user experience.

- **Server-Side Rendering (SSR)**: Benefit from SEO optimization and faster page loading through SSR.

- **Dynamic Routing**: Navigate between blog posts with dynamic routing.

- **Meraki UI**: The app is designed with the beautiful and responsive Meraki UI.

## Getting Started 🏁

Follow these steps to get [Your Next.js Blogging App] up and running on your local machine:


 1. **Clone the Repository**: Begin by cloning this repository to your local machine. Open your terminal and run the following command:

   ```bash
   git clone https://github.com/Rohit-Nandagawali/next-blog-app.git
   ```
2. **Install Dependencies**: Navigate to the project directory and install the required dependencies. You can do this with a package manager like npm or yarn. For npm, run:
```bash
npm install

```
3. **Configure Firebase API Key**:

- In your project directory, navigate to the firebase.js file.
- Open the firebase.js file in a code editor of your choice.
- Locate the section where Firebase configuration is defined.
- Add your Firebase API key, along with other configuration details. It should look something like this:

```javascript
// firebase.js

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "[Your API Key]",
  authDomain: "[Your Auth Domain]",
  projectId: "[Your Project ID]",
  storageBucket: "[Your Storage Bucket]",
  messagingSenderId: "[Your Messaging Sender ID]",
  appId: "[Your App ID]"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

```

## Tech Stack 💻

- **Next.js**: A React framework for building server-rendered React applications.
- **Meraki UI**: A UI library for creating beautiful and responsive user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React**: A JavaScript library for building user interfaces.
- **UUID**: Used for generating unique post IDs.
- **React Hot Toast**: Provides notifications for user interactions.
- **Firebase**: Handles authentication and data storage.



## Contributions and Issues 🤝

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue.


Happy coding! 🚀
