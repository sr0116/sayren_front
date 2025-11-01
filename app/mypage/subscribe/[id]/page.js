"use client";

import { useParams } from "next/navigation";
import SubscribeDetail from "@/components/subscribe/SubscribeDetail";

export default function SubscribeDetailPage() {
  const { id: subscribeId } = useParams();

  return <SubscribeDetail subscribeId={subscribeId} />;
}
