import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YukMainDnD",
};

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10 mx-auto">
        <p>Index Page</p>
      </main>
    </div>
  );
}
