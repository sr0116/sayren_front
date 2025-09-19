import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/index/HeroSection";
import CategorySection from "@/components/index/CategorySection";
import ProductHighlight from "@/components/index/ProductHighlight";
import PlanOverview from "@/components/index/PlanOverview";
import PromotionBanner from "@/components/index/PromtotionBanner";
import ReviewSection from "@/components/index/ReviewSection";
import QnASection from "@/components/index/QnASection";
import RentalHighlight from "@/components/index/RentalHighlight";
import MdPick from "@/components/index/MdPick";
import IndexContainer from "@/components/index/IndexContainer";

export default function Home() {
  return (
      <main className="max-w-7xl mx-auto px-4">
        <IndexContainer />
      </main>
  );
}
