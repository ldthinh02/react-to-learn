import { api } from "./api";

export const uploadFileApi = (file?: File): Promise<string> => {
  const formData: FormData = new FormData();
  if (!file) return new Promise((resolve) => resolve(String("")));
  formData.append("files", file, file.name);
  return new Promise((resolve) => {
    api<{ full_path: string }[]>("upload/s3", {
      method: "post",
      body: formData,
    }).then(async (res) => {
      resolve(String(res ? res[0].full_path : ""));
    });
  });
};

export const getListFiles = (items: ImageItem[]): Promise<ImageItem[]> => {
  const promiseFiles: Promise<string>[] = [];
  for (let i = 0; i < items.length; i++) {
    promiseFiles.push(uploadFileApi(items[i].file));
  }
  return Promise.all(promiseFiles).then((fileListUpload: string[]) => {
    const fileList: ImageItem[] = fileListUpload.map((imagUrl, index) => ({
      label: items[index].label,
      image: items[index].image,
      file: items[index].file,
      url: imagUrl ? imagUrl : items[index].url,
    }));
    return fileList;
  });
};

export const getChangeImages = (
  data: ImageItem[],
  value: ImageItem,
  option: OptionImage,
  urlImageAdd: string
) => {
  let newData: ImageItem[] = data.map((item, index) => {
    return index > 3
      ? {
          ...item,
          label: `additional-${index - 4}`,
        }
      : item;
  });
  if (option) {
    if (option === "delete") {
      const indexOf = newData.map((item) => item.label).indexOf(value.label);
      newData = newData.map((item) => {
        return item.label === value.label
          ? { ...item, file: undefined, url: undefined }
          : item;
      });
      if (indexOf > 3) {
        newData = newData.filter((item) => item.label !== value.label);
      }
    }

    if (option === "add") {
      newData = [
        ...newData,
        {
          label: `additional`,
          image: urlImageAdd,
        },
      ];
    }
  }

  newData = newData.map((item, index) => {
    return index > 3
      ? {
          ...item,
          label: `additional-${index - 4}`,
        }
      : item;
  });

  return getListFiles(newData);
};

export const getSlug = (name: string, id: string | number) => {
  const slug = name.toLowerCase().split(" ").join("-");
  return `${slug}.${id}`;
};

export const getId = (name: string) => {
  const slug = name.split(".");
  return slug[slug.length - 1];
};
