import React from 'react';
import { Dentista } from '../types';

interface DentistaTableProps {
    dentistas: Dentista[];
    onEdit: (dentista: Dentista) => void;
    onDelete: (id: number) => void;
}

const DentistaTable: React.FC<DentistaTableProps> = ({ dentistas, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidad</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {dentistas.map((dentista) => (
                        <tr key={dentista.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{dentista.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{dentista.nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{dentista.apellido}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{dentista.especialidad}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => onEdit(dentista)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(dentista.id)}
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

export default DentistaTable;