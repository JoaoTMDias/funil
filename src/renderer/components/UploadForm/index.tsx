import { FileList, FileUploader } from "../index";
import React, { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FileCompressor from "./FileCompressor";

function UploadForm() {
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);

  /**
   * When one or more files are selected
   * (either by drag & drop or by using the file picker)
   *
   */
  const handleOnSelectFiles = useCallback(
    (files: File[]) => {
      const hasFiles = files && files.length > 0;

      console.log("files: ", files);
      if (hasFiles) {
        const instanceFileCompressor = new FileCompressor();

        files.forEach((file) => instanceFileCompressor.getFileDetails(file));
        setDroppedFiles(files);
      }
    },
    [setDroppedFiles]
  );

  const handleOnSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form onSubmit={handleOnSubmit}>
      <DndProvider backend={HTML5Backend}>
        <FileUploader onSelectFiles={handleOnSelectFiles} />
        <FileList files={droppedFiles} />
      </DndProvider>
    </form>
  );
}

export default UploadForm;
