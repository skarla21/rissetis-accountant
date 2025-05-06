"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { IoHome } from "react-icons/io5";
import {
  getAllArticleUrls,
  addArticleUrl,
  removeArticleUrl,
} from "@/server/articleActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPage() {
  const t = useTranslations("admin");
  const router = useRouter();
  const [urls, setUrls] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = async () => {
    const fetchedUrls = await getAllArticleUrls();
    setUrls(fetchedUrls);
  };

  const handleAddUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.error(t("passwordRequired"));
      return;
    }
    if (!newUrl) {
      toast.error(t("urlRequired"));
      return;
    }

    setIsLoading(true);
    const result = await addArticleUrl(
      newUrl,
      password,
      t("messages.invalidPassword"),
      t("messages.urlAdded"),
      t("messages.urlAddFailed")
    );
    if (result.success) {
      toast.success(result.message);
      setNewUrl("");
      loadUrls();
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  const handleRemoveUrl = async (url: string) => {
    if (!password) {
      toast.error(t("passwordRequired"));
      return;
    }

    setIsLoading(true);
    const result = await removeArticleUrl(
      url,
      password,
      t("messages.invalidPassword"),
      t("messages.urlRemoved"),
      t("messages.urlRemoveFailed")
    );
    if (result.success) {
      toast.success(result.message);
      loadUrls();
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          <IoHome className="w-5 h-5" />
          <span>{t("returnButton")}</span>
        </button>
      </div>

      {/* Password Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {t("passwordSection.title")}
        </h2>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("passwordSection.placeholder")}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      {/* Add URL Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">{t("addUrl.title")}</h2>
        <form onSubmit={handleAddUrl} className="space-y-4">
          <div>
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder={t("addUrl.urlPlaceholder")}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {t("addUrl.button")}
          </button>
        </form>
      </div>

      {/* URL List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{t("urlList.title")}</h2>
        <div className="space-y-4">
          {urls.map((url, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded"
            >
              <span className="truncate flex-1 mr-4">{url}</span>
              <button
                onClick={() => handleRemoveUrl(url)}
                disabled={isLoading}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                {t("urlList.remove")}
              </button>
            </div>
          ))}
          {urls.length === 0 && (
            <p className="text-gray-500">{t("urlList.noUrls")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
