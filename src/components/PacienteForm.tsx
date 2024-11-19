import React, { useState, useEffect } from 'react';
import { Paciente } from '../types';

interface PacienteFormProps {
    onSubmit: (paciente: Omit<Paciente, 'id'>) => void;
    initialData?: Paciente;
    onCancel: () => void;
}

const PacienteForm: React.FC<PacienteFormProps> = ({ onSubmit, initialData, onCancel }) => {
    const defaultFormData = {
        nombre: '',
        apellido: '',
        telefono: '',
        fechaNacimiento: '',
    };

    const [formData, setFormData] = useState(defaultFormData);
    const [errors, setErrors] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        fechaNacimiento: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre,
                apellido: initialData.apellido,
                telefono: initialData.telefono,
                fechaNacimiento: initialData.fechaNacimiento,
            });
        } else {
            setFormData(defaultFormData);
        }
    }, [initialData]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
            isValid = false;
        }
        if (!formData.apellido.trim()) {
            newErrors.apellido = 'El apellido es requerido';
            isValid = false;
        }
        if (!formData.telefono.trim()) {
            newErrors.telefono = 'El teléfono es requerido';
            isValid = false;
        }
        if (!formData.fechaNacimiento) {
            newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData); // No need to convert date
            if (!initialData) {
                setFormData(defaultFormData);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        setErrors(prev => ({
            ...prev,
            [name]: '',
        }));
    };

    const handleCancel = () => {
        setFormData(defaultFormData);
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1">Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre}</span>}
            </div>

            <div>
                <label className="block mb-1">Apellido:</label>
                <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.apellido && <span className="text-red-500 text-sm">{errors.apellido}</span>}
            </div>

            <div>
                <label className="block mb-1">Teléfono:</label>
                <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.telefono && <span className="text-red-500 text-sm">{errors.telefono}</span>}
            </div>

            <div>
                <label className="block mb-1">Fecha de Nacimiento:</label>
                <input
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.fechaNacimiento && <span className="text-red-500 text-sm">{errors.fechaNacimiento}</span>}
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

export default PacienteForm;