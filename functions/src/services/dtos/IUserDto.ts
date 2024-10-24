interface IUserDto {
    id: number;
    email: string;
    password: string;
    names: string;
    first_name: string;
    second_name?: string;
    last_name: string;
    second_last_name?: string;
    birthday: Date;
    role: string;
}

export {
    IUserDto
}