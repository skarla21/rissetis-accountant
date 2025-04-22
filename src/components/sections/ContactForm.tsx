"use client";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from "react-toastify";
import { IoIosSend } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [emailValid, setEmailValid] = useState<boolean>(true);

  const contactFormText = useTranslations("contact.contact-form");

  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate email when the field changes
    if (name === "email" && value !== "") {
      const isValid = validateEmail(value);
      setEmailValid(isValid);
      if (!isValid) {
        toast.warn(contactFormText("invalid-email"), {
          toastId: "email-validation",
          autoClose: 3000,
        });
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (
      !recaptchaValue ||
      submitting ||
      formData.name === "" ||
      formData.email === "" ||
      formData.message === "" ||
      !emailValid
    ) {
      return;
    }

    setSubmitting(true);
    setErrors(null);
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${process.env.NEXT_PUBLIC_RISSETIS_EMAIL}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSucceeded(true);
        setFormData({ name: "", email: "", message: "" });
        setRecaptchaValue(null);
      } else {
        setErrors(data.message || contactFormText("message-error"));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrors(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Toast messages
  useEffect(() => {
    if (succeeded) {
      toast.success(contactFormText("message-success"), {
        onClose: () => setSucceeded(false),
      });
    }
  }, [contactFormText, succeeded]);

  useEffect(() => {
    if (errors) {
      toast.error(errors, {
        onClose: () => setErrors(null),
      });
    }
  }, [errors]);

  return (
    <section className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8">
        <h3 className="text-2xl font-bold mb-8 text-center">
          {contactFormText("message-title")}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2 text-left"
            >
              {contactFormText("message-name")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2 text-left"
            >
              {contactFormText("message-mail")}
            </label>
            <input
              id="email"
              name="email"
              type="text"
              required
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                !emailValid && formData.email
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg`}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2 text-left"
            >
              {contactFormText("message-text")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
              onChange={(value: string | null) => setRecaptchaValue(value)}
              hl={currentLocale}
            />
          </div>

          <button
            type="submit"
            disabled={
              !recaptchaValue ||
              submitting ||
              formData.name === "" ||
              formData.email === "" ||
              formData.message === "" ||
              !emailValid
            }
            className={`w-full py-3 px-6 text-center rounded-lg font-medium transition-colors flex items-center justify-center ${
              recaptchaValue &&
              !submitting &&
              formData.name !== "" &&
              formData.email !== "" &&
              formData.message !== "" &&
              emailValid
                ? "bg-rissetis text-white hover:bg-amber-600 cursor-pointer"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            <IoIosSend className="mr-2" />
            <span>
              {submitting
                ? contactFormText("message-sending")
                : contactFormText("message-send")}
            </span>
          </button>

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </form>
      </div>
    </section>
  );
}
