import { useState } from "react"
import { Heart, Share, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { toast, ToastContainer } from 'react-toastify';

interface PostCardProps {
  post: Post
}

export interface Post {
    id: string
    caption: string
    image: string
    likes: number
    timestamp: string
    isLiked: boolean
  }
  
  

export default function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    const newLikedStatus = !isLiked
    setIsLiked(newLikedStatus)

    const newLikeCount = newLikedStatus ? likeCount + 1 : likeCount - 1
    setLikeCount(newLikeCount)

    const storedPosts = localStorage.getItem("posts")
    if (storedPosts) {
      const posts = JSON.parse(storedPosts)
      const updatedPosts = posts.map((post: Post) => {
        if (post.id === post.id) {
          return {
            ...post,
            isLiked: newLikedStatus,
            likes: newLikeCount,
          }
        }
        return post
      })
      localStorage.setItem("posts", JSON.stringify(updatedPosts))
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard")
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <p className="font-medium">User</p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>
        {post.caption && <p className="mb-3">{post.caption}</p>}
      </div>

      <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full object-cover max-h-96" />

      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 ${isLiked ? "text-red-500" : "text-gray-500"}`}
            >
              <Heart className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`} />
              <span>{likeCount}</span>
            </button>
          </div>
          <button onClick={handleShare} className="text-gray-500">
            <Share className="h-6 w-6" />
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}


