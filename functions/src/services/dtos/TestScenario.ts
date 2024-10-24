interface ITestScenarioDto {
    id: number;
    testplan_id: number;
    name: string;
    description: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

export {
    ITestScenarioDto
}