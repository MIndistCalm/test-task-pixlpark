// Created by Вячеслав Сухинин

import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Notfoundpage } from "./pages/Notfoundpage/Notfoundpage";
import { Orderspage } from "./pages/Orderspage/Orderspage";
import { Itempage } from "./pages/Itempage/Itempage";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Orderspage />} />
          <Route path=":id" element={<Itempage />} />
          <Route path="*" element={<Notfoundpage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
