import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2 } from "lucide-react";
import DisplayImages from "./DisplayImages";

interface UploadImagesProps{
  fileUrls: string[];
  setFileUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

const UploadImages = ({fileUrls, setFileUrls}: UploadImagesProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setLoading(true);
    const uploadedUrls: string[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        alert(`File ${file.name} không hợp lệ! Chỉ cho phép ảnh.`);
        continue;
      }

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Ecommerce_Upload");
      data.append("cloud_name", "dd77pesl6");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dd77pesl6/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const result = await res.json();
        if (result.secure_url) {
          uploadedUrls.push(result.secure_url);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    }

    setFileUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
    setLoading(false);
  };

  const handleRemove = (index: number) => {
    setFileUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="hover:primary mr-3"
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
      >
        {loading ? <Loader2 size={20} className="animate-spin" /> : <ImageIcon size={20} />}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleUpload}
        disabled={loading}
      />

      {loading && <p className="text-sm text-blue-500 mt-2">Uploading...</p>}

      <DisplayImages images={fileUrls} handleRemove={handleRemove}/>
    </div>
  );
};

export default UploadImages;
