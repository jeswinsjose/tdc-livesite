
export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    author: string;
    category: string;
    tags: string[];
    thumbnail: string;
    excerpt: string;
    content: string;
}

// Simple Frontmatter Parser (Regex-based)
const parseFrontmatter = (fileContent: string) => {
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    const match = frontmatterRegex.exec(fileContent);

    const data: any = {};
    let content = fileContent;

    if (match) {
        const frontmatterBlock = match[1];
        content = fileContent.replace(match[0], '').trim();

        // Parse key-value pairs
        frontmatterBlock.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                let value = valueParts.join(':').trim();
                // Remove quotes if present
                value = value.replace(/^['"](.*)['"]$/, '$1');

                // Handle arrays (simple comma separated)
                if (value.startsWith('[') && value.endsWith(']')) {
                    const arrayContent = value.slice(1, -1);
                    data[key.trim()] = arrayContent.split(',').map(item => item.trim().replace(/^['"](.*)['"]$/, '$1'));
                } else {
                    data[key.trim()] = value;
                }
            }
        });
    }

    return { data, content };
};

// Load all MDX files from the content/blog directory
// Using relative path to ensure Vite finds it correctly
const posts = import.meta.glob('../../content/blog/*.mdx', { as: 'raw', eager: true });

export const getAllPosts = (): BlogPost[] => {
    return Object.entries(posts).map(([path, content]) => {
        const { data, content: markdownContent } = parseFrontmatter(content as string);

        // Extract slug from filename if not in frontmatter
        const filename = path.split('/').pop()?.replace('.mdx', '') || '';

        return {
            slug: data.slug || filename,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            author: data.author || 'TDC Team',
            category: data.category || 'Uncategorized',
            tags: Array.isArray(data.tags) ? data.tags : [],
            thumbnail: data.thumbnail || '',
            excerpt: data.excerpt || '',
            content: markdownContent,
        };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
    const posts = getAllPosts();
    return posts.find((post) => post.slug === slug);
};

export const getRelatedPosts = (currentSlug: string, tags: string[], limit: number = 3): BlogPost[] => {
    const posts = getAllPosts();
    return posts
        .filter((post) => post.slug !== currentSlug && post.tags.some((tag) => tags.includes(tag)))
        .slice(0, limit);
};

export const getAllCategories = (): string[] => {
    const posts = getAllPosts();
    const categories = new Set(posts.map((post) => post.category));
    return Array.from(categories);
};
