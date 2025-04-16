"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { FaUser, FaBriefcase, FaNewspaper, FaEnvelope } from "react-icons/fa";

export default function Home() {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => scrollToSection("profile")}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
            >
              <FaUser />
              <span>{t("navigation.profile")}</span>
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
            >
              <FaBriefcase />
              <span>{t("navigation.services")}</span>
            </button>
            <button
              onClick={() => scrollToSection("articles")}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
            >
              <FaNewspaper />
              <span>{t("navigation.articles")}</span>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
            >
              <FaEnvelope />
              <span>{t("navigation.contact")}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-20">
        {/* Profile Section */}
        <section
          id="profile"
          className="min-h-screen flex items-center justify-center bg-gray-50"
        >
          <div className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold mb-4">{t("profile.title")}</h1>
              <h2 className="text-2xl text-gray-600 mb-6">
                {t("profile.subtitle")}
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                {t("profile.description")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="min-h-screen flex items-center justify-center bg-white"
        >
          <div className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-8">{t("services.title")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Object.entries(t.raw("services.items")).map(([key, value]) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-gray-50 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold mb-4">{value}</h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Articles Section */}
        <section
          id="articles"
          className="min-h-screen flex items-center justify-center bg-gray-50"
        >
          <div className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-8">{t("articles.title")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(t.raw("articles.items")).map(([key, value]) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-white rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold mb-4">{value}</h3>
                    <button className="text-blue-500 hover:text-blue-700">
                      {t("articles.readMore")}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center bg-white"
        >
          <div className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">
                {t("contact.title")}
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {t("contact.form.send")}
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
