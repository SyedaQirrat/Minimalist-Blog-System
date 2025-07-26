import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EditPost({ data, updatePost }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const postToEdit = data.posts.find(p => p.id === id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      setImage(postToEdit.image);
      setAuthorId(postToEdit.authorId);
      setCategoryId(postToEdit.categoryId);
      setTags(postToEdit.tags.join(", "));
    }
  }, [postToEdit]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updated = {
      ...postToEdit,
      title,
      content,
      image,
      authorId,
      categoryId,
      tags: tags.split(",").map(tag => tag.trim())
    };

    updatePost(updated);
    navigate(`/post/${id}`);
  };

  if (!postToEdit) return <p>Post not found!</p>;

  return (
    <div className="form-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdate}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
        <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} required>
          <option value="">Select Author</option>
          {data.authors.map(a => <option key={a.authorId} value={a.authorId}>{a.name}</option>)}
        </select>

        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
          <option value="">Select Category</option>
          {data.categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.name}</option>)}
        </select>

        <input placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} />

        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}
