import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTABanner from '../components/CTABanner';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, BookOpen } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  content: string;
  date: string;
}

const parseBoldAndItalic = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-extrabold text-slate-950">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="text-red-600 font-semibold italic not-italic bg-red-50/50 px-1 rounded">{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

const renderBlogContent = (content: string) => {
  if (!content) return null;
  return content.split('\n').map((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={index} className="h-3" />;

    // H1 Heading
    if (trimmed.startsWith('## ')) {
      return (
        <h3 key={index} className="text-xl md:text-2xl font-black text-slate-900 mt-6 mb-3 border-b border-gray-100 pb-1.5 font-sans">
          {trimmed.replace('## ', '')}
        </h3>
      );
    }

    // H2 Heading
    if (trimmed.startsWith('### ')) {
      return (
        <h4 key={index} className="text-lg md:text-xl font-extrabold text-slate-800 mt-4 mb-2 font-sans">
          {trimmed.replace('### ', '')}
        </h4>
      );
    }

    // Unordered List - Item
    if (trimmed.startsWith('- ')) {
      return (
        <li key={index} className="ml-5 list-disc text-slate-700 my-1 pl-1 text-base leading-relaxed">
          {parseBoldAndItalic(trimmed.replace('- ', ''))}
        </li>
      );
    }

    // Numbered list item
    if (/^\d+\.\s/.test(trimmed)) {
      const parts = trimmed.split(/^\d+\.\s/);
      const match = trimmed.match(/^\d+/);
      const num = match ? match[0] : '1';
      return (
        <li key={index} className="ml-5 list-decimal text-slate-700 my-1 pl-1 text-base leading-relaxed">
          {parseBoldAndItalic(parts[1] || '')}
        </li>
      );
    }

    // Default paragraph with bold and italic styling support
    return (
      <p key={index} className="text-slate-700 text-base md:text-[17px] leading-relaxed mb-3.5 text-left font-normal font-sans">
        {parseBoldAndItalic(line)}
      </p>
    );
  });
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Lock body scroll when blog modal is showing
  useEffect(() => {
    if (selectedPost) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [selectedPost]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "GoDriveify Driving Academy Advice Blog",
    "description": "Helpful tips, rules, tutorials, and guidelines on safe manual/automatic driving from experts in Faisalabad PK.",
    "publisher": {
      "@type": "LocalBusiness",
      "name": "GoDriveify Driving School"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Driving Tips, Guides & Road Safety Blog | GoDriveify"
        description="Learn safe driving with expert tips and tutorials. We post practical guides on road tests, parallel parking, and traffic rules in Faisalabad, Pakistan."
        keywords="learn car guide, defensive driver tips Pakistan, parallel parking how-to, heavy bike tricks, female driver guidelines"
        schema={blogSchema}
      />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <Link to="/" className="text-red-600 font-bold hover:underline mb-8 block">&larr; Back to Home</Link>
        <h1 className="text-5xl font-bold mb-12 text-center text-gray-950">Our Latest Blogs</h1>
        
        {posts.length === 0 ? (
          <p className="text-center text-gray-600 text-xl italic py-20 bg-white rounded-xl border">No blogs posted yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <ScrollReveal direction="up" delay={i * 0.1} key={post.id}>
                <div 
                  className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col h-full hover:shadow-md cursor-pointer group transition-all duration-300"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="overflow-hidden rounded-xl mb-4 h-48">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-red-600 transition-colors duration-350">{post.title}</h2>
                  <p className="text-gray-500 text-sm mb-4">By {post.author} on {post.date}</p>
                  <p className="text-gray-600 mb-6 flex-grow">{post.content.substring(0, 100)}...</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPost(post);
                    }}
                    className="text-red-600 font-bold hover:text-red-800 self-start inline-flex items-center gap-1 group/btn"
                  >
                    Read More <span className="group-hover/btn:translate-x-1 transition-transform duration-200">&rarr;</span>
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      {/* Elegant Full Blog Dialog Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Cover Image Header Section */}
              <div className="relative h-64 md:h-80 w-full overflow-hidden shrink-0">
                <img 
                  src={selectedPost.imageUrl} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
                
                {/* Close X Button top-right */}
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 bg-black/45 hover:bg-red-600 text-white p-2.5 rounded-full transition-colors backdrop-blur-md z-20 cursor-pointer"
                  title="Close blog"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Overlaid metadata on the image banner */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <span className="inline-flex items-center gap-1.5 bg-red-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow">
                    <BookOpen className="w-3 h-3" />
                    Academy Blog
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold leading-tight mb-2">
                    {selectedPost.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-200">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-red-500" />
                      By <strong className="text-white font-semibold">{selectedPost.author}</strong>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-red-500" />
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-red-500" />
                      {selectedPost.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Full Blog Content Scrollable text body */}
              <div className="p-6 md:p-8 overflow-y-auto flex-grow bg-white prose max-w-none">
                <div className="text-left font-normal">
                  {renderBlogContent(selectedPost.content)}
                </div>
              </div>

              {/* Modal controls footer bar */}
              <div className="p-4 md:px-8 border-t bg-gray-50 flex justify-between items-center shrink-0">
                <span className="text-xs md:text-sm text-gray-500 font-medium font-sans">GoDriveify © {new Date().getFullYear()}</span>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="bg-gray-900 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-xl transition-colors cursor-pointer text-sm shadow"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ScrollReveal direction="up" delay={0.1}><CTABanner /></ScrollReveal>
      <Footer />
    </div>
  );
}
