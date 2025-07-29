type PostCardProps = {
  username: string;
  avatar: string;
  image_url: string;
  description: string;
  tags: string[];
};

export default function PostCard({ username, avatar, image_url, description, tags }: PostCardProps) {
  return (
    <article className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center gap-3 mb-2">
        <img src={avatar} alt={username} className="w-10 h-10 rounded-full" />
        <span className="font-semibold">{username}</span>
      </div>

      <img src={image_url} alt={description} className="rounded-lg mb-3" />

      <p className="text-gray-700 mb-2">{description}</p>

      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, i) => (
          <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
