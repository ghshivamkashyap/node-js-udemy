import "./App.css";
import First from "./components/First";
import DataContextProvider from "./context/dataContextProvider";

function App() {
  return (
    <DataContextProvider>
      <div className="App">
        <First />
      </div>
    </DataContextProvider>
  );
}

export default App;
