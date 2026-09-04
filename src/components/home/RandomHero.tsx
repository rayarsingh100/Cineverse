"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

type HeroMovie = {
    id: number;
    title: string;
    backdrop_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
};

type HeroSectionProps = {
    movies: HeroMovie[];
};

const HeroSection = dynamic(() => import("./HeroSection"), {
    ssr: false,
    loading: () => <section className="min-h-[125vh] bg-black" />,
}) as ComponentType<HeroSectionProps>;

export default function RandomHero({ movies }: HeroSectionProps) {
    return <HeroSection movies={movies} />;
}
