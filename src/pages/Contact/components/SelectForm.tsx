import style from "../Contact.module.scss";
import { Controller } from "react-hook-form";

interface SelectFormProps {
  name: string;
  label: string;
  options: string[];
  control: any;
  errors?: any;
}

const SelectForm = ({ name, label, options, control, errors }: SelectFormProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <div className={style.form_contents}>
            <select {...field}>
              <option value=""></option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label className={style.form_placeholder}>{label}</label>
          </div>

          {errors && <span className={style.form_error}>{errors[name]?.message}</span>}
        </>
      )}
    />
  );
};

export default SelectForm;
