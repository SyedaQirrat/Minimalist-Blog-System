import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost({ addPost, categories, authors }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now().toString(),
      title,
      content,
      image,
      authorId,
      categoryId,
      tags: tags.split(",").map(tag => tag.trim())
    };

    addPost(newPost);
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
        <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} required>
          <option value="">Select Author</option>
          {authors.map(a => <option key={a.authorId} value={a.authorId}>{a.name}</option>)}
        </select>

        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.name}</option>)}
        </select>

        <input placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
