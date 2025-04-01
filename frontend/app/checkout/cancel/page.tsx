import { useRouter } from "next/router";

const CancelPage = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Payment Canceled</h1>
      <p>Your payment was canceled. If this was a mistake, try again.</p>
      <button
        onClick={() => router.push("/checkout")}
        className="px-4 py-2 bg-red-500 text-white rounded-md mt-4"
      >
        Try Again
      </button>
    </div>
  );
};

export default CancelPage;
