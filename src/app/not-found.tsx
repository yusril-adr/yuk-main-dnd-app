import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import NotFoundCopy from "@/app/_components/not-found-copy";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col">
      <main className="w-full max-w-7xl h-full flex flex-col justify-center items-center px-10 pb-10 mx-auto gap-2">
        <DotLottieReact src={"/lotties/404-cat.json"} autoplay loop />
        <NotFoundCopy />
      </main>
    </div>
  );
}
