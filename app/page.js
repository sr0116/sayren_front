import Image from "next/image";
import Header from "@/app/components/common/Header";
import Footer from "@/app/components/common/Footer";
import HeroSection from "@/app/components/index/HeroSection";
import CategorySection from "@/app/components/index/CategorySection";
import ProductHighlight from "@/app/components/index/ProductHighlight";
import PlanOverview from "@/app/components/index/PlanOverview";
import PromotionBanner from "@/app/components/index/PromtotionBanner";
import ReviewSection from "@/app/components/index/ReviewSection";
import QnASection from "@/app/components/index/QnASection";
import RentalHighlight from "@/app/components/index/RentalHighlight";
import MdPick from "@/app/components/index/MdPick";
import IndexContainer from "@/app/components/index/IndexContainer";

export default function Home() {
  return (
      <main className="max-w-7xl mx-auto px-4">
        <IndexContainer />
      </main>
  );
}
