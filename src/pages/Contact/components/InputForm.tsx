import style from "../Contact.module.scss";
import { Controller } from "react-hook-form";

interface InputFormProps {
  name: string;
  label: string;
  type: string;
  control: any;
  errors?: any;
}

const InputForm = ({ name, label, type, control, errors }: InputFormProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <div className={style.form_contents}>
            <input type={type} {...field} />

            <label className={style.form_placeholder}>{label}</label>
          </div>

          {errors && <span className={style.form_error}>{errors[name]?.message}</span>}
        </>
      )}
    />
  );
};

export default InputForm;
