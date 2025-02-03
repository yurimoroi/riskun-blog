import { useForm } from "react-hook-form";
import SEO from "../../SEO";
import style from "./Contact.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, Schema } from "../../validations/contactFormSchrma";
import InputForm from "./components/InputForm";
import SelectForm from "./components/SelectForm";
import TextareaForm from "./components/TextareaForm";

const Contact = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Schema>({
    defaultValues: {
      name: "",
      ruby: "",
      email: "",
      subject: "",
      contents: "",
      remark: "",
    },
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = () => {
    reset({
      name: "",
      ruby: "",
      email: "",
      subject: "",
      contents: "",
      remark: "",
    });
  };

  return (
    <main className={style.container}>
      <SEO
        title="お問い合わせ"
        description="日本は地震や津波、台風、豪雨、火山活動など、自然災害が多い国です。特に、地震や津波、風水害、豪雨などのリスクが高く、備えが必要です。近年では南海トラフ地震や首都直下型地震の発生が懸念されており、日常的な防災対策が命を守るために重要です。家庭や個人でできる備えを意識し、災害への対策を普段から整えておきましょう。"
        keywords="リスクん,防災,地震,台風,洪水,火災,感染症,防火管理者,AED,噴火,BCP,初動対応計画,IMP,ERP,緊急時対応計画"
        ogDescription="日本は地震や津波、台風、豪雨、火山活動など、自然災害が多い国です。特に、地震や津波、風水害、豪雨などのリスクが高く、備えが必要です。近年では南海トラフ地震や首都直下型地震の発生が懸念されており、日常的な防災対策が命を守るために重要です。家庭や個人でできる備えを意識し、災害への対策を普段から整えておきましょう。"
      />

      <h3 className={style.contact_title}>お問い合わせ</h3>

      <p className={style.contact_description}>
        ここにお問い合わせの注意事項が入ります。
        <br />
        ここにお問い合わせの注意事項が入ります。
        <br />
        ここにお問い合わせの注意事項が入ります。
      </p>

      <form
        role="form"
        action="#"
        method="post"
        className={style.contact_form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputForm name="name" label="名前*" type="text" control={control} errors={errors} />

        <InputForm name="ruby" label="フリガナ*" type="text" control={control} errors={errors} />

        <InputForm
          name="email"
          label="メールアドレス*"
          type="email"
          control={control}
          errors={errors}
        />

        <SelectForm
          name="subject"
          label="ご用件*"
          options={["サービス改善要求", "取材依頼", "その他"]}
          control={control}
          errors={errors}
        />

        <TextareaForm name="contents" label="お問い合わせ内容*" control={control} errors={errors} />

        <TextareaForm name="remark" label="備考" control={control} />

        <input type="submit" value="送信" className={style.form_submit} />
      </form>
    </main>
  );
};

export default Contact;
