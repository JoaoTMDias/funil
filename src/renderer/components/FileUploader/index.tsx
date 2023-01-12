import { Label } from "@fluentui/react/lib/Label";
import { useRef, useId, useCallback } from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import type { DropTargetMonitor } from "react-dnd";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import styles from "./FileUpload.module.scss";

interface FileUploaderProps {
  onSelectFiles?: (files: File[]) => void;
}

interface DraggedFile {
  files: File[];
  items: any;
}

function FileUploader(props: FileUploaderProps): JSX.Element {
  const id = useId();
  const legendId = useRef(`${id}--legend`);
  const inputRef = useRef(null);

  const [{ canDrop, isOver }, dropRef] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: DraggedFile) {
        if (props.onSelectFiles) {
          props.onSelectFiles(item.files);
        }
      },
      canDrop(item: DraggedFile) {
        console.log("canDrop", item.files, item.items);
        return true;
      },
      hover(item: DraggedFile) {
        console.log("hover", item.files, item.items);
      },
      collect: (monitor: DropTargetMonitor) => {
        const item = monitor.getItem() as DraggedFile;
        if (item) {
          console.log("collect", item.files, item.items);
        }

        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [props]
  );

  /**
   * Handles the click to select one or multiple files.
   * Calls the `onDrop` callback with an array of selected files.
   */
  const handleOnChangeInput = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const { files } = event.currentTarget;

      if (files && files.length > 0 && props.onSelectFiles) {
        const fileData = Array.from(files);

        props.onSelectFiles(fileData);
      }
    },
    []
  );

  const isActive = canDrop && isOver;
  const legend = isActive ? "Release to drop" : "Drag and Drop or Browse files";

  return (
    <fieldset
      ref={dropRef}
      aria-labelledby={legendId.current}
      className={styles.container}
    >
      <span
        id={legendId.current}
        className={styles.legend}
        data-testid="funil-upload-title"
      >
        {legend}
      </span>
      <div className={styles.elements}>
        <Label
          className={styles.label}
          htmlFor={id}
          data-testid="funil-upload-label"
        >
          Pick files to Upload
        </Label>
        <TextField
          className={styles.input}
          id={id}
          componentRef={inputRef}
          onChange={handleOnChangeInput}
          type="file"
          multiple
          data-testid="funil-upload-input"
        />
      </div>
    </fieldset>
  );
}

export default FileUploader;
