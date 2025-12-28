import { Link, useRouteError } from "react-router-dom";
const ErrorPages = () => {
  const error = useRouteError();
  return (
    <>
      <title>Error-404</title>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#fdecea] to-[#fff5f5]">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
          <p className="mt-4 text-lg text-gray-700">Something went wrong.</p>
          <p className="text-sm text-gray-500 mt-2">
            {error?.statusText || error?.message || "Page not found"}
          </p>
          <Link to="/">
            <button className="mt-6 bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary transition">
              Go Back Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPages;
