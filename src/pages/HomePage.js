import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import PostCard from "../components/PostCard";

const HomePage = () => {
  const [inserting, setInserting] = useState(false);
  const [insertPost] = useMutation(INSERT_POST);
  const { data, refetch, error, loading } = useQuery(GET_POST_COLLECTION);
  const titleRef = React.createRef();
  const contentRef = React.createRef();
  const tagsRef = React.createRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const tags = tagsRef.current.value
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v.length);

    setInserting(true);
    insertPost({
      variables: {
        postData: {
          title: titleRef.current.value,
          content: contentRef.current.value,
          post_tags: {
            data: tags.map((tag) => ({ tag })),
            on_conflict: {
              constraint: "post_tag_post_id_tag_key",
              update_columns: [],
            },
          },
        },
      },
    })
      .then(() => form.reset())
      .then(() => refetch())
      .finally(() => setInserting(false));
  };

  return (
    <div className="py-5">
      <div className="container">
        <h1 className="h1">Mini Blog</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="文章標題"
              ref={titleRef}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="文章內容"
              cols="30"
              rows="10"
              ref={contentRef}
            ></textarea>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              ref={tagsRef}
              placeholder="文章標籤（以逗點相隔）"
            />
          </div>
          <button className="btn btn-primary" disabled={inserting}>
            Add post
          </button>
        </form>
        <hr />
        {loading && <div className="spinner-border"></div>}
        {error && <div>無法讀取文章</div>}
        {!loading && data.post.length === 0 && <div>目前沒有文章</div>}
        {!loading &&
          data.post.map((postData) => {
            return (
              <div key={postData.id} className="mb-3">
                <PostCard
                  title={postData.title}
                  tags={postData.post_tags.map((v) => v.tag)}
                  createdAt={postData.created_at}
                >
                  {postData.content}
                </PostCard>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const INSERT_POST = gql`
  mutation INSERT_POST($postData: post_insert_input!) {
    insert_post_one(object: $postData) {
      id
    }
  }
`;

const GET_POST_COLLECTION = gql`
  query GET_POST_COLLECTION {
    post {
      id
      title
      content
      created_at
      post_tags {
        tag
      }
    }
  }
`;

export default HomePage;
