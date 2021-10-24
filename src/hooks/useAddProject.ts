import { AxiosResponse } from "axios";
import { useMutation, UseMutationResult } from "react-query";
import axiosInstance from "../common/axios";
import { CONFIG } from "../common/Configuration";
import { POST_PROJECT } from "../common/QueryKeys";
import { IProject } from "../models/IProject";

export default function useAddProject(): UseMutationResult<any, Error> {
  return useMutation(POST_PROJECT, (newProject: IProject) =>
    axiosInstance
      .post(`${CONFIG.API_BASE_URL}/projects`, newProject)
      .then((res: AxiosResponse<IProject>) => res.data)
  );
}
