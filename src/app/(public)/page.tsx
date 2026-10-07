import { Metadata } from "next";
import ComingSoonContent from "../_components/coming-soon-content";

export const metadata: Metadata = {
  title: "YukMainDnD",
};

export default function Home() {
  return (
    <div className="w-full flex justify-center min-w-0 h-full">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10 gap-2">
        <ComingSoonContent />
      </main>
    </div>
  );
}
