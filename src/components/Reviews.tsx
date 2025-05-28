import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useTranslations } from "next-intl";

interface Review {
  name: string;
  rating: number;
  text: string;
  avatar?: string;
}

// To update reviews: Copy the review from Google Reviews and add it to this array
const reviews: Review[] = [
  {
    name: "Vassiliki Zaglara",
    rating: 5,
    text: "Ο Γιώργος δεν είναι απλά ένας λογιστής – είναι ο άνθρωπος που θα σταθεί δίπλα σου με συνέπεια και αφοσίωση, σαν να είναι συνεργάτης και φίλος ταυτόχρονα. Με συνδυ...",
  },
  {
    name: "Michalis Hlias",
    rating: 5,
    text: "Από τους ανθρώπους που θα άφηνα σίγουρα την διαχείριση οικονομικών μου στα χέρια του . έμπιστος και ξέρει τη δουλειά του καλά .. ότι ώρα και να πάρεις τηλ είναι εκεί να σε βοηθήσει...",
  },
  {
    name: "Alexia Sfak",
    rating: 5,
    text: "Σωστός επαγγελματίας, και εξαιρετικός άνθρωπος. Φροντίζει να είναι πάντα ενημερωμένος και έχει πολύ μεγάλη εμπειρία στο αντικείμενο του. Αξίζει να τον εμπιστευτείτε.",
  },
  {
    name: "ERMIONI SIDIROPOULOU",
    rating: 5,
    text: "Άμεση εξυπηρέτηση, αναλυτικός, διεκπεραιωτικος, αποτελεσματικός. Ως οικογένεια,τον προτείνουμε,μαζί με φίλους μας, από συνεργα...",
  },
];

// Google Reviews URL
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=f6e32c4e753b1523&rlz=1C1CHBF_enGR856GR856&sxsrf=AE3TifOKnlb01xzSRHgo1uX3h5bz3WRdTA:1748438301269&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-7C7DNFgxl7DVcqa4zl9mrXPMO9mar-dlVxR4VGwodctb1sAbZGIqdgFL2dsHpV0WERxC6276pCTNtv_GROzRHbtg6JKpvIcgAPgelBJRa0D5vKPRNZ701vpdn77oEBMmiQLcjhNTf3K9fgYOvF3d0RACN6&q=%CE%A1%CE%B9%CF%83%CF%83%CE%AD%CF%84%CE%B7%CF%82+%CE%94%CE%B7%CE%BC.%CE%93%CE%B5%CF%8E%CF%81%CE%B3%CE%B9%CE%BF%CF%82+%CE%9A%CF%81%CE%B9%CF%84%CE%B9%CE%BA%CE%AD%CF%82&sa=X&ved=2ahUKEwirne-eoMaNAxXSQPEDHVwmOEcQ0bkNegQIJxAD&biw=1920&bih=959&dpr=1";

const ReviewCard = ({ review, index }: { review: Review; index: number }) => {
  return (
    <motion.a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer block"
    >
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image
            src={"/assets/imgs/default-avatar.png"}
            alt={review.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{review.name}</h3>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 mb-2">{review.text}</p>
    </motion.a>
  );
};

export default function Reviews() {
  const t = useTranslations("profile.reviews");

  return (
    <div className="py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-8 text-gray-900 flex items-center justify-center gap-2"
      >
        {t("title")}
        <FcGoogle />
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} index={index} />
        ))}
      </div>
    </div>
  );
}
