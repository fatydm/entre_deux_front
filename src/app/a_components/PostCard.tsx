import { useState } from "react";

type Comment = {
  id: number;
  content: string;
  user: {
    username: string;
  };
};

type PostCardProps = {
  username: string;
  avatar: string;
  image_url: string;
  description: string;
  tags: string[];
  likes: number;
  comments: Comment[];
};

export default function PostCard({
  username,
  avatar,
  image_url,
  description,
  tags,
  likes,
  comments,
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

  return (
    <article className="flex flex-col gap-4 bg-white rounded-2xl shadow-lg p-4 w-full max-w-md mx-auto">
      {/* Header avec avatar et pseudo */}
      <div className="flex items-center gap-2 mb-2">
        <img
          src={avatar}
          alt={""}
          className="flex w-10 h-10 rounded-full object-cover border"
        />
        <span className="font-semibold">{username}</span>
      </div>

      {/* Image du post */}
      <div className="w-full overflow-hidden rounded-lg">
        <img
          src={image_url}
          alt={"image"}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      {/* Description */}
      <p className="text-gray-700">{description}</p>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Likes et commentaires */}
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 text-sm text-purple-600 hover:underline"
          aria-expanded={showComments}
        >
          💬 {comments.length} Commentaire{comments.length > 1 ? "s" : ""}
        </button>

        <span className="text-sm">
          ❤️ {likes} Like{likes > 1 ? "s" : ""}
        </span>
      </div>

      {/* Zone des commentaires */}
      {showComments && (
        <div className="border-t pt-2 mt-2 max-h-48 overflow-y-auto text-sm space-y-1">
          {comments.length === 0 && (
            <p className="italic text-gray-500">Pas encore de commentaires.</p>
          )}
          {comments.map((comment) => (
            <div key={comment.id}>
              <span className="font-semibold">{comment.user.username}:</span>{" "}
              <span>{comment.content}</span>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
