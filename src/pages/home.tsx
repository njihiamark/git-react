import { SearchIcon } from "@heroicons/react/solid";

function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex w-full sm:w-1/2 p-4">
        <label className="w-full">
          <p className="mb-2 text-gray-700">Github Username</p>
          <div className="flex rounded-md overflow-hidden w-full">
            <input
              type="text"
              className="w-full rounded-md rounded-r-none shadow p-4"
              placeholder="defunkt"
            />
            <button className="bg-indigo-600 text-white px-6 text-lg font-semibold py-4 rounded-r-md">
              <SearchIcon className="h-7 w-7 text-white" />
            </button>
          </div>
        </label>
      </div>
    </div>
  );
}

export default Home;
