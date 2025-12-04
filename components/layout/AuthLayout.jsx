import Image from "next/image";
import LintaskLogo from "@/public/lintask.png";

export default function AuthLayout({ title, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-tl from-secondary to-white px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg relative">
        <div className="hidden md:block absolute -top-20 left-1/2 transform -translate-x-1/2">
          <Image
            src="/whatsapp.png"
            alt="WhatsApp Icon"
            width={100}
            height={100}
            className="mx-auto w-full h-16 opacity-75 brightness-0 invert animate-pulse"
          />
        </div>

        <div className="hidden md:block absolute -left-40 top-1/2 transform -translate-y-1/2">
          <Image
            src="/shopee.png"
            alt="Shopee Icon"
            width={100}
            height={100}
            className="mx-auto w-full h-20 opacity-75 brightness-0 invert animate-bounce"
          />
        </div>

        <div className="hidden md:block absolute -bottom-20 left-1/2 transform -translate-x-1/2">
          <Image
            src="/instagram.png"
            alt="Instagram Icon"
            width={100}
            height={100}
            className="mx-auto w-full h-16 opacity-75 brightness-0 invert animate-pulse"
          />
        </div>

        <div className="hidden md:block absolute -right-40 top-1/2 transform -translate-y-1/2">
          <Image
            src="/tiktok.png"
            alt="Tiktok Icon"
            width={100}
            height={100}
            className="mx-auto w-full h-20 opacity-75 brightness-0 invert animate-bounce"
          />
        </div>
        {/* Header */}
        <div className="mb-8 text-center">
          <Image
            src={LintaskLogo}
            alt="Lintask Logo"
            width={160}
            height={160}
            className="mx-auto"
            style={{ width: "auto", height: "auto" }}
          />

          <p className="mt-2 text-2xl font-bold text-zinc-700">
            Selamat Datang
          </p>
          <p className="text-sm text-zinc-700 mt-2">{title}</p>
        </div>

        {/* Form */}
        {children}

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-zinc-400">
          &copy; {new Date().getFullYear()} Lintask. All rights reserved.
        </p>
      </div>
    </div>
  );
}
