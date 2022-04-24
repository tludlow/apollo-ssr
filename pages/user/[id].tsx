import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const QUERY = gql`
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      id
      lastName
      email
      createdAt
      updatedAt
    }
  }
`;

export default function IndexPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  console.log(router);
  const { data, loading } = useQuery(QUERY, {
    variables: {
      getUserId: router.query.id,
    },
    ssr: true,
  });

  const [cached, setCached] = useState(true);
  useEffect(() => {
    if (loading) setCached(false);
  }, [loading]);

  if (loading) return "Loading...";

  return (
    <div>
      <p>{t("router")}</p>
      <p>
        <span>This pages data was fetched on the: </span>
        <strong>{cached ? "Next.js server" : "client"}</strong>.
      </p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", ["common"])),
    },
  };
};
