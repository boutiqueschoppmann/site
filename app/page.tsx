import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Reassurance from "@/components/home/Reassurance";
import Collections from "@/components/home/Collections";
import Storytelling from "@/components/home/Storytelling";
import Bestsellers from "@/components/home/Bestsellers";
import LocalFab from "@/components/home/LocalFab";
import Testimonials from "@/components/home/Testimonials";
import HomeFAQ from "@/components/home/HomeFAQ";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: { absolute: "Schoppmann | Accueil" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reassurance />
      <Collections />
      <Storytelling />
      <Bestsellers />
      <LocalFab />
      <Testimonials />
      <HomeFAQ />
      <FinalCTA />
    </>
  );
}
