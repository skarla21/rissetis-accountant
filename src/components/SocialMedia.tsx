import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function SocialMedia() {
  return (
    <>
      <a
        href="https://www.facebook.com/share/1Ln9RtP2uG/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-600 transition-colors"
      >
        <FaFacebook size={24} />
      </a>
      <a
        href="https://www.instagram.com/george_rissetis/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 transition-colors hover:text-[#E1306C]"
      >
        <FaInstagram size={24} />
      </a>
    </>
  );
}
