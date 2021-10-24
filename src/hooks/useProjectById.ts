import { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import axiosInstance from "../common/axios";
import { CONFIG } from "../common/Configuration";
import { GET_PROJECT_BY_ID_KEY } from "../common/QueryKeys";
import { IProject } from "../models/IProject";
import { ProjectStatus } from "../models/ProjectStatusEnum";

export default function useProjectById(
  prjId: string
): UseQueryResult<IProject, Error> {
  return prjId
    ? useQuery<IProject, Error>(`${GET_PROJECT_BY_ID_KEY}-${prjId}`, () =>
        axiosInstance
          .get(`${CONFIG.API_BASE_URL}/projects/${prjId}`)
          .then((res: AxiosResponse<IProject>) => res.data)
          .catch((err: Error) => {
            throw err;
          })
      )
    : useQuery<IProject, Error>(`${GET_PROJECT_BY_ID_KEY}-${prjId}`, () =>
        Promise.resolve({
          id: "",
          number: null,
          name: "",
          customer: "",
          group: "",
          members: "",
          status: ProjectStatus.None,
          startDate: new Date(),
          endDate: new Date(),
        } as IProject)
      );
}
