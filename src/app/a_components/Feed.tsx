"use client";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

type Comment = {
  id: number;
  content: string;
  user: {
    username: string;
  };
};

type Post = {
  id: number;
  username: string;
  avatar: string;
  image_url: string;
  description: string;
  tags: string[];
  likes: number;
  comments: Comment[];
};

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3005/posts");
        const data = await res.json();
        console.log("DATA REÇUE :", data);

        const formattedPosts = data.map((post: any) => ({
          id: post.id,
          username: post.user.username,
          avatar: post.user.avatar || "/default-avatar.png",
          image_url: post.image_url,
          description: post.description,
          tags: post.tags.map((t: any) => t.tag.name),
          likes: post.likesCount || 0,
          comments: post.comments || [],
        }));

        setPosts(formattedPosts);
      } catch (err) {
        console.error("Erreur lors du fetch des posts :", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
