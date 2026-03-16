type CardPlaceholderProps = {
  title: string;
};

export function CardPlaceholder({ title }: CardPlaceholderProps) {
  return <article aria-label={title} />;
}
