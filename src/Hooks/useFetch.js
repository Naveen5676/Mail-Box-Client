import React, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(url);
      const resdata = await res.json();
      if (resdata) {
        let dataArray = Object.entries(resdata).map(([id, data]) => ({
          id,
          ...data,
        }));
        setData(dataArray);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    // Fetch data every 2 minutes (2000 milliseconds)
    const intervalId = setInterval(fetchData, 2000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
      // console.log("Interval cleared.");
    };
  }, [url]);

  return [data];
};

export default useFetch;
