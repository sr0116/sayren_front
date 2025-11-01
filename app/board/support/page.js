import FaqPage from "@/app/board/support/faq/page";
import {redirect} from "next/navigation";

export default function SupportHome() {
  redirect("/board/support/faq");
}