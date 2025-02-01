import * as React from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Footer } from "./Footer";

export function SaveResume() {
  return (
    <div className="flex overflow-hidden flex-col pb-72 bg-stone-950 max-md:pb-24">
      <Header />
      <div className="flex z-10 flex-col mt-24 w-full max-md:mt-10 max-md:max-w-full">
        <Hero />
        <div className="flex flex-col justify-center items-center mt-4 w-full max-md:max-w-full">
          <div className="flex max-w-full min-h-[698px] w-[1218px]" />
        </div>
        <Footer />
      </div>
      <div className="flex gap-10 mt-0 w-full min-h-[647px] max-md:mt-0 max-md:max-w-full" />
    </div>
  );
}