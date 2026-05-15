import Image from "next/image";

type MovieCardProps = {
  title: string;
  image: string;
};

export default function MovieCard({ title, image }: MovieCardProps) {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition duration-300 cursor-pointer">
      <img
        src={image}
        alt={title}
        width={500}
        height={288}
        className="w-full h-72 object-cover"
      />

      <div className="p-4">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
      </div>
    </div>
  );
}
