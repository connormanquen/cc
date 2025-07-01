import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("/api/reddit");
        setListings(res.data);
      } catch (err) {
        console.error("Failed to fetch listings", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: 20 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Connors Chronos LLC</h1>
      <p>Email: connorschronosllc@gmail.com | Phone: 248-760-7662</p>
      {loading && <p>Loading listings...</p>}
      {error && <p style={{ color: 'red' }}>Failed to load listings. Please check back later.</p>}
      {!loading && listings.length === 0 && <p>No listings found.</p>}
      {listings.map((post) => (
        <div key={post.id} style={{ marginBottom: 20, borderBottom: '1px solid #333', paddingBottom: 20 }}>
          <h2>{post.title}</h2>
          {post.image && <img src={post.image} alt="" style={{ maxWidth: "100%" }} />}
          <p>{post.description}</p>
          <p>Status: {post.flair}</p>
          <a href={post.url} target="_blank" rel="noreferrer" style={{ color: "#4ea1f3" }}>View on Reddit</a>
        </div>
      ))}
    </div>
  );
}

