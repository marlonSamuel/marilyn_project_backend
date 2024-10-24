interface ITestPlanDto {
    id: number;
    project_id: number;
    created_by: number;
    assigned_to: number;
    name: string;
    description: string;
    acceptance_criteria: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

export {
    ITestPlanDto
}