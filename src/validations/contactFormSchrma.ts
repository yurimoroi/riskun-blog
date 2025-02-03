import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: "名前を入力してください。" }),
  ruby: z.string().min(1, { message: "フリガナを入力してください。" }),
  email: z.string().min(1, { message: "メールアドレスを入力してください。" }),
  subject: z.string().refine((val) => val !== "", { message: "ご用件を選択してください。" }),
  contents: z.string().min(1, { message: "お問い合わせ内容を入力してください。" }),
  remark: z.string(),
});

export type Schema = z.infer<typeof contactFormSchema>;
