"use client";
import React from "react";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_POSTS = gql`
  query fetchPosts {
    posts {
      title
      content
      createdAt
      author {
        name
        id
      }
    }
  }
`;

const formatDate = (dateNumber) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateNumber / 1000).toLocaleDateString(undefined, options);
};

const AllPosts = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="p-5">
      <h1 className="text-xl font-semibold text-center my-5">All Posts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {data.posts.map((post, index) => (
          <div
            key={index}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>
              <strong>Author:</strong> {post.author.name} (ID: {post.author.id})
            </p>
            <p>
              <strong>Created At:</strong> {formatDate(post.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
