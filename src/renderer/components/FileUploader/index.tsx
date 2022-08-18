import { Label } from "@fluentui/react/lib/Label";
import { useRef, useId } from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import type { DropTargetMonitor } from "react-dnd";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import styles from "./FileUpload.module.scss";

interface FileUploaderProps {
  onDrop: (item: { files: any[] }) => void;
}

function FileUploader(props: FileUploaderProps): JSX.Element {
  const id = useId();
  const legendId = useRef(`${id}--legend`);
  const inputRef = useRef(null);

  const [{ canDrop, isOver }, dropRef] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: any[] }) {
        if (props.onDrop) {
          props.onDrop(item);
        }
      },
      canDrop(item: any) {
        console.log("canDrop", item.files, item.items);
        return true;
      },
      hover(item: any) {
        console.log("hover", item.files, item.items);
      },
      collect: (monitor: DropTargetMonitor) => {
        const item = monitor.getItem() as any;
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

  const isActive = canDrop && isOver;
  const legend = isActive ? "Release to drop" : "Drag and Drop or Browse files";

  return (
    <fieldset aria-labelledby={legendId.current} className={styles.container}>
      <span
        ref={dropRef}
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
          type="file"
          multiple
          data-testid="funil-upload-input"
        />
      </div>
    </fieldset>
  );
}

export default FileUploader;
