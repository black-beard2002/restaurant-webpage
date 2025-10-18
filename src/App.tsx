import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
