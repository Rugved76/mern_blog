import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().sort({ createdAt: -1 }).populate("user");
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!blogs || blogs.length === 0) {
        return res.status(404).json({ message: "No Blogs Found" });
    }

    return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "Unable TO FInd User By This ID" });
    }
    const blog = new Blog({
        title,
        description,
        image,
        user,
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }

    return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description,
        });
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable To Update The Blog" });
    }
    return res.status(200).json({ blog });
};

export const getById = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;

    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable To Delete" });
    }
    return res.status(200).json({ message: "Successfully Delete" });
};

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (err) {
        return console.log(err);
    }
    if (!userBlogs) {
        return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ user: userBlogs });
};


export const getUser = async (req, res) => {
    const userId = req.params.id;
    let userData;
    try {
        userData = await User.findById(userId);
        console.log(userData.data);
    } catch (err) {
        console.log(err)
    }

    if (!userData) return res.status(404).json({ message: 'No user found!' })
    return res.status(200).json({ user: userData });
}

export const likeBlog = async (req, res, next) => {
    const blogId = req.params.id;
    const userId = req.body.userId;

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (!userId) {
            return res.status(400).json({ message: "User ID not provided in the request body" });
        }

        // Check if the user has already liked this blog
        const isLiked = blog.likes.includes(userId);

        if (isLiked) {
            // User already liked the blog, so we will unlike it
            blog.likes = blog.likes.filter((likeId) => likeId.toString() !== userId);
        } else {
            // User has not liked the blog, so we will like it
            blog.likes.push(userId);
        }

        blog.likeCount = blog.likes.length; // Update the like count
        await blog.save();

        return res.status(200).json({ message: isLiked ? "Blog unliked" : "Blog liked", isLiked: !isLiked, likeCount: blog.likeCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



//new
// export const getAllBlogs = async (req, res, next) => {
//     let blogs;
//     try {
//         blogs = await Blog.find().populate("user");
//     } catch (err) {
//         return console.log(err);
//     }
//     if (!blogs) {
//         return res.status(404).json({ message: "No Blogs Found" });
//     }
//     return res.status(200).json({ blogs });
// };

// export const getPopular = async (req, res, next) => {
//     let blogs;
//     try {
//         blogs = await Blog.find()
//             .sort({ likeCount: -1, createdAt: -1 }) // Sort by likeCount in descending order, and createdAt in descending order as a tiebreaker
//             .populate("user");
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }

//     if (!blogs || blogs.length === 0) {
//         return res.status(404).json({ message: "No Blogs Found" });
//     }

//     return res.status(200).json({ blogs });
// };

