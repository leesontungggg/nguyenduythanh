/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Tour() {
  const [showTime, setShowTime] = useState<any[]>([]);

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
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Slider */}
        <section className="relative h-screen bg-[url('/hero.jpg')] bg-fixed bg-cover bg-[position:75%_0%] md:bg-center flex items-center justify-center text-white uppercase md:text-5xl text-3xl font-bold">
          Tour
        </section>

        {/* Latest Releases */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 uppercase tracking-wider text-center">
              Tour
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {showTime.map((event, index) => (
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
          </div>
        </section>
      </main>
    </div>
  );
}
