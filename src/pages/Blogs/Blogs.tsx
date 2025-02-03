import BlogCard from "../../components/BlogCard/BlogCard";
import BlogList from "../../components/BlogList/BlogList";
import style from "./Blogs.module.scss";
import { useAppContext } from "../../context/AppContext";
import { MaxDisplayNumAtBlogs } from "../../util/blogSettings";
import { useState } from "react";
import SEO from "../../SEO";

interface PagenationProps {
  pageStart: number;
  setPageStart: React.Dispatch<React.SetStateAction<number>>;
}

const Pagenation = ({ pageStart, setPageStart }: PagenationProps) => {
  const { blogList } = useAppContext();

  const totalPages = Math.ceil(blogList.length / MaxDisplayNumAtBlogs);

  const handlePageClick = (page: number) => {
    console.log(page);
    setPageStart(page);
  };

  return (
    <div className={style.blog_pagenation}>
      {[...Array(totalPages)].map((_, index) => (
        <span
          key={index}
          className={index === pageStart ? style.active : style.none}
          onClick={() => handlePageClick(index)}
        >
          {index + 1}
        </span>
      ))}
    </div>
  );
};

const Blogs = () => {
  const { blogList } = useAppContext();
  const [pageStart, setPageStart] = useState(0);

  return (
    <main className={style.container}>
      <SEO
        title="ブログ一覧"
        description="日本は地震や津波、台風、豪雨、火山活動など、自然災害が多い国です。特に、地震や津波、風水害、豪雨などのリスクが高く、備えが必要です。近年では南海トラフ地震や首都直下型地震の発生が懸念されており、日常的な防災対策が命を守るために重要です。家庭や個人でできる備えを意識し、災害への対策を普段から整えておきましょう。"
        keywords="リスクん,防災,地震,台風,洪水,火災,感染症,防火管理者,AED,噴火,BCP,初動対応計画,IMP,ERP,緊急時対応計画"
        ogDescription="日本は地震や津波、台風、豪雨、火山活動など、自然災害が多い国です。特に、地震や津波、風水害、豪雨などのリスクが高く、備えが必要です。近年では南海トラフ地震や首都直下型地震の発生が懸念されており、日常的な防災対策が命を守るために重要です。家庭や個人でできる備えを意識し、災害への対策を普段から整えておきましょう。"
      />

      <BlogList
        blogCards={blogList
          .slice(
            pageStart * MaxDisplayNumAtBlogs,
            pageStart * MaxDisplayNumAtBlogs + MaxDisplayNumAtBlogs
          )
          .map((blogItem) => (
            <BlogCard
              blogUrl={blogItem.slug}
              thumbnailUrl={blogItem.frontmatter.thumbnailUrl}
              title={blogItem.frontmatter.title}
              excerpt={blogItem.frontmatter.excerpt}
              categories={blogItem.frontmatter.category.map((category) => category)}
              postDate={blogItem.frontmatter.postDate}
            />
          ))}
        pagenation={<Pagenation pageStart={pageStart} setPageStart={setPageStart} />}
      />

      <section className={style.ad_list}>ここに広告を挿入する予定</section>
    </main>
  );
};

export default Blogs;
