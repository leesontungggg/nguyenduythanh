"use client";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { X, Calendar } from "lucide-react";

export default function News() {
  const [news, setNews] = useState<News[]>([]);
  const [view, setView] = useState<"list" | "preview">("list");
  const [currentNews, setcurrentNews] = useState<News | null>(null);

  const fetchWorks = async () => {
    try {
      const response = await fetch("/api/get-news");
      const data = await response.json();
      if (data.success) {
        setNews(data.data);
      } else {
        console.error("Failed to fetch show times");
      }
    } catch (error) {
      console.error("Error fetching show times:", error);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  const renderMarkdown = (content: string) => {
    // This is a simple markdown renderer for demonstration
    // In a real app, you would use a library like react-markdown
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: content
            .replace(
              /# (.*)/g,
              '<h1 class="text-3xl font-bold mt-6 mb-4">$1</h1>'
            )
            .replace(
              /## (.*)/g,
              '<h2 class="text-2xl font-bold mt-5 mb-3">$1</h2>'
            )
            .replace(/\*\*(.*)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*)\*/g, "<em>$1</em>")
            .replace(
              /```([\s\S]*?)```/g,
              '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-4"><code>$1</code></pre>'
            )
            .replace(/- (.*)/g, '<li class="ml-6">$1</li>')
            .split("\n\n")
            .join('<p class="my-4"></p>'),
        }}
      />
    );
  };
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex-1">
        <section className="relative h-screen bg-[url('/hero.jpg')] bg-fixed bg-cover bg-[position:75%_0%] md:bg-center flex items-center justify-center text-white uppercase md:text-5xl text-3xl font-bold">
          News
        </section>
        {view === "list" && (
          <section className="py-20 px-4">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-12 uppercase tracking-wider text-center">
                News
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((work) => (
                  <motion.div
                    key={work.id}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                    onClick={() => {
                      setcurrentNews(work);
                      setView("preview");
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={work.thumbnail1}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {work.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {work.tags.length > 3 && (
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                            +{work.tags.length - 3} more
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold mb-2 line-clamp-2">
                        {work.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                        {work.content.replace(/[#*`-]/g, "").substring(0, 120)}
                        ...
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <Calendar size={14} className="mr-1" />
                        <span>
                          {new Date(work.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {!!currentNews && view === "preview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Preview</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setView("list");
                      setcurrentNews(null);
                    }}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                  >
                    <X size={18} className="mr-1" />
                    Close
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {currentNews.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl font-bold mb-4">{currentNews.title}</h1>

              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                <Calendar size={16} className="mr-1" />
                <span>
                  {new Date(currentNews.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {(currentNews.thumbnail1 || currentNews.thumbnail2) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {currentNews.thumbnail1 && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={currentNews.thumbnail1}
                        alt="Thumbnail 1"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/800x400?text=Invalid+Image+URL";
                        }}
                      />
                    </div>
                  )}
                  {currentNews.thumbnail2 && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={currentNews.thumbnail2}
                        alt="Thumbnail 2"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/800x400?text=Invalid+Image+URL";
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="prose dark:prose-invert max-w-none">
                {renderMarkdown(currentNews.content)}
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

interface News {
  id: string;
  title: string;
  thumbnail1: string;
  thumbnail2: string;
  content: string;
  createdAt: string;
  tags: string[];
}
