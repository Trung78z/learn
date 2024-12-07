export interface NavInterface {
    id: number;
    title: string;
    active: boolean;
}

export interface dataType {

    id: number,
    task: string,
    date: string,
    priority: string,
    status: boolean
}
export interface dataTypeAdd {
    task: string,
    date: string,
    priority: string,
    status: boolean
}