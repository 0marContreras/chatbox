import Image from 'next/image';

const Card = ({ title, description, imageSrc }) => {
  return (
    <div className="max-w-sm rounded-md overflow-hidden shadow-lg h-[450px]" >
      <Image
        className="max-w-sm rounded overflow-hidden shadow-lg"
        src={imageSrc}
        alt={title}
        width={400}
        height={250}
        objectFit="cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
