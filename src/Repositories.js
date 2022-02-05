import React from "react";
import withDataFetching from "./WithDataFetching";

function Repositories({ loading, results, error }) {
  if (loading || error) {
    return loading ? "Loading..." : error.message;
  }

  return (
    <ul>
      {results.map(({ id, html_url, full_name }) => (
        <li key={id}>
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            {full_name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default withDataFetching({
  dataSource: "https://api.github.com/users/dunghd/repos",
})(Repositories);
