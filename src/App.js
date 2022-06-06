import { Form, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
const App = () => {
  const [dataFeatch, setDataFeatch] = useState();
  const [dataSearch, setDataSearch] = useState();

  let timer = useRef();
  const handleSearch = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setDataSearch(e.target.value);
    }, 1000); 
  };

  useEffect(() => {
    const featchAllData = async () => {
      const { data } = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${dataSearch}`
      );
      data && setDataFeatch(data.hits);
    };
    featchAllData();
  }, [dataSearch]);
  return (
    <div style={{ padding: "5rem 30rem" }}>
      <Form>
        <Input onChange={(e) => handleSearch(e)} prefix={<SearchOutlined />} />
      </Form>
      <ul>
        {dataFeatch &&
          dataFeatch.map((item, id) => <li key={id}>{item.title}</li>)}
      </ul>
    </div>
  );
};

export default App;
