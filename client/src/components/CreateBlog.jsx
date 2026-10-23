
import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/blogs";

function CreateBlog({ onBlogCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    category: "Technology",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      
const response = await axios.post(
  API_URL,
  {
    ...formData,
    tags: [],
    isPublished: true,
  },
  {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("blogsphere-token")}`,
    },
  }
);


      setMessage("Blog published successfully!");

      setFormData({
        title: "",
        content: "",
        excerpt: "",
        author: "",
        category: "Technology",
        imageUrl: "",
      });

      if (onBlogCreated) {
        onBlogCreated(response.data.data);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not publish your blog. Please check your backend."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="create-blog"
      style={{
        maxWidth: "760px",
        margin: "40px auto",
        padding: "28px",
        borderRadius: "16px",
        background: "#ffffff",
        boxShadow: "0 8px 30px rgba(0,0,0,0.07)",
      }}
    >
      <p className="eyebrow">SHARE YOUR IDEAS</p>
      <h2>Create a new blog</h2>
      <p>Write something worth sharing with the BlogSphere community.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Blog title *</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter an interesting title"
          maxLength={150}
          required
          style={inputStyle}
        />

        <label htmlFor="author">Author name *</label>
        <input
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Your name"
          required
          style={inputStyle}
        />

        <label htmlFor="category">Category *</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="Technology">Technology</option>
          <option value="Development">Development</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Education">Education</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="General">General</option>
        </select>

        <label htmlFor="excerpt">Short description</label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          placeholder="Summarize your blog in a few sentences"
          maxLength={300}
          rows={3}
          style={inputStyle}
        />

        <label htmlFor="content">Full blog content *</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Start writing your blog here..."
          rows={8}
          required
          style={inputStyle}
        />

        <label htmlFor="imageUrl">Cover image URL (optional)</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          style={inputStyle}
        />

        {message && (
  <p
    role="status"
    style={{
      color: "#15803d",
      backgroundColor: "#dcfce7",
      padding: "12px",
      borderRadius: "8px",
      fontWeight: "bold",
      marginTop: "16px",
    }}
  >
    ✓ {message}
  </p>
)}

        {error && (
          <p role="alert" style={{ color: "red" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          className="hero-button"
          disabled={loading}
          style={{ marginTop: "12px", cursor: "pointer" }}
        >
          {loading ? "Publishing..." : "Publish blog ↗"}
        </button>
      </form>
    </section>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  margin: "8px 0 18px",
  border: "1px solid #dedede",
  borderRadius: "8px",
  font: "inherit",
};

export default CreateBlog;
