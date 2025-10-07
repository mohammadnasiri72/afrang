import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProgressButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const router = useRouter();

  const startLoading = () => {
    setIsLoading(true);
    setProgress(0);
  };

  useEffect(() => {
    startLoading();
  }, []);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            setIsLoading(false);
            return 100;
          }
          return prevProgress + 1;
        });
      }, 100); // سرعت پر شدن

      return () => clearInterval(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (progress === 100) {
      router.push("/");
    }
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-64 h-12 mb-4">
        <motion.button
          className={`relative w-full cursor-pointer !bg-blue-400 hover:bg-blue-700 h-full rounded-lg font-medium !text-white overflow-hidden `}
          onClick={() => {
            setProgress(100);
            router.push("/");
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* پس‌زمینه پر شدن */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-blue-600"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />

          {/* متن دکمه */}
          <span className="relative z-10">
            {isLoading
              ? `ورود به صفحه اصلی ${10 - Math.floor(progress / 10)} ثانیه`
              : "در حال انتقال به صفحه اصلی..."}
          </span>
        </motion.button>
      </div>
    </div>
  );
};

export default ProgressButton;
