interface IntegrationDto {
    id: number;                     // Identificador único de la integración
    projectId: number;             // Llave foránea que referencia a la tabla projects
    ref: string;                    // Referencia
    _before: string;                 // Estado anterior
    _after: string;                  // Estado posterior
    repositoryId: number;          // ID del repositorio
    repositoryName: string;         // Nombre del repositorio
    repositoryFullName: string;     // Nombre completo del repositorio
    pusherName: string;             // Nombre del pusher
    pusherEmail: string;            // Correo electrónico del pusher
    commitMessage: string;          // Mensaje del commit
    commitId: string;               // ID del commit
    commitTimestamp: Date;          // Fecha y hora del commit
    commitUrl: string;              // URL del commit
}

export {
    IntegrationDto
}