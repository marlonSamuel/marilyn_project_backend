interface INoteDto {
    id: number;
    task_id: number;
    user_id: number;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

export {
    INoteDto
}