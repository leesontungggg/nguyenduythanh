/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Image,
  Save,
  X,
  Eye,
  ArrowLeft,
  Calendar,
  FileText,
} from "lucide-react";

export default function BlogDashboard() {
  const [blogs, setBlogs] = useState<Work[]>([]);
  const [view, setView] = useState<"list" | "create" | "edit" | "preview">(
    "list"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentWork, setcurrentWork] = useState<Work>({
    id: "",
    title: "",
    thumbnail1: "",
    thumbnail2: "",
    content: "",
    createdAt: new Date().toISOString(),
    tags: [],
  });
  const [newTag, setNewTag] = useState("");

  const fetchWorks = async () => {
    try {
      const response = await fetch("/api/get-works");
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      } else {
        console.error("Failed to fetch show times");
      }
    } catch (error) {
      console.error("Error fetching show times:", error);
    }
  };

  const createWork = async (workData: any) => {
    try {
      const response = await fetch("/api/create-work", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Work created successfully!");
        fetchWorks();
        // setBlogs([...blogs, currentWork]);
        setcurrentWork({
          id: "",
          title: "",
          thumbnail1: "",
          thumbnail2: "",
          content: "",
          createdAt: new Date().toISOString(),
          tags: [],
        });
        setView("list");
      } else {
        toast.error("Failed to create work");
      }
    } catch (error) {
      console.error("Error creating work:", error);
      toast.error("An error occurred while creating the work");
    }
  };

  // Create a new work
  const handleCreateWork = () => {
    const newWork: Work = {
      ...currentWork,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    // setBlogs([newBlog, ...blogs]);

    createWork(newWork);
    setView("list");
    toast.success("Blog created successfully!");
  };

  const updateWork = async (workData: any) => {
    try {
      const response = await fetch("/api/update-work", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Work updated successfully!");
        fetchWorks();
        // setBlogs((prevBlogs) =>
        //   prevBlogs.map((blog) =>
        //     blog.id === currentWork.id ? currentWork : blog
        //   )
        // );
        setcurrentWork({
          id: "",
          title: "",
          thumbnail1: "",
          thumbnail2: "",
          content: "",
          createdAt: new Date().toISOString(),
          tags: [],
        });
        setView("list");
      } else {
        toast.error("Failed to update work");
      }
    } catch (error) {
      console.error("Error updating work:", error);
      toast.error("An error occurred while updating the work");
    }
  };

  // Update an existing work
  const handleUpdateWork = () => {
    updateWork(currentWork);

    // setBlogs(updatedWorks);

    setView("list");
    toast.success("Blog updated successfully!");
  };

  const deleteWork = async (id: string) => {
    try {
      const response = await fetch("/api/delete-work", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Work deleted successfully!");
        // setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        fetchWorks();
      } else {
        toast.error("Failed to delete work");
      }
    } catch (error) {
      console.error("Error deleting work:", error);
      toast.error("An error occurred while deleting the work");
    }
  };

  // Delete a work
  const handleDeleteWork = (id: string) => {
    // const updatedWorks = blogs.filter((blog) => blog.id !== id);

    deleteWork(id);

    // setBlogs(updatedWorks);
    toast.success("Blog deleted successfully!");
  };

  // Edit a work
  const handleEditBlog = (work: Work) => {
    setcurrentWork(work);
    setView("edit");
  };

  // Preview a work
  const handlePreviewBlog = () => {
    setView("preview");
  };

  // Add a tag
  const handleAddTag = () => {
    if (newTag.trim() && !currentWork.tags.includes(newTag.trim())) {
      setcurrentWork({
        ...currentWork,
        tags: [...currentWork.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  // Remove a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setcurrentWork({
      ...currentWork,
      tags: currentWork.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  // Filter blogs based on search query
  const filteredWorks = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag: any) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Render markdown content
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

  useEffect(() => {
    fetchWorks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold"
          >
            Works Dashboard
          </motion.h1>

          {view === "list" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setcurrentWork({
                  id: "",
                  title: "",
                  thumbnail1: "",
                  thumbnail2: "",
                  content: "",
                  createdAt: new Date().toISOString(),
                  tags: [],
                });
                setView("create");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
            >
              <Plus size={18} />
              <span>New Work</span>
            </motion.button>
          )}

          {(view === "create" || view === "edit" || view === "preview") && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView("list")}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-md flex items-center space-x-2"
            >
              <ArrowLeft size={18} />
              <span>Back to List</span>
            </motion.button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* List View */}
        {view === "list" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Search Bar */}
            <div className="mb-6 relative">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search works by title, content, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Blog List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorks.map((blog) => (
                <motion.div
                  key={blog.id}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.thumbnail1}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 3 && (
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                          +{blog.tags.length - 3} more
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold mb-2 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {blog.content.replace(/[#*`-]/g, "").substring(0, 120)}...
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <Calendar size={14} className="mr-1" />
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleEditBlog(blog)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                      >
                        <Edit size={16} className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteWork(blog.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredWorks.length === 0 && (
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                  No blogs found
                </h3>
                <p className="text-gray-500 dark:text-gray-500 mt-2">
                  {searchQuery
                    ? "Try a different search term"
                    : "Create your first blog post to get started"}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Create/Edit View */}
        {(view === "create" || view === "edit") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h2 className="text-2xl font-bold mb-6">
              {view === "create" ? "Create New Work" : "Edit Work"}
            </h2>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={currentWork.title}
                  onChange={(e) =>
                    setcurrentWork({ ...currentWork, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter blog title"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="thumbnail1"
                    className="block text-sm font-medium mb-2"
                  >
                    Thumbnail 1 URL
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="thumbnail1"
                      value={currentWork.thumbnail1}
                      onChange={(e) =>
                        setcurrentWork({
                          ...currentWork,
                          thumbnail1: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter image URL"
                    />
                    <div className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 border-l-0 rounded-r-md p-2 flex items-center">
                      <Image size={20} className="text-gray-500" />
                    </div>
                  </div>
                  {currentWork.thumbnail1 && (
                    <div className="mt-2 relative h-32 rounded-md overflow-hidden">
                      <img
                        src={currentWork.thumbnail1}
                        alt="Thumbnail 1 preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="thumbnail2"
                    className="block text-sm font-medium mb-2"
                  >
                    Thumbnail 2 URL
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="thumbnail2"
                      value={currentWork.thumbnail2}
                      onChange={(e) =>
                        setcurrentWork({
                          ...currentWork,
                          thumbnail2: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter image URL"
                    />
                    <div className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 border-l-0 rounded-r-md p-2 flex items-center">
                      <Image size={20} className="text-gray-500" />
                    </div>
                  </div>
                  {currentWork.thumbnail2 && (
                    <div className="mt-2 relative h-32 rounded-md overflow-hidden">
                      <img
                        src={currentWork.thumbnail2}
                        alt="Thumbnail 2 preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {currentWork.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-blue-800 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a tag"
                  />
                  <button
                    onClick={handleAddTag}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium"
                  >
                    Content (Markdown)
                  </label>
                  <button
                    onClick={handlePreviewBlog}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center"
                  >
                    <Eye size={16} className="mr-1" />
                    Preview
                  </button>
                </div>
                <textarea
                  id="content"
                  value={currentWork.content}
                  onChange={(e) =>
                    setcurrentWork({ ...currentWork, content: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono h-96"
                  placeholder="Write your blog content in Markdown format..."
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  onClick={() => setView("list")}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={
                    view === "create" ? handleCreateWork : handleUpdateWork
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  {view === "create" ? "Create Blog" : "Update Blog"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Preview View */}
        {view === "preview" && (
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
                    onClick={() => setView("edit")}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                  >
                    <Edit size={18} className="mr-1" />
                    Back to Editor
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {currentWork.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl font-bold mb-4">{currentWork.title}</h1>

              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                <Calendar size={16} className="mr-1" />
                <span>
                  {new Date(currentWork.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {(currentWork.thumbnail1 || currentWork.thumbnail2) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {currentWork.thumbnail1 && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={currentWork.thumbnail1}
                        alt="Thumbnail 1"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/800x400?text=Invalid+Image+URL";
                        }}
                      />
                    </div>
                  )}
                  {currentWork.thumbnail2 && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={currentWork.thumbnail2}
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
                {renderMarkdown(currentWork.content)}
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

// Types
interface Work {
  id: string;
  title: string;
  thumbnail1: string;
  thumbnail2: string;
  content: string;
  createdAt: string;
  tags: string[];
}
