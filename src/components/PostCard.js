import React from "react";

import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const PostCard = ({ post, refreshPosts }) => {

  const { id, title, description, author } = post;
  const isAuth = JSON.parse(localStorage.getItem("isAuth")) ?? false;

  async function handleDelete() {
    try {
      const document = doc(db, "post", id);
      await deleteDoc(document);
      if (refreshPosts) await refreshPosts();
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  }

  const isAuthor =
    isAuth && auth.currentUser && author.id === auth.currentUser.uid;

  return (
    <div className="card">
      <p className="title">{title}</p>
      <p className="description">{description}</p>
      <p className="control">
        <span className="author">{author.name || author}</span>
        {isAuthor && (
          <span onClick={handleDelete} className="delete">
            <i className="bi bi-trash3"></i>
          </span>
        )}
      </p>
    </div>
  );
}
