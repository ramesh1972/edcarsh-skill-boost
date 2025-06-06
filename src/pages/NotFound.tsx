import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import TitleComponent from "@/components/TitleComponent";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-full  flex items-center justify-center">
      <div className="container mx-auto px-4 py-12 space-y-8 text-center items-center justify-center max-w-2xl">
        <TitleComponent
          title="404"
          subtitle="Page Not Found"
          iconName="help"
          className="flex flex-col items-center text-center"
        />
        <div className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 rounded-xl p-8 inline-block hover:scale-[1.025] transition-transform duration-200">
          <p className="text-xl text-gray-600 mb-4">
            Oops! The page you're looking for doesn't exist.
          </p>
          <a
            href="/"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
