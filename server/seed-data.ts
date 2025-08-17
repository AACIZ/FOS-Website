import { storage } from './storage';

async function seedDatabase() {
  console.log('Seeding database with sample data...');

  try {
    // Create categories
    const categories = [
      {
        name: 'Digital Marketing',
        slug: 'digital-marketing',
        description: 'Latest trends and strategies in digital marketing',
        color: '#8b5cf6'
      },
      {
        name: 'SEO & Analytics',
        slug: 'seo-analytics',
        description: 'Search engine optimization and web analytics insights',
        color: '#06b6d4'
      },
      {
        name: 'Social Media',
        slug: 'social-media',
        description: 'Social media marketing strategies and best practices',
        color: '#ec4899'
      },
      {
        name: 'Technology',
        slug: 'technology',
        description: 'Technology trends and innovations in marketing',
        color: '#10b981'
      },
      {
        name: 'Case Studies',
        slug: 'case-studies',
        description: 'Real-world success stories and client results',
        color: '#f59e0b'
      }
    ];

    const createdCategories = [];
    for (const category of categories) {
      const created = await storage.createCategory(category);
      createdCategories.push(created);
      console.log(`Created category: ${created.name}`);
    }

    // Create blog posts
    const blogPosts = [
      {
        title: 'The Future of Digital Marketing: AI and Personalization',
        slug: 'future-digital-marketing-ai-personalization',
        excerpt: 'Discover how artificial intelligence is revolutionizing digital marketing through personalized customer experiences and data-driven insights.',
        content: `<h2>The AI Revolution in Marketing</h2>
        
        <p>Artificial intelligence is fundamentally changing how we approach digital marketing. From predictive analytics to personalized content delivery, AI is enabling marketers to create more meaningful connections with their audiences.</p>
        
        <h3>Key Benefits of AI in Marketing</h3>
        
        <ul>
          <li><strong>Personalization at Scale:</strong> AI algorithms can analyze customer behavior patterns to deliver personalized experiences to thousands of users simultaneously.</li>
          <li><strong>Predictive Analytics:</strong> Machine learning models can predict customer lifetime value, churn probability, and optimal engagement times.</li>
          <li><strong>Automated Optimization:</strong> AI can continuously optimize ad campaigns, email subject lines, and content recommendations without manual intervention.</li>
        </ul>
        
        <h3>Implementation Strategies</h3>
        
        <p>To successfully implement AI in your marketing strategy:</p>
        
        <ol>
          <li>Start with data collection and cleansing</li>
          <li>Choose the right AI tools for your specific needs</li>
          <li>Test and iterate on AI-driven campaigns</li>
          <li>Train your team on AI marketing principles</li>
        </ol>
        
        <blockquote>
          <p>"The future belongs to companies that can harness the power of AI to create truly personalized customer experiences."</p>
        </blockquote>
        
        <p>As we move forward, the integration of AI in marketing will only deepen, making it essential for businesses to adapt and evolve their strategies accordingly.</p>`,
        featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630',
        isPublished: true,
        publishedAt: new Date('2024-01-15'),
        categoryId: createdCategories[0].id,
        authorId: null,
        tags: ['AI', 'Personalization', 'Digital Marketing', 'Technology'],
        seoTitle: 'AI in Digital Marketing: The Future of Personalization',
        seoDescription: 'Learn how AI is transforming digital marketing through personalization, predictive analytics, and automated optimization.'
      },
      {
        title: 'SEO in 2024: What You Need to Know',
        slug: 'seo-2024-guide',
        excerpt: 'Stay ahead of the curve with the latest SEO trends and algorithm updates that will shape search rankings in 2024.',
        content: `<h2>The Evolution of Search Engine Optimization</h2>
        
        <p>Search engine optimization continues to evolve rapidly, with Google's algorithm updates becoming more sophisticated each year. Understanding these changes is crucial for maintaining and improving your search rankings.</p>
        
        <h3>Core Web Vitals Still Matter</h3>
        
        <p>Google's emphasis on user experience metrics remains strong. The three Core Web Vitals continue to be ranking factors:</p>
        
        <ul>
          <li><strong>Largest Contentful Paint (LCP):</strong> Measures loading performance</li>
          <li><strong>First Input Delay (FID):</strong> Measures interactivity</li>
          <li><strong>Cumulative Layout Shift (CLS):</strong> Measures visual stability</li>
        </ul>
        
        <h3>E-A-T and Content Quality</h3>
        
        <p>Expertise, Authoritativeness, and Trustworthiness (E-A-T) have become more important than ever. Google's algorithms are better at identifying high-quality, authoritative content.</p>
        
        <h3>Voice Search Optimization</h3>
        
        <p>With the growing popularity of voice assistants, optimizing for voice search is becoming essential. Focus on:</p>
        
        <ul>
          <li>Natural language and conversational keywords</li>
          <li>Featured snippet optimization</li>
          <li>Local SEO for "near me" searches</li>
        </ul>
        
        <p>The key to SEO success in 2024 is creating valuable, user-focused content while maintaining technical excellence.</p>`,
        featuredImage: 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630',
        isPublished: true,
        publishedAt: new Date('2024-01-10'),
        categoryId: createdCategories[1].id,
        authorId: null,
        tags: ['SEO', 'Google Algorithm', 'Core Web Vitals', 'Voice Search'],
        seoTitle: 'SEO Guide 2024: Latest Trends and Algorithm Updates',
        seoDescription: 'Complete guide to SEO in 2024, covering Core Web Vitals, E-A-T, voice search optimization, and the latest Google algorithm updates.'
      },
      {
        title: 'Social Media Strategy That Actually Converts',
        slug: 'social-media-strategy-converts',
        excerpt: 'Learn how to build a social media strategy that goes beyond vanity metrics to drive real business results and conversions.',
        content: `<h2>Beyond Likes and Follows: Building a Converting Social Media Strategy</h2>
        
        <p>While engagement metrics like likes and follows are important, the ultimate goal of social media marketing should be driving meaningful business results. Here's how to create a strategy that actually converts.</p>
        
        <h3>Define Clear Objectives</h3>
        
        <p>Start with specific, measurable goals:</p>
        
        <ul>
          <li>Lead generation targets</li>
          <li>Website traffic goals</li>
          <li>Sales conversion rates</li>
          <li>Customer acquisition costs</li>
        </ul>
        
        <h3>Content That Converts</h3>
        
        <p>Create content with clear conversion paths:</p>
        
        <ol>
          <li><strong>Educational Content:</strong> Build trust and authority</li>
          <li><strong>Social Proof:</strong> Share customer testimonials and case studies</li>
          <li><strong>Behind-the-Scenes:</strong> Humanize your brand</li>
          <li><strong>Call-to-Action Posts:</strong> Direct followers to take specific actions</li>
        </ol>
        
        <h3>Platform-Specific Strategies</h3>
        
        <p><strong>LinkedIn:</strong> Focus on B2B lead generation with professional content and industry insights.</p>
        
        <p><strong>Instagram:</strong> Use visual storytelling and shopping features to drive e-commerce sales.</p>
        
        <p><strong>Facebook:</strong> Leverage detailed targeting options for precise audience reach.</p>
        
        <p><strong>TikTok:</strong> Create authentic, entertaining content that showcases your brand personality.</p>
        
        <h3>Measuring Success</h3>
        
        <p>Track metrics that matter:</p>
        
        <ul>
          <li>Click-through rates to your website</li>
          <li>Lead generation from social platforms</li>
          <li>Social commerce sales</li>
          <li>Customer lifetime value from social acquisitions</li>
        </ul>
        
        <p>Remember, a successful social media strategy aligns with your overall business objectives and focuses on quality engagement over quantity.</p>`,
        featuredImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630',
        isPublished: true,
        publishedAt: new Date('2024-01-05'),
        categoryId: createdCategories[2].id,
        authorId: null,
        tags: ['Social Media', 'Conversion Strategy', 'Content Marketing', 'ROI'],
        seoTitle: 'Social Media Strategy for Conversions: Beyond Vanity Metrics',
        seoDescription: 'Build a social media strategy that drives real business results. Learn conversion-focused tactics for LinkedIn, Instagram, Facebook, and TikTok.'
      },
      {
        title: 'Case Study: 300% ROI Increase Through Data-Driven Marketing',
        slug: 'case-study-300-percent-roi-increase',
        excerpt: 'Discover how we helped a SaaS company triple their ROI using advanced analytics, personalization, and strategic campaign optimization.',
        content: `<h2>The Challenge</h2>
        
        <p>Our client, a B2B SaaS company, was struggling with low conversion rates and high customer acquisition costs. Despite having a solid product, their marketing efforts weren't delivering the ROI they needed to scale effectively.</p>
        
        <h3>Initial Situation</h3>
        
        <ul>
          <li>Conversion rate: 0.8%</li>
          <li>Customer acquisition cost: $750</li>
          <li>Monthly recurring revenue growth: 15%</li>
          <li>Lead quality score: 3.2/10</li>
        </ul>
        
        <h2>Our Approach</h2>
        
        <h3>1. Data Audit and Analytics Setup</h3>
        
        <p>We began with a comprehensive audit of their existing data infrastructure and implemented advanced tracking across all touchpoints.</p>
        
        <h3>2. Customer Journey Mapping</h3>
        
        <p>Through detailed analysis, we identified critical drop-off points in the customer journey and opportunities for optimization.</p>
        
        <h3>3. Personalization Implementation</h3>
        
        <p>We implemented dynamic content personalization based on:</p>
        
        <ul>
          <li>Industry vertical</li>
          <li>Company size</li>
          <li>Previous engagement behavior</li>
          <li>Referral source</li>
        </ul>
        
        <h3>4. Multi-Channel Campaign Optimization</h3>
        
        <p>We optimized campaigns across multiple channels:</p>
        
        <ul>
          <li>Google Ads with advanced audience targeting</li>
          <li>LinkedIn sponsored content for decision-makers</li>
          <li>Email nurture sequences with behavioral triggers</li>
          <li>Retargeting campaigns with dynamic messaging</li>
        </ul>
        
        <h2>Results After 6 Months</h2>
        
        <ul>
          <li><strong>Conversion rate:</strong> 3.2% (300% increase)</li>
          <li><strong>Customer acquisition cost:</strong> $280 (63% decrease)</li>
          <li><strong>Monthly recurring revenue growth:</strong> 45% (200% increase)</li>
          <li><strong>Lead quality score:</strong> 8.1/10 (153% increase)</li>
        </ul>
        
        <h2>Key Takeaways</h2>
        
        <ol>
          <li><strong>Data is Everything:</strong> Without proper tracking and analysis, optimization is impossible.</li>
          <li><strong>Personalization Wins:</strong> Tailored experiences significantly outperform generic approaches.</li>
          <li><strong>Multi-Channel Synergy:</strong> Coordinated campaigns across channels amplify results.</li>
          <li><strong>Continuous Optimization:</strong> Regular testing and refinement are essential for sustained growth.</li>
        </ol>
        
        <p>This case study demonstrates the power of data-driven marketing when executed with precision and strategic thinking.</p>`,
        featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630',
        isPublished: true,
        publishedAt: new Date('2023-12-28'),
        categoryId: createdCategories[4].id,
        authorId: null,
        tags: ['Case Study', 'ROI', 'Data-Driven Marketing', 'SaaS', 'Conversion Optimization'],
        seoTitle: 'SaaS Marketing Case Study: 300% ROI Increase Through Data Analytics',
        seoDescription: 'Learn how data-driven marketing strategies helped a SaaS company achieve 300% ROI increase and 63% reduction in customer acquisition costs.'
      },
      {
        title: 'Marketing Automation: Your Secret Weapon for Scale',
        slug: 'marketing-automation-secret-weapon-scale',
        excerpt: 'Unlock the power of marketing automation to scale your business efficiently while maintaining personalized customer experiences.',
        content: `<h2>Why Marketing Automation Matters</h2>
        
        <p>In today's fast-paced digital landscape, manual marketing processes simply can't keep up with the demands of modern businesses. Marketing automation enables companies to scale their efforts while maintaining the personal touch that customers expect.</p>
        
        <h3>Benefits of Marketing Automation</h3>
        
        <ul>
          <li><strong>Efficiency:</strong> Automate repetitive tasks and focus on strategy</li>
          <li><strong>Consistency:</strong> Ensure consistent messaging across all touchpoints</li>
          <li><strong>Personalization:</strong> Deliver relevant content based on customer behavior</li>
          <li><strong>Scalability:</strong> Handle thousands of interactions simultaneously</li>
        </ul>
        
        <h3>Key Automation Workflows</h3>
        
        <h4>1. Welcome Series</h4>
        <p>Onboard new subscribers with a series of educational and engaging emails that introduce your brand and set expectations.</p>
        
        <h4>2. Lead Nurturing</h4>
        <p>Guide prospects through the sales funnel with targeted content based on their interests and behavior.</p>
        
        <h4>3. Abandoned Cart Recovery</h4>
        <p>Re-engage customers who left items in their cart with personalized reminders and incentives.</p>
        
        <h4>4. Customer Retention</h4>
        <p>Keep existing customers engaged with relevant product recommendations and exclusive offers.</p>
        
        <h3>Choosing the Right Platform</h3>
        
        <p>Consider these factors when selecting a marketing automation platform:</p>
        
        <ul>
          <li>Integration capabilities with your existing tech stack</li>
          <li>Ease of use and learning curve</li>
          <li>Scalability and pricing structure</li>
          <li>Advanced features like AI and predictive analytics</li>
        </ul>
        
        <h3>Best Practices for Success</h3>
        
        <ol>
          <li><strong>Start Small:</strong> Begin with simple workflows and gradually add complexity</li>
          <li><strong>Segment Your Audience:</strong> Create targeted campaigns for different customer groups</li>
          <li><strong>Test and Optimize:</strong> Continuously A/B test your automated campaigns</li>
          <li><strong>Monitor Performance:</strong> Track key metrics and adjust strategies accordingly</li>
        </ol>
        
        <p>Marketing automation isn't about replacing human connection—it's about enhancing it. When implemented correctly, automation allows you to deliver more relevant, timely, and valuable experiences to your customers at scale.</p>`,
        featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630',
        isPublished: false,
        publishedAt: null,
        categoryId: createdCategories[3].id,
        authorId: null,
        tags: ['Marketing Automation', 'Scaling', 'Workflow', 'Lead Nurturing'],
        seoTitle: 'Marketing Automation Guide: Scale Your Business Efficiently',
        seoDescription: 'Complete guide to marketing automation. Learn how to implement workflows, choose platforms, and scale your marketing efforts effectively.'
      }
    ];

    for (const post of blogPosts) {
      const created = await storage.createBlogPost(post);
      console.log(`Created blog post: ${created.title}`);
    }

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase().then(() => {
    process.exit(0);
  }).catch(error => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
}

export { seedDatabase };