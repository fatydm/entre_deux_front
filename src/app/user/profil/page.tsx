'use client';

import React from "react";

type Post = {
  id: number;
  content: string;
  createdAt: string;
};

type User = {
  username: string;
  bio: string;
  avatarUrl: string;
  followersCount: number;
  followingCount: number;
  posts: Post[];
};

const mockUser: User = {
  username: "Lego_Logo",
  bio: "Cinéphile passionné par le ☕ et les 📚 ",
  avatarUrl: "/avatar.png", // Assure-toi que l'image est bien dans /public
  followersCount: 0,
  followingCount: 0,
  posts: [
    // { id: 1, content: "Premier post !", createdAt: "2025-07-22" },
    // { id: 2, content: "React + Tailwind = ❤️", createdAt: "2025-07-23" },
  ],
};

export default function ProfilPage() {
  const user = mockUser;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={user.avatarUrl}
          alt="avatar"
          className="w-28 h-28 rounded-full object-cover"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold">@{user.username}</h1>
          <p className="text-gray-600">{user.bio}</p>
          <div className="flex justify-center sm:justify-start gap-6 mt-2 text-sm text-gray-500">
            <span><strong className="text-black">{user.posts.length}</strong> posts</span>
            <span><strong className="text-black">{user.followersCount}</strong> abonnés</span>
            <span><strong className="text-black">{user.followingCount}</strong> abonnements</span>
          </div>
          <button className="mt-3 px-4 py-1 border rounded-full text-sm hover:bg-gray-100 transition">
            Modifier le profil
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Publications</h2>
        {user.posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-sm mb-4 border">
            <p className="text-gray-800">{post.content}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
        {user.posts.length === 0 && (
          <p className="text-gray-500">Aucune publication pour le moment.</p>
        )}
      </div>
    </div>
  );
}
