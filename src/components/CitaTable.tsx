import React from 'react';
import { Cita } from '../types';

interface CitaTableProps {
    citas: Cita[];
    onEdit: (cita: Cita) => void;
    onDelete: (id: number) => void;
}

const CitaTable: React.FC<CitaTableProps> = ({ citas, onEdit, onDelete }) => {
    const formatDateTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleString();
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dentista</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {citas.map((cita) => (
                        <tr key={cita.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{cita.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {cita.paciente.nombre} {cita.paciente.apellido}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {cita.dentista.nombre} {cita.dentista.apellido}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {formatDateTime(cita.fechaHora)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{cita.motivo}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => onEdit(cita)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(cita.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CitaTable;