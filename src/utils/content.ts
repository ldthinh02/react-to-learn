import { api } from "./api";

type Content = {
  name: string;
  value: string;
  type: "text" | "image";
  draft?: string;
  page: string;
  language: string;
};

type Messages = {
  messages: { [key: string]: string };
  images: { [key: string]: string };
};

export const getContent = (page: string, preview: boolean) =>
  api<Content[]>(`admin/cms/content?page=${page}`, {}, "raw").then((res) =>
    res.reduce(
      (prev, curr) => {
        if (curr.type === "image") {
          prev.images[curr.name] = preview
            ? curr.draft || curr.value
            : curr.value;
        } else {
          prev.messages[curr.name] = preview
            ? curr.draft || curr.value
            : curr.value;
        }

        return prev;
      },
      {
        messages: {},
        images: {},
      } as Messages
    )
  );
