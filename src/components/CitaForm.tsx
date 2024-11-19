import React, { useState, useEffect } from 'react';
import { Cita, Paciente, Dentista } from '../types';

interface CitaFormProps {
    onSubmit: (cita: Omit<Cita, 'id'>) => void;
    initialData?: Cita;
    onCancel: () => void;
    pacientes: Paciente[];
    dentistas: Dentista[];
}

const CitaForm: React.FC<CitaFormProps> = ({ 
    onSubmit, 
    initialData, 
    onCancel,
    pacientes,
    dentistas 
}) => {
    const defaultFormData = {
        pacienteId: '',
        dentistaId: '',
        fechaHora: '',
        motivo: ''
    };

    const [formData, setFormData] = useState(defaultFormData);
    const [errors, setErrors] = useState({
        pacienteId: '',
        dentistaId: '',
        fechaHora: '',
        motivo: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                pacienteId: initialData.paciente.id.toString(),
                dentistaId: initialData.dentista.id.toString(),
                fechaHora: initialData.fechaHora.slice(0, 16), // Format: "YYYY-MM-DDThh:mm"
                motivo: initialData.motivo
            });
        } else {
            setFormData(defaultFormData);
        }
    }, [initialData]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!formData.pacienteId) {
            newErrors.pacienteId = 'Debe seleccionar un paciente';
            isValid = false;
        }
        if (!formData.dentistaId) {
            newErrors.dentistaId = 'Debe seleccionar un dentista';
            isValid = false;
        }
        if (!formData.fechaHora) {
            newErrors.fechaHora = 'Debe seleccionar fecha y hora';
            isValid = false;
        }
        if (!formData.motivo.trim()) {
            newErrors.motivo = 'El motivo es requerido';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const paciente = pacientes.find(p => p.id.toString() === formData.pacienteId);
            const dentista = dentistas.find(d => d.id.toString() === formData.dentistaId);
            if (paciente && dentista) {
                onSubmit({
                    paciente,
                    dentista,
                    fechaHora: formData.fechaHora,
                    motivo: formData.motivo
                });
                if (!initialData) {
                    setFormData(defaultFormData);
                }
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const handleCancel = () => {
        setFormData(defaultFormData);
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1">Paciente:</label>
                <select
                    name="pacienteId"
                    value={formData.pacienteId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Seleccione un paciente</option>
                    {pacientes.map(paciente => (
                        <option key={paciente.id} value={paciente.id}>
                            {paciente.nombre} {paciente.apellido}
                        </option>
                    ))}
                </select>
                {errors.pacienteId && <span className="text-red-500 text-sm">{errors.pacienteId}</span>}
            </div>

            <div>
                <label className="block mb-1">Dentista:</label>
                <select
                    name="dentistaId"
                    value={formData.dentistaId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Seleccione un dentista</option>
                    {dentistas.map(dentista => (
                        <option key={dentista.id} value={dentista.id}>
                            {dentista.nombre} {dentista.apellido} - {dentista.especialidad}
                        </option>
                    ))}
                </select>
                {errors.dentistaId && <span className="text-red-500 text-sm">{errors.dentistaId}</span>}
            </div>

            <div>
                <label className="block mb-1">Fecha y Hora:</label>
                <input
                    type="datetime-local"
                    name="fechaHora"
                    value={formData.fechaHora}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.fechaHora && <span className="text-red-500 text-sm">{errors.fechaHora}</span>}
            </div>

            <div>
                <label className="block mb-1">Motivo:</label>
                <textarea
                    name="motivo"
                    value={formData.motivo}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows={3}
                />
                {errors.motivo && <span className="text-red-500 text-sm">{errors.motivo}</span>}
            </div>

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {initialData ? 'Actualizar' : 'Crear'}
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default CitaForm;
