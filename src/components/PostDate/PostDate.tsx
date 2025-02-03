import { formatDate } from "../../util/format";
import style from "./PostDate.module.scss";

interface PostDateProps {
  postDate: string;
}

const PostDate = ({ postDate }: PostDateProps) => {
  return <span className={style.post_date}>{formatDate(postDate)}</span>;
};

export default PostDate;
