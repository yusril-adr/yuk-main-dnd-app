import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ComingSoonContent() {
  return (
    <div className="w-full max-w-7xl h-full flex flex-col justify-center items-center text-center px-10 py-10 mx-auto gap-2">
      <div className="max-h-60">
        <DotLottieReact src={"/lotties/dragon-halo.json"} autoplay loop />
      </div>

      <h1 className="font-heading text-2xl">Coming Soon</h1>
      <p>This page is still under development.</p>
    </div>
  );
}
