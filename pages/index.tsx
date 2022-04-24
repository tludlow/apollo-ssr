import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY } from "../lib/apollo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";

export default function IndexPage() {
  const { t } = useTranslation("common");
  const { data, loading, error } = useQuery(QUERY, { ssr: true });

  const [cached, setCached] = useState(true);
  useEffect(() => {
    if (loading) setCached(false);
  }, [loading]);

  if (loading) return "Loading...";

  return (
    <div>
      <p>{t("welcome")}</p>
      <p>
        This pages data was fetched on the{" "}
        <strong>{cached ? "Next.js server" : "client"}</strong>.
      </p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx.locale);
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", ["common"])),
    },
  };
};
