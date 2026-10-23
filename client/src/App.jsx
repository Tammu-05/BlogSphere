import Register from "./pages/Register";
import Login from "./pages/Login";

import { Routes, Route, Link } from "react-router-dom";
import BlogDetails from "./components/BlogDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import CreateBlog from "./components/CreateBlog";

const API_URL = "http://localhost:5000/api/blogs";

const fallbackImages = {
  Technology:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900",
  Development:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900",
  Lifestyle:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900",
  General:
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900",
};

function App() {
  
  const [authUser, setAuthUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("blogsphere-user") || "null");
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    sessionStorage.removeItem("blogsphere-token");
    sessionStorage.removeItem("blogsphere-user");
    setAuthUser(null);
    window.dispatchEvent(new Event("authChanged"));
  };
  
  useEffect(() => {
    const syncAuthUser = () => {
      try {
        setAuthUser(
          JSON.parse(
            sessionStorage.getItem("blogsphere-user") || "null"
          )
        );
      } catch {
        setAuthUser(null);
      }
    };

    window.addEventListener("authChanged", syncAuthUser);

    return () => {
      window.removeEventListener("authChanged", syncAuthUser);
    };
  }, []);


  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [savedPosts, setSavedPosts] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem("blogsphere-bookmarks") || "[]"
    );
  } catch {
    return [];
  }
});
  useEffect(() => {
  localStorage.setItem(
    "blogsphere-bookmarks",
    JSON.stringify(savedPosts)
  );
}, [savedPosts]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(API_URL);

        const publishedPosts = response.data.data.filter(
          (post) => post.isPublished !== false
        );

        setPosts(publishedPosts);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError(
          "Unable to load articles. Please check that your backend is running."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const categories = [
    "All",
    ...new Set(posts.map((post) => post.category || "General")),
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.excerpt || "").toLowerCase().includes(search.toLowerCase()) ||
      (post.content || "").toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || post.category === category;

    return matchesSearch && matchesCategory;
  });

  function toggleSave(id) {
    setSavedPosts((current) =>
      current.includes(id)
        ? current.filter((postId) => postId !== id)
        : [...current, id]
    );
  }
  //new callback function
  function handleBlogCreated(newBlog) {
  setPosts((currentPosts) => [newBlog, ...currentPosts]);
  setCategory("All");
  setSearch("");
}

  function getReadTime(content = "") {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  }

  function getDate(date) {
    if (!date) return "Recently published";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }

  return (
    <Routes>
    <Route
      path="/"
      element={

    <div className="app">
      <header className="navbar">
        <a className="logo" href="#home">
          Blog<span>Sphere</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#articles">Explore</a>
          <a href="#about">About</a>
        </nav>

        
  <div className="navbar-actions">
    {authUser ? (
      <>
        <span className="user-greeting">
          Hi, {authUser.name}
        </span>
        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <Link className="auth-nav-link" to="/login">
          Login
        </Link>
        <Link className="write-button" to="/register">
          Get Started ↗
        </Link>
      </>
    )}
  </div>

      </header>

      <main>
        <section className="hero" id="home">
          <p className="eyebrow">IDEAS WORTH SHARING</p>

          <h1>
            Stories that inspire.
            <br />
            Ideas that <span>matter.</span>
          </h1>

          <p className="hero-description">
            Discover thoughtful articles on technology,
            development, creativity, and everyday life.
          </p>

          <a href="#articles" className="hero-button">
            Explore articles ↓
          </a>

          <div className="hero-note">
            <span>✦</span> A space for curious minds and creative thinkers.
          </div>
        </section>

        <section className="articles" id="articles">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE LATEST</p>
              <h2>Discover stories</h2>
            </div>

            <span className="post-count">
              {loading ? "Loading..." : `${filteredPosts.length} articles`}
            </span>
          </div>

          <div className="filters">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search articles..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="category-list">
              {categories.map((item) => (
                <button
                  key={item}
                  className={
                    category === item ? "category active" : "category"
                  }
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="empty-state">
              <h3>Loading stories...</h3>
              <p>Fetching articles from BlogSphere.</p>
            </div>
          )}

          {!loading && error && (
            <div className="empty-state">
              <h3>Something went wrong</h3>
              <p>{error}</p>
              <button
                className="hero-button"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="post-grid">
                {filteredPosts.map((post) => {
                  const id = post._id;
                  const image =
                    post.imageUrl ||
                    fallbackImages[post.category] ||
                    fallbackImages.General;

                  return (
                    <article className="post-card" key={id}>
                      <div className="post-image">
                        <img src={image} alt={post.title} />

                        <span className="post-category">
                          {post.category || "General"}
                        </span>

                        <button
                          className="save-button"
                          aria-label={
                            savedPosts.includes(id)
                              ? "Remove bookmark"
                              : "Bookmark article"
                          }
                          onClick={() => toggleSave(id)}
                        >
                          {savedPosts.includes(id) ? "♥" : "♡"}
                        </button>
                      </div>

                      <div className="post-content">
                        <p className="post-meta">
                          {getDate(post.createdAt)} <span>·</span>{" "}
                          {getReadTime(post.content)}
                        </p>

                        <h3>{post.title}</h3>

                        <p className="post-excerpt">
                          {post.excerpt || post.content}
                        </p>

                        <div className="post-footer">
                          <span>By {post.author || "Anonymous"}</span>

                          <Link 
                            className="read-link" 
                            to={`/blog/${post._id}`}
                          >
                            Read article ↗
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {filteredPosts.length === 0 && (
                <div className="empty-state">
                  <h3>No stories found</h3>
                  <p>Try a different search or category.</p>
                  <button
                    className="hero-button"
                    onClick={() => {
                      setSearch("");
                      setCategory("All");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </>
          )}
        </section>
        {/*blog form*/}
        <CreateBlog onBlogCreated={handleBlogCreated} />

        <section className="about" id="about">
          <p className="eyebrow">OUR PURPOSE</p>
          <h2>Good ideas deserve a place to grow.</h2>
          <p>
            BlogSphere brings curious people together through
            stories, knowledge, and creativity.
          </p>
        </section>
      </main>

      <footer className="footer">
        <a className="logo" href="#home">
          Blog<span>Sphere</span>
        </a>
        <p>Built with React. Made for curious minds.</p>
        <p>© 2026 BlogSphere</p>
      </footer>
    </div>
      }
      />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="/register" element={<Register />} />
<Route path="/login" element={<Login />} />
  </Routes>

  );
}

export default App;
