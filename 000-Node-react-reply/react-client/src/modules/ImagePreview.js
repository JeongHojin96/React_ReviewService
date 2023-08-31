const filePreview = (file) => {
  return new Promise((resolve) => {
    //1
    const fileReader = new FileReader();
    //3
    fileReader.onload = (fe) => {
      // 4
      resolve(fe.target.result);
    };
    //2
    fileReader.readAsDataURL(file);
  });
};

const filesPreview = (files) => {
  const fileArray = Array.from(files);

  const fileInforArray = fileArray.map(async (file) => {
    return await filePreview(file);
  });
  return fileInforArray;
};

export { filePreview, filesPreview };
