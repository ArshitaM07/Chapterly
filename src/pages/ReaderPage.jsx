import { useState, useEffect } from "react";

function ReaderPage() {

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedProgress =
      localStorage.getItem("readingProgress");

    if (savedProgress) {
      setProgress(savedProgress);
    }
  }, []);

  const increaseProgress = () => {

    let newProgress = Number(progress) + 10;

    if (newProgress > 100) {
      newProgress = 100;
    }

    setProgress(newProgress);

    localStorage.setItem(
      "readingProgress",
      newProgress
    );
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-white px-8 py-10">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold font-[Playfair_Display] mb-3">
          Fourth Wing
        </h1>

        <p className="text-gray-400 mb-6">
          Chapter 1
        </p>

        {/* Progress */}

        <div className="mb-8">

          <div className="flex justify-between mb-2">

            <span>Reading Progress</span>

            <span>{progress}%</span>

          </div>

          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

            <div
              style={{
                width: `${progress}%`
              }}
              className="h-full bg-purple-500"
            ></div>

          </div>

        </div>


        {/* Content */}

        <div className="bg-white/5 border border-white/10 rounded-[30px] p-10 leading-10 text-lg text-gray-300">

          <p>
            The wind howled through the stone corridors
            as Violet stepped forward...
          </p>

          <br/>

          <p>
            Some stories begin with destiny.
            Others begin with survival.
          </p>

        </div>

        <div className="flex justify-between mt-10">

          <button
            className="bg-white/5 px-6 py-3 rounded-xl border border-white/10"
          >
            Previous
          </button>

          <button
            onClick={increaseProgress}
            className="bg-purple-600 px-6 py-3 rounded-xl"
          >
            Next Chapter
          </button>

        </div>

      </div>

    </div>
  );
}

export default ReaderPage;