"use client";

import { useParams } from "next/navigation";
import SubscribeRoundList from "@/components/subscribe/SubscribeRoundList";

export default function SubscribeRoundListPage() {
  const { id: subscribeId } = useParams();

  return <SubscribeRoundList subscribeId={subscribeId} />;
}
