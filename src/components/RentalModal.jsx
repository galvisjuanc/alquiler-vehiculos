import { useState } from 'react';
import API from '../services/api';

export default function RentalModal({ vehiculo, isOpen, onClose, onRentalSuccess }) {
    const [formData, setFormData] = useState({
        usuarioNombre: '',
        fechaInicio: '',
        fechaFin: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Estructura que espera tu microservicio de Operaciones
            const payload = {
                vehiculoId: vehiculo.id,
                usuarioNombre: formData.usuarioNombre,
                fechaInicio: formData.fechaInicio,
                fechaFin: formData.fechaFin
            };

            await API.post('/operaciones', payload);

            alert('¡Alquiler registrado con éxito!');
            onRentalSuccess(); // Para actualizar el estado en la vista de detalle
            onClose();
        } catch (error) {
            console.error(error);
            alert('Error al procesar el alquiler: ' + (error.response?.data?.message || 'Servidor no disponible'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>Alquilar {vehiculo.marca} {vehiculo.modelo}</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label>Nombre del Cliente:</label>
                    <input
                        type="text"
                        required
                        value={formData.usuarioNombre}
                        onChange={(e) => setFormData({...formData, usuarioNombre: e.target.value})}
                    />

                    <label>Fecha de Inicio:</label>
                    <input
                        type="date"
                        required
                        value={formData.fechaInicio}
                        onChange={(e) => setFormData({...formData, fechaInicio: e.target.value})}
                    />

                    <label>Fecha de Fin:</label>
                    <input
                        type="date"
                        required
                        value={formData.fechaFin}
                        onChange={(e) => setFormData({...formData, fechaFin: e.target.value})}
                    />

                    <div style={styles.buttons}>
                        <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancelar</button>
                        <button type="submit" disabled={isSubmitting} style={styles.submitBtn}>
                            {isSubmitting ? 'Procesando...' : 'Confirmar Alquiler'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modal: { background: 'white', padding: '30px', borderRadius: '12px', width: '400px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    buttons: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' },
    cancelBtn: { padding: '10px', background: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    submitBtn: { padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }
};