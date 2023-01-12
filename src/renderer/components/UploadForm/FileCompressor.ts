const FILE_TYPES = {
  // Known and supported MIME-types
  "image/jpeg": "JPEG",
  "image/png": "PNG",
  "image/tiff": "TIFF",
  "image/webp": "WEBP",
  "image/svg+xml": "SVG",
  "video/mp4": "MP4",
  "video/quicktime": "MOV",
  "application/pdf": "PDF",

  // Not regular file types
  "scss": "SCSS",
  "css": "CSS",
  "html": "HTML"
};

class FileCompressor {
  constructor () {

  }

  private getFileType(file: File) {
    console.log("file type: ", file);

    let extension = file.type;
    const hasMimeType = extension && extension.length > 0;

    if (!hasMimeType) {
      const splitName = file.name.split(".");
      const extension = splitName[splitName.length - 1];
    }

    const type = FILE_TYPES[extension];

  }

  getFileDetails(file: File) {
    const fileType = this.getFileType(file);
  }
}

export default FileCompressor;
