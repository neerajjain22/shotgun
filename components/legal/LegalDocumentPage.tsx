import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import type { LegalDocumentContent } from "@/content/legal-documents";

import styles from "./LegalDocumentPage.module.css";

type LegalDocumentPageProps = {
  document: LegalDocumentContent;
};

function renderLineWithEmail(line: string): JSX.Element {
  const emailPrefix = "Email: ";

  if (!line.startsWith(emailPrefix)) {
    return <p className={styles.contactLine}>{line}</p>;
  }

  const email = line.slice(emailPrefix.length).trim();

  return (
    <p className={styles.contactLine}>
      {emailPrefix}
      <Link className={styles.emailLink} href={`mailto:${email}`}>
        {email}
      </Link>
    </p>
  );
}

export function LegalDocumentPage({ document }: LegalDocumentPageProps) {
  return (
    <main className={styles.wrapper}>
      <PageContainer>
        <article className={styles.document}>
          <header className={styles.header}>
            <h1 className={styles.title}>{document.title}</h1>
            <p className={styles.effectiveDate}>Effective Date: {document.effectiveDate}</p>
          </header>

          <section className={styles.intro}>
            {document.intro.map((paragraph) => (
              <p className={styles.paragraph} key={paragraph}>
                {paragraph}
              </p>
            ))}
          </section>

          {document.sections.map((section) => (
            <section className={styles.section} key={section.heading}>
              <h2 className={styles.sectionTitle}>{section.heading}</h2>

              {section.paragraphs?.map((paragraph) => (
                <p className={styles.paragraph} key={paragraph}>
                  {paragraph}
                </p>
              ))}

              {section.bullets?.length ? (
                <ul className={styles.bullets}>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}

              {section.subsections?.length ? (
                <div className={styles.subsectionGrid}>
                  {section.subsections.map((subsection) => (
                    <section className={styles.subsection} key={subsection.heading}>
                      <h3 className={styles.subsectionTitle}>{subsection.heading}</h3>

                      {subsection.paragraphs?.map((paragraph) => (
                        <p className={styles.paragraph} key={paragraph}>
                          {paragraph}
                        </p>
                      ))}

                      {subsection.bullets?.length ? (
                        <ul className={styles.bullets}>
                          {subsection.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </div>
              ) : null}
            </section>
          ))}

          {document.contact ? (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{document.contact.heading}</h2>
              <div className={styles.contactBlock}>
                {document.contact.lines.map((line) => (
                  <div key={line}>{renderLineWithEmail(line)}</div>
                ))}
              </div>
            </section>
          ) : null}

          {document.closingNote ? (
            <section className={styles.closingNote}>
              <p className={styles.paragraph}>{document.closingNote}</p>
            </section>
          ) : null}
        </article>
      </PageContainer>
    </main>
  );
}
