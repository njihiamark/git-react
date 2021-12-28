import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/solid";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUsername, getRepos, selectRepos } from "../store/slices/reposSlice";

function Home() {
  const [value, setValue] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [noValue, setNovalue] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { data, pending, error } = useAppSelector(selectRepos);
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!pending && !error && (data as object[]).length > 0 && submitted) {
      navigate("/projects");
    }
  }, [pending, error, data, submitted]);


  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    setNovalue(false);
    setSubmitted(false);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!value) {
      setNovalue(true);
      return;
    }
    dispatch(setUsername(value as string));
    dispatch(getRepos(value as string));
    setSubmitted(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex w-full sm:w-1/2 p-4">
        <form className="w-full" onSubmit={handleSubmit}>
          <label>
            <p className="mb-2 text-gray-700">Github Username</p>
            <div className="flex rounded-md overflow-hidden w-full">
              <input
                type="text"
                className="w-full rounded-md rounded-r-none shadow p-4"
                placeholder="defunkt"
                value={value as string}
                onChange={handleInputChange}
              />
              <button className="bg-indigo-600 text-white px-6 text-lg font-semibold py-4 rounded-r-md">
                <SearchIcon className="h-7 w-7 text-white" />
              </button>
            </div>
            {noValue && (
              <p className="text-red-700 mt-2">*Please provide a username</p>
            )}
            {!error && !pending && submitted && (data as object[]).length === 0 && (
              <p className="text-gray-700 mt-2">
                This user has no repos
              </p>
            )}
            {error && (
              <p className="text-red-700 mt-2">
                *You might have mistyped the username or the github API Rate limit has been reached
              </p>
            )}
          </label>
        </form>
      </div>
    </div>
  );
}

export default Home;
