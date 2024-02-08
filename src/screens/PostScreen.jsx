import { useEffect, useState } from "react";
import TopMenu from "../components/TopMenu";
import styles from "./PostScreen.module.scss";
import { useParams } from "react-router-dom";
import { RiChatDeleteLine } from "react-icons/ri";

function PostScreen() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState(null);
  const { postId } = useParams();

  //submiting a new comment
  async function handleSubmitNewComment(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:3000/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newComment }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setComments((prevComments) => [...prevComments, data]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  }

  //fetching posts
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`http://127.0.0.1:3000/posts/${postId}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          console.error("Failed to fetch post:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    }

    fetchPosts();
  }, [postId]);

  //fetching comments
  useEffect(() => {
    async function fetchComments() {
      try {
        const commentsResponse = await fetch(
          `http://127.0.0.1:3000/posts/${postId}/comments`
        );
        if (commentsResponse.ok) {
          const data = await commentsResponse.json();
          setComments(data);
        } else {
          console.error(
            "Failed to fetch comments:",
            commentsResponse.statusText
          );
        }
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    }

    fetchComments();
  }, [postId]);

  //deleting a comment
  async function handleDeleteComment(commentId) {
    try {
      await fetch(
        `http://127.0.0.1:3000/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // remove the deleted comment from the comments array
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  }

  if (!post || !comments) return;

  return (
    <div className={styles.mainContainer}>
      <TopMenu />
      <div className={styles.content}>
        <div className={styles.post}>
          <h2 className={styles.post__header}>{post.title}</h2>
          <p className={styles.post__userName}>
            <span className={styles.greyColor}>Posted by: </span>
            {post.username}
          </p>
          <p className={styles.post__text}>{post.text}</p>
        </div>
        <form
          className={styles.writeComment}
          onSubmit={(e) => handleSubmitNewComment(e)}
        >
          <label htmlFor="writeComment" className={styles.writeComment__label}>
            Post a comment:
          </label>
          <textarea
            className={styles.writeComment__text}
            type="writeComment"
            required={true}
            id="text"
            maxLength="200"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className={styles.writeComment__button}>Submit</button>
        </form>
        {comments.map((comment) => {
          return (
            <div className={styles.comment} key={comment.id}>
              <p>{comment.text}</p>
              <button
                className={styles.comment__delete}
                onClick={() => handleDeleteComment(comment.id)}
              >
                <RiChatDeleteLine />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PostScreen;
