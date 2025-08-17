import { useQuery } from '@tanstack/react-query';
import { useRoute } from 'wouter';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Share, BookOpen } from 'lucide-react';
import { EnhancedCursor } from '@/components/ui/enhanced-cursor';
import { ScrollIndicator } from '@/components/ui/scroll-indicator';
import { Link } from 'wouter';
import { type BlogPost, type Category } from '@shared/schema';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug;

  // Fetch blog post by slug
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ['/api/blog/posts/slug', slug],
    queryFn: () => 
      fetch(`/api/blog/posts/slug/${slug}`).then(res => {
        if (!res.ok) throw new Error('Post not found');
        return res.json();
      }),
    enabled: !!slug
  });

  // Fetch categories
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
    queryFn: () => 
      fetch('/api/categories').then(res => res.json())
  });

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const category = post && categories.find(cat => cat.id === post.categoryId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-dark text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-dark text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">📄</div>
          <h2 className="text-3xl font-orbitron mb-4">Article Not Found</h2>
          <p className="text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark text-white relative overflow-x-hidden">
      <EnhancedCursor />
      <ScrollIndicator />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Back Button */}
          <Link href="/blog">
            <Button 
              variant="ghost" 
              className="mb-8 text-purple-400 hover:text-purple-300 hover:bg-purple-400/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Category Badge */}
          {category && (
            <Badge 
              className="mb-6 text-white border-none"
              style={{ backgroundColor: category.color || '#8b5cf6' }}
            >
              {category.name}
            </Badge>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 gradient-text leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {formatDate(post.publishedAt)}
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {post.readTime}
              </div>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              className="text-purple-400 hover:text-purple-300 hover:bg-purple-400/10"
              onClick={() => navigator.share && navigator.share({
                title: post.title,
                url: window.location.href
              })}
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-300 leading-relaxed mb-8 glassmorphism p-6 rounded-2xl">
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="mb-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-3xl glassmorphism p-4">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glassmorphism rounded-3xl p-8 md:p-12">
            <div 
              className="prose prose-lg prose-invert max-w-none
                prose-headings:font-orbitron prose-headings:gradient-text
                prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300
                prose-strong:text-white prose-strong:font-semibold
                prose-code:text-purple-300 prose-code:bg-purple-900/30 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-purple-400/20
                prose-blockquote:border-l-purple-400 prose-blockquote:bg-purple-900/20 prose-blockquote:italic
                prose-ul:text-gray-300 prose-ol:text-gray-300
                prose-li:text-gray-300 prose-li:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-purple-400/20">
                <h4 className="text-lg font-orbitron mb-4 gradient-text">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge 
                      key={`${tag}-${index}`} 
                      variant="outline" 
                      className="border-purple-400/30 text-purple-300 hover:border-purple-400 hover:text-purple-200 transition-colors"
                    >
                      {String(tag)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-16 flex justify-center">
            <Link href="/blog">
              <Button className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg hover-lift">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore More Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}