import PostCard from "./components/PostCard.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";

function BlogHome({ data, addPost }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentCategory = searchParams.get('category');
  const currentTag = searchParams.get('tag');

  const getAuthorName = (authorId) => {
    const author = data.authors.find((a) => a.authorId === authorId);
    return author ? author.name : "Unknown Author";
  };

  const getCategoryName = (categoryId) => {
    const category = data.categories.find((c) => c.categoryId === categoryId);
    return category ? category.name : "Uncategorized";
  };

  // Filter posts based on category or tag
  const filteredPosts = data.posts.filter(post => {
    if (currentCategory) {
      return post.categoryId === currentCategory;
    }
    if (currentTag) {
      return post.tags.includes(currentTag);
    }
    return true;
  });

  const handleCategoryClick = (categoryId) => {
    setSearchParams({ category: categoryId });
  };

  const handleTagClick = (tag) => {
    setSearchParams({ tag });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="container">
      {/* Dynamic Header */}
      <header className="header">
        <div className="header-content">
          <h1>Minimalist Blog</h1>
          <p style={{ fontSize: '1rem', marginTop: '1rem', opacity: 0.8 }}>
            Curated ideas, visual stories, and bold insights; ready for your next great read.
          </p>
        </div>
      </header>

      {/* Dynamic Category Navigation */}
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); clearFilters(); }}
              className={!currentCategory && !currentTag ? 'active' : ''}
            >
              All Posts
            </a>
          </li>
          {data.categories.map((category) => (
            <li key={category.categoryId} className="nav-item">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleCategoryClick(category.categoryId); }}
                className={currentCategory === category.categoryId ? 'active' : ''}
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Dynamic Filter Bar */}
      {(currentCategory || currentTag) && (
        <div className="filter-bar">
          <span className="active-filter">
            {currentCategory 
              ? `Category: ${getCategoryName(currentCategory)}`
              : `Tag: ${currentTag}`
            }
          </span>
          <a href="#" onClick={(e) => { e.preventDefault(); clearFilters(); }} className="clear-filter">
            Clear filter
          </a>
        </div>
      )}

      {/* Posts List */}
      {data.posts.length === 0 ? (
        <div className="loading">Loading posts...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="empty-state">
          {currentCategory || currentTag 
            ? `No posts found for this filter.`
            : 'No posts available.'
          }
        </div>
      ) : (
        filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            getAuthorName={getAuthorName}
            getCategoryName={getCategoryName}
            onCategoryClick={handleCategoryClick}
            onTagClick={handleTagClick}
          />
        ))
      )}
    </div>
  );
}

export { BlogHome };
