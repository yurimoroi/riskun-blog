import { Link } from "react-router-dom";
import BlogCard from "../../../components/BlogCard/BlogCard";
import style from "../Home.module.scss";
import BlogList from "../../../components/BlogList/BlogList";
import { useAppContext } from "../../../context/AppContext";
import { MaxDisplayNumAtHome } from "../../../util/blogSettings";

const MoreRead = () => {
  return (
    <Link to="/blogs" className={style.blog_list_more}>
      <span>もっと見る</span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
          stroke="#FFA500"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 16.5L15 12L10.5 7.5"
          stroke="#FFA500"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
};

const MainContents = () => {
  const { blogList } = useAppContext();

  return (
    <section className={style.main_contents}>
      <div className={style.introduction}>
        <h3 className={style.introduction_title}>激甚化する自然災害から身を守るために</h3>

        <p className={style.introduction_contents}>
          私たちが暮らす日本は、世界的に見ても自然災害が非常に多い国の一つです。その地理的な特徴から、自然災害が多発する国でもあります。日本は4つのプレート（ユーラシアプレート、太平洋プレート、フィリピン海プレート、インド・オーストラリアプレート）の境界に位置しており、地震が頻繁に発生します。このため、地震や津波のリスクが非常に高く、日常的にその対策を講じる必要があります。さらに、日本は太平洋に面しているため、太平洋で発生した台風が通過しやすく、これに伴う風水害（強風や豪雨）による被害も少なくありません。特に、近年では線状降水帯による豪雨が多発し、都市部や農村部を問わず大きな被害が出ています。加えて、富士山などの活火山が噴火する可能性も指摘されており、火山活動による災害も無視できません。
          <br />
          <br />
          そして、近年では南海トラフ地震や首都直下型地震など、大規模な地震が発生する可能性が高まっているとも言われており、これらの災害は私たちの生活に直接的な影響を与える可能性があるため、非常に警戒が必要です。これらのリスクを前に、私たち一人ひとり、そして家族全員の命を守るためには、日頃から適切な備えをしておくことが欠かせません。備えあれば憂いなしと言いますが、どんな災害にも対応できるよう、具体的な防災対策を普段から意識し、準備を整えておくことが、いざという時に大きな違いを生むことになります。
          <br />
          <br />
          このように、私たちの身の回りには自然災害に備えるための情報や知識が常に必要です。今後も、少しでも皆様のお役に立てるよう、実践的で有益な情報を発信していきますので、どうぞよろしくお願いいたします。
        </p>
      </div>

      <BlogList
        blogCards={blogList.slice(0, MaxDisplayNumAtHome).map((blogItem) => (
          <BlogCard
            blogUrl={blogItem.slug}
            thumbnailUrl={blogItem.frontmatter.thumbnailUrl}
            title={blogItem.frontmatter.title}
            excerpt={blogItem.frontmatter.excerpt}
            categories={blogItem.frontmatter.category.map((category) => category)}
            postDate={blogItem.frontmatter.postDate}
          />
        ))}
        pagenation={<MoreRead />}
        styles={{ marginTop: "100px" }}
      />
    </section>
  );
};

export default MainContents;
