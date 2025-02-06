import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const router = Router();

// ブログ記事リストを取得
router.get("/", (_req: Request, res: Response) => {
  const blogsDir = path.join(process.cwd(), "./public/blogs");

  fs.readdir(blogsDir, (err, files) => {
    if (err) {
      return res.json({
        body: { message: "", status: 500, error: "ブログ記事を取得できませんでした。" },
      });
    }

    const blogSlugs = files
      .map((filename, index) => {
        const slug = filename.replace(".md", "");
        const fileData = fs.readFileSync(path.join(blogsDir, filename), "utf-8");
        const { data, content } = matter(fileData);

        return {
          id: index,
          frontmatter: data,
          content,
          slug: slug,
        };
      })
      .sort((present, next) => {
        const presentDate = new Date(present.frontmatter.postDate);
        const nextDate = new Date(next.frontmatter.postDate);

        return nextDate.getTime() - presentDate.getTime();
      });

    res.json({ body: { message: blogSlugs, status: 200 } });
  });
});

export default router;
