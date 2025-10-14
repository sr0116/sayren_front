export default function ThumbnailImage({ src, alt, size = "md", rounded = "lg" }) {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
      <div className={`flex items-center justify-center bg-gray-50 ${sizes[size]} rounded-${rounded} overflow-hidden`}>
        <img
            src={src || "/placeholder.png"}
            alt={alt || "이미지"}
            className="object-cover w-full h-full"
        />
      </div>
  );
}