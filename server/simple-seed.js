const { storage } = require('./storage.js');

async function seedData() {
  console.log('Seeding data...');
  
  try {
    // Create categories
    const category1 = await storage.createCategory({
      name: 'Digital Marketing',
      slug: 'digital-marketing',
      description: 'Latest trends and strategies in digital marketing',
      color: '#8b5cf6'
    });
    
    const category2 = await storage.createCategory({
      name: 'SEO & Analytics',  
      slug: 'seo-analytics',
      description: 'Search engine optimization insights',
      color: '#06b6d4'
    });

    // Create sample posts
    await storage.createBlogPost({
      title: 'The Future of Digital Marketing',
      slug: 'future-digital-marketing',
      excerpt: 'AI is revolutionizing digital marketing.',
      content: '<h2>AI Revolution</h2><p>Artificial intelligence is changing marketing.</p>',
      featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
      isPublished: true,
      publishedAt: new Date(),
      categoryId: category1.id,
      tags: ['AI', 'Marketing']
    });

    await storage.createBlogPost({
      title: 'SEO Best Practices 2024',
      slug: 'seo-best-practices-2024', 
      excerpt: 'Latest SEO strategies for better rankings.',
      content: '<h2>SEO Trends</h2><p>Core Web Vitals are crucial for rankings.</p>',
      featuredImage: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=1200',
      isPublished: true,
      publishedAt: new Date(),
      categoryId: category2.id,
      tags: ['SEO', 'Rankings']
    });

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

seedData();
