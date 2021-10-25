import { AxiosResponse } from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import axiosInstance from "../common/axios";
import { CONFIG } from "../common/Configuration";
import { GET_PROJECT_BY_ID_KEY, PUT_PROJECT } from "../common/QueryKeys";
import { IProject } from "../models/IProject";

export default function useUpdateProject(): UseMutationResult<any, Error> {
  const queryClient = useQueryClient();

  return useMutation(
    PUT_PROJECT,
    (updatedProject: IProject) =>
      axiosInstance
        .put(
          `${CONFIG.API_BASE_URL}/projects/${updatedProject.id}`,
          updatedProject
        )
        .then((res: AxiosResponse<IProject>) => res.data)
        .catch((err: Error) => {
          throw err;
        }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(`${GET_PROJECT_BY_ID_KEY}-${data.id}`);
        alert("Update project successfully");
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );
}
