import ReviewDetailClient from "./ReviewDetailClient";

export default function Page({ params }) {
  return <ReviewDetailClient id={params.id} />;
}
