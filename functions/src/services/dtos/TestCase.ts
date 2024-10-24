interface ITestCaseDto {
    id: number;
    scenario_id: number;
    name: string;
    description: string;
    test_data: string;
    status: string;
    expected_result: string;
    actual_result: string;
    execution_type?: string;
    createdAt?: string;
    updatedAt?: string;
}

export {
    ITestCaseDto
}