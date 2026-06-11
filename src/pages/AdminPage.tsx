import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Edit, Trash2, Upload, Image as ImageIcon, Plus, X, ArrowLeft, Save, Sparkles, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  content: string;
  date: string;
}

const PRESET_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=600',
    label: 'Instructing Student'
  },
  {
    url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600',
    label: 'Steering Wheel & Dash'
  },
  {
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600',
    label: 'Highway Practice'
  },
  {
    url: 'https://images.unsplash.com/photo-1510133768194-a81d2614a9a8?auto=format&fit=crop&q=80&w=600',
    label: 'Car Key & Driving'
  },
  {
    url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600',
    label: 'Parallel Parking'
  },
  {
    url: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=600',
    label: 'Driving Lesson'
  }
];

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({ title: '', author: '', imageUrl: '', content: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials! Default is admin / admin123');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewPost(prev => ({ ...prev, imageUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startEdit = (post: BlogPost) => {
    setEditingPostId(post.id);
    setNewPost({
      title: post.title,
      author: post.author,
      imageUrl: post.imageUrl || '',
      content: post.content
    });
    // Scroll smoothly to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setNewPost({ title: '', author: '', imageUrl: '', content: '' });
  };

  const publishPost = () => {
    if (!newPost.title || !newPost.content) {
      alert('Please fill out the Title and Content fields.');
      return;
    }

    const finalImageUrl = newPost.imageUrl || PRESET_IMAGES[0].url;

    if (editingPostId) {
      const updatedPosts = posts.map(p => {
        if (p.id === editingPostId) {
          return {
            ...p,
            title: newPost.title,
            author: newPost.author || 'Smart Drive Team',
            imageUrl: finalImageUrl,
            content: newPost.content,
          };
        }
        return p;
      });
      setPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      setEditingPostId(null);
      alert('Post updated successfully!');
    } else {
      const post: BlogPost = {
        title: newPost.title,
        author: newPost.author || 'Smart Drive Team',
        imageUrl: finalImageUrl,
        content: newPost.content,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString()
      };
      const updatedPosts = [post, ...posts]; // Add new posts at the top
      setPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      alert('Post published successfully!');
    }

    setNewPost({ title: '', author: '', imageUrl: '', content: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const deletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const updatedPosts = posts.filter(p => p.id !== id);
      setPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      if (editingPostId === id) {
        cancelEdit();
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-red-100">
          <div className="text-center mb-8">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin Portal</h2>
            <p className="text-gray-500 mt-2">Access the hidden blog content manager</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
              <input 
                type="text" 
                placeholder="e.g. admin" 
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
              />
            </div>
          </div>
          
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-bold transition mt-6 tracking-wide shadow-md shadow-red-200">
            Secure Sign In
          </button>
          
          <div className="text-center mt-4">
            <Link to="/blog" className="text-xs text-gray-500 hover:text-red-600 flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blogs
            </Link>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12 flex-grow w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              Dashboard <span className="text-red-600 text-xl font-normal py-0.5 px-2.5 bg-red-50 rounded-full border border-red-100">Live Editor</span>
            </h1>
            <p className="text-gray-500">Create, edit, delete, and curate premium driving blogs.</p>
          </div>
          <Link to="/blog" className="self-start md:self-auto bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Exit to Blogs Page
          </Link>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Post Form (Create or Edit) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm transition">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {editingPostId ? (
                    <>
                      <Edit className="w-6 h-6 text-yellow-500" />
                      Edit Blog Post
                    </>
                  ) : (
                    <>
                      <Plus className="w-6 h-6 text-red-600" />
                      Create New Post
                    </>
                  )}
                </h2>
                {editingPostId && (
                  <button 
                    onClick={cancelEdit} 
                    className="text-sm font-bold text-red-500 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                  >
                    <X className="w-4 h-4" /> Cancel Edit
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Blog Title *</label>
                  <input 
                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition" 
                    placeholder="Enter an catchy title..." 
                    value={newPost.title} 
                    onChange={e => setNewPost({...newPost, title: e.target.value})} 
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Author Name</label>
                    <input 
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition" 
                      placeholder="e.g. Smart Drive Instructor" 
                      value={newPost.author} 
                      onChange={e => setNewPost({...newPost, author: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Cover Image Source</label>
                    <input 
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-xs" 
                      placeholder="Or enter custom URL instead of upload" 
                      value={newPost.imageUrl} 
                      onChange={e => setNewPost({...newPost, imageUrl: e.target.value})} 
                    />
                  </div>
                </div>

                {/* Cover Image uploader & Preset Gallery */}
                <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-gray-800 flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-gray-500" /> Choose Cover Image
                      </h4>
                      <p className="text-xs text-gray-500">Select a high-quality driving image or upload yours</p>
                    </div>
                    <div>
                      <label className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-3.5 py-2 rounded-lg cursor-pointer text-xs font-bold transition">
                        <Upload className="w-3.5 h-3.5 text-gray-500" />
                        Upload Device Image
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageUpload} 
                        />
                      </label>
                    </div>
                  </div>

                  {/* Preset Grid */}
                  <div>
                    <p className="text-xs text-gray-500 font-bold mb-2">Preset High-Quality Library:</p>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {PRESET_IMAGES.map((img, i) => {
                        const isSelected = newPost.imageUrl === img.url;
                        return (
                          <button
                            key={i}
                            type="button"
                            title={img.label}
                            onClick={() => setNewPost(prev => ({ ...prev, imageUrl: img.url }))}
                            className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                              isSelected ? 'border-red-600 scale-95 ring-2 ring-red-100' : 'border-transparent hover:border-gray-400'
                            }`}
                          >
                            <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                            {isSelected && (
                              <div className="absolute inset-0 bg-red-600/20 flex items-center justify-center">
                                <span className="bg-red-600 text-white rounded-full p-0.5">
                                  <Check className="w-3 h-3" />
                                </span>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Small Live Preview */}
                  {newPost.imageUrl && (
                    <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-gray-200">
                      <img src={newPost.imageUrl} alt="Preview" className="w-16 h-10 object-cover rounded-md" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-gray-800 truncate">Selected Image Preview</p>
                        <p className="text-[10px] text-gray-500 truncate">{newPost.imageUrl}</p>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setNewPost(prev => ({ ...prev, imageUrl: '' }))} 
                        className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Blog Content *</label>
                  <textarea 
                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition h-56 font-sans text-sm leading-relaxed" 
                    placeholder="Write the driving tips, guidelines, or instruction articles here..." 
                    value={newPost.content} 
                    onChange={e => setNewPost({...newPost, content: e.target.value})} 
                  />
                </div>

                <div className="pt-2">
                  <button 
                    onClick={publishPost} 
                    className={`w-full text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow ${
                      editingPostId 
                        ? 'bg-yellow-500 hover:bg-yellow-600' 
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {editingPostId ? (
                      <>
                        <Save className="w-5 h-5" />
                        Update Post Changes
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Publish Blog Post
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Manage / List Existing Posts */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col">
              <div className="mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-gray-900">Manage Posts ({posts.length})</h2>
                <p className="text-xs text-gray-500 mt-1">Select any post below to edit or permanently delete.</p>
              </div>

              {posts.length === 0 ? (
                <div className="text-center py-16 flex-grow flex flex-col justify-center items-center bg-gray-50 border border-dashed rounded-xl p-6">
                  <ImageIcon className="w-12 h-12 text-gray-300 mb-3" />
                  <p className="text-gray-500 font-bold text-sm">No blogs posted yet.</p>
                  <p className="text-xs text-gray-400 mt-1 max-w-[200px]">Create your first post using the left panel.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1 flex-grow">
                  {posts.map(post => {
                    const isCurrentlyEditing = editingPostId === post.id;
                    return (
                      <div 
                        key={post.id} 
                        className={`p-3.5 rounded-xl border transition flex items-start gap-3.5 ${
                          isCurrentlyEditing 
                            ? 'border-yellow-400 bg-yellow-50/50 ring-2 ring-yellow-100' 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <img 
                          src={post.imageUrl || PRESET_IMAGES[0].url} 
                          alt="" 
                          className="w-16 h-12 object-cover rounded-lg border border-gray-100 shrink-0 bg-gray-100" 
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-gray-900 text-sm truncate leading-snug">{post.title}</h3>
                          <p className="text-xs text-gray-500 mt-0.5 truncate">By {post.author || 'Smart Drive'}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{post.date}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-1.5 shrink-0 self-center">
                          <button 
                            onClick={() => startEdit(post)} 
                            title="Edit this post"
                            className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deletePost(post.id)} 
                            title="Delete this post"
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
