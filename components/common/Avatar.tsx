import Image from 'next/image';

type AvatarProps = {
  src: string,
  alt?: string,
  width: number,
  height?: number,
};

const Avatar = ({ src, alt = 'avatar', width, height }: AvatarProps) => {
  return (
    <div className="rounded-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height || width}
      />
    </div>
  );
};

export default Avatar;
