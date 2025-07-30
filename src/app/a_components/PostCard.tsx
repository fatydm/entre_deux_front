
import { useState, useEffect } from "react";
import { Heart, MessageCircle } from "lucide-react";

type Comment = {
  id: number;
  content: string;
  user: {
    username: string;
  };
};

type PostCardProps = {
  postId: number;
  username: string;
  avatar: string;
  image_url: string;
  description: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  currentUserId: number; 
};

export default function PostCard({
  postId,
  username,
  avatar,
  image_url,
  description,
  tags,
  likes,
  comments,
  currentUserId,
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(comments);

  // Vérifie si l'utilisateur a déjà liké ce post
  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const res = await fetch(
          `http://localhost:3005/likePosts/${postId}/${currentUserId}`
        );
        const data = await res.json();
        setIsLiked(data.liked);
      } catch (error) {
        console.error("Erreur lors de la vérification du like :", error);
      }
    };

    checkIfLiked();
  }, [postId, currentUserId]);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await fetch(`http://localhost:3005/likePosts/${postId}/${currentUserId}`, {
          method: "DELETE",
        });
        setLikesCount((prev) => prev - 1);
      } else {
        await fetch(`http://localhost:3005/likePosts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_id: postId, user_id: currentUserId }),
        });
        setLikesCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Erreur lors du like :", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`http://localhost:3005/likePosts/${postId}/${currentUserId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          post_id: postId,
          user_id: currentUserId,
        }),
      });

      const createdComment = await res.json();

      setCommentList((prev) => [...prev, createdComment]);
      setNewComment("");
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  };

  return (
    <article className="flex flex-col gap-4 bg-white rounded-2xl shadow-lg p-4 w-full max-w-md mx-auto">
      {/* Header avec avatar et pseudo */}
      <div className="flex items-center gap-2 mb-2">
        <img
          src={avatar}
          alt=""
          className="w-10 h-10 rounded-full object-cover border"
        />
        <span className="font-semibold">{username}</span>
      </div>

      {/* Image */}
      <div className="w-full overflow-hidden rounded-lg">
        <img
          src={image_url}
          alt="image"
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

      {/* Actions (likes & commentaires) */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-4">
          <button onClick={handleLike}>
            {isLiked ? (
              <Heart className="text-red-500 fill-red-500" />
            ) : (
              <Heart className="text-gray-600" />
            )}
          </button>

          <button onClick={() => setShowComments(!showComments)}>
            <MessageCircle className="text-gray-600" />
          </button>
        </div>

        <div className="text-sm">
          ❤️ {likesCount} Like{likesCount > 1 ? "s" : ""}
        </div>
      </div>

      {/* Commentaires */}
      {showComments && (
        <div className="border-t pt-2 mt-2 text-sm space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ajouter un commentaire..."
              className="flex-1 border rounded-lg px-3 py-1"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleAddComment}
              className="text-white bg-purple-600 px-3 rounded-lg hover:bg-purple-700"
            >
              Envoyer
            </button>
          </div>

          <div className="max-h-40 overflow-y-auto space-y-1">
            {commentList.length === 0 ? (
              <p className="italic text-gray-500">Pas encore de commentaires.</p>
            ) : (
              commentList.map((comment) => (
                <div key={comment.id}>
                  <span className="font-semibold">{comment.user.username}:</span>{" "}
                  {comment.content}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </article>
  );
}



// import { useState } from "react";
// import { Heart, MessageCircle } from "lucide-react";

// type Comment = {
//   id: number;
//   content: string;
//   user: {
//     username: string;
//   };
// };

// type PostCardProps = {
//   username: string;
//   avatar: string;
//   image_url: string;
//   description: string;
//   tags: string[];
//   likes: number;
//   comments: Comment[];
// };

// export default function PostCard({
//   username,
//   avatar,
//   image_url,
//   description,
//   tags,
//   likes,
//   comments,
// }: PostCardProps) {
//   const [showComments, setShowComments] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(likes);
//   const [newComment, setNewComment] = useState("");

//   const toggleLike = () => {
//     setLiked(!liked);
//     setLikeCount((prev) => prev + (liked ? -1 : 1));
//     // TODO : requête API si besoin
//   };

//   const handleCommentSubmit = () => {
//     if (!newComment.trim()) return;
//     console.log("Commentaire envoyé :", newComment);
//     setNewComment("");
//     // TODO : envoyer vers backend si nécessaire
//   };

//   return (
//     <article className="flex flex-col gap-4 bg-white rounded-2xl shadow-lg p-4 w-full max-w-md mx-auto">
//       {/* Header avec avatar et pseudo */}
//       <div className="flex items-center gap-2 mb-2">
//         <img
//           src={avatar}
//           alt="avatar"
//           className="w-10 h-10 rounded-full object-cover border"
//         />
//         <span className="font-semibold">{username}</span>
//       </div>

//       {/* Image */}
//       <div className="w-full overflow-hidden rounded-lg">
//         <img
//           src={image_url}
//           alt="post"
//           className="w-full h-64 object-cover rounded-lg"
//         />
//       </div>

//       {/* Actions like + comment */}
//       <div className="flex items-center gap-4 text-xl">
//         <button onClick={toggleLike}>
//           <Heart
//             className={`w-6 h-6 transition-colors duration-200 ${
//               liked ? "text-red-500 fill-red-500" : "text-gray-600"
//             }`}
//           />
//         </button>

//         <button onClick={() => setShowComments(!showComments)}>
//           <MessageCircle className="w-6 h-6 text-gray-600 hover:text-purple-600" />
//         </button>
//       </div>

//       {/* Like count */}
//       <span className="text-sm font-semibold text-gray-700">
//         ❤️ {likeCount} Like{likeCount > 1 ? "s" : ""}
//       </span>

//       {/* Description */}
//       <p className="text-gray-700">{description}</p>

//       {/* Tags */}
//       <div className="flex gap-2 flex-wrap">
//         {tags.map((tag, i) => (
//           <span
//             key={i}
//             className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600"
//           >
//             #{tag}
//           </span>
//         ))}
//       </div>

//       {/* Comment section */}
//       {showComments && (
//         <div className="mt-2 space-y-2">
//           {/* Liste des commentaires */}
//           <div className="border-t pt-2 max-h-48 overflow-y-auto text-sm space-y-1">
//             {comments.length === 0 ? (
//               <p className="italic text-gray-500">Pas encore de commentaires.</p>
//             ) : (
//               comments.map((comment) => (
//                 <div key={comment.id}>
//                   <span className="font-semibold">{comment.user.username}:</span>{" "}
//                   <span>{comment.content}</span>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Formulaire de commentaire */}
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="Ajouter un commentaire..."
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               className="flex-1 border rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
//             />
//             <button
//               onClick={handleCommentSubmit}
//               className="text-sm text-purple-600 font-semibold hover:underline"
//             >
//               Publier
//             </button>
//           </div>
//         </div>
//       )}
//     </article>
//   );
// }
