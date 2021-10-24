import { useMutation, UseMutationResult } from "react-query";
import { useHistory } from "react-router-dom";
import axiosInstance from "../common/axios";
import { CONFIG } from "../common/Configuration";
import { DELETE_PROJECT } from "../common/QueryKeys";

export default function useDeleteProject(): UseMutationResult<any, Error> {
  const history = useHistory();

  return useMutation(
    DELETE_PROJECT,
    (prjId: string) =>
      axiosInstance
        .delete(`${CONFIG.API_BASE_URL}/projects/${prjId}`)
        .then((res) => res.data)
        .catch((err: Error) => {
          throw err;
        }),
    {
      onSuccess: () => {
        alert("Delete successfully");
        history.push("/project-list");
      },
      onError: (err) => alert(`Delete failed: ${err.message}`),
    }
  );
}
