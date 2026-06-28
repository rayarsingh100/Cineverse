export type Movie = {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
    runtime?: number;
    revenue?: number;
    genres?: Genre[];
};

export type Genre = {
    id: number;
    name: string;
};

export type CastMember = {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
};

export type CrewMember = {
    id: number;
    name: string;
    job: string;
};

export type Credits = {
    cast: CastMember[];
    crew: CrewMember[];
};

export type Video = {
    key: string;
    site: string;
    type: string;
};

export type VideosResponse = {
    results: Video[];
};