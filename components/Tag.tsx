export default function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-full bg-brand-50 text-brand-800 text-xs px-3 py-1 border border-brand-200">
      {label}
    </span>
  );
}
