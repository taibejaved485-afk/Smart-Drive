import { useState, useEffect, useMemo, ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTABanner from '../components/CTABanner';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, BookOpen, Sparkles, Clock, Layers, Globe } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  content: string;
  date: string;
  authorAvatar?: string;
  authorRole?: string;
  category?: string;
}

const parseInlineMarkdown = (text: string) => {
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-[#FF7112] font-semibold italic bg-[#FF7112]/10/50 px-1 rounded">$1</em>')
    .replace(/__(.*?)__/g, '<u class="underline">$1</u>')
    .replace(/!\[([^\]]*)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" class="rounded-lg my-3" />')
    .replace(/\[([^\]]*)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">$1</a>');
    
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

const stripMarkdown = (content: string) => {
  if (!content) return '';
  return content
    .split('\n')
    .map(line => {
      let l = line.trim();
      // Remove headers, list markers, quotes, and HTML/markdown tags
      if (l.startsWith('#') || l.startsWith('>') || l.startsWith('-') || l.startsWith('*') || l.startsWith('![')) {
        l = l.replace(/^#+\s+/, '')
             .replace(/^>\s+/, '')
             .replace(/^[-*+]\s+/, '')
             .replace(/^!\[.*\]\(.*\)/, '')
             .replace(/^\[(.*)\]\(.*\)/, '$1');
      }
      l = l.replace(/\*\/(.*?)\*\//g, '$1')
           .replace(/\*\*(.*?)\*\*/g, '$1')
           .replace(/\*(.*?)\*/g, '$1')
           .replace(/__(.*?)__/g, '$1')
           .replace(/`([^`]+)`/g, '$1')
           .replace(/\[([^\]]*)\]\((.*?)\)/g, '$1');
      return l;
    })
    .filter(line => line.length > 0)
    .join(' ');
};

const generateId = (text: string) => {
  return text
    .replace(/[\*\_]/g, '')     // Remove bold/italic markdown characters
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')       // Replace spaces with hyphens
    .replace(/[^\w\u0600-\u06FF\-]/g, ''); // Keep alphanumeric, Urdu/Arabic range, and hyphens
};

const renderBlogContent = (content: string) => {
  if (!content) return null;
  return content.split('\n').map((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={index} className="h-3" />;

    if (trimmed.startsWith('## ')) {
      const title = trimmed.replace('## ', '');
      const id = generateId(title);
      return (
        <h2 key={index} id={id} className="text-2xl md:text-3xl font-black text-[#002060] mt-10 mb-4 scroll-mt-32 relative group hover:text-[#FF7112] transition-colors cursor-pointer w-fit inline-block">
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF7112] hidden md:block">#</div>
          {parseInlineMarkdown(title)}
        </h2>
      );
    }

    if (trimmed.startsWith('### ')) {
      const title = trimmed.replace('### ', '');
      const id = generateId(title);
      return (
        <h3 key={index} id={id} className="text-xl md:text-2xl font-extrabold text-[#002060] mt-8 mb-3 scroll-mt-32 hover:text-[#FF7112] transition-colors cursor-pointer">
          {parseInlineMarkdown(title)}
        </h3>
      );
    }

    if (trimmed.startsWith('> ')) {
      return (
        <blockquote key={index} className="border-l-4 border-[#FF7112] pl-5 italic text-[#002060] my-8 bg-[#FF7112]/5 p-6 rounded-r-xl text-left font-sans text-xl font-medium leading-relaxed">
          {parseInlineMarkdown(trimmed.replace('> ', ''))}
        </blockquote>
      );
    }

    if (trimmed.startsWith('- ')) {
      return (
        <li key={index} className="ml-5 list-disc text-slate-700 my-2 pl-2 text-lg leading-relaxed marker:text-[#FF7112]">
          {parseInlineMarkdown(trimmed.replace('- ', ''))}
        </li>
      );
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const parts = trimmed.split(/^\d+\.\s/);
      return (
        <li key={index} className="ml-6 list-decimal text-slate-700 my-2 pl-2 text-lg md:text-xl leading-relaxed marker:text-[#FF7112] marker:font-bold">
          {parseInlineMarkdown(parts[1] || '')}
        </li>
      );
    }

    let alignClass = 'text-left';
    let contentLine = line;
    
    if (contentLine.startsWith('|=center=|')) {
      alignClass = 'text-center';
      contentLine = contentLine.replace('|=center=|', '');
    } else if (contentLine.startsWith('|=right=|')) {
      alignClass = 'text-right';
      contentLine = contentLine.replace('|=right=|', '');
    } else if (contentLine.startsWith('|=justify=|')) {
      alignClass = 'text-justify';
      contentLine = contentLine.replace('|=justify=|', '');
    }

    return (
      <p key={index} className={`text-slate-600 text-lg md:text-xl leading-loose mb-6 font-normal font-sans whitespace-pre-wrap ${alignClass}`}>
        {parseInlineMarkdown(contentLine)}
      </p>
    );
  });
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [language, setLanguage] = useState<'en' | 'ur'>('en');

  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Check if posts exist
  useEffect(() => {
    // Only used to ensure blog loads on init
  }, [posts]);

  // Reset language when post changes
  useEffect(() => {
    setLanguage('en');
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

  const dummyBilingualData = {
    id: 1,
    featured_image: selectedPost?.imageUrl || "/path-to-card-image.jpg",
    author: selectedPost?.author || "Admin",
    date: selectedPost?.date || "June 17, 2026",
    time: "12:30 PM",
    title_en: "5 Essential Safety Rules for Every New Driver",
    title_ur: "نئے ڈرائیورز کے لیے 5 ضروری حفاظتی اصول",
    content_en: [
      {heading: "1. Adjust Your Mirrors", body: "Before starting the car, ensure all your mirrors are adjusted correctly to minimize blind spots."},
      {heading: "2. Maintain a Safe Distance", body: "Keep a safe following distance from the car in front of you. Use the \"three-second rule\"."},
      {heading: "3. Use Turn Signals", body: "Always signal your intentions before turning or changing lanes to communicate with other drivers on the road."},
      {heading: "4. Eliminate Distractions", body: "Put your phone away and keep your focus entirely on driving."},
      {heading: "5. Watch Your Speed", body: "Follow posted speed limits and adjust your speed based on traffic, weather, and road conditions."}
    ],
    content_ur: [
      {heading: "1. اپنے شیشے ایڈجسٹ کریں", body: "گاڑی چلانے سے پہلے، یقینی بنائیں کہ اندھے دھبوں کو کم کرنے کے لیے آپ کے تمام شیشے درست طریقے سے ایڈجسٹ کیے گئے ہیں۔"},
      {heading: "2. محفوظ فاصلہ برقرار رکھیں", body: "اپنے سامنے والی گاڑی سے محفوظ فاصلہ رکھیں۔ \"تین سیکنڈ کا اصول\" استعمال کریں۔"},
      {heading: "3. ٹرن سگنلز کا استعمال کریں", body: "سڑک پر دوسرے ڈرائیوروں کے ساتھ بات چیت کرنے کے لیے لین موڑنے یا تبدیل کرنے سے پہلے ہمیشہ اپنے ارادوں کا اشارہ دیں۔"},
      {heading: "4. خلفشار کو ختم کریں", body: "اپنا فون دور رکھیں اور اپنی توجہ پوری طرح ڈرائیونگ پر رکھیں۔"},
      {heading: "5. اپنی رفتار پر نظر رکھیں", body: "پوسٹ کردہ رفتار کی حدود پر عمل کریں اور ٹریفک، موسم اور سڑک کے حالات کی بنیاد پر اپنی رفتار کو ایڈجسٹ کریں۔"}
    ]
  };

  const activeTitle = selectedPost?.title || (language === 'ur' ? dummyBilingualData.title_ur : dummyBilingualData.title_en);
  const activeCategory = selectedPost?.category || (language === 'ur' ? "اکیڈمی بلاگ" : "ACADEMY BLOG");

  const toc = useMemo(() => {
    if (selectedPost?.content) {
      const lines = selectedPost.content.split('\n');
      const headings: { id: string; title: React.ReactNode; level: number }[] = [];
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
          const level = trimmed.startsWith('### ') ? 3 : 2;
          const titleText = trimmed.replace(/^#+\s/, '');
          headings.push({ id: generateId(titleText), title: parseInlineMarkdown(titleText), level });
        }
      });
      return headings;
    }
    
    const activeContentBlocks = language === 'ur' ? dummyBilingualData.content_ur : dummyBilingualData.content_en;
    return activeContentBlocks.map(block => ({
      id: generateId(block.heading),
      title: block.heading,
      level: 2
    }));
  }, [language, selectedPost]);

  if (selectedPost) {

    return (
      <div className="min-h-screen flex flex-col bg-slate-50 relative">
        <SEO 
          title={`${activeTitle} | GoDriveify Blog`}
          description={selectedPost.excerpt || "Read our latest safe driving guide."}
          ogImage={selectedPost.imageUrl}
        />
        <Navbar />

        {/* Back Button Container */}
        <div className="w-full max-w-7xl mx-auto px-4 pt-10">
           <button 
             onClick={() => setSelectedPost(null)}
             className="text-[#002060] hover:text-[#FF7112] transition-colors flex items-center font-bold text-sm cursor-pointer mb-6"
           >
              &larr; Back to articles
           </button>
        </div>

        {/* 1. TOP BANNER IMAGE ZONE */}
        <div className="w-full max-w-7xl mx-auto px-4 mb-8">
          <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-[32px] overflow-hidden shadow-lg relative bg-slate-100">
            <img 
              src={selectedPost.imageUrl} 
              className="w-full h-full object-cover" 
              alt={activeTitle} 
            />
          </div>
        </div>

        <div className="relative flex-grow flex flex-col w-full bg-slate-50 pb-20">
            <div className="w-full max-w-7xl mx-auto px-4">
               
               {/* 2. HORIZONTAL META INFO BAR */}
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-200 mb-10">
                 <div className="flex flex-wrap items-center gap-6" dir={language === 'ur' ? 'rtl' : 'ltr'}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-full overflow-hidden shrink-0 shadow-sm border border-gray-100 flex items-center justify-center">
                        {selectedPost.authorAvatar ? (
                           <img src={selectedPost.authorAvatar} className="w-full h-full object-cover" alt="" />
                        ) : (
                           <img src="/static/godriveify-logo.jpg" alt="Logo" className="w-[70%] h-[70%] object-contain" />
                        )}
                      </div>
                      <div className="text-left font-sans" dir="ltr">
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">EDITOR</p>
                         <p className="text-[14px] font-black text-[#002060] leading-none">{selectedPost.author}</p>
                      </div>
                    </div>
                    
                    <div className="hidden sm:block w-px h-10 bg-gray-200"></div>

                    <div className="flex items-center gap-3" dir="ltr">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div className="text-left font-sans">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">DATE</p>
                           <p className="text-[14px] font-bold text-slate-900 leading-none">{selectedPost.date}</p>
                        </div>
                    </div>

                    <div className="hidden sm:block w-px h-10 bg-gray-200"></div>

                    <div className="flex items-center gap-3" dir="ltr">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div className="text-left font-sans">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">TIME</p>
                           <p className="text-[14px] font-bold text-slate-900 leading-none">7 Min Read</p>
                        </div>
                    </div>
                 </div>

                 {/* Language Switcher */}
                 <div className="flex items-center gap-2 p-1.5 bg-white rounded-full w-fit border border-gray-200 shadow-sm shrink-0">
                   <button 
                     onClick={() => setLanguage('en')}
                     className={`px-5 py-2 rounded-full text-[13px] font-bold tracking-wide transition-all ${
                       language === 'en' 
                       ? 'bg-[#FF7112] text-white shadow-sm' 
                       : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                     }`}
                   >
                     English
                   </button>
                   <button 
                     onClick={() => setLanguage('ur')}
                     className={`px-5 py-2 rounded-full text-[13px] font-bold tracking-wide transition-all ${
                       language === 'ur' 
                       ? 'bg-[#002060] text-white shadow-sm' 
                       : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                     }`}
                     dir="rtl"
                   >
                     اردو
                   </button>
                 </div>
               </div>

               {/* 3. TWO-COLUMN SPLIT CONTENT LAYOUT */}
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                 {/* Left column: Article content (70% - col-span-8) */}
                 <div className="lg:col-span-8 w-full">
                    
                    <div className="mb-10" dir={language === 'ur' ? 'rtl' : 'ltr'}>
                       <span className="inline-block px-3 py-1 bg-white border border-gray-200 text-[#FF7112] rounded-full text-[11px] font-black tracking-widest uppercase mb-5 shadow-sm">
                         {activeCategory}
                       </span>
                       <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#002060] mb-6 leading-[1.15] tracking-tight font-sans">
                         {activeTitle}
                       </h1>
                    </div>

                    {/* Main Article Text */}
                    <div 
                      className={`prose prose-lg max-w-none prose-slate bg-transparent text-left font-sans ${language === 'ur' ? 'font-urdu' : ''}`}
                      dir={language === 'ur' ? 'rtl' : 'ltr'}
                    >
                      {selectedPost?.content ? (
                        renderBlogContent(selectedPost.content)
                      ) : (
                        (language === 'ur' ? dummyBilingualData.content_ur : dummyBilingualData.content_en).map((block, index) => (
                          <div key={index} className="mb-10 group">
                            <h2 
                              id={generateId(block.heading)} 
                              className="text-2xl md:text-3xl font-black text-[#002060] mb-5 scroll-mt-32 relative inline-block group-hover:text-[#FF7112] transition-colors"
                            >
                              <div className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF7112] hidden md:block">#</div>
                              {block.heading}
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                              {block.body}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                 </div>

                 {/* Right column: Sticky TOC Sidebar (30% - col-span-4) */}
                 <div className="hidden lg:block lg:col-span-4 shrink-0 sticky top-32">
                   <div className="bg-white rounded-[24px] p-7 border border-gray-200 shadow-sm">
                     <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                       <div className="w-8 h-8 rounded-full bg-[#002060]/5 border border-[#002060]/10 flex items-center justify-center shrink-0">
                         <Layers className="w-4 h-4 text-[#002060]" />
                       </div>
                       <h4 className="text-[12px] font-black tracking-widest text-[#002060] uppercase">In this article</h4>
                     </div>
                     <ul className="space-y-4">
                       {toc.length > 0 ? toc.map((heading) => (
                         <li key={heading.id} className={`${heading.level === 3 ? 'ml-6' : ''}`}>
                           <a 
                             href={`#${heading.id}`}
                             className="text-[14px] font-semibold text-slate-600 hover:text-[#FF7112] transition-colors flex items-start gap-3 group"
                             onClick={(e) => {
                               e.preventDefault();
                               document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                             }}
                           >
                             <span className="w-[6px] h-[6px] rounded-full bg-slate-200 group-hover:bg-[#FF7112] mt-[8px] shrink-0 transition-colors" />
                             <span className="leading-snug block">{heading.title}</span>
                           </a>
                         </li>
                       )) : (
                         <li className="text-[14px] font-medium text-slate-400 italic">Sections generating...</li>
                       )}
                     </ul>
                   </div>
                 </div>
               </div>
            </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <SEO 
        title="Driving Tips, Guides & Road Safety Blog | GoDriveify"
        description="Learn safe driving with expert tips and tutorials. We post practical guides on road tests, parallel parking, and traffic rules in Faisalabad, Pakistan."
        keywords="learn car guide, defensive driver tips Pakistan, parallel parking how-to, heavy bike tricks, female driver guidelines"
        schema={blogSchema}
      />
      <Navbar />

      <div className="flex-grow max-w-7xl mx-auto px-4 pt-8 pb-24 w-full">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">Latest Articles</h2>
          <div className="h-1 w-16 bg-[#FF7112] rounded"></div>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <BookOpen className="w-64 h-64 text-slate-900" />
            </div>
            <p className="text-slate-400 text-xl font-medium italic relative z-10">Our editors are currently drafting safety guides. Check back soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => {
              const excerpt = stripMarkdown(post.content);
              const readTime = Math.max(2, Math.ceil(excerpt.split(/\s+/).filter(Boolean).length / 180));
              
              return (
                <ScrollReveal direction="up" delay={i * 0.1} key={post.id}>
                  <div 
                    className="flex flex-col h-full bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(255,113,18,0.12)] overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 border border-slate-100"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedPost(post);
                      window.scrollTo({ top: 0, behavior: 'auto' });
                    }}
                  >
                    {/* Image Container with Floating Badge */}
                    <div className="w-full h-[240px] overflow-hidden bg-slate-50 flex-shrink-0 relative">
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-[#FF7112] text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md">
                          {post.category || "ACADEMY BLOG"}
                        </span>
                      </div>
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Details Container */}
                    <div className="p-7 flex flex-col flex-grow">
                      {/* Meta information */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[#FF7112] text-xs font-bold uppercase tracking-wider">
                          {post.category || "Safety Guide"}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {readTime} min read
                        </span>
                      </div>

                      {/* Heading */}
                      <h3 className="text-xl md:text-[22px] font-semibold text-slate-800 mb-3 line-clamp-2 leading-snug group-hover:text-[#FF7112] transition-colors font-sans tracking-tight">
                        {post.title}
                      </h3>
                      
                      {/* Excerpt */}
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 line-clamp-3 font-normal font-sans">
                        {excerpt}
                      </p>
                      
                      {/* Author Profile and Date in Card Footer */}
                      <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                            {post.authorAvatar ? (
                              <img src={post.authorAvatar} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-[#FF7112]/5 border border-[#FF7112]/20 flex items-center justify-center p-1.5">
                                 <img src="/static/godriveify-logo.jpg" alt="Logo" className="w-full h-full object-contain" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 tracking-tight">{post.author}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{post.authorRole || "Instructor"}</p>
                          </div>
                        </div>

                        <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 font-mono bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100/50">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {post.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>

      <ScrollReveal direction="up" delay={0.1}><CTABanner /></ScrollReveal>
      <Footer />
    </div>
  );
}
