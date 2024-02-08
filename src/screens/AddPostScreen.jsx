import { useState } from "react";
import styles from "./AddPostScreen.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AddPostScreen() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [postHeader, setPostHeader] = useState("");
  const [text, setText] = useState("");

  async function onHandleSubmit(e) {
    e.preventDefault();

    const formData = {
      username: username,
      title: postHeader,
      text: text,
    };

    console.log(JSON.stringify(formData));

    try {
      // Send form data to the server
      const response = await fetch("http://127.0.0.1:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to add post:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  }

  return (
    <div className={styles.flex}>
      <div className={styles.container}>
        <h2 className={styles.addPostHeader}>Add new post</h2>
        <form className={styles.form}>
          <div className={styles.form__item}>
            <label htmlFor="username" className={styles.form__item_label}>
              Username
            </label>
            <input
              className={styles.form__item_username}
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.form__item}>
            <label htmlFor="postHeader" className={styles.form__item_label}>
              Title
            </label>
            <input
              className={styles.form__item_postHeader}
              type="text"
              required={true}
              id="postHeader"
              onChange={(e) => setPostHeader(e.target.value)}
            />
          </div>
          <div className={styles.form__item}>
            <label htmlFor="text" className={styles.form__item_label}>
              Text
            </label>
            <textarea
              className={styles.form__item_text}
              type="text"
              required={true}
              id="text"
              maxLength="500"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </form>
        <div className={styles.buttons}>
          <button className={styles.BackButton} onClick={() => navigate("/")}>
            <FaArrowLeft /> Back
          </button>
          <button className={styles.button} onClick={(e) => onHandleSubmit(e)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPostScreen;
