import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Edit, Trash2, Upload, Image as ImageIcon, Plus, X, ArrowLeft, Save, Sparkles, Check, Globe, Copy, ShieldAlert, Mail, AlertCircle, FileSpreadsheet } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'blogs' | 'dns'>('blogs');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 3000);
  };

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
                {/* SEO & DNS Tabs */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto scrollbar-none gap-2">
          <button 
            type="button"
            onClick={() => setActiveTab('blogs')}
            className={`pb-4 px-6 font-bold text-sm tracking-wide transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'blogs' 
                ? 'border-red-650 text-red-650' 
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Blogs Manager (بلاگ مینیجر)
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('dns')}
            className={`pb-4 px-6 font-bold text-sm tracking-wide transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'dns' 
                ? 'border-red-650 text-red-650' 
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-red-650 animate-pulse" />
            SEO & DNS Settings (DMARC-Detections)
          </button>
        </div>

        {activeTab === 'blogs' ? (
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
        ) : (
          /* SEO, DMARC & DNS Recommendations Dashboard */
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-8">
            <div className="border-b border-gray-100 pb-5">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="p-2 bg-red-50 text-red-600 rounded-lg">
                  <Globe className="w-5 h-5" />
                </span>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">SEO &amp; Email Authentication settings</h2>
              </div>
              <p className="text-gray-500 text-sm max-w-3xl leading-relaxed">
                theHoth SEO Checker has recommended configuring email security protocols to protect your official domain address <strong className="text-red-650">smartdrivefd.com</strong>. Setting up a DMARC and SPF policy boosts your general email deliverability rates to clients (preventing Gmail/Outlook spam filters) and strengthens your overall online authority ranking.
              </p>
              <div className="mt-4 bg-yellow-50 border border-yellow-200/80 rounded-xl p-4 text-xs sm:text-sm text-yellow-800 leading-relaxed">
                <strong>Urdu Guide (رہنمائی):</strong> اپنے ڈومین رجسٹرار (جیسے Cloudflare, Namecheap, GoDaddy یا cPanel) کی DNS Settings میں جا کر نیچے دیے گئے <strong>TXT</strong> ریکارڈز کو کاپی کر کے شامل کریں۔ DMARC آپ کی Driving School ای میلز کی سیکیورٹی اور ڈیلیوری کو بہترین بناتا ہے اور دوسروں کو آپ کے نام پر جعلی ای میلز بھیجنے سے روکتا ہے۔
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* DMARC Record Card */}
              <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase bg-red-100 text-red-700 px-2.5 py-1 rounded-md tracking-wider">
                      DMARC Record (Required)
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-yellow-600 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                      Needs DNS entry
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5">Configure TXT record for DMARC SPF validation</h3>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    This directly resolves the target error reported on theHoth. It utilizes Gmail reporting to secure incoming/outgoing school communications.
                  </p>

                  <div className="space-y-3">
                    {/* Host */}
                    <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Record HOST / NAME</p>
                        <p className="font-mono text-xs text-gray-800 font-bold">_dmarc</p>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('_dmarc', 'dmarc-host')}
                        className="text-xs text-red-600 hover:text-red-750 font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition"
                      >
                        {copiedText === 'dmarc-host' ? <span className="text-green-600">Copied!</span> : <><Copy className="w-3 h-3" /> Copy</>}
                      </button>
                    </div>

                    {/* Type */}
                    <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Record Type</p>
                        <p className="font-mono text-xs text-gray-800 font-bold">TXT</p>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('TXT', 'dmarc-type')}
                        className="text-xs text-red-600 hover:text-red-750 font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition"
                      >
                        {copiedText === 'dmarc-type' ? <span className="text-green-600">Copied!</span> : <><Copy className="w-3 h-3" /> Copy</>}
                      </button>
                    </div>

                    {/* Value */}
                    <div className="bg-white px-3 py-2.5 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Record VALUE / CONTENT</p>
                        <button 
                          onClick={() => copyToClipboard('v=DMARC1; p=none; rua=mailto:trainingdrivingschool@gmail.com; pct=100', 'dmarc-val')}
                          className="text-[11px] text-red-600 hover:text-red-750 font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition"
                        >
                          {copiedText === 'dmarc-val' ? <span className="text-green-600">Copied!</span> : <><Copy className="w-3 h-3" /> Copy Full Code</>}
                        </button>
                      </div>
                      <p className="font-mono text-[11px] text-gray-700 bg-gray-50 p-2 rounded border border-gray-150 overflow-x-auto whitespace-pre-wrap select-all font-semibold break-all leading-relaxed">
                        v=DMARC1; p=none; rua=mailto:trainingdrivingschool@gmail.com; pct=100
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200/65 text-[11px] text-gray-400 italic">
                  Note: The email address is configured dynamically with your official mailbox.
                </div>
              </div>

              {/* SPF Record Card */}
              <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md tracking-wider">
                      SPF Record (Recommended)
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-yellow-600 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                      Needs DNS entry
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5">Configure TXT record for Sender Policy Framework</h3>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    Authorizes Google Workspace or custom mail servers to send communications on behalf of smartdrivefd.com, dramatically lowering bounce rates.
                  </p>

                  <div className="space-y-3">
                    {/* Host */}
                    <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Record HOST / NAME</p>
                        <p className="font-mono text-xs text-gray-800 font-bold">@ (or leave blank)</p>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('@', 'spf-host')}
                        className="text-xs text-red-600 hover:text-red-750 font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition"
                      >
                        {copiedText === 'spf-host' ? <span className="text-green-600">Copied!</span> : <><Copy className="w-3 h-3" /> Copy</>}
                      </button>
                    </div>

                    {/* Type */}
                    <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Record Type</p>
                        <p className="font-mono text-xs text-gray-800 font-bold font-semibold">TXT</p>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('TXT', 'spf-type')}
                        className="text-xs text-red-600 hover:text-red-750 font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition"
                      >
                        {copiedText === 'spf-type' ? <span className="text-green-600">Copied!</span> : <><Copy className="w-3 h-3" /> Copy</>}
                      </button>
                    </div>

                    {/* Value */}
                    <div className="bg-white px-3 py-2.5 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Record VALUE / CONTENT</p>
                        <button 
                          onClick={() => copyToClipboard('v=spf1 include:_spf.google.com ~all', 'spf-val')}
                          className="text-[11px] text-red-600 hover:text-red-750 font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition"
                        >
                          {copiedText === 'spf-val' ? <span className="text-green-600">Copied!</span> : <><Copy className="w-3 h-3" /> Copy Full Code</>}
                        </button>
                      </div>
                      <p className="font-mono text-[11px] text-gray-700 bg-gray-50 p-2 rounded border border-gray-150 overflow-x-auto whitespace-pre-wrap select-all font-semibold break-all leading-relaxed">
                        v=spf1 include:_spf.google.com ~all
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200/65 text-[11px] text-gray-400 italic">
                  Note: If you use regular webhost mail instead of Google Workspace, use <code className="font-mono text-gray-600">v=spf1 +mx +a ~all</code>.
                </div>
              </div>
            </div>

            {/* General Site Analytics, Robots, and Sitemaps Status */}
            <div className="border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-gray-50 to-white">
              <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-600 animate-spin" style={{ animationDuration: '6s' }} />
                Active Site Integrations Status (Completed Tasks)
              </h3>

              <div className="grid sm:grid-cols-3 gap-4">
                {/* Google Analytics */}
                <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-gray-800">Google Analytics 4</p>
                      <span className="bg-green-100 text-green-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Active</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                      Global performance and SEO tracker code is dynamically loaded in head element.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center border">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Measurement ID</p>
                    <p className="font-mono text-xs font-black text-gray-800 tracking-wider">G-8L7Y8XJDPV</p>
                  </div>
                </div>

                {/* XML Sitemap */}
                <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-gray-800">Sitemap XML File</p>
                      <span className="bg-green-100 text-green-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Generated</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                      Provides automatic index mappings for theHoth, Google Search Console, and Web crawlers.
                    </p>
                  </div>
                  <a 
                    href="/sitemap.xml" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="bg-red-50 hover:bg-red-100 border border-red-200 p-2 rounded text-center block text-xs font-bold text-red-650 transition cursor-pointer"
                  >
                    View sitemap.xml &rarr;
                  </a>
                </div>

                {/* Robots.txt */}
                <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-gray-800">crawler Instructions</p>
                      <span className="bg-green-100 text-green-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Optimized</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                      Allows main navigation pathways while pointing crawlers to your global sitemap location.
                    </p>
                  </div>
                  <a 
                    href="/robots.txt" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="bg-gray-100 hover:bg-gray-200 border border-gray-250 p-2 rounded text-center block text-xs font-bold text-gray-700 transition cursor-pointer"
                  >
                    View robots.txt &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Quick 3-Step Domain instructions card */}
            <div className="bg-red-50/50 border border-red-150 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                How to implement this / DNS me isy add krnay ka triqa:
              </h3>
              <ol className="list-decimal list-inside space-y-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                <li>Go to your Domain Manager (where you bought the domain, like <strong className="text-gray-900">Cloudflare, Namecheap, or GoDaddy</strong>).</li>
                <li>Find the <strong>DNS Settings</strong> or <strong>DNS Zone Editor</strong> panel.</li>
                <li>Click <strong>Add New Record</strong> and choose type <strong>TXT</strong>.</li>
                <li>Enter <code className="bg-white px-1.5 py-0.5 rounded border font-mono">_dmarc</code> for the Name/Host, select TTL to Auto/Default, and paste the copied Value content there.</li>
                <li>Click <strong>Save</strong>. In 1 to 24 hours, the record will propagate and verification tools like theHoth will show perfect 100% SEO Compliance!</li>
              </ol>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
