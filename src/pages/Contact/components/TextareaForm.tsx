import style from "../Contact.module.scss";
import { Controller } from "react-hook-form";

interface TextareaFormProps {
  name: string;
  label: string;
  control: any;
  errors?: any;
}

const TextareaForm = ({ name, label, control, errors }: TextareaFormProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <div className={style.form_contents}>
            <textarea {...field}></textarea>

            <label className={style.form_placeholder}>{label}</label>
          </div>

          {errors && <span className={style.form_error}>{errors[name]?.message}</span>}
        </>
      )}
    />
  );
};

export default TextareaForm;
