import style from "./Category.module.scss";

interface CategoryProps {
  category: string;
}

const Category = ({ category }: CategoryProps) => {
  return <span className={style.category}>{category}</span>;
};

export default Category;
