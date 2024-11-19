import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dentista, Paciente, Cita } from './types';
import DentistaForm from './components/DentistaForm';
import DentistaTable from './components/DentistaTable';
import PacienteForm from './components/PacienteForm';
import PacienteTable from './components/PacienteTable';
import CitaForm from './components/CitaForm';
import CitaTable from './components/CitaTable';

const App: React.FC = () => {
  // Estados para listas
  const [dentistas, setDentistas] = useState<Dentista[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  // Estados para edición
  const [editingDentista, setEditingDentista] = useState<Dentista | null>(null);
  const [editingPaciente, setPacienteDentista] = useState<Paciente | null>(null);

  // Estado para tabs
  const [activeTab, setActiveTab] = useState<'dentistas' | 'pacientes' | 'citas'>('dentistas');

  // New states for Citas
  const [citas, setCitas] = useState<Cita[]>([]);
  const [editingCita, setEditingCita] = useState<Cita | null>(null);

  // Cargar datos iniciales
  useEffect(() => {
    fetchDentistas();
    fetchPacientes();
    fetchCitas();
  }, []);

  // Funciones para Dentistas
  const fetchDentistas = async () => {
    try {
      const response = await axios.get('/api/dentistas');
      setDentistas(response.data);
    } catch (error) {
      console.error('Error fetching dentistas:', error);
    }
  };

  const createDentista = async (dentista: Omit<Dentista, 'id'>) => {
    try {
      await axios.post('/api/dentistas', dentista);
      fetchDentistas();
      setEditingDentista(null);
    } catch (error) {
      console.error('Error creating dentista:', error);
    }
  };

  const updateDentista = async (id: number, dentista: Omit<Dentista, 'id'>) => {
    try {
      await axios.put(`/api/dentistas/${id}`, dentista);
      fetchDentistas();
      setEditingDentista(null);
    } catch (error) {
      console.error('Error updating dentista:', error);
    }
  };

  const deleteDentista = async (id: number) => {
    try {
      await axios.delete(`/api/dentistas/${id}`);
      fetchDentistas();
    } catch (error) {
      console.error('Error deleting dentista:', error);
    }
  };

  // Funciones para Pacientes
  const fetchPacientes = async () => {
    try {
      const response = await axios.get('/api/pacientes');
      setPacientes(response.data); // No need to convert dates
    } catch (error) {
      console.error('Error fetching pacientes:', error);
    }
  };

  const createPaciente = async (paciente: Omit<Paciente, 'id'>) => {
    try {
      console.log(paciente);
      await axios.post('/api/pacientes', paciente); // Send date as string
      fetchPacientes();
      setPacienteDentista(null);
    } catch (error) {
      console.error('Error creating paciente:', error);
    }
  };

  const updatePaciente = async (id: number, paciente: Omit<Paciente, 'id'>) => {
    try {
      await axios.put(`/api/pacientes/${id}`, paciente); // Send date as string
      fetchPacientes();
      setPacienteDentista(null);
    } catch (error) {
      console.error('Error updating paciente:', error);
    }
  };

  const deletePaciente = async (id: number) => {
    try {
      await axios.delete(`/api/pacientes/${id}`);
      fetchPacientes();
    } catch (error) {
      console.error('Error deleting paciente:', error);
    }
  };

  // Citas CRUD operations
  const fetchCitas = async () => {
    try {
      const response = await axios.get('/api/citas');
      setCitas(response.data);
    } catch (error) {
      console.error('Error fetching citas:', error);
    }
  };

  const createCita = async (cita: Omit<Cita, 'id'>) => {
    try {
      // Formato que espera el servidor
      const citaData = {
        pacienteId: cita.paciente.id,
        dentistaId: cita.dentista.id,
        fechaHora: cita.fechaHora,
        motivo: cita.motivo
      };

      const response = await axios.post('/api/citas', citaData);
      
      if (response.data) {
        fetchCitas();
        setEditingCita(null);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error creating cita:', error.response?.data || error.message);
        // Aquí podrías agregar un estado para mostrar el error al usuario
      }
    }
  };

  const updateCita = async (id: number, cita: Omit<Cita, 'id'>) => {
    try {
      const citaData = {
        pacienteId: cita.paciente.id,
        dentistaId: cita.dentista.id,
        fechaHora: cita.fechaHora,
        motivo: cita.motivo
      };

      const response = await axios.put(`/api/citas/${id}`, citaData);
      
      if (response.data) {
        fetchCitas();
        setEditingCita(null);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating cita:', error.response?.data || error.message);
      }
    }
  };

  const deleteCita = async (id: number) => {
    try {
      await axios.delete(`/api/citas/${id}`);
      fetchCitas();
    } catch (error) {
      console.error('Error deleting cita:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 ${activeTab === 'dentistas' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('dentistas')}
        >
          Dentistas
        </button>
        <button
          className={`px-4 py-2 mr-2 ${activeTab === 'pacientes' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('pacientes')}
        >
          Pacientes
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'citas' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('citas')}
        >
          Citas
        </button>
      </div>

      {activeTab === 'dentistas' ? (
        <div>
          <h2 className="text-2xl mb-4">Gestión de Dentistas</h2>
          {editingDentista ? (
            <DentistaForm
              initialData={editingDentista}
              onSubmit={(dentista) => updateDentista(editingDentista.id, dentista)}
              onCancel={() => setEditingDentista(null)}
            />
          ) : (
            <DentistaForm
              onSubmit={createDentista}
              onCancel={() => setEditingDentista(null)}
            />
          )}
          <DentistaTable
            dentistas={dentistas}
            onEdit={setEditingDentista}
            onDelete={deleteDentista}
          />
        </div>
      ) : activeTab === 'pacientes' ? (
        <div>
          <h2 className="text-2xl mb-4">Gestión de Pacientes</h2>
          {editingPaciente ? (
            <PacienteForm
              initialData={editingPaciente}
              onSubmit={(paciente) => updatePaciente(editingPaciente.id, paciente)}
              onCancel={() => setPacienteDentista(null)}
            />
          ) : (
            <PacienteForm
              onSubmit={createPaciente}
              onCancel={() => setPacienteDentista(null)}
            />
          )}
          <PacienteTable
            pacientes={pacientes}
            onEdit={setPacienteDentista}
            onDelete={deletePaciente}
          />
        </div>
      ) : (
        <div>
          <h2 className="text-2xl mb-4">Gestión de Citas</h2>
          {editingCita ? (
            <CitaForm
              initialData={editingCita}
              onSubmit={(cita) => updateCita(editingCita.id, cita)}
              onCancel={() => setEditingCita(null)}
              pacientes={pacientes}
              dentistas={dentistas}
            />
          ) : (
            <CitaForm
              onSubmit={createCita}
              onCancel={() => setEditingCita(null)}
              pacientes={pacientes}
              dentistas={dentistas}
            />
          )}
          <CitaTable
            citas={citas}
            onEdit={setEditingCita}
            onDelete={deleteCita}
          />
        </div>
      )}
    </div>
  );
};

export default App;