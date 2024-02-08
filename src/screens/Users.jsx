import TopMenu from "../components/TopMenu";
import styles from "./Users.module.scss";
import blankUser from "../assets/blankUser.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://127.0.0.1:3000/users");

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }

    fetchUsers();
  }, []);

  if (!users) return;

  return (
    <div className={styles.mainContainer}>
      <TopMenu />
      <div className={styles.usersGrid}>
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
              <p className={styles.user__clickText}>
                Click on the user to see his posts
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Users;
