import { config } from "dotenv";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client.js";
import ws from "ws";

config({ path: ".env" });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Available env vars:", Object.keys(process.env).filter(k => k.includes("DATABASE")));
  throw new Error("DATABASE_URL environment variable is not set. Please check your .env file.");
}

neonConfig.webSocketConstructor = ws;

console.log("🔗 Connecting to database...");
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Realistic data arrays
const firstNames = [
  "James", "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "Oliver", "Isabella",
  "Benjamin", "Mia", "Elijah", "Charlotte", "Lucas", "Amelia", "Mason", "Harper", "Ethan", "Evelyn",
  "Alexander", "Abigail", "Henry", "Emily", "Sebastian", "Elizabeth", "Jack", "Sofia", "Aiden", "Avery",
  "Owen", "Ella", "Samuel", "Scarlett", "Ryan", "Grace", "Nathan", "Chloe", "Caleb", "Victoria",
  "Dylan", "Riley", "Luke", "Aria", "Andrew", "Lily", "Isaac", "Aubrey", "Gabriel", "Zoey",
  "Anthony", "Penelope", "Joshua", "Lillian", "Christopher", "Addison", "Jaxon", "Layla", "Maverick", "Natalie",
  "David", "Camila", "Joseph", "Hannah", "Carter", "Brooklyn", "Michael", "Zoe", "Jayden", "Nora",
  "John", "Luna", "Daniel", "Savannah", "Matthew", "Leah", "Leo", "Audrey", "Jackson", "Claire",
  "Asher", "Eleanor", "Grayson", "Skylar", "Ezra", "Ellie", "Lincoln", "Stella", "Muhammad", "Hazel"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"
];

const domains = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com", "proton.me", "hey.com", "fastmail.com"];

const postTitles = [
  "Building Scalable APIs with Next.js and PostgreSQL",
  "Understanding React Server Components in 2024",
  "The Complete Guide to TypeScript Generics",
  "Optimizing Database Queries for Production",
  "Modern Authentication Patterns with OAuth 2.0",
  "Mastering CSS Grid and Flexbox Layouts",
  "Introduction to Edge Computing and Serverless",
  "Best Practices for Error Handling in Node.js",
  "State Management in React: Context vs Redux vs Zustand",
  "Building Real-time Applications with WebSockets",
  "GraphQL vs REST: Choosing the Right API Architecture",
  "Microservices Design Patterns Explained",
  "Docker and Kubernetes for Developers",
  "Implementing CI/CD Pipelines from Scratch",
  "Security Best Practices for Web Applications",
  "Performance Optimization Techniques for React Apps",
  "Understanding JavaScript Event Loop and Async",
  "Designing Effective Database Schemas",
  "Testing Strategies for Modern Web Applications",
  "The Future of Web Development: Trends to Watch",
  "Building Progressive Web Apps (PWA) in 2024",
  "Machine Learning for JavaScript Developers",
  "Exploring the New Features in ES2024",
  "Effective Code Review Practices for Teams",
  "Creating Accessible Web Applications",
  "Monitoring and Observability in Production",
  "Caching Strategies for High-Traffic Applications",
  "Building Design Systems with Tailwind CSS",
  "Server-Side Rendering vs Static Site Generation",
  "Implementing Search Functionality with Full-Text Search",
  "Managing Technical Debt in Large Codebases",
  "API Rate Limiting and Throttling Strategies",
  "Building Multi-tenant SaaS Applications",
  "Introduction to WebAssembly for Web Developers",
  "Handling File Uploads in Modern Web Apps",
  "Understanding Memory Management in JavaScript",
  "Building CLI Tools with Node.js",
  "Implementing Feature Flags in Production",
  "Database Migration Strategies for Zero Downtime",
  "The Art of Writing Clean Code"
];

