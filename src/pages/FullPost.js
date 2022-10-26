import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

import { Post } from "../components/Post";
import { useEffect } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const FullPost = () => {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState("");
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Ошибка при получении статьи");
      });
  }, []);
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  return (
    <>
      <Post
        id={data.id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
    </>
  );
};
