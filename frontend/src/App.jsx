import Login from "./Components/Login";
import Register from "./Components/Register";
import JobDetailsPage from "./Components/JobDetailsPage";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NotFound from "./Components/NotFound";
import JobForm from "./Components/JobForm";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/job-details/:id" element={<JobDetailsPage />} />
          <Route path="/jobform" element={<JobForm />} />
          <Route path="/update/:id" element={<JobForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
