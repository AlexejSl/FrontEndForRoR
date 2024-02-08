import { useNavigate } from "react-router-dom";
import styles from "./TopMenu.module.scss";

function TopMenu() {
  const navigate = useNavigate();

  return (
    <div className={styles.topMenu}>
      <p className={styles.topMenu__item} onClick={() => navigate("/")}>
        Posts
      </p>
      <p className={styles.topMenu__item} onClick={() => navigate("/users")}>
        Users
      </p>
      <p className={styles.topMenu__item} onClick={() => navigate("/addPost")}>
        Add new post
      </p>
    </div>
  );
}

export default TopMenu;
