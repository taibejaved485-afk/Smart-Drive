import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  content: string;
  date: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [newPost, setNewPost] = useState({ title: '', author: '', imageUrl: '', content: '' });

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
      alert('Invalid credentials');
    }
  };

  const publishPost = () => {
    if (!newPost.title || !newPost.content) return;
    const post: BlogPost = {
      ...newPost,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString()
    };
    const updatedPosts = [...posts, post];
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    setNewPost({ title: '', author: '', imageUrl: '', content: '' });
    alert('Post published!');
  };

  const deletePost = (id: string) => {
    const updatedPosts = posts.filter(p => p.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
          <input type="text" placeholder="Username" className="w-full border p-3 rounded mb-4" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full border p-3 rounded mb-4" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="w-full bg-red-600 text-white py-3 rounded font-bold">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="bg-white p-8 rounded-xl border mb-12">
            <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
            <input className="w-full border p-3 rounded mb-4" placeholder="Title" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} />
            <input className="w-full border p-3 rounded mb-4" placeholder="Author" value={newPost.author} onChange={e => setNewPost({...newPost, author: e.target.value})} />
            <input className="w-full border p-3 rounded mb-4" placeholder="Cover Image URL" value={newPost.imageUrl} onChange={e => setNewPost({...newPost, imageUrl: e.target.value})} />
            <textarea className="w-full border p-3 rounded mb-4 h-32" placeholder="Content" value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} />
            <button onClick={publishPost} className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold">Publish Post</button>
        </div>

        <div className="bg-white p-8 rounded-xl border">
            <h2 className="text-2xl font-bold mb-6">Manage Posts</h2>
            {posts.map(post => (
                <div key={post.id} className="flex justify-between items-center p-4 border-b">
                    <span>{post.title}</span>
                    <button onClick={() => deletePost(post.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
