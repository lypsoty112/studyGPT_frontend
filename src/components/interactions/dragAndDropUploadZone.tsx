import React, { useCallback, useState, useRef } from "react";

type DragAndDropUploadZoneProps = {
  onFileUpload: (file: File) => void;
};

const DragAndDropUploadZone = ({
  onFileUpload,
}: DragAndDropUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragEnter = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
    },
    []
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    // Handle dropped files here (e.g., upload or process them)
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  }, []);

  const handleZoneClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      // Handle selected files here (e.g., upload or process them)
      if (files && files.length > 0) {
        setUploadedFile(files[0]);
        onFileUpload(files[0]);
      }
    },
    []
  );

  return (
    <div
      className={`flex h-full w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-black p-3`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleZoneClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInputChange}
      />
      {uploadedFile ? (
        <div>
          <p>Uploaded File:</p>
          <p>{uploadedFile.name}</p>
        </div>
      ) : isDragging ? (
        <p>Drop the files here</p>
      ) : (
        <p>Drag and drop files here or click to upload</p>
      )}
    </div>
  );
};

export default DragAndDropUploadZone;
