import { useNavigate } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import styles from "./MainScreen.module.scss";
import { useEffect, useState } from "react";

function MainScreen() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://127.0.0.1:3000/posts");

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    }

    fetchPosts();
  }, []);

  if (!posts) return;

  return (
    <div className={styles.mainContainer}>
      <TopMenu />
      <div className={styles.content}>
        {posts.map((post) => {
          return (
            <div
              className={styles.post}
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
            >
              <h2 className={styles.post__header}>{post.title}</h2>
              <p className={styles.post__userName}>
                <span className={styles.greyColor}>Posted by: </span>
                {post.username}
              </p>
              <p className={styles.post__text}>{post.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainScreen;
