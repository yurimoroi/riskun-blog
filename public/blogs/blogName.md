---
title: "ここに記事のタイトルを書いてください。長すぎると省略されます。"
excerpt: "ここに抜粋を記載してください。SEOにもかかわるためちゃんとしたものを書くといいです。"
category:
  [
    "プログラミング",
    "AI",
    "カテゴリー",
    "配列で",
    "様々な",
    "タグを挿入",
    "タグは共通化して",
    "ほしいですね",
  ]
thumbnailUrl: "dummy.png"
postDate: "2025-01-30"
---

## 概要

Next.js でブログサイトを作成します。

当記事は当サイトのブログ機能を実装する際に行った工程となります。
不明点がないように記載していきますが、ブログ実装に関わる部分中心に記載するので、よろしくお願いいたします。

当サイトは[こちら](https://qiita.com/t38miwa/items/c20afd0575b090ca9957)を参考に作成しました。こちらも併せてご確認ください。

## 開発環境

Windows11

Next.js 14.2.4

## サンプル

[当サイトのブログページ](https://face-ict.com/blog)

## 開発手順

Next.js のプロジェクトを作成していきます。

今回は AppRouter で作成するため、クライアントサイドとサーバーサイドを明確に分ける必要がありますのでご注意ください。

今回は typescript で開発を行うため、プロジェクト作成時に typescript を選択してください。

&emsp;※javascript でも作成は可能ですので、置き換えて製造を行ってください。

```
npx create-next-app blog
```

今回作成する機能およびページは以下となります。

1. ブログ一覧ページ
2. ブログ内容ページ
3. ブログ一覧ページに記事情報を読み込み、表示する機能
4. ブログ内容ページに記事内容を読み込み、表示する機能

となります。

記事データはマークダウン記法を用いたデータを作成します。
プロジェクトのルート階層に data フォルダを作成し、md 拡張子のファイルを作成します。id を用いて表示順を管理するので、ファイル名はなんでも OK です。

下記はフォルダ構成になります。

&emsp;※以降、作成や変更するファイルをすべて記載してあります。

```
blog
  ├ next.config.mjs ←変更
  ├ src
  │ └ app
  │   ├ blog ←作成
  │   │ ├ page.tsx ←作成
  │   │ └ [slug] ←作成
  │   │   └ page.tsx ←作成
  │   └ api
  │     ├ blogList ←作成
  │     │ └ route.ts ←作成
  │     └ blog ←作成
  │       └route.ts ←作成
  └ data ←作成
     ├ no_1.md ←作成
     ├ no_2.md ←作成
     ├ no_3.md ←作成
     ├ no_4.md ←作成
     ├ no_5.md ←作成
     ├ no_6.md ←作成
     └ no_7.md ←作成
```

`/blog/page.tsx` を実装します。

```
const Blog = () => {
  return (
    <div>
      <h1>BLOG</h1>
    </div>
  );
};

export default Blog;
```

記事データを作成します。

`/data/no_1.md`から順に id は連番を記載してください。

```
---
id: 1
title: "1つ目の記事"
date: "2024-09-13"
image: ""
excerpt: ""
---
```

次に、必要なモジュールをインストールします。

```
npm install raw loader gray-matter react-markdown axios
```

続いて、`next.config.mjs`を修正していきます。

```
const nextConfig = {
    webpack: (config, { webpack }) => {
        config.module.rules.push({
            test: /\.md$/,
            use: "raw-loader",
        });
        return config;
    },
};

export default nextConfig;
```

上記は、`config.module.rules.push`で webpack のモジュールに新しいルールを追加しています。このルールは、拡張子が`.md`のファイルに対して`raw-loader`を使用するように指示しています。

`raw-loader`は、Markdown ファイルなどのテキストファイルの内容を文字列としてインポートするためのローダーです。これにより、Markdown ファイルの内容を直接 JavaScript で利用できるようになります。

Next.js プロジェクト内で Markdown ファイルを文字列としてインポートできるように Webpack を設定しています。

&emsp;

ここからはマークダウンデータをブログページに読み込む仕組みを作っていきます。以下のコードを `/api/blogList/route.ts` に記述します。

```
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const files = fs.readdirSync(path.join("data"));
}
```

上記は、非同期の GET 通信で処理されます。

- `path.join("data")`は、data ディレクトリ内のファイルを同期的に読み込みます。
- `fs.readdirSync`は、指定したディレクトリ内のファイルやディレクトリの名前を含む配列を返します。

data ディレクトリ内のすべてのファイルやサブディレクトリの名前を取得するために使用されています。
今後カテゴリーごとに分けたりする場合は、サブディレクトリの作成が必要になるかもしれません。

ファイル名がすべて取得できたところで、ファイルの中身も取得する必要があるため、追加のコードを記載していきます。

```
import { NextResponse } from "next/server";

import fs from "fs";
import matter from "gray-matter";
import path from "path";

export async function GET() {
  const files = fs.readdirSync(path.join("data"));
  const blogs = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const fileData = fs.readFileSync(path.join("data", filename), "utf-8");
    const { data } = matter(fileData);
    return {
      frontmatter: data,
      slug: slug,
    };
  });
  const orderedBlogs = blogs.sort((a, b) => {
    return b.frontmatter.id - a.frontmatter.id;
  });

  return new NextResponse(JSON.stringify({ body: { data: orderedBlogs, status: 200 } }), {
    status: 200,
  });
}
```

ややこしくなってきましたね。

上記について解説いたします。`blogs`と`orderedBlogs`に分けて解説します。まずは`blogs`からです。

1. `files`には data ディレクトリ内のファイル名が格納されています。
2. `files`を map 関数で上から順に`filename`という変数に格納していきます。
3. `slug`には拡張子付きのファイル名から拡張子の`.md`を除いた文字列が格納されています。
4. `readFileSync`はファイルの内容を読み取るメソッドです。`readFileSync`によって文字エンコードは`utf-8`で`fileData`変数に格納されます。
5. `matter(gray-matter)`によって、`fileData`を解析し、メタデータとコンテンツ部分に分け、`data`変数に格納されます。
6. 返却値として、Map として返しているので、`frontmatterキー`には`data`変数が格納されており、`slugキー`には`slug`変数が格納されています。
7. これが map 関数により繰り返し行われているため、blogs は配列となります。

続いて、`orderedBlogs`の解説を行います。

1. `blogs`を sort 関数を用いて順番の入れ替えを行います。
2. sort 関数は、『関数の戻り値が正の時　 → 　引数 1 を引数 2 の後ろに並べ替え。』/ 『関数の戻り値が負の時　 → 　引数 1 を引数 2 の前に並べ替え。』 / 『関数の戻り値が 0 の時　 → 　何もしない。』となっています。
3. 今回は id を比較しているため、降順に並び変えられます。
4. よって`orderedBlogs`には 7,6,5,4,3,2,1 の順で`blogs`の内容が書き換わっています。

最後に`NextResponse`で json 形式で`orderedBlogs`を`data`として返却し、ステータスを 200 で返しています。

&emsp;

今度は取得した記事データを`/blog/page.tsx`で受け取るため、コードを追記していきます。

```
"use client";

import { useState, useEffect } from "react";

interface BlogData {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    image: string;
  };
}

const Blog = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [totalBlogs, setTotalBlogs] = useState(0); // blogsの総件数
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ
  const blogsPerPage = 5; // 1ページに表示するブログ件数

  useEffect(() => {
    axios
      .get("/api/blogList")
      .then((res) => {
        const allBlogs = res.data.body.data;
        setTotalBlogs(allBlogs.length); // 全体の件数を保存
        setBlogs(allBlogs); // 全てのブログデータを保存
      })
      .catch((error) => {
        alert("処理に失敗しました。しばらくしてからお試しください。");
        console.error(error);
      });
  }, []);

  // 表示するブログをページごとにsliceする
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const { blogs } = await getAllBlogs();
  return (
    <div>
      <h1>ブログページ</h1>
        <div>
          {currentBlogs != undefined
            ? currentBlogs.map((blog, index) => (
                <div
                  key={index}
                  onClick={() => router.push(`/blog/${blog.slug}`)}
                >
                  <div>
                    <span className={styles.title}>{blog.frontmatter.title}</span>
                    <p>{blog.frontmatter.excerpt}</p>
                    <span>{blog.frontmatter.date}</span>
                    <Link href={`/blog/${blog.slug}`}>
                      詳細
                    </Link>
                  </div>
                  <Image
                    src={blog.frontmatter.image}
                    alt=""
                    width={600}
                    height={300}
                  />
                </div>
              ))
            : null}
          {/* ページネーションボタン */}
          <div>
            {Array.from({ length: Math.ceil(totalBlogs / blogsPerPage) }, (_, index) => (
              <span
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={index + 1 === currentPage ? styles.active : ""}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
    </div>
  );
};
```

上記の追加項目としては、

1. axios で`/api/blogList/route.ts`に接続してデータを取得
2. useState でブログデータとブログ件数を保持し、`blogsPerPage`に 1 ページに表示する件数を格納
3. `currentBlogs`に表示する記事を格納して、件数分表示する。

となります。

追加項目は Next.js の基本操作ですので、説明は省略します。

これでブログ一覧は取得できました。

&emsp;

続いては、ブログ内容の表示の実装を行います。

`/[slug]/page.tsx`にパラメータとして、`slug`（拡張子なしファイル名）が渡っているので、取得します。
そのパラメータを axios で POST 通信を行いますが、まずはブログ内容の取得から実装を行います。

`/blog/route.ts`に以下のコードを記述します。

```
import { NextRequest, NextResponse } from "next/server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const body = await req.json();

    const slug = body.params.slug;
    const filePath = path.join(process.cwd(), "blog", `${slug}.md`);
    const data = fs.readFileSync(filePath, "utf8");
    const singleDocument = matter(data);

    return new NextResponse(JSON.stringify({ body: { data: singleDocument, status: 200 } }), {
      status: 200,
    });
  } else {
    return new NextResponse(
      JSON.stringify({ body: { message: "POST通信ではありません。", status: 500 } }),
      { status: 500 }
    );
  }
}
```

記述内容に関しては、先ほど説明しているため省略しますが、これにてデータが取得できました。

&emsp;

続いて、`/blog/[slug]/page.tsx`の実装です。

```
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

interface BlogData {
  content: string;
  data: {
    title: string;
    date: string;
  };
}

const Detail = (props: { params: { slug: string } }) => {
  const [blogs, setBlogs] = useState<BlogData>();

  useEffect(() => {
    axios
      .post("/api/blog", props)
      .then((res) => {
        setBlogs(res.data.body.data);
      })
      .catch((error) => {
        alert("処理に失敗しました。しばらくしてからお試しください。");
        console.error(error);
      });
  }, [props]);

  return (
    <div>
      {blogs != undefined ? (
        <div>
          <div>
            <h1>{blogs.data.title}</h1>
            <p>投稿日 {blogs.data.date}</p>
          </div>
          <ReactMarkdown>{blogs.content}</ReactMarkdown>
        </div>
      ) : null}
    </div>
  );
};

export default Detail;
```

これによりブログ内容の取得ができました。

&emsp;

追加機能として挙げられるのは、

- コメント機能の実装
- md ファイルをリアルタイムで編集
- カテゴリー別に管理
  などですね。

時間があれば、追加実装をしていきます。

## 参考文献

- [next.js を使ってブログサイトを作成する方法](https://qiita.com/t38miwa/items/c20afd0575b090ca9957)
