import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-black text-white mt-8">
      <div className="max-w-6xl mx-auto p-4 text-center text-sm">
        &copy; {year} Sabstantia. All rights reserved.
      </div>
    </footer>
  );
}