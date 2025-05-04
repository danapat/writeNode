import React, { useEffect, useState, useRef } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { PostCard, SkeletonCard } from "../components";
import { useTitle } from "../hooks/useTitle";

export const HomePage = () => {
  const initialPostStates = Array(2).fill(false);
  const [posts, setPosts] = useState(initialPostStates);
  const [toggle, setToggle] = useState(false);
  const collectionRef = useRef(collection(db, "post"));
  useTitle("Home");

  // getPosts außerhalb von useEffect definieren, damit es übergeben werden kann
  const getPosts = async () => {
    try {
      const data = await getDocs(collectionRef.current);
      const postsArray = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postsArray);
    } catch (error) {
      console.error("Fehler beim Laden der Posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [toggle]);

  return (
    <section>
      {posts.map((post, index) => (
        post ? (<PostCard
          key={post.id}
          post={post}
          toggle={toggle}
          setToggle={setToggle}
          refreshPosts={getPosts}
        />) : (
          <SkeletonCard key={index} />
        )

      ))}
    </section>
  );
};
