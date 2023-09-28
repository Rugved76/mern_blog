// import express from "express";
// import {
//     addBlog,
//     deleteBlog,
//     getAllBlogs,
//     getById,
//     getByUserId,
//     updateBlog,
//     getUser
// } from "../controllers/blog-controller.js";
// const router = express.Router();

// router.get("/", getAllBlogs);
// router.post("/add", addBlog);
// router.put("/update/:id", updateBlog);
// router.get("/:id", getById);
// router.delete("/:id", deleteBlog);
// router.get("/user/:id", getByUserId);
// router.get("/user/:id", getUser);

// export default router;
// //hmm


import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getById,
  getByUserId,
  updateBlog,
  getUser,
  likeBlog, // Add this import for the like logic
} from "../controllers/blog-controller.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/add", addBlog);
router.put("/update/:id", updateBlog);
router.get("/:id", getById);
router.delete("/:id", deleteBlog);
router.get("/user/:id", getByUserId);
router.get("/user/:id", getUser);
router.post("/like/:id", likeBlog);

export default router;
