import { useNavigate, useParams } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import styles from "./UsersPosts.module.scss";
import { useEffect, useState } from "react";

function UsersPosts() {
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();
  const { name } = useParams();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `http://127.0.0.1:3000/users/${name}/posts`
        );

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
  }, [name]);

  if (!posts) return;

  return (
    <div className={styles.mainContainer}>
      <TopMenu />
      <div className={styles.content}>
        <h2 className={styles.username}>Posts of {name}</h2>
        {posts.map((post) => {
          return (
            <div
              className={styles.post}
              onClick={() => navigate(`/post/${post.id}`)}
              key={post.id}
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

export default UsersPosts;
