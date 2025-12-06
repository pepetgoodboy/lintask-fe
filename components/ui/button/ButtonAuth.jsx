import Spinner from "../spinner/Spinner";

export default function ButtonAuth({ buttonText, loading }) {
  return (
    <button
      type="submit"
      className="w-full flex justify-center items-center rounded-lg bg-primary py-2.5 text-white font-semibold hover:bg-tertiary cursor-pointer"
    >
      {loading ? <Spinner /> : buttonText}
    </button>
  );
}
