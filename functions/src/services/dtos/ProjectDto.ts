interface IProjectDto {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    status: string;
    enviroment: string;
    repository_name: string;
    url_repository: string;
    createdAt?: string;
    updatedAt?: string;
}

export {
    IProjectDto
}