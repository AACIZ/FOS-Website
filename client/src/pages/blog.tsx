import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Calendar, Clock, ArrowRight, Filter } from 'lucide-react';
import { EnhancedCursor } from '@/components/ui/enhanced-cursor';
import { ScrollIndicator } from '@/components/ui/scroll-indicator';
import { Button } from '@/components/ui/button';
import { type BlogPost, type Category } from '@shared/schema';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    // Make body visible (it's hidden by default in CSS)
    document.body.style.visibility = 'visible';
  }, []);

  // Fetch all blog posts (temporarily to debug)
  const { data: posts = [], isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts'],
    queryFn: async () => {
      const res = await fetch('/api/blog/posts');
      const data = await res.json();
      console.log('Fetched all posts:', data);
      return data;
    }
  });

  // Fetch categories
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories');
      const data = await res.json();
      console.log('Fetched categories:', data);
      return data;
    }
  });

  // Search posts
  const { data: searchResults = [], isLoading: searchLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/search', searchQuery],
    queryFn: () => 
      fetch(`/api/blog/search?q=${encodeURIComponent(searchQuery)}`).then(res => res.json()),
    enabled: searchQuery.length > 2
  });

  // Filter posts by category
  const { data: categoryPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/categories', selectedCategory, 'posts'],
    queryFn: () => 
      fetch(`/api/blog/categories/${selectedCategory}/posts`).then(res => res.json()),
    enabled: selectedCategory !== null
  });

  const displayPosts = searchQuery.length > 2 ? (Array.isArray(searchResults) ? searchResults : []) : 
                     selectedCategory ? (Array.isArray(categoryPosts) ? categoryPosts : []) : 
                     (Array.isArray(posts) ? posts : []);

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-dark text-white relative overflow-x-hidden">
      <EnhancedCursor />
      <ScrollIndicator />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-orbitron font-bold mb-6 gradient-text text-reveal">
              Blog & Insights
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover the latest trends in digital marketing, technology insights, and success stories from our team
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="glassmorphism-strong p-6 rounded-2xl">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/10 border-purple-400/30 text-white placeholder:text-gray-400"
                  />
                </div>
                <Button
                  onClick={() => setSelectedCategory(null)}
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="bg-purple-600 hover:bg-purple-700 border-purple-400"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  All Posts
                </Button>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {Array.isArray(categories) && categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={`cursor-pointer transition-all hover-lift ${
                      selectedCategory === category.id 
                        ? 'bg-purple-600 text-white border-purple-400' 
                        : 'border-purple-400/30 text-purple-300 hover:border-purple-400'
                    }`}
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {postsLoading || searchLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glassmorphism rounded-2xl p-6 animate-pulse">
                  <div className="h-48 bg-purple-400/20 rounded-xl mb-4"></div>
                  <div className="h-4 bg-purple-400/20 rounded mb-2"></div>
                  <div className="h-4 bg-purple-400/20 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-purple-400/20 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : displayPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-2xl font-orbitron mb-4">No articles found</h3>
              <p className="text-gray-400">
                {searchQuery ? `No articles match "${searchQuery}"` : 'No articles available yet'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className="glassmorphism border-purple-400/20 hover-lift group cursor-pointer overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    {/* Featured Image */}
                    <div className="relative h-48 overflow-hidden">
                      {post.featuredImage ? (
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center">
                          <div className="text-4xl">📖</div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* Category Badge */}
                      {Array.isArray(categories) && categories.find(cat => cat.id === post.categoryId) && (
                        <Badge 
                          className="absolute top-4 left-4 bg-purple-600/90 text-white border-none"
                          style={{ backgroundColor: (Array.isArray(categories) ? categories.find(cat => cat.id === post.categoryId)?.color || '#8b5cf6' : '#8b5cf6') + '90' }}
                        >
                          {Array.isArray(categories) ? categories.find(cat => cat.id === post.categoryId)?.name : ''}
                        </Badge>
                      )}
                    </div>

                    <div className="p-6">
                      {/* Meta Information */}
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.publishedAt)}
                        </div>
                        {post.readTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-orbitron font-semibold mb-3 gradient-text-hover group-hover:scale-105 transition-transform line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Tags */}
                      {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={`${tag}-${index}`} variant="outline" className="text-xs border-purple-400/30 text-purple-300">
                              {String(tag)}
                            </Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs border-purple-400/30 text-purple-300">
                              +{post.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Read More Link */}
                      <Link href={`/blog/${post.slug}`}>
                        <Button 
                          variant="ghost" 
                          className="p-0 h-auto text-purple-400 hover:text-purple-300 group-hover:translate-x-1 transition-transform"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}