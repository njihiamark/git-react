import { useEffect } from "react";
import Markdown from "markdown-to-jsx";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

import Card from "../componenets/Card";
import Header from "../componenets/Header";
import "./ProjectDetail.css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetReadMeRepo, selectRepos, resetError } from "../store/slices/reposSlice";

function ProjectDetail() {
  const { current_repo } = useAppSelector(selectRepos);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    window.onpopstate = (e) => {
      dispatch(resetReadMeRepo());
      dispatch(resetError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (current_repo == null || Object.keys(current_repo as object).length === 0) {
      navigate("/projects");
    }
  }, [current_repo, navigate]);

  const handleRepoReset = () => {
    dispatch(resetReadMeRepo());
    dispatch(resetError());
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header>
        <ArrowNarrowLeftIcon
          className="h-5 w-5 mr-2 inline-block cursor-pointer text-gray-500"
          onClick={handleRepoReset}
        />
        {" " + (current_repo as any).repo_name}
      </Header>
      <div className="container mx-auto p-4">
        {/* <Card><h2 className="text-gray-800 text-2xl font-semibold">Design Tools</h2></Card> */}
        <Card>
          <Markdown>
            {(current_repo as any).content
              ? atob((current_repo as any).content)
              : "No README.md content available"}
          </Markdown>
        </Card>
      </div>
    </div>
  );
}

export default ProjectDetail;
