import ReactMarkdown from "react-markdown";
import Category from "../../../components/Category/Category";
import style from "./Blog.module.scss";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import SEO from "../../../SEO";
import PostDate from "../../../components/PostDate/PostDate";

const Blog = () => {
  const { blogList } = useAppContext();
  const { slug } = useParams();
  const blog = blogList.find((blog) => blog.slug === slug);

  return (
    <main className={style.container}>
      <SEO
        title={blog?.frontmatter.title}
        description="日本は地震や津波、台風、豪雨、火山活動など、自然災害が多い国です。特に、地震や津波、風水害、豪雨などのリスクが高く、備えが必要です。近年では南海トラフ地震や首都直下型地震の発生が懸念されており、日常的な防災対策が命を守るために重要です。家庭や個人でできる備えを意識し、災害への対策を普段から整えておきましょう。"
        keywords="リスクん,防災,地震,台風,洪水,火災,感染症,防火管理者,AED,噴火,BCP,初動対応計画,IMP,ERP,緊急時対応計画"
        ogDescription="日本は地震や津波、台風、豪雨、火山活動など、自然災害が多い国です。特に、地震や津波、風水害、豪雨などのリスクが高く、備えが必要です。近年では南海トラフ地震や首都直下型地震の発生が懸念されており、日常的な防災対策が命を守るために重要です。家庭や個人でできる備えを意識し、災害への対策を普段から整えておきましょう。"
      />

      <section className={style.blog}>
        {blog ? (
          <>
            <div className={style.blog_titles}>
              <PostDate postDate={blog.frontmatter.postDate} />
              <span>
                <h3 className={style.blog_title}>{blog.frontmatter.title}</h3>
              </span>
            </div>

            <div className={style.blog_categories}>
              {blog.frontmatter.category.map((category, index) => (
                <Category key={index} category={category} />
              ))}
            </div>

            <img
              className={style.blog_thumbnail}
              src={blog.frontmatter.thumbnailUrl}
              alt="サムネイル"
            ></img>

            <div className={style.blog_contents}>
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
          </>
        ) : (
          <p>記事が見つかりませんでした。</p>
        )}
      </section>

      <section className={style.ad_list}>ここに広告を挿入する予定</section>
    </main>
  );
};

export default Blog;
