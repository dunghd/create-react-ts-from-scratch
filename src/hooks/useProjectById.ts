import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import axiosInstance from '../common/axios';
import { CONFIG } from '../common/Configuration';
import { GET_PROJECT_BY_ID_KEY } from '../common/QueryKeys';
import { IProject } from '../models/IProject';

export default function useProjectById(id: string): UseQueryResult<IProject, Error> {
  return useQuery<IProject, Error>(`${GET_PROJECT_BY_ID_KEY}-${id}`, () =>
    axiosInstance
      .get(`${CONFIG.API_BASE_URL}/projects/${id}`)
      .then((res: AxiosResponse<IProject>) => res.data)
  );
}