const postContents = [
  "In this comprehensive guide, we'll explore the fundamental concepts and best practices that every developer should know. We'll cover everything from basic setup to advanced optimization techniques, with practical examples you can apply to your own projects.",
  "Building modern web applications requires a deep understanding of both frontend and backend technologies. This article breaks down the key concepts and provides actionable insights for developers at all skill levels.",
  "Performance optimization is crucial for delivering a great user experience. We'll examine various techniques for improving load times, reducing bundle sizes, and optimizing database queries.",
  "Security should never be an afterthought. In this post, we discuss common vulnerabilities and how to protect your applications from potential attacks. We'll cover authentication, authorization, and data protection strategies.",
  "Scalability is essential for growing applications. Learn how to design systems that can handle increasing traffic and data volumes without compromising performance or reliability.",
  "Testing is a critical part of the development process. We'll explore different testing strategies, from unit tests to end-to-end tests, and discuss how to implement them effectively in your workflow.",
  "Code quality directly impacts maintainability and developer productivity. This article covers coding standards, refactoring techniques, and tools that help maintain high-quality codebases.",
  "DevOps practices have transformed how we build and deploy software. Discover how to implement continuous integration and deployment pipelines that accelerate your development cycle.",
];

const commentContents = [
  "Great article! This really helped me understand the concept better. Thanks for sharing!",
  "I've been struggling with this for weeks. Your explanation finally made it click.",
  "Excellent write-up! Would love to see a follow-up post covering advanced topics.",
  "This is exactly what I was looking for. The code examples are really helpful.",
  "Solid explanation. I especially liked the section on performance optimization.",
  "Thanks for this detailed guide. Bookmarked for future reference!",
  "Well written and easy to follow. Keep up the great work!",
  "This clarified a lot of confusion I had. Appreciate the effort!",
  "Very informative post. The practical examples make it easy to understand.",
  "One of the best articles I've read on this topic. Highly recommended!",
  "I implemented this in my project and it works perfectly. Thank you!",
  "Clear and concise explanation. Exactly what beginners need.",
  "The step-by-step approach is really helpful. Great job!",
  "This solved a problem I've been debugging for days. Lifesaver!",
  "Comprehensive coverage of the topic. Will share with my team.",
  "I appreciate how you explained the 'why' behind each decision.",
  "Finally, an article that doesn't just skim the surface. Deep dive appreciated!",
  "The diagrams and visuals really help illustrate the concepts.",
  "Interesting perspective! I hadn't thought about it this way before.",
  "This is going to save me so much time. Thank you for writing this!",
];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRealisticEmail(firstName: string, lastName: string, index: number): string {
  const formats = [
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}${index}`,
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 99)}`,
  ];
  return `${getRandomElement(formats)}@${getRandomElement(domains)}`;
}

function generatePostContent(): string {
  const baseContent = getRandomElement(postContents);
  const additionalParagraphs = Math.floor(Math.random() * 3) + 1;
  let content = baseContent;
  for (let i = 0; i < additionalParagraphs; i++) {
    content += "\n\n" + getRandomElement(postContents);
  }
  return content;
}

