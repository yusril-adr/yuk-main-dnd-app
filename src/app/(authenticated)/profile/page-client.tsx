"use client";

import ComingSoonContent from "@/app/_components/coming-soon-content";

export default function ProfilePageClient() {
  return (
    <div className="w-full flex justify-center h-full">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10 gap-2">
        <ComingSoonContent />
      </main>
    </div>
  );
}
