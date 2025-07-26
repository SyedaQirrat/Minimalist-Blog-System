import { Link } from "react-router-dom";
import { useState } from "react";

function PostCard({ post, getAuthorName, getCategoryName, onCategoryClick, onTagClick }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getFallbackImage = () => {
    // Generate a placeholder image based on the post title
    const colors = ['f97316', 'fbbf24', '10b981', '3b82f6', '8b5cf6', 'ec4899'];
    const color = colors[post.id % colors.length];
    return `https://via.placeholder.com/800x400/${color}/ffffff?text=${encodeURIComponent(post.title)}`;
  };

  return (
    <div className="post-card">
      {/* Post Image Preview */}
      {post.image && (
        <div className="post-image-preview">
          <img 
            src={imageError ? getFallbackImage() : post.image} 
            alt={post.title}
            loading="lazy"
            onError={handleImageError}
          />
        </div>
      )}
      
      <h2>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h2>
      
      {/* Meta information */}
      <div className="post-meta">
        <span className="post-author">by {getAuthorName(post.authorId)}</span>
        <span>•</span>
        <a 
          href="#" 
          className="post-category"
          onClick={(e) => { e.preventDefault(); onCategoryClick(post.categoryId); }}
        >
          {getCategoryName(post.categoryId)}
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

      {/* Enhanced Blurred Content Preview */}
      <div className="post-preview">
        <div className="post-preview-text">
          {post.content.substring(0, 280)}...
        </div>
      </div>

      {/* Tags */}
      <div className="post-tags">
        {post.tags.map((tag) => (
          <a
            key={tag}
            href="#"
            className="tag"
            onClick={(e) => { e.preventDefault(); onTagClick(tag); }}
          >
            #{tag}
          </a>
        ))}
      </div>
    </div>
  );
}

export default PostCard;
