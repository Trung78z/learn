import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddTodo from "./pages/Add-todo";
import Layout from "./components/Layout";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-todo" element={<AddTodo />} />
        </Route>
      </Routes>
    </>
  );
}
