import React, { useState, useEffect } from 'react';
import { Dentista } from '../types';

interface DentistaFormProps {
    onSubmit: (dentista: Omit<Dentista, 'id'>) => void;
    initialData?: Dentista;
    onCancel: () => void;
}

const DentistaForm: React.FC<DentistaFormProps> = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        especialidad: ''
    });

    const [errors, setErrors] = useState({
        nombre: '',
        apellido: '',
        especialidad: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre,
                apellido: initialData.apellido,
                especialidad: initialData.especialidad
            });
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
        if (!formData.especialidad.trim()) {
            newErrors.especialidad = 'La especialidad es requerida';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                <label className="block mb-1">Especialidad:</label>
                <input
                    type="text"
                    name="especialidad"
                    value={formData.especialidad}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.especialidad && <span className="text-red-500 text-sm">{errors.especialidad}</span>}
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
                    onClick={onCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default DentistaForm;