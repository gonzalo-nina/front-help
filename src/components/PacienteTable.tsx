import React from 'react';
import { Paciente } from '../types';

interface PacienteTableProps {
    pacientes: Paciente[];
    onEdit: (paciente: Paciente) => void;
    onDelete: (id: number) => void;
}

const PacienteTable: React.FC<PacienteTableProps> = ({ pacientes, onEdit, onDelete }) => {

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Nacimiento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {pacientes.map((paciente) => (
                        <tr key={paciente.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{paciente.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{paciente.nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{paciente.apellido}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{(paciente.fechaNacimiento)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{paciente.telefono}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => onEdit(paciente)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(paciente.id)}
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

export default PacienteTable;