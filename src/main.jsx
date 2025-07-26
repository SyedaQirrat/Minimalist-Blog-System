import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { BlogHome } from "./App.jsx";
import PostDetail from "./PostDetail.jsx";
import NotFound from "./NotFound.jsx";
import CreateEditPost from "./pages/CreateEditPost";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import "./index.css";

function AppWrapper() {
  const [data, setData] = React.useState({
    posts: [],
    categories: [],
    authors: [],
  });

  // Load data from localStorage or fetch from data.json
  React.useEffect(() => {
    const savedData = localStorage.getItem('blogData');
    
    if (savedData) {
      // Use saved data from localStorage
      setData(JSON.parse(savedData));
    } else {
      // Fetch initial data from data.json
      fetch("/data.json")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          // Save to localStorage for future use
          localStorage.setItem('blogData', JSON.stringify(json));
        })
        .catch((err) => console.error("Error loading data:", err));
    }
  }, []);

  const addPost = (post) => {
    const newData = {
      ...data,
      posts: [post, ...data.posts],
    };
    setData(newData);
    // Save to localStorage
    localStorage.setItem('blogData', JSON.stringify(newData));
  };

  const updatePost = (post) => {
    const newData = {
      ...data,
      posts: data.posts.map((p) => (p.id === post.id ? post : p)),
    };
    setData(newData);
    // Save to localStorage
    localStorage.setItem('blogData', JSON.stringify(newData));
  };

  // Shared props for create/edit post
  const sharedProps = {
    posts: data.posts,
    onAddPost: addPost,
    onUpdatePost: updatePost,
    authors: data.authors,
    categories: data.categories,
  };

  return (
    <>
      <Navbar />
      <main>
    <Routes>
      <Route
        path="/"
        element={<BlogHome data={data} addPost={addPost} updatePost={updatePost} />}
      />
      <Route
        path="/post/:id"
        element={<PostDetail data={data} />}
      />
      <Route
        path="/manage-post"
        element={<CreateEditPost {...sharedProps} />}
      />
      <Route
        path="/manage-post/:postId"
        element={<CreateEditPost {...sharedProps} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AppWrapper />
    </Router>
  </React.StrictMode>
);
