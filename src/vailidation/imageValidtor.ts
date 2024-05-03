export const imageValidator = (
  name: string | undefined,
  size: number | undefined
) => {
  let message: string | null = null;
  if (name) {
    const getImgExtension = name.split(".");
    const imageExtensionType: Array<string> = [
      "svg",
      "png",
      "jpeg",
      "gif",
      "jpg",
      "mp4",
    ];
    if (!imageExtensionType.includes(getImgExtension[1])) {
      message =
        "file type not supporeted file must be svg png jpeg gif jpg mp4";
    } else {
      message = null;
    }
  }
  if (size) {
    const imgToMB = byteToMB(size!);
    if (imgToMB > 100) {
      message = "file should be lss than 100 MB";
    } else {
      message = null;
    }
  }
  return message;
};

function byteToMB(bytes: number) {
  const MB = 1048576;
  return bytes / MB;
}
