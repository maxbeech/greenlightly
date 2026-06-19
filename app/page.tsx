import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { softwareAppLd, faqLd } from "@/lib/seo";
import { Hero, HowItWorks } from "@/components/home";
import { TrustStrip, DirectoryPreview, Positioning, FrameworksStrip, FaqAndCta, HOME_FAQS } from "@/components/home-extra";

export default function Home() {
  return (
    <>
      <JsonLd data={softwareAppLd(SITE.name, SITE.description, "/")} />
      <JsonLd data={faqLd(HOME_FAQS)} />
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <DirectoryPreview />
      <Positioning />
      <FrameworksStrip />
      <FaqAndCta />
    </>
  );
}
