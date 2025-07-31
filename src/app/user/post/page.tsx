// // let begining
// app/post/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at?: string;
}

export default function PostListPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3005/api/posts");
        if (!res.ok) throw new Error("Erreur chargement des posts");
        const data = await res.json();

        setPosts(data);
      } catch (error) {
        console.error("❌ Erreur récupération des posts :", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Tous les posts</h1>
      {posts.length === 0 ? (
        <p>Pas encore de posts.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border rounded p-4">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-600">{post.description}</p>
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="mt-2 rounded max-h-64 object-cover"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


