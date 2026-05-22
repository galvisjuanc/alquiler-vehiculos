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
          {/* Componente fijo en la parte superior */}
          <Navbar />

          {/* Zona de intercambio dinámico de vistas según la URL */}
          <main style={{ padding: '20px', minHeight: '70vh' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vehiculos" element={<VehicleCatalog />} />
              {/* Ruta dinámica que recibe el parámetro ID del vehículo */}
              <Route path="/vehiculos/:id" element={<VehicleDetail />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>

          {/* Componente fijo en la parte inferior */}
          <Footer />
        </div>
      </Router>
  );
}

export default App;