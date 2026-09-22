import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { TrendingProducts } from "@/components/home/trending-products";
import { NewArrivals } from "@/components/home/new-arrivals";
import { BestSellers } from "@/components/home/best-sellers";
import { EditorialFeature } from "@/components/home/editorial-feature";
import { BrandStory } from "@/components/home/brand-story";
import { FashionLookbook } from "@/components/home/fashion-lookbook";
import { CustomerReviews } from "@/components/home/customer-reviews";
import { Newsletter } from "@/components/home/newsletter";

export const metadata: Metadata = {
  title: "Considered Fashion for People in Motion",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <TrendingProducts />
      <NewArrivals />
      <EditorialFeature />
      <BestSellers />
      <BrandStory />
      <FashionLookbook />
      <CustomerReviews />
      <Newsletter />
    </>
  );
}
