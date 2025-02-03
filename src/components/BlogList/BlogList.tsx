import { cloneElement } from "react";
import style from "./BlogList.module.scss";

interface BlogListProps {
  blogCards: JSX.Element[];
  pagenation: JSX.Element;
  styles?: {};
}

const BlogList = ({ blogCards, pagenation, styles }: BlogListProps) => {
  return (
    <section className={style.blog_list} style={styles}>
      <h3 className={style.blog_list_title}>最新記事一覧</h3>

      <div className={style.blog_list_cards}>
        {blogCards.map((blogCard: JSX.Element, index) => cloneElement(blogCard, { key: index }))}
      </div>

      {pagenation}
    </section>
  );
};

export default BlogList;
