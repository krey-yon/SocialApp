import { type ChangeEvent, type FormEvent } from "react"
import Navbar from "../components/Navbar"
import { ArrowLeft, Image } from "lucide-react"
import { Link } from 'react-router-dom'
import { useRouter } from '../hooks/useRouter';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { 
  setImagePreview, 
  setCaption, 
  setIsSubmitting, 
  addPost,
  resetForm
} from '../features/posts/postsSlice';
import { toast } from "react-toastify";

const CreatePost = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { caption, imagePreview, isSubmitting } = useAppSelector(state => state.posts);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setImagePreview(reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!imagePreview) {
      toast("Please select an image");
      return;
    }

    dispatch(setIsSubmitting(true));

    const newPost = {
      id: Date.now().toString(),
      caption,
      image: imagePreview,
      likes: 0,
      timestamp: new Date().toISOString(),
      isLiked: false,
    };

    console.log(caption)
    
    dispatch(addPost(newPost));
    dispatch(resetForm());
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className="flex items-center mb-6">
          <Link to="/" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Create Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Upload Image</label>
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition ${
                imagePreview ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="mx-auto max-h-64 rounded" />
                  <button
                    type="button"
                    className="mt-2 text-sm text-blue-500 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation()
                      dispatch(setImagePreview(null))
                    }}
                  >
                    Change image
                  </button>
                </div>
              ) : (
                <div className="py-8">
                  <Image className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">Click to upload an image</p>
                </div>
              )}
              <input type="file" id="image-upload" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="caption" className="block text-gray-700 mb-2">
              Caption
            </label>
            <textarea
              id="caption"
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => dispatch(setCaption(e.target.value))}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !imagePreview}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </main>
  )
}

export default CreatePost