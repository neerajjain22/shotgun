import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { termsDocument } from "@/content/legal-documents";
import { createPageMetadata } from "@/seo/metadata";

export const metadata = createPageMetadata({
  title: termsDocument.metadataTitle,
  description: termsDocument.metadataDescription,
  path: termsDocument.path
});

export default function TermsPage() {
  return <LegalDocumentPage document={termsDocument} />;
}
