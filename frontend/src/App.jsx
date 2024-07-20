import Login from "./Components/Login";
import Register from "./Components/Register";
import JobDetailsPage from "./Components/JobDetailsPage";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CreateJobPage from "./pages/CreateJobPage";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <>
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/job-details/:id" element={<JobDetailsPage />} />
            <Route path="/create" element={<CreateJobPage />} />
          </Routes>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
