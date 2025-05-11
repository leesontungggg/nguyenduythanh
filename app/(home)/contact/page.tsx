"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Globe, Instagram, Facebook } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message. We'll get back to you soon!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 flex items-center justify-center">
      <main className="container mx-auto px-4 pb-20 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Management</h2>
              <p className="mb-1">NGUYỄN DUY THÀNH</p>
              <p className="text-zinc-600 dark:text-zinc-400">
                ngdthanh5@gmail.com
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Concert Booking</h2>
              <p className="mb-1">NGUYỄN DUY THÀNH</p>
              <p className="text-zinc-600 dark:text-zinc-400">
                ngdthanh5@gmail.com
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Connect</h2>
              <div className="flex space-x-4">
                <motion.a
                  href="https://www.instagram.com/ngdthanh"
                  whileHover={{ scale: 1.1 }}
                  className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-full"
                >
                  <Instagram className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/ngduythanh"
                  whileHover={{ scale: 1.1 }}
                  className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-full"
                >
                  <Facebook className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://nguyenduythanh.vn"
                  whileHover={{ scale: 1.1 }}
                  className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-full"
                >
                  <Globe className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-zinc-300 dark:border-zinc-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-zinc-300 dark:border-zinc-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-zinc-300 dark:border-zinc-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full p-3 border border-zinc-300 dark:border-zinc-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex justify-center items-center space-x-2 bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 py-3 px-6 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
                >
                  <span>Send Message</span>
                  <Send className="h-4 w-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
