import {
    ArchiveBoxIcon,
    ChartBarSquareIcon,
  } from "@heroicons/react/24/outline";
  
  function Homepage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
        <h1 className="text-5xl font-bold mb-20">YacGpt!</h1>
        <div className="flex space-x-2 text-center">
          <div>
            <div className="flex flex-col items-center justify-center mb-5">
              <ArchiveBoxIcon className="h-8 w-8" />
              <h2>Examples</h2>
            </div>
            <div className="space-y-2">
              <p className="infoText">Explain SOmething To me</p>
              <p className="infoText">
                What is the difference between a dog and cat?
              </p>
              <p className="infoText">What is the color of the sun</p>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center justify-center mb-5">
              <ChartBarSquareIcon className="h-8 w-8" />
              <h2>Examples</h2>
            </div>
            <div className="space-y-2">
              <p className="infoText">Explain SOmething To me</p>
              <p className="infoText">
                What is the difference between a dog and cat?
              </p>
              <p className="infoText">What is the color of the sun</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default Homepage;