import style from "../Home.module.scss";

const RightContents = () => {
  return (
    <aside className={style.right_sidebar}>
      <div className={style.myself}>
        <img src="./images/riskun.JPG" alt="イラスト" className={style.myself_img} />

        <p className={style.myself_name}>リスクん</p>

        <p className={style.myself_background}>
          某コンサルティングファームにて、BCP・ERMを中心としたリスクマネジメントコンサルタントとして活動した過去を持つ。4年弱で大企業・中小企業問わず25社を超える企業の支援を経験。
          現在は他領域のコンサルティングに従事する傍ら、これまでのリスクマネジメント領域での支援経験を活かし、日頃からの防災活動や有事の際に役立てるような情報を定期的に発信している。
        </p>
      </div>
    </aside>
  );
};

export default RightContents;
