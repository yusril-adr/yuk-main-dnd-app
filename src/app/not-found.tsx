import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col">
      <main className="w-full max-w-7xl flex flex-col justify-center items-center px-10 pb-10 mx-auto gap-2">
        <DotLottieReact src={"/lotties/404-cat.json"} autoplay loop />
        <h1 className="font-heading text-2xl">Page not found</h1>
        <p>The page you are looking for does not exist.</p>
        <Button variant="default" render={<Link href="/" />}>
          Go to Home
        </Button>
      </main>
    </div>
  );
}
