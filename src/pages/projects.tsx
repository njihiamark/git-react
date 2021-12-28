import { useEffect } from "react";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetData, selectRepos } from "../store/slices/reposSlice";
import Card from "../componenets/Card";
import Header from "../componenets/Header";

function Projects() {
  const { data, username } = useAppSelector(selectRepos);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    window.onpopstate = (e) => {
      dispatch(resetData());
    };
  }, [window.onpopstate]);

  useEffect(() => {
    if ((data as object[]).length === 0) {
      navigate("/");
    }
  }, [data]);

  const handleDataReset = () => {
    dispatch(resetData());
  };

  return (
    <div>
      <Header>
        <ArrowNarrowLeftIcon
          className="h-5 w-5 mr-2 inline-block cursor-pointer text-gray-500"
          onClick={handleDataReset}
        />{" "+username}
      </Header>
      <div className="container mx-auto p-4">
        <div className="lg:grid lg:grid-cols-4 lg:gap-4">
          {(data as object[]).map((item: any) => (
            <Card key={item.id}>
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
