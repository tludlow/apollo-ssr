import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY } from "../lib/apollo";

export default function IndexPage() {
  const { data, loading, error } = useQuery(QUERY, { ssr: true });

  const [cached, setCached] = useState(true);
  useEffect(() => {
    if (loading) setCached(false);
  }, [loading]);

  if (loading) return "Loading...";

  return (
    <div>
      <p>
        This page's data was fetched on the{" "}
        <strong>{cached ? "Next.js server" : "client"}</strong>.
      </p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
