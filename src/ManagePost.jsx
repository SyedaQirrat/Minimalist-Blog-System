import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ManagePost({ data, setData }) {
  const { postId } = useParams();
  const navigate = useNavigate();

  const isEdit = !!postId;
  const [form, setForm] = useState({
    title: "",
    content: "",
    authorId: "",
    categoryId: "",
    tags: "",
    image: "",
  });

  useEffect(() => {
    if (isEdit) {
      const existingPost = data.posts.find((p) => p.id === postId);
      if (existingPost) {
        setForm({
          title: existingPost.title,
          content: existingPost.content,
          authorId: existingPost.authorId,
          categoryId: existingPost.categoryId,
          tags: existingPost.tags.join(", "),
          image: existingPost.image || "",
        });
      }
    }
  }, [postId, data.posts, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagsArray = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

    if (isEdit) {
      const updatedPosts = data.posts.map((post) =>
        post.id === postId
          ? { ...post, ...form, tags: tagsArray }
          : post
      );
      setData({ ...data, posts: updatedPosts });
      navigate(`/post/${postId}`);
    } else {
      const newPost = {
        id: Date.now().toString(),
        ...form,
        tags: tagsArray,
      };
      setData({ ...data, posts: [newPost, ...data.posts] });
      navigate("/");
    }
  };

  return (
    <div className="container">
      <h2>{isEdit ? "Edit Post" : "Create New Post"}</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <label>Title:</label>
        <input type="text" name="title" value={form.title} onChange={handleChange} required />

        <label>Content:</label>
        <textarea name="content" value={form.content} onChange={handleChange} rows={10} required />

        <label>Author:</label>
        <select name="authorId" value={form.authorId} onChange={handleChange} required>
          <option value="">Select Author</option>
          {data.authors.map((author) => (
            <option key={author.authorId} value={author.authorId}>{author.name}</option>
          ))}
        </select>

        <label>Category:</label>
        <select name="categoryId" value={form.categoryId} onChange={handleChange} required>
          <option value="">Select Category</option>
          {data.categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>
          ))}
        </select>

        <label>Tags (comma-separated):</label>
        <input type="text" name="tags" value={form.tags} onChange={handleChange} />

        <label>Image URL:</label>
        <input type="text" name="image" value={form.image} onChange={handleChange} />

        <button type="submit">{isEdit ? "Update Post" : "Create Post"}</button>
      </form>
    </div>
  );
}

export default ManagePost;
