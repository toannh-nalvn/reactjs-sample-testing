import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./components/Loading";
import { FetchData } from "./Services";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const response = FetchData();
      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  return <div className="App">APP</div>;
}

export default App;
