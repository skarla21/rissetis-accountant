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
import { getArticleMetadata } from "@/lib/metadata";
import { ArticleMetadata, TaxArticle } from "@/types/articles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPage() {
  const t = useTranslations();
  const router = useRouter();
  const [articles, setArticles] = useState<(TaxArticle & ArticleMetadata)[]>(
    []
  );
  const [newUrl, setNewUrl] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const urls = await getAllArticleUrls();
      const metadataPromises = urls.map((url) =>
        getArticleMetadata(url, t("articles.altTitle"))
      );
      const metadataResults = await Promise.all(metadataPromises);

      const articlesWithMetadata = urls.map((url, index) => ({
        url,
        ...metadataResults[index],
      }));

      // Sort articles by date (latest first)
      const sortedArticles = articlesWithMetadata.sort((a, b) => {
        const [aMonth, aDay, aYear] = a.date.split(".").map(Number);
        const [bMonth, bDay, bYear] = b.date.split(".").map(Number);
        const dateA = new Date(aYear, aMonth - 1, aDay);
        const dateB = new Date(bYear, bMonth - 1, bDay);
        return dateB.getTime() - dateA.getTime();
      });

      setArticles(sortedArticles);
    } catch (error) {
      console.error("Error loading articles:", error);
      toast.error(t("admin.messages.loadFailed"));
    }
  };

  const handleAddUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.error(t("admin.passwordRequired"));
      return;
    }
    if (!newUrl) {
      toast.error(t("admin.urlRequired"));
      return;
    }

    setIsLoading(true);
    const result = await addArticleUrl(
      newUrl,
      password,
      t("admin.messages.invalidPassword"),
      t("admin.messages.urlAdded"),
      t("admin.messages.urlAddFailed")
    );
    if (result.success) {
      toast.success(result.message);
      setNewUrl("");
      loadArticles();
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  const handleRemoveUrl = async (url: string) => {
    if (!password) {
      toast.error(t("admin.passwordRequired"));
      return;
    }

    setIsLoading(true);
    const result = await removeArticleUrl(
      url,
      password,
      t("admin.messages.invalidPassword"),
      t("admin.messages.urlRemoved"),
      t("admin.messages.urlRemoveFailed")
    );
    if (result.success) {
      toast.success(result.message);
      loadArticles();
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
        <h1 className="text-3xl font-bold">{t("admin.title")}</h1>
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          <IoHome className="w-5 h-5" />
          <span>{t("admin.returnButton")}</span>
        </button>
      </div>

      {/* Password Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {t("admin.passwordSection.title")}
        </h2>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("admin.passwordSection.placeholder")}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      {/* Add URL Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {t("admin.addUrl.title")}
        </h2>
        <form onSubmit={handleAddUrl} className="space-y-4">
          <div>
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder={t("admin.addUrl.urlPlaceholder")}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {t("admin.addUrl.button")}
          </button>
        </form>
      </div>

      {/* URL List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {t("admin.urlList.title")}
        </h2>
        <div className="space-y-4">
          {articles.map((article, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded"
            >
              <div className="flex-1 mr-4 space-y-2">
                <div className="flex items-center">
                  <span className="font-semibold w-32 mr-4">
                    {t("admin.urlList.url")}:
                  </span>
                  <span className="truncate">
                    {article.url.length > 80
                      ? article.url.substring(0, 80) + "..."
                      : article.url}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-32 mr-4">
                    {t("admin.urlList.articleTitle")}:
                  </span>
                  <span className="truncate">
                    {article.title.length > 80
                      ? article.title.substring(0, 80) + "..."
                      : article.title}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-32 mr-4">
                    {t("admin.urlList.date")}:
                  </span>
                  <span>{article.date}</span>
                </div>
              </div>
              <button
                onClick={() => handleRemoveUrl(article.url)}
                disabled={isLoading}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                {t("admin.urlList.remove")}
              </button>
            </div>
          ))}
          {articles.length === 0 && (
            <p className="text-gray-500">{t("admin.urlList.noUrls")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
