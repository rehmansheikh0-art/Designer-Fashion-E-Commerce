import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { Clock, User, ArrowRight, ChevronRight, X } from 'lucide-react';

export const BlogView: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title */}
      <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-[#E8E2D9] text-center space-y-3">
        <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#C5A880] font-semibold">
          The Fashion Journal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#181616]">
          Couture Stories, Trends & Preservation
        </h1>
        <p className="text-xs sm:text-sm text-[#5C544E] max-w-xl mx-auto">
          Insights into centuries-old handwork, red carpet styling guides, and luxury fabric care from master artisans.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map(post => (
          <article
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF8F5]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#181616] text-[#FAF8F5] text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-[#8C827A] font-mono">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>

                <h3 className="font-serif text-base font-bold text-[#181616] group-hover:text-[#C5A880] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-[#5C544E] leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 text-xs font-semibold text-[#181616] flex items-center gap-1 group-hover:gap-2 transition-all">
              <span>Read Journal Entry</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </div>
          </article>
        ))}
      </div>

      {/* Full Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-3xl w-full p-6 sm:p-10 rounded-3xl shadow-2xl space-y-6 border border-[#E8E2D9] my-6 max-h-[90vh] overflow-y-auto relative">
            
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880] font-semibold">
              {selectedPost.category}
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181616]">{selectedPost.title}</h2>

            <div className="flex items-center gap-4 text-xs text-[#8C827A] font-mono border-b pb-4">
              <span>By {selectedPost.author}</span>
              <span>•</span>
              <span>{selectedPost.date}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <img src={selectedPost.image} alt="" className="w-full h-72 object-cover rounded-2xl" />

            <div className="text-xs sm:text-sm text-[#5C544E] leading-relaxed space-y-4 whitespace-pre-line font-sans">
              {selectedPost.content}
            </div>

            <div className="pt-4 border-t border-[#E8E2D9] flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 bg-[#181616] text-white text-xs font-semibold rounded-xl"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
