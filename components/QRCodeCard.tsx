"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const qrUrl = "https://academy.elixflare.com/courses";

export default function QRCodeCard() {
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = ref.current?.querySelector("canvas");
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "elixflare-courses-qr.png";
    a.click();
  };

  return (
    <div className="rounded-2xl border border-brand-200 bg-white/80 backdrop-blur p-6 shadow-soft">
      <h3 className="text-lg font-semibold">Quick access</h3>
      <p className="text-gray-600 mt-1">
        Scan to open the Courses page instantly.
      </p>
      <div ref={ref} className="mt-4 flex items-center gap-6">
        <QRCodeCanvas value={qrUrl} size={156} includeMargin />
        <div className="space-y-2">
          <p className="text-sm break-all">{qrUrl}</p>
          <button
            onClick={handleDownload}
            className="inline-flex items-center rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700"
          >
            Download QR
          </button>
        </div>
      </div>
    </div>
  );
}
