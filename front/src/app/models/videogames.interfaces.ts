export interface VideogamesInterface {
    id: number;
    title: string;
    company: string;
    cover: string;
    platform: string[];
    year: number;
    genre: string;
}


export interface PlatformInterface{
    id: number;
    value: string;
}
