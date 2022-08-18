import { FileList, FileUploader } from "../index";
import { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function UploadForm() {
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);

  const handleFileDrop = useCallback(
    (item: { files: any[] }) => {
      debugger;
      if (item) {
        const files = item.files;
        setDroppedFiles(files);
      }
    },
    [setDroppedFiles]
  );

  return (
    <form>
      <DndProvider backend={HTML5Backend}>
        <FileUploader onDrop={handleFileDrop} />
        <FileList files={droppedFiles} />
      </DndProvider>
    </form>
  );
}

export default UploadForm;
