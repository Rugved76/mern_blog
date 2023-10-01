// import Header from "./components/Header";
// import Blogs from "./components/Blogs";
// import UserBlogs from "./components/UserBlogs";
// import BlogDetail from "./components/BlogDetail";
// import AddBlog from "./components/AddBlog";
// import StickyFooter from "./components/StickyFooter";
// import React, { useEffect } from "react";
// import { Route, Routes } from "react-router-dom";
// import Auth from "./components/Auth";
// import { useDispatch, useSelector } from "react-redux";
// import { authActions } from "./store";


// function App() {

//     const dispath = useDispatch();
//     const isLoggedIn = useSelector((state) => state.isLoggedIn);

//     useEffect(() => {
//         if (localStorage.getItem("userId")) {
//             dispath(authActions.login());
//         }
//     }, [dispath]);

//     return (
//         <React.Fragment>
//             <header>
//                 <Header />
//             </header>
//             <main>
//                 <Routes>
//                     {!isLoggedIn ? (
//                         <Route path="/auth" element={<Auth />} />
//                     ) : (
//                         <>
//                             <Route path="/blogs" element={<Blogs />} />
//                             <Route path="/blogs/add" element={<AddBlog />} />
//                             <Route path="/myBlogs" element={<UserBlogs />} />
//                             <Route path="/myBlogs/:id" element={<BlogDetail />} />{" "}
//                         </>
//                     )}
//                 </Routes>
//             </main>
//             <StickyFooter />
//         </React.Fragment>
//     );
// }

// export default App;
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import StickyFooter from "./components/StickyFooter";
import React, { useEffect, useState } from "react";
import StickyScrollToTopButton from "./components/ScrollTop";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
import { Singlepage } from "./components/Singlepage";
import {Profile} from "./components/Profile";

function App() {

    const dispath = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            dispath(authActions.login());
        }
    }, [dispath]);


    return (
        <React.Fragment>
            <header>
                <Header />
            </header>
            <main>
                <Routes>
                    {!isLoggedIn ? (
                        <Route path="/auth" element={<Auth />} />
                    ) : (
                        <>
                            <Route path="/blogs" element={<Blogs />} />
                            <Route path="/blogs/add" element={<AddBlog />} />
                            <Route path="/myBlogs" element={<UserBlogs />} />
                            <Route path="/myBlogs/:id" element={<BlogDetail />} />{" "}
                            <Route path="/blogs/:id" element={<Singlepage/>} />
                            <Route path="/blogs/user/:id" element={<Profile/>} />
                            <Route path="/blogs/user/:id" element={<Profile/>} />
                        </>
                    )}
                </Routes>
            </main>
            <StickyScrollToTopButton />
            <StickyFooter />
        </React.Fragment>
    );
}

export default App;
