import { AxiosResponse } from "axios";
import { useMutation, UseMutationResult } from "react-query";
import axiosInstance from "../common/axios";
import { CONFIG } from "../common/Configuration";
import { PUT_PROJECT } from "../common/QueryKeys";
import { IProject } from "../models/IProject";

export default function useUpdateProject(): UseMutationResult<any, Error> {
  return useMutation(PUT_PROJECT, (updatedProject: IProject) =>
    axiosInstance
      .put(
        `${CONFIG.API_BASE_URL}/projects/${updatedProject.id}`,
        updatedProject
      )
      .then((res: AxiosResponse<IProject>) => res.data)
  );
}
