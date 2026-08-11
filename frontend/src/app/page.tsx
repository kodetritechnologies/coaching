import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { Courses } from "@/components/site/Courses";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Results } from "@/components/site/Results";
import { Faculty } from "@/components/site/Faculty";
import { Testimonials } from "@/components/site/Testimonials";
import { Scholarship } from "@/components/site/Scholarship";
import { TestSeriesAndResources } from "@/components/site/TestSeriesAndResources";
import { Gallery } from "@/components/site/Gallery";
import { AdmissionProcess } from "@/components/site/AdmissionProcess";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";

export default function Index() {
  return (
    <div className="bg-background">
      <Hero />
      <TrustBar />
      <Courses />
      <WhyChooseUs />
      <Results />
      <Faculty />
      <Testimonials />
      <Scholarship />
      <TestSeriesAndResources />
      <Gallery />
      <AdmissionProcess />
      <Faq />
      <Contact />
    </div>
  );
}
