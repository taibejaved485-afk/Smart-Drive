import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  content: string;
  date: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

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
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col">
                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded-xl mb-4" />
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-500 text-sm mb-4">By {post.author} on {post.date}</p>
                <p className="text-gray-600 mb-6 flex-grow">{post.content.substring(0, 100)}...</p>
                <button className="text-red-600 font-bold hover:text-red-800">Read More &rarr;</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
