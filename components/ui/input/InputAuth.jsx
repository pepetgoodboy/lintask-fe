export default function InputAuth({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-tertiary mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm
        focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
