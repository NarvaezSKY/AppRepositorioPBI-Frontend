export interface IPostReportRes {
    _id: string;
    name: string;
    description: string;
    url: string;
    directnavigate?: boolean;
    module: string;
    createdAt?: string;
    updatedAt?: string;
}