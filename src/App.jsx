import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import VehicleCatalog from './pages/VehicleCatalog';
import VehicleDetail from './pages/VehicleDetail';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
      <Router>
        <div className="app-container">
          <Navbar />

          <main style={{ padding: '20px', minHeight: '70vh' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vehiculos" element={<VehicleCatalog />} />
              <Route path="/vehiculos/:id" element={<VehicleDetail />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
  );
}

export default App;