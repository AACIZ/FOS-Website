import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye, Calendar, Tag, Save, X } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { type BlogPost, type Category, type InsertBlogPost, type InsertCategory } from '@shared/schema';

export default function Admin() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [postForm, setPostForm] = useState<Partial<InsertBlogPost>>({});
  const [categoryForm, setCategoryForm] = useState<Partial<InsertCategory>>({});
  const [tagInput, setTagInput] = useState('');

  const queryClient = useQueryClient();

  // Fetch blog posts
  const { data: posts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts'],
    queryFn: () => fetch('/api/blog/posts').then(res => res.json())
  });

  // Fetch categories
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
    queryFn: () => fetch('/api/categories').then(res => res.json())
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: (data: InsertBlogPost) => apiRequest('/api/blog/posts', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
      setIsPostDialogOpen(false);
      resetPostForm();
      toast({ title: 'Success', description: 'Post created successfully' });
    }
  });

  // Update post mutation
  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertBlogPost> }) => 
      apiRequest(`/api/blog/posts/${id}`, 'PUT', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
      setIsPostDialogOpen(false);
      resetPostForm();
      toast({ title: 'Success', description: 'Post updated successfully' });
    }
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/blog/posts/${id}`, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
      toast({ title: 'Success', description: 'Post deleted successfully' });
    }
  });

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: (data: InsertCategory) => apiRequest('/api/categories', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      setIsCategoryDialogOpen(false);
      resetCategoryForm();
      toast({ title: 'Success', description: 'Category created successfully' });
    }
  });

  // Update category mutation
  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertCategory> }) => 
      apiRequest(`/api/categories/${id}`, 'PUT', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      setIsCategoryDialogOpen(false);
      resetCategoryForm();
      toast({ title: 'Success', description: 'Category updated successfully' });
    }
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/categories/${id}`, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      toast({ title: 'Success', description: 'Category deleted successfully' });
    }
  });

  const resetPostForm = () => {
    setPostForm({});
    setSelectedPost(null);
    setTagInput('');
  };

  const resetCategoryForm = () => {
    setCategoryForm({});
    setSelectedCategory(null);
  };

  const handlePostEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setPostForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      isPublished: post.isPublished,
      categoryId: post.categoryId,
      authorId: post.authorId,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription
    });
    setTagInput(Array.isArray(post.tags) ? post.tags.join(', ') : '');
    setIsPostDialogOpen(true);
  };

  const handleCategoryEdit = (category: Category) => {
    setSelectedCategory(category);
    setCategoryForm(category);
    setIsCategoryDialogOpen(true);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tags = tagInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    const postData = {
      ...postForm,
      tags,
      publishedAt: postForm.isPublished ? new Date() : null
    };

    if (selectedPost) {
      updatePostMutation.mutate({ id: selectedPost.id, data: postData });
    } else {
      createPostMutation.mutate(postData as InsertBlogPost);
    }
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedCategory) {
      updateCategoryMutation.mutate({ id: selectedCategory.id, data: categoryForm });
    } else {
      createCategoryMutation.mutate(categoryForm as InsertCategory);
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  return (
    <div className="min-h-screen bg-gradient-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-orbitron font-bold gradient-text mb-2">
            Content Management System
          </h1>
          <p className="text-gray-400">Manage your blog posts and categories</p>
        </div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-purple-900/20">
            <TabsTrigger value="posts" className="data-[state=active]:bg-purple-600">
              Blog Posts
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-purple-600">
              Categories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-orbitron">Blog Posts</h2>
              <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={resetPostForm}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-purple-400/20">
                  <DialogHeader>
                    <DialogTitle className="gradient-text">
                      {selectedPost ? 'Edit Post' : 'Create New Post'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handlePostSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={postForm.title || ''}
                          onChange={(e) => {
                            const title = e.target.value;
                            setPostForm(prev => ({ 
                              ...prev, 
                              title,
                              slug: !selectedPost ? generateSlug(title) : prev.slug
                            }));
                          }}
                          className="bg-white/10 border-purple-400/30"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                          id="slug"
                          value={postForm.slug || ''}
                          onChange={(e) => setPostForm(prev => ({ ...prev, slug: e.target.value }))}
                          className="bg-white/10 border-purple-400/30"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={postForm.excerpt || ''}
                        onChange={(e) => setPostForm(prev => ({ ...prev, excerpt: e.target.value }))}
                        className="bg-white/10 border-purple-400/30"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={postForm.content || ''}
                        onChange={(e) => setPostForm(prev => ({ ...prev, content: e.target.value }))}
                        className="bg-white/10 border-purple-400/30 min-h-[300px]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={postForm.categoryId?.toString() || ''}
                          onValueChange={(value) => setPostForm(prev => ({ ...prev, categoryId: parseInt(value) }))}
                        >
                          <SelectTrigger className="bg-white/10 border-purple-400/30">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-purple-400/20">
                            {categories.map(category => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="featuredImage">Featured Image URL</Label>
                        <Input
                          id="featuredImage"
                          value={postForm.featuredImage || ''}
                          onChange={(e) => setPostForm(prev => ({ ...prev, featuredImage: e.target.value }))}
                          className="bg-white/10 border-purple-400/30"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        className="bg-white/10 border-purple-400/30"
                        placeholder="marketing, digital, strategy"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={postForm.isPublished || false}
                        onCheckedChange={(checked) => setPostForm(prev => ({ ...prev, isPublished: checked }))}
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button 
                        type="submit" 
                        className="bg-purple-600 hover:bg-purple-700"
                        disabled={createPostMutation.isPending || updatePostMutation.isPending}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {selectedPost ? 'Update' : 'Create'} Post
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsPostDialogOpen(false)}
                        className="border-purple-400/30"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="glassmorphism border-purple-400/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant={post.isPublished ? "default" : "secondary"}>
                        {post.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handlePostEdit(post)}
                          className="text-purple-400 hover:text-purple-300"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deletePostMutation.mutate(post.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                    {post.excerpt && (
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                    )}
                    <div className="flex items-center text-xs text-gray-500 gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt!).toLocaleDateString()}
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {post.tags.length} tags
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-orbitron">Categories</h2>
              <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={resetCategoryForm}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-purple-400/20">
                  <DialogHeader>
                    <DialogTitle className="gradient-text">
                      {selectedCategory ? 'Edit Category' : 'Create New Category'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="categoryName">Name</Label>
                      <Input
                        id="categoryName"
                        value={categoryForm.name || ''}
                        onChange={(e) => {
                          const name = e.target.value;
                          setCategoryForm(prev => ({ 
                            ...prev, 
                            name,
                            slug: !selectedCategory ? generateSlug(name) : prev.slug
                          }));
                        }}
                        className="bg-white/10 border-purple-400/30"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="categorySlug">Slug</Label>
                      <Input
                        id="categorySlug"
                        value={categoryForm.slug || ''}
                        onChange={(e) => setCategoryForm(prev => ({ ...prev, slug: e.target.value }))}
                        className="bg-white/10 border-purple-400/30"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="categoryDescription">Description</Label>
                      <Textarea
                        id="categoryDescription"
                        value={categoryForm.description || ''}
                        onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                        className="bg-white/10 border-purple-400/30"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="categoryColor">Color</Label>
                      <Input
                        id="categoryColor"
                        type="color"
                        value={categoryForm.color || '#8b5cf6'}
                        onChange={(e) => setCategoryForm(prev => ({ ...prev, color: e.target.value }))}
                        className="bg-white/10 border-purple-400/30 h-12"
                      />
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button 
                        type="submit" 
                        className="bg-purple-600 hover:bg-purple-700"
                        disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {selectedCategory ? 'Update' : 'Create'} Category
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsCategoryDialogOpen(false)}
                        className="border-purple-400/30"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="glassmorphism border-purple-400/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color || '#8b5cf6' }}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCategoryEdit(category)}
                          className="text-purple-400 hover:text-purple-300"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteCategoryMutation.mutate(category.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    {category.description && (
                      <p className="text-gray-400 text-sm">{category.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}