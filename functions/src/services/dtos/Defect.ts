interface IDefectDto {
    id: number;
    test_case_id: number;
    assigned_to: number;
    description: string;
    status: string;
    severity: string;
    resolve_date: Date;
    hours: number;
    createdAt?: string;
    updatedAt?: string;
}

export {
    IDefectDto
}