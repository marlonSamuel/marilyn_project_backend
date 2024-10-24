interface IMilestoneDto {
    id: number;
    project_id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

export {
    IMilestoneDto
}