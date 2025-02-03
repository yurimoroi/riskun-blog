import TrendCard from "../../../components/TrendCard/TrendCard";
import { useAppContext } from "../../../context/AppContext";
import { AccessRankingBlog } from "../../../util/blogSettings";
import style from "../Home.module.scss";

const LeftContents = () => {
  const { blogList } = useAppContext();
  const accessRankingBlogList = blogList
    .filter((blog) => AccessRankingBlog.includes(blog.slug))
    .sort((a, b) => AccessRankingBlog.indexOf(a.slug) - AccessRankingBlog.indexOf(b.slug));

  return (
    <aside className={style.left_sidebar}>
      <div className={style.trend_blogs}>
        <h3 className={style.trend_blogs_title}>アクセスランキング</h3>

        <div className={style.trend_blogs_cards}>
          {accessRankingBlogList.map((blog, index) => (
            <TrendCard
              key={index}
              rank={index + 1}
              blogUrl={blog.slug}
              thumbnailUrl={blog.frontmatter.thumbnailUrl}
              title={blog.frontmatter.title}
              categories={blog.frontmatter.category.map((category) => category)}
              postDate={blog.frontmatter.postDate}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default LeftContents;
