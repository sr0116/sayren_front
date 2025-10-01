"use client";

import { useParams } from "next/navigation";
import SubscribeRoundDetail from "@/components/subscribe/SubscribeRoundDetail";

export default function SubscribeRoundDetailPage() {
  const { id: subscribeId, roundNo } = useParams();

  return <SubscribeRoundDetail subscribeId={subscribeId} roundNo={roundNo} />;
}
