import React, { useState, useRef } from 'react';
import {
  Users, SendHorizontal, Clock, ThumbsUp, MessageSquare,
  Image, X
} from "lucide-react";

function HomeTab({ user, posts, profilePicture, onPostsUpdate, postTypeOptions }) {
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [postType, setPostType] = useState("journey");
  const postFileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size too large. Please select an image under 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewPost = () => {
    if (!newPost.trim() && !selectedImage) {
      alert("Please add some content or an image to post.");
      return;
    }

    if (newPost.length > 1000) {
      alert("Post content is too long. Maximum 1000 characters.");
      return;
    }

    const newPostObj = {
      id: Date.now(),
      user: user?.name || "Anonymous",
      userType: user?.userType || "ex-convict",
      role: getUserRole(user?.userType),
      icon: getUserIcon(user?.userType),
      content: newPost,
      image: selectedImage,
      postType: postType,
      timestamp: "Just now",
      likes: 0,
      comments: [],
      shares: 0,
      verified: ["recruiter", "npo", "ngo", "community"].includes(user?.userType),
      allowComments: true
    };

    onPostsUpdate([newPostObj, ...posts]);
    setNewPost("");
    setSelectedImage(null);
    if (postFileInputRef.current) {
      postFileInputRef.current.value = "";
    }
  };

  const getUserRole = (userType) => {
    const roles = {
      recruiter: "Verified Recruiter",
      npo: "Non-Profit Organization",
      ngo: "Non-Governmental Organization",
      community: "Community Leader",
      volunteer: "Volunteer Seeker",
      "ex-convict": "RE-Link Member"
    };
    return roles[userType] || "RE-Link Member";
  };

  const getUserIcon = (userType) => {
    const icons = {
      recruiter: "👔",
      npo: "🤝",
      ngo: "🌍",
      community: "👥",
      volunteer: "❤️",
      "ex-convict": "👤"
    };
    return icons[userType] || "👤";
  };

  const handleLikePost = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    onPostsUpdate(updatedPosts);
  };

  return (
    <div className="home-tab">
      <div className="feed-header">
        <h3 className="feed-title">
          <Users size={24} />
          Community Feed
        </h3>
      </div>

      <div className="create-post-card">
        <div className="post-user-info">
          <div className="user-avatar">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="user-avatar-img" />
            ) : (
              <span className="avatar-initial">{user?.name?.charAt(0) || "U"}</span>
            )}
          </div>
          <div className="user-details">
            <h4 className="user-name">{user?.name || "You"}</h4>
          </div>
        </div>

        <div className="post-content-area">
          <textarea
            placeholder="Share your thoughts... (Max 1000 characters)"
            value={newPost}
            onChange={(e) => {
              if (e.target.value.length <= 1000) {
                setNewPost(e.target.value);
              }
            }}
            className="post-input"
            rows={3}
            maxLength={1000}
          />

          {selectedImage && (
            <div className="image-preview">
              <img src={selectedImage} alt="Preview" />
              <button onClick={() => setSelectedImage(null)}>
                <X size={16} />
              </button>
            </div>
          )}

          <div className="post-actions">
            <div className="post-tools">
              <input
                type="file"
                ref={postFileInputRef}
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
              />
              <button 
                className="tool-btn"
                onClick={() => postFileInputRef.current?.click()}
              >
                <Image size={20} />
              </button>
            </div>

            <button 
              className="post-submit-btn"
              onClick={handleNewPost}
              disabled={!newPost.trim() && !selectedImage}
            >
              <SendHorizontal size={20} />
              <span>Post</span>
            </button>
          </div>
        </div>
      </div>

      <div className="posts-feed">
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onLike={handleLikePost}
          />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post, onLike }) {
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user">
          <div className="post-avatar">
            <span className="post-avatar-icon">{post.icon}</span>
          </div>
          <div className="post-user-info">
            <h4 className="post-username">{post.user}</h4>
            <span className="post-user-role">{post.role}</span>
          </div>
        </div>
        <div className="post-timestamp">
          <Clock size={14} />
          <span>{post.timestamp}</span>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.image && (
          <div className="post-image">
            <img src={post.image} alt="Post content" />
          </div>
        )}
      </div>

      <div className="post-actions">
        <button 
          className="post-action-btn"
          onClick={() => onLike(post.id)}
        >
          <ThumbsUp size={18} />
          <span>Like ({post.likes})</span>
        </button>
        <button className="post-action-btn">
          <MessageSquare size={18} />
          <span>Comment ({post.comments.length})</span>
        </button>
      </div>
    </div>
  );
}

export default HomeTab;