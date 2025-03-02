import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import PostCard from "../components/PostCard"
import { Link } from 'react-router-dom';
import { Plus } from "lucide-react"

export interface Post {
    id: string
    caption: string
    image: string
    likes: number
    timestamp: string
    isLiked: boolean
  }
  

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts")
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts))
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Home</h1>
          <Link to="/create" className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition">
            <Plus className="h-6 w-6" />
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">No posts yet. Create your first post!</p>
            <Link
              to="/create"
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Create Post
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

