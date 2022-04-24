import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "next-i18next";

const QUERY = gql`
  query Messages {
    messages {
      id
      title
      body
    }
  }
`;

export default function MessageList() {
  const { t } = useTranslation("common");
  const { data } = useQuery(QUERY, {
    ssr: true,
  });
  return (
    <p>
      {t("nested")}: {JSON.stringify(data)}
    </p>
  );
}
