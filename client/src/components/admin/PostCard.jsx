import { Trash2 } from 'lucide-react';

const PostCard = ({ post, onDelete }) => {
  return (
    <div className="bg-[#1A1A1E] border border-gray-800/50 p-4 rounded-lg shadow-md relative">
      <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-semibold text-white">{post.title}</h3>
      <p className="text-gray-400 mt-2">{post.description}</p>
      <button
        onClick={() => onDelete(post.id)}
        className="absolute top-2 right-2 p-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-md"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PostCard;
