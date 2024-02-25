import { useEffect, useState } from 'react';
import styles from './Top5posts.module.scss';
import { useNavigate } from 'react-router-dom';

function Top5posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          'http://127.0.0.1:3000/posts/most_commented'
        );

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    }

    fetchPosts();
  }, []);

  if (!posts) return;

  return (
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
            <p className={styles.post__comments}>
              Number of comments:{' '}
              <span className={styles.post__comments_number}>
                {post.comments_count}
              </span>
            </p>
            <p className={styles.post__text}>Number of comments:{post.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Top5posts;
