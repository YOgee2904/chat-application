import axios from "axios";
import React from "react";

export const useFetch = (url: string): Array<Array<object> | null > => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(url)
      .then((res) => setData(() => res.data.results))
      .catch((err) => console.error(err));
  }, [url]);
  return [data];
};
