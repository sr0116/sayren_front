import ReviewEditClient from "./ReviewEditClient";

export default function Page({ params }) {
  return <ReviewEditClient id={params.id} />;
}
