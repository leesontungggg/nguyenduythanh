"use client";
import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex-1">
        <section className="relative h-screen bg-[url('/hero.jpg')] bg-fixed bg-cover bg-center flex items-center justify-center text-white uppercase md:text-5xl text-3xl font-bold">
          Works
        </section>
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 uppercase tracking-wider text-center">
              Works
            </h2>
          </div>
        </section>
      </main>
    </div>
  );
}
