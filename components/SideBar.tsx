import { ArchiveBoxIcon, ChartBarSquareIcon } from "@heroicons/react/24/solid";

function SideBar() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-black">
      <h1 className="text-5xl font-bold mb-20">LOGO</h1>
      <div className="flex space-x-2 text-center">
        <div>
          <div className="flex flex-col items-center justify-between mb-5">
            <ChartBarSquareIcon className="h-8 w-8 mb-5" />
            <ArchiveBoxIcon className="h-8 w-8 mb-5" />
            <ArchiveBoxIcon className="h-8 w-8 mb-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
