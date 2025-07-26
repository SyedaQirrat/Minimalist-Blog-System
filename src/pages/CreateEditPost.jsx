import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateEditPost({ posts, onAddPost, onUpdatePost, authors, categories }) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const isEditing = !!postId;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    authorId: "",
    categoryId: "",
    tags: ""
  });

  // Generate unique ID for new posts
  const generateUniqueId = () => {
    const existingIds = posts.map(post => parseInt(post.id));
    const maxId = Math.max(...existingIds, 0);
    return maxId + 1;
  };

  useEffect(() => {
    if (isEditing && posts.length > 0) {
      const post = posts.find(p => p.id.toString() === postId);
      if (post) {
        setFormData({
          title: post.title,
          content: post.content,
          image: post.image || "",
          authorId: post.authorId,
          categoryId: post.categoryId,
          tags: post.tags.join(", ")
        });
      }
    }
  }, [postId, posts, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const tags = formData.tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const postData = {
      id: isEditing ? postId : generateUniqueId(),
      title: formData.title,
      content: formData.content,
      image: formData.image,
      authorId: formData.authorId,
      categoryId: formData.categoryId,
      tags: tags
    };

    if (isEditing) {
      onUpdatePost(postData);
      navigate(`/post/${postId}`);
    } else {
      onAddPost(postData);
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          {isEditing ? "Edit Post" : "Create New Post"}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter post title..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              placeholder="Write your post content here..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL (optional)</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <div style={{ marginTop: '1rem' }}>
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '100%', 
                    height: '200px', 
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="authorId">Author</label>
            <select
              id="authorId"
              name="authorId"
              value={formData.authorId}
              onChange={handleChange}
              required
            >
              <option value="">Select an author</option>
              {authors.map(author => (
                <option key={author.authorId} value={author.authorId}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="categoryId">Category</label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="react, javascript, web-development"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <button type="submit" className="btn">
              {isEditing ? "Update Post" : "Create Post"}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate(isEditing ? `/post/${postId}` : "/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
