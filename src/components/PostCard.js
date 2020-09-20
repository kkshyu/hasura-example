import React from "react";

const PostCard = ({ title, tags, createdAt, children }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle text-muted mb-2">{createdAt}</h6>
        <p className="card-text">{children}</p>
        {tags.map((tag) => (
          <a key={tag} href="#!" className="mr-2">
            #{tag}
          </a>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
