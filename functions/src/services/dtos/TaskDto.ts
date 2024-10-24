interface ITaskDto {
    id: number;
    parent_id: number;
    milestone_id: number;
    assigned_to: number;
    estimated_hours: number;
    hours: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

export {
    ITaskDto
}