import { useEffect } from "react";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  resetData,
  selectRepos,
  getRepoReadme,
  resetError,
} from "../store/slices/reposSlice";
import Card from "../componenets/Card";
import Header from "../componenets/Header";

function Projects() {
  const { data, username, current_repo, error } = useAppSelector(selectRepos);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    window.onpopstate = (e) => {
      dispatch(resetData());
      dispatch(resetError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (data == null || (data as object[]).length === 0) {
      navigate("/");
    }
  }, [data, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [error]);

  useEffect(() => {
    if (current_repo != null && Object.keys(current_repo).length > 0) {
      navigate("/projects-detail");
    }
  }, [current_repo, navigate]);

  const handleDataReset = () => {
    dispatch(resetData());
    dispatch(resetError());
  };

  const handleCardClicks = (username: string, reponame: string) => {
    dispatch(getRepoReadme({ username: username, reponame: reponame }));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header>
        <ArrowNarrowLeftIcon
          className="h-5 w-5 mr-2 inline-block cursor-pointer text-gray-500"
          onClick={handleDataReset}
        />
        {" " + username}
        {error ? (
          <span className="text-red-700 ml-2">
            That Repo has no README.md file
          </span>
        ) : (
          ""
        )}
      </Header>
      <div
        className="container mx-auto p-4 bg-gray-100"
        data-testid="projects-container"
      >
        <div className="lg:grid lg:grid-cols-4 lg:gap-4">
          {(data as object[]).map((item: any) => (
            <Card
              key={item.id}
              onClick={() =>
                handleCardClicks(username as string, item.name as string)
              }
              clickable
            >
              <h2 className="text-gray-800 text-2xl font-semibold">
                {item.name}
              </h2>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
