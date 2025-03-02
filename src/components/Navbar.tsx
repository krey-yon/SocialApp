import { User } from "lucide-react"
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 max-w-md">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-500">
            Social App
          </Link>
          <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>
    </nav>
  )
}

