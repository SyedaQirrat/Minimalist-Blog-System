import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function PostDetail({ data }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  // Find post from data prop instead of fetching
  const post = data.posts.find((p) => p.id.toString() === id);
  const author = data.authors.find((a) => a.authorId === post?.authorId);
  const category = data.categories.find((c) => c.categoryId === post?.categoryId);

  const handleImageError = () => {
    setImageError(true);
  };

  const getFallbackImage = () => {
    if (!post) return '';
    const colors = ['f97316', 'fbbf24', '10b981', '3b82f6', '8b5cf6', 'ec4899'];
    const color = colors[post.id % colors.length];
    return `https://via.placeholder.com/800x400/${color}/ffffff?text=${encodeURIComponent(post.title)}`;
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/?category=${categoryId}`);
  };

  const handleTagClick = (tag) => {
    navigate(`/?tag=${tag}`);
  };

  if (!post) return <div className="loading">Post not found...</div>;

  return (
    <div className="container">
      <Link to="/" className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
        ← Back to Home
      </Link>

      <article>
        {/* Post Header */}
        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          
          <div className="post-meta">
            <span className="post-author">by {author?.name}</span>
            <span>•</span>
            <a 
              href="#" 
              className="post-category"
              onClick={(e) => { e.preventDefault(); handleCategoryClick(post.categoryId); }}
            >
              {category?.name}
            </a>
            <span>•</span>
            <span className="post-date">
              {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </header>

        {/* Post Image */}
        {post.image && (
          <img
            src={imageError ? getFallbackImage() : post.image}
            alt={post.title}
            className="post-image"
            onError={handleImageError}
          />
        )}

        {/* Post Content */}
        <div className="post-content">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Tags */}
        <div className="post-tags">
          {post.tags.map((tag, index) => (
            <a
              key={index}
              href="#"
              className="tag"
              onClick={(e) => { e.preventDefault(); handleTagClick(tag); }}
            >
              #{tag}
            </a>
          ))}
        </div>

        {/* Edit Button */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link to={`/manage-post/${post.id}`} className="btn">
            Edit Post
          </Link>
        </div>
      </article>
    </div>
  );
}
