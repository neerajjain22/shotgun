import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { privacyDocument } from "@/content/legal-documents";
import { createPageMetadata } from "@/seo/metadata";

export const metadata = createPageMetadata({
  title: privacyDocument.metadataTitle,
  description: privacyDocument.metadataDescription,
  path: privacyDocument.path
});

export default function PrivacyPage() {
  return <LegalDocumentPage document={privacyDocument} />;
}
