import style from "./BlogCard.module.scss";
import Category from "../Category/Category";
import PostDate from "../PostDate/PostDate";
import { Link } from "react-router-dom";

interface BlogCardProps {
  blogUrl: string;
  thumbnailUrl: string;
  postDate: string;
  title: string;
  excerpt: string;
  categories: string[];
}

const BlogCard = ({
  blogUrl,
  thumbnailUrl,
  postDate,
  title,
  excerpt,
  categories,
}: BlogCardProps) => {
  return (
    <Link to={`/blogs/${blogUrl}`} className={style.blog_list_card}>
      <div className={style.blog_list_card_img_outer}>
        <img
          src={`./images/${thumbnailUrl}`}
          alt="サムネイル"
          className={style.blog_list_card_img}
        />
      </div>

      <div className={style.blog_list_card_contents}>
        <PostDate postDate={postDate} />

        <p className={style.blog_list_card_title}>{title}</p>

        <p className={style.blog_list_card_excerpt}>{excerpt}</p>

        <div className={style.blog_list_card_categories}>
          {categories.map((category, index) => (
            <Category key={index} category={category} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
