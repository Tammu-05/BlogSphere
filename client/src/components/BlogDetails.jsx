
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/blogs";

function BlogDetails() {
  const currentUser = JSON.parse(
  sessionStorage.getItem("blogsphere-user") || "null"
);

  const { id } = useParams();
  const startEditing = () => {
  setEditForm({
    title: blog.title || "",
    content: blog.content || "",
    excerpt: blog.excerpt || "",
    author: blog.author || "",
    category: blog.category || "",
    imageUrl: blog.imageUrl || "",
  });
  setEditMessage("");
  setIsEditing(true);
};

const handleEditChange = (event) => {
  setEditForm({
    ...editForm,
    [event.target.name]: event.target.value,
  });
};

const handleEditSubmit = async (event) => {
  event.preventDefault();
  setSaving(true);
  setEditMessage("Blog updated successfully");
  setIsEditing(false);

  try {
    const response = await axios.put(`${API_URL}/${id}`, editForm, {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("blogsphere-token")}`,
  },
});

const handleDelete = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this article?"
  );

  if (!confirmed) return;

  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("blogsphere-token")}`,
      },
    });

    window.location.href = "/";
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Failed to delete article."
    );
  }
};

    const updatedBlog = response.data.data;

    setBlog(updatedBlog);
    setIsEditing(false);
    setEditMessage("Article updated successfully!");
  } catch (err) {
    setEditMessage(
      err.response?.data?.message || "Unable to update article."
    );
  } finally {
    setSaving(false);
  }
};
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  
const [editForm, setEditForm] = useState({
  title: "",
  content: "",
  excerpt: "",
  author: "",
  category: "",
  imageUrl: "",
});
const [saving, setSaving] = useState(false);
const [editMessage, setEditMessage] = useState("");
const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${API_URL}/${id}`);
        setBlog(response.data.data);
        const blogsResponse = await axios.get(API_URL);

const allBlogs = Array.isArray(blogsResponse.data.data)
  ? blogsResponse.data.data
  : [];

setRelatedBlogs(
  allBlogs
    .filter(
      (item) =>
        item._id !== id &&
        item.isPublished !== false &&
        item.category === response.data.data.category
    )
    .slice(0, 3)
);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load this article."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  if (loading) {
    return <main className="article-page"><p>Loading article...</p></main>;
  }

  if (error || !blog) {
    return (
      <main className="article-page">
        <h2>Article unavailable</h2>
        <p>{error || "This article could not be found."}</p>
        <Link to="/">← Back to BlogSphere</Link>
      </main>
    );
  }

  return (
    <main className="article-page">
      <Link className="back-link" to="/">
        ← Back to BlogSphere
      </Link>

      <article className="article-detail">
        
{isEditing && (
  <form className="edit-article-form" onSubmit={handleEditSubmit}>
    <h2>Edit Article</h2>

    <label>
      Title
      <input
        name="title"
        value={editForm.title}
        onChange={handleEditChange}
        required
      />
    </label>

    <label>
      Author
      <input
        name="author"
        value={editForm.author}
        onChange={handleEditChange}
      />
    </label>

    <label>
      Category
      <input
        name="category"
        value={editForm.category}
        onChange={handleEditChange}
      />
    </label>

    <label>
      Excerpt
      <textarea
        name="excerpt"
        value={editForm.excerpt}
        onChange={handleEditChange}
        rows="3"
      />
    </label>

    <label>
      Image URL
      <input
        name="imageUrl"
        type="url"
        value={editForm.imageUrl}
        onChange={handleEditChange}
      />
    </label>

    <label>
      Content
      <textarea
        name="content"
        value={editForm.content}
        onChange={handleEditChange}
        rows="10"
        required
      />
    </label>

    {editMessage && <p role="status">{editMessage}</p>}

    <div className="edit-form-actions">
      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </button>

      <button
        type="button"
        onClick={() => setIsEditing(false)}
        disabled={saving}
      >
        Cancel
      </button>
    </div>
  </form>
)}

        {blog.imageUrl && (
          <img
            className="article-cover"
            src={blog.imageUrl}
            alt={blog.title}
          />
        )}

        <p className="eyebrow">{blog.category || "General"}</p>

        <h1>{blog.title}</h1>
        {currentUser && String(blog.authorId?._id || blog.authorId) === String(currentUser.id || currentUser._id) && (
  <>
        <button 
        className="edit-button"
        onClick={startEditing}
        >
          Edit Article 
        </button>
        
<button
  className="delete-button"
  onClick={async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this article?"
    );

    if (!confirmed) return;

    try {
     
await axios.delete(`${API_URL}/${id}`,  {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("blogsphere-token")}`,
  },
});

      window.location.href = "/";
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to delete article. Please try again."
      );
    }
  }}
>
  Delete Article 🗑️
</button>
</>
        )}


        <p className="article-meta">
          By {blog.author || "Anonymous"} ·{" "}
          {blog.createdAt
            ? new Date(blog.createdAt).toLocaleDateString()
            : "Recently published"}
        </p>

        {blog.excerpt && (
          <p className="article-excerpt">{blog.excerpt}</p>
        )}

        <div className="article-body">
          {blog.content}
        </div>

        {blog.tags?.length > 0 && (
          <div className="article-tags">
            {blog.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      
      </article>

      {relatedBlogs.length > 0 && (
        <section className="related-section">
          <h2>Related Articles</h2>
          <p className="related-subtitle">
            More stories you might enjoy
          </p>

          <div className="related-grid">
            {relatedBlogs.map((item) => (
              <article className="related-card" key={item._id}>
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                  />
                )}

                <div className="related-card-content">
                  <p className="eyebrow">
                    {item.category || "General"}
                  </p>

                  <h3>{item.title}</h3>

                  <p className="related-excerpt">
                    {item.excerpt ||
                      item.content?.slice(0, 110) ||
                      "Explore this article on BlogSphere."}
                  </p>

                  <Link
                    className="read-link"
                    to={`/blog/${item._id}`}
                  >
                    Read article ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>

  );
}

export default BlogDetails;
