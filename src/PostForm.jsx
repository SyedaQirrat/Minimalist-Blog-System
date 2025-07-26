import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dataJson from "../public/data.json";

function PostForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // for edit route
  const editing = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    authorId: "",
    categoryId: "",
    tags: "",
  });

  const [data, setData] = useState({
    posts: [],
    authors: [],
    categories: [],
  });

  useEffect(() => {
    setData(dataJson);

    if (editing) {
      const existingPost = dataJson.posts.find((p) => p.id === parseInt(id));
      if (existingPost) {
        setFormData({
          title: existingPost.title,
          content: existingPost.content,
          authorId: existingPost.authorId,
          categoryId: existingPost.categoryId,
          tags: existingPost.tags.join(", "),
        });
      }
    }
  }, [id, editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: editing ? parseInt(id) : Date.now(),
      title: formData.title,
      content: formData.content,
      authorId: formData.authorId,
      categoryId: formData.categoryId,
      tags: formData.tags.split(",").map((t) => t.trim().toLowerCase()),
    };

    if (editing) {
      const updatedPosts = data.posts.map((p) =>
        p.id === newPost.id ? newPost : p
      );
      setData({ ...data, posts: updatedPosts });
    } else {
      setData({ ...data, posts: [...data.posts, newPost] });
    }

    alert(editing ? "Post updated!" : "Post created!");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>{editing ? "Edit Post" : "Create New Post"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input name="title" value={formData.title} onChange={handleChange} required />

        <label>Content:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />

        <label>Author:</label>
        <select
          name="authorId"
          value={formData.authorId}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {data.authors.map((author) => (
            <option key={author.authorId} value={author.authorId}>
              {author.name}
            </option>
          ))}
        </select>

        <label>Category:</label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {data.categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.name}
            </option>
          ))}
        </select>

        <label>Tags (comma separated):</label>
        <input name="tags" value={formData.tags} onChange={handleChange} />

        <button type="submit">{editing ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default PostForm;
