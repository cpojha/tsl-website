import Link from "next/link";

export function SeedanceBanner() {
  return (
    <div className="bg-[#f54e00] text-white rounded-md">
      <Link 
        href="/pricing" 
        className="flex items-center justify-center gap-2 w-full px-4 py-3 text-center text-base font-bold tracking-tight hover:opacity-90 transition-opacity"
      >
         <span>Seedance 2.0 is now available on all plans — <span className="font-bold">95% off for Starter plan</span></span>
      </Link>
    </div>
  );
}