import { useEffect, useState } from "react";

import { FetchData } from "./Services";

const TestingAPICalls = () => {
  const [data, setData] = useState([
    {
      name: "",
    },
  ]);

  useEffect(() => {
    FetchData().then((data) => {
      setData(data);
    });
  });

  return (
    <div>
      {data.map((item) => (
        <div key={item.name}>{item?.name}</div>
      ))}
    </div>
  );
};

export default TestingAPICalls;
