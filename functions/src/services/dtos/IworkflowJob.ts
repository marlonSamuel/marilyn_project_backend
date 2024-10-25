export interface IWorkflowJob {
    id: number;
    name?: string;
    project_id: number;
    job_id: string;
    run_id: string;
    workflow_name?: string;
    head_branch?: string;
    run_url?: string;
    run_attempt?: number;
    node_id?: string;
    url?: string;
    html_url?: string;
    status?: string;
    conclusion?: string;
    created_at?: Date;
    started_at?: Date;
    completed_at?: Date;
    steps?: any;  // Cambiar 'any' a una estructura específica si conoces el tipo de los pasos
    createdAt?: Date;
    updatedAt?: Date;
}