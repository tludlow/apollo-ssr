import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import MessageList from "../components/MessageList";

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
  const { data, loading } = useQuery(QUERY, {
    variables: {
      getUserId: "0438e243-2a4f-4561-a5e2-9ed1f3f5617f",
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
      <p>{t("welcome")}</p>
      <p>
        <span>This pages data was fetched on the: </span>
        <strong>{cached ? "Next.js server" : "client"}</strong>.
      </p>
      <p>{JSON.stringify(data)}</p>
      <MessageList />
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
