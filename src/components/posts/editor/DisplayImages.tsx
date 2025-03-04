import { cn } from '@/lib/utils'
import { XCircleIcon } from 'lucide-react';
import Image from 'next/image'
import React from 'react'

interface DisplayImagesProps{
    images: string[];
    handleRemove?: (index: number) => void;
}

const DisplayImages = ({images,handleRemove}: DisplayImagesProps) => {
  return (
    <div className={cn("mt-3 flex flex-col gap-3",images.length > 1 && "sm:grid sm:grid-cols-2" )}>
        {images.map((url, index) => (
          <div key={index} className="relative group">
            
            <Image
              src={url}
              alt="Attachment"
              width={500}
              height={500}
              className="mx-auto max-h-[30rem] rounded-2xl group-hover:opacity-80 transition"
            />

           {handleRemove && <button
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hidden group-hover:block z-10 transition"
            >
              <XCircleIcon size={20} />
            </button>}
          </div>
        ))}
      </div>
  )
}

export default DisplayImages