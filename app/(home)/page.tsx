/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function NilsFrahmHomepage() {
  const [showTime, setShowTime] = useState<any>([]);

  useEffect(() => {
    const fetchShowTime = async () => {
      try {
        const response = await fetch("/api/get-show-time");
        const data = await response.json();
        if (data.success) {
          console.log(data);
          setShowTime(data.data);
        } else {
          console.error("Failed to fetch show times");
        }
      } catch (error) {
        console.error("Error fetching show times:", error);
      }
    };
    fetchShowTime();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}

      {/* Main Content */}
      <main className="flex-1">
        <section className="relative h-screen bg-[url('/hero.jpg')] bg-fixed bg-cover bg-center"></section>

        {/* Latest Releases */}
        {/* <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 uppercase tracking-wider text-center">
              Latest Releases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="group">
                  <div className="relative overflow-hidden mb-4">
                    <img
                      src={`https://images.unsplash.com/photo-151137938547-c1f6941986${item}d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`}
                      alt={`Album ${item}`}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-1">
                    Album Title {item}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">2023</p>
                  <Button
                    variant="outline"
                    className="uppercase text-sm tracking-wider"
                  >
                    Listen Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Tour Dates */}
        <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 uppercase tracking-wider text-center">
              Tour Dates
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {showTime.map((event: any, index: any) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white dark:bg-gray-900 rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <div className="mb-4 md:mb-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {event[0]}
                    </p>
                    <h3 className="text-xl font-bold">{event[1]}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {event[2]}
                    </p>
                  </div>
                  <Button
                    className="uppercase tracking-wider"
                    onClick={() => {
                      window.open(event[3], "_blank");
                    }}
                  >
                    Get Tickets
                  </Button>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button
                onClick={() => {
                  window.open("/tour", "_blank");
                }}
                variant="outline"
                className="uppercase tracking-wider"
              >
                View All Tour Dates
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        {/* <section className="py-20 px-4">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-6 uppercase tracking-wider">
              Stay Updated
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Subscribe to the newsletter to receive updates about new music,
              tour dates, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
              />
              <Button className="uppercase tracking-wider">Subscribe</Button>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
}
