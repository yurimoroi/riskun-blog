import SEO from "../../SEO";
import LeftContents from "./components/LeftContents";
import MainContents from "./components/MainContents";
import RightContents from "./components/RightContents";
import style from "./Home.module.scss";

const Home = () => {
  return (
    <main className={style.container}>
      <SEO
        title="ホーム"
        description="日本は地震や津波、台風、豪雨、火山活動など、自然災害が多い国です。特に、地震や津波、風水害、豪雨などのリスクが高く、備えが必要です。近年では南海トラフ地震や首都直下型地震の発生が懸念されており、日常的な防災対策が命を守るために重要です。家庭や個人でできる備えを意識し、災害への対策を普段から整えておきましょう。"
        keywords="リスクん,防災,地震,台風,洪水,火災,感染症,防火管理者,AED,噴火,BCP,初動対応計画,IMP,ERP,緊急時対応計画"
        ogDescription="日本は地震や津波、台風、豪雨、火山活動など、自然災害が多い国です。特に、地震や津波、風水害、豪雨などのリスクが高く、備えが必要です。近年では南海トラフ地震や首都直下型地震の発生が懸念されており、日常的な防災対策が命を守るために重要です。家庭や個人でできる備えを意識し、災害への対策を普段から整えておきましょう。"
      />

      <LeftContents />

      <MainContents />

      <RightContents />
    </main>
  );
};

export default Home;
