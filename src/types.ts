export interface Dentista {
    id: number;
    nombre: string;
    apellido: string;
    especialidad: string;
}

export interface Paciente {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    fechaNacimiento: string;
}

export interface Cita {
    id: number;
    paciente: Paciente;
    dentista: Dentista;
    fechaHora: string;  // LocalDateTime as string
    motivo: string;
}
