import { TransitionLink } from "@/components/TransitionProvider";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center bg-[#070707] px-6 text-[#f1f0eb]">
      <div className="max-w-xl">
        <p className="micro mb-8">SYSTEM / 404</p>
        <h1 className="display-serif text-[clamp(4rem,12vw,10rem)] leading-[0.78]">Signal lost.</h1>
        <p className="mt-8 max-w-md text-white/55">The route does not exist in this system.</p>
        <TransitionLink href="/" className="link-line mt-10 inline-block" data-cursor="RETURN">
          Return home
        </TransitionLink>
      </div>
    </main>
  );
}
