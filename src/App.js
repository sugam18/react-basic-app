import Navbar from "./Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import { Route, Routes } from "react-router-dom"
import Task from "./components/tasks/Task"
import ProcessList from "./components/processes/processList"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<ProcessList />} />
          <Route path="/home" element={<Home />} />
          <Route path="/processes" element={<ProcessList />} />
          <Route path="/about" element={<About />} />
          <Route path="/tasks" element={<Task />} />
        </Routes>
      </div>
    </>
  )
}

export default App
