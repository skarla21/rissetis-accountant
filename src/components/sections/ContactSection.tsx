import { useTranslations } from "next-intl";
import Iframe from "react-iframe";
import { CiMail, CiMapPin, CiPhone } from "react-icons/ci";
import ContactForm from "@/components/sections/ContactForm";
import SectionWrapper from "@/components/SectionWrapper";

export default function ContactSection() {
  const contactText = useTranslations("contact");

  return (
    <SectionWrapper id="contact" bgColor="white">
      <div className="max-2-xl xl:max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl font-bold text-center">
          {contactText("title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* second col about google maps embed */}
          <div className="h-96 bg-gray-100 rounded-xl overflow-hidden w-full md:order-2">
            <Iframe
              className="w-full h-full border-0"
              loading="lazy"
              url={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJhbmDj2e9oRQRBcSBWjgUQVY&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}&zoom=15`}
            ></Iframe>
          </div>
          {/* first col about contact and hours */}
          <div className="ml-2 space-y-4 md:order-1 text-left">
            <h3 className="text-xl font-semibold text-left">
              {contactText("contact-title")}
            </h3>
            <p className="flex items-center space-x-2">
              <CiMapPin />
              <span className="mr-2 text-rissetis">
                <a
                  href="https://maps.app.goo.gl/TzY8e8555q7EZHLD9"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="hover:underline"
                >
                  {contactText("address")}
                </a>
              </span>
            </p>
            <p className="flex items-center space-x-2">
              <CiPhone />
              <span className="text-rissetis">
                <a href="tel:+306982558553" className="hover:underline">
                  6982558553
                </a>
              </span>
            </p>
            <p className="flex items-center space-x-2">
              <CiMail />
              <span className="text-rissetis">
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_RISSETIS_EMAIL}`}
                  className="hover:underline"
                >
                  {process.env.NEXT_PUBLIC_RISSETIS_EMAIL}
                </a>
              </span>
            </p>
            <h3 className="text-xl font-semibold mt-9 text-left">
              {contactText("hours-title")}
            </h3>
            <div className="space-y-2 text-gray-600">
              <div className="grid grid-cols-[max-content_1fr] gap-x-4 text-left">
                <span>{contactText("monday")}</span>
                <span>
                  9:00 {contactText("am")} - 5:00 {contactText("pm")}
                </span>
                <span>{contactText("tuesday")}</span>
                <span>
                  9:00 {contactText("am")} - 5:00 {contactText("pm")}
                </span>
                <span>{contactText("wednesday")}</span>
                <span>
                  9:00 {contactText("am")} - 5:00 {contactText("pm")}
                </span>
                <span>{contactText("thursday")}</span>
                <span>
                  9:00 {contactText("am")} - 5:00 {contactText("pm")}
                </span>
                <span>{contactText("friday")}</span>
                <span>
                  9:00 {contactText("am")} - 5:00 {contactText("pm")}
                </span>
                <span>{contactText("saturday")}</span>
                <span>{contactText("closed")}</span>
                <span>{contactText("sunday")}</span>
                <span>{contactText("closed")}</span>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </SectionWrapper>
  );
}
