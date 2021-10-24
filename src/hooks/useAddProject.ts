import { AxiosResponse } from "axios";
import { useMutation, UseMutationResult } from "react-query";
import { useHistory } from "react-router";
import axiosInstance from "../common/axios";
import { CONFIG } from "../common/Configuration";
import { POST_PROJECT } from "../common/QueryKeys";
import { IProject } from "../models/IProject";

export default function useAddProject(): UseMutationResult<any, Error> {
  const history = useHistory();

  return useMutation(
    POST_PROJECT,
    (newProject: IProject) =>
      axiosInstance
        .post(`${CONFIG.API_BASE_URL}/projects`, newProject)
        .then((res: AxiosResponse<IProject>) => res.data)
        .catch((err: Error) => {
          throw err;
        }),
    {
      onSuccess: (project: IProject) => {
        alert("Add new project successfully");
        history.push(`/project-list/${project.id}`);
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );
}