async function main() {
  console.log("🌱 Starting seed...");

  console.log("🧹 Cleaning existing data...");
  await prisma.postTag.deleteMany();
  await prisma.postCategory.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create 100 users (2x original 50)
  console.log("👤 Creating users...");
  const usersData = Array.from({ length: 100 }, (_, i) => {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    return {
      id: generateId(),
      email: generateRealisticEmail(firstName, lastName, i),
      name: `${firstName} ${lastName}`,
    };
  });

  const users: { id: string; email: string; name: string }[] = [];
  for (const userData of usersData) {
    const user = await prisma.user.create({ data: userData });
    users.push(user);
  }
  console.log(`✅ Created ${users.length} users`);

  // Create 20 categories (2x original 10)
  console.log("📁 Creating categories...");
  const categoryNames = [
    "Technology", "Science", "Health", "Business", "Entertainment",
    "Sports", "Politics", "Travel", "Food", "Fashion",
    "Finance", "Education", "Gaming", "Lifestyle", "Automotive",
    "Real Estate", "Marketing", "Design", "Photography", "Music"
  ];
  const categories = await Promise.all(
    categoryNames.map((name) =>
      prisma.category.create({
        data: { id: generateId(), name, slug: slugify(name) },
      })
    )
  );
  console.log(`✅ Created ${categories.length} categories`);

  // Create 40 tags (2x original 20)
  console.log("🏷️ Creating tags...");
  const tagNames = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
    "PostgreSQL", "Prisma", "Drizzle", "AI", "Machine Learning",
    "Web Development", "Mobile", "Cloud", "DevOps", "Security",
    "Performance", "Tutorial", "News", "Opinion", "Guide",
    "Vue.js", "Angular", "Svelte", "Python", "Rust",
    "GraphQL", "REST API", "Docker", "Kubernetes", "AWS",
    "Firebase", "Supabase", "MongoDB", "Redis", "Testing",
    "CSS", "Tailwind", "UI/UX", "Accessibility", "SEO"
  ];
  const tags = await Promise.all(
    tagNames.map((name) =>
      prisma.tag.create({
        data: { id: generateId(), name, slug: slugify(name) },
      })
    )
  );
  console.log(`✅ Created ${tags.length} tags`);

  // Create 400 posts (2x original 200)
  console.log("📝 Creating posts...");
  const postsData = Array.from({ length: 400 }, () => ({
    id: generateId(),
    title: getRandomElement(postTitles),
    content: generatePostContent(),
    published: Math.random() > 0.2,
    viewCount: Math.floor(Math.random() * 50000),
    authorId: getRandomElement(users).id,
  }));

  const posts: { id: string }[] = [];
  const BATCH_SIZE = 50;
  for (let i = 0; i < postsData.length; i += BATCH_SIZE) {
    const batch = postsData.slice(i, i + BATCH_SIZE);
    const createdBatch = await Promise.all(
      batch.map((data) => prisma.post.create({ data }))
    );
    posts.push(...createdBatch);
    console.log(`  📝 Created ${posts.length}/${postsData.length} posts...`);
  }
  console.log(`✅ Created ${posts.length} posts`);

  // Create post-category relationships
  console.log("🔗 Creating post-category relationships...");
  const postCategories: { postId: string; categoryId: string }[] = [];
  for (const post of posts) {
    const numCategories = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...categories].sort(() => Math.random() - 0.5);
    for (let i = 0; i < numCategories; i++) {
      postCategories.push({ postId: post.id, categoryId: shuffled[i].id });
    }
  }
  await prisma.postCategory.createMany({ data: postCategories });
  console.log(`✅ Created ${postCategories.length} post-category relationships`);

  // Create post-tag relationships
  console.log("🔗 Creating post-tag relationships...");
  const postTagsData: { postId: string; tagId: string }[] = [];
  for (const post of posts) {
    const numTags = Math.floor(Math.random() * 5) + 1;
    const shuffled = [...tags].sort(() => Math.random() - 0.5);
    for (let i = 0; i < numTags; i++) {
      postTagsData.push({ postId: post.id, tagId: shuffled[i].id });
    }
  }
  await prisma.postTag.createMany({ data: postTagsData });
  console.log(`✅ Created ${postTagsData.length} post-tag relationships`);

  // Create 1000 comments (2x original 500)
  console.log("💬 Creating comments...");
  const commentsData = Array.from({ length: 1000 }, () => ({
    id: generateId(),
    content: getRandomElement(commentContents),
    postId: getRandomElement(posts).id,
    authorId: getRandomElement(users).id,
  }));
  await prisma.comment.createMany({ data: commentsData });
  console.log(`✅ Created ${commentsData.length} comments`);

  console.log("\n🎉 Seed completed successfully!");
  console.log("📊 Summary:");
  console.log(`   - Users: ${users.length}`);
  console.log(`   - Categories: ${categories.length}`);
  console.log(`   - Tags: ${tags.length}`);
  console.log(`   - Posts: ${posts.length}`);
  console.log(`   - Post-Category relations: ${postCategories.length}`);
  console.log(`   - Post-Tag relations: ${postTagsData.length}`);
  console.log(`   - Comments: ${commentsData.length}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

