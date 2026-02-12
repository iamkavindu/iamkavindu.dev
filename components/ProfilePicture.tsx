'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProfilePictureProps {
  src?: string;
  alt: string;
  className?: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ 
  src = '/profilepicture.png', 
  alt,
  className = "w-48 h-48 md:w-64 md:h-64" 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div 
      className={`${className} rounded-full bg-default-200 border-4 border-default-800 overflow-hidden flex items-center justify-center relative ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300`}
      role="img"
      aria-label={alt}
      itemScope
      itemType="http://schema.org/ImageObject"
    >
      {src && !imageError ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-default-200">
              <div className="w-8 h-8 border-4 border-default-400 border-t-default-800 rounded-full animate-spin"></div>
            </div>
          )}
          <Image 
            src={src} 
            alt={alt} 
            width={512}
            height={512}
            quality={85}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onError={() => setImageError(true)}
            onLoad={() => setIsLoading(false)}
            priority
            sizes="(max-width: 768px) 192px, 256px"
            itemProp="contentUrl"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRsdHR4eIR0jIysdISMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyP/2wBDARAVFhgeFxwXFyMeHR0jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyP/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            placeholder="blur"
          />
        </>
      ) : (
        <svg 
          className="w-24 h-24 text-default-400" 
          fill="currentColor"
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
        </svg>
      )}
    </div>
  );
};

export default ProfilePicture;