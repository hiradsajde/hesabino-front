import { notFound } from "next/navigation";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { blog } from "@/lib/source";
import ShareButton from "./_components/share";
import Image from "@/components/ui/image";
import Header from "../../components/Header";
import Information from "./_components/information";
import Article from "./_components/article";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();
  const Mdx = page.data.body;

  return (
    <>
      <div className="container flex flex-col gap-4 rounded-xl py-12 md:px-8">
        <Header
          title={page.data.title}
          className="!mb-0"
          description={page.data.description}
          breadcrumbs={[
            {
              name: "حسابینو",
              url: "/",
            },
            {
              name: "وبلاگ",
              url: "/blog",
            },
            {
              name: page.data.title,
              active: true,
            },
          ]}
          isMain={false}
        />
      </div>
      <div className="relative container grid grid-cols-1 md:grid-cols-4 gap-12 md:px-8">
        <Information author={page.data.author} date={page.data.date} />

        <Article
          title={page.data.title}
          image={page.data.image}
          toc={page.data.toc}
          mdx={<Mdx components={defaultMdxComponents} />}
        />
      </div>
    </>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}
