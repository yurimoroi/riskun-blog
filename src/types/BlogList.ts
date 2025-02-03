export interface BLogListProps {
  slug: string;
  content: string;
  frontmatter: {
    title: string;
    postDate: string;
    excerpt: string;
    thumbnailUrl: string;
    category: string[];
  };
}
