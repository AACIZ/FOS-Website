import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { blogPosts } from '../../shared/schema.js';
import { eq, desc } from 'drizzle-orm';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool });

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'GET') {
    try {
      const published = req.query.published === 'true' ? true : req.query.published === 'false' ? false : undefined;
      const query = db.select().from(blogPosts);
      
      let posts;
      if (published !== undefined) {
        posts = await query.where(eq(blogPosts.isPublished, published)).orderBy(desc(blogPosts.createdAt));
      } else {
        posts = await query.orderBy(desc(blogPosts.createdAt));
      }
      
      res.json(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}