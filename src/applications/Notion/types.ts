export type NotionPage = "main" | "project" | "experience" | "education";

export interface NotionPageProps {
  changePage: (page: NotionPage) => void;
}
