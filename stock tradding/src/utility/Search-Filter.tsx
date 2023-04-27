import { useEffect, useState } from "react";
import axios from "axios";
const SerachFilter = () => {
  const [data, setdata] = useState([]);
  const [filterval, setFilterval] = useState("");
  const [SearchApiData, setSearchApiData] = useState([]);
  useEffect(() => {
    const fechData = () => {
      axios
        .get(`https://jsonplaceholder.typicode.com/users`)
        .then((res: any) => {
          setdata(res.data);
          setSearchApiData(res.data);
        });
    };
    fechData();
  }, []);
  const handleFilter = (e: any) => {
    if (e.target.value === "") {
      setdata(SearchApiData);
    } else {
      const filterResult = SearchApiData.filter((item: any) =>
        item.name.toLowercase().includes(e.target.value.toLowercase())
      );
      setdata(filterResult);
    }
    setFilterval(e.target.value);
  };
  return (
    <>
      <div>
        <div>
          <input
            placeholder="Search"
            value={filterval}
            onInput={(e) => {
              handleFilter(e);
            }}
          ></input>
        </div>
        <table>
          <tr>
            <th>Name</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
          {data.map((obj: any) => {
            return (
              <>
                <tr>
                  <td>{obj.name}</td>
                  <td>{obj.username}</td>
                  <td>{obj.email}</td>
                  <td>{obj.phone}</td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
};
export default SerachFilter;
