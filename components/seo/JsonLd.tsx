type JsonLdProps = {
  id: string;
  data: string;
};

export function JsonLd({ id, data }: JsonLdProps) {
  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}
