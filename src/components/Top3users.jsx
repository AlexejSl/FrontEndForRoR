import { useNavigate } from 'react-router-dom';
import styles from './Top3users.module.scss';
import { useEffect, useState } from 'react';
import blankUser from '../assets/blankUser.svg';
import PropTypes from 'prop-types';

function Top3users({ path }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const pathType = path === 'most_posts';

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`http://127.0.0.1:3000/users/${path}`);

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch posts:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    }

    fetchPosts();
  }, []);

  if (!users) return;

  return (
    <div className={styles.usersBox}>
      {users.map((user) => {
        return (
          <div
            className={styles.user}
            onClick={() => navigate(`/users/${user.username}`)}
            key={user.id}
          >
            <img
              src={blankUser}
              className={styles.user__img}
              alt="Profile picture of user"
            />
            <h3 className={styles.user__name}>{user.username}</h3>
            <p className={styles.user__numberOfPosts}>
              {pathType
                ? `Number of posts: ${user.posts_count}`
                : `Avg post engagement: ${user.average_comments.toFixed(2)}`}
            </p>
            <p className={styles.user__clickText}>
              Click on the user to see his posts
            </p>
          </div>
        );
      })}
    </div>
  );
}

Top3users.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Top3users;
