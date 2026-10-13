// Новый проект = новый объект в этом массиве. Карточка появится сама.
// featured: true  -> показывается на главной (держи 2 штуки)
// protected: true -> перед кейсом показывается PasswordGate
// sections: гибкие блоки в любом порядке:
//   { type: "heading", text }  { type: "text", text }
//   { type: "list", items: [] }  { type: "image", src, alt, caption }
const placeholder = "Описание проекта появится здесь";

export const projects = [
  {
    id: "project-01",
    title: "Название проекта",
    category: "Категория",
    type: "Web & App",
    year: "2026",
    image: null, // например "/images/projects/project-01.jpg"
    featured: true,
    protected: false,
    password: null,
    description: placeholder,
    sections: [
      { type: "heading", text: "Задача" },
      { type: "text", text: placeholder },
      { type: "image", src: null, alt: "Изображение проекта", caption: "Подпись" },
      { type: "heading", text: "Решение" },
      { type: "text", text: placeholder },
    ],
  },
  {
    id: "project-02",
    title: "Закрытый проект",
    category: "Категория",
    type: "Web",
    year: "2026",
    image: null,
    featured: true,
    protected: true,
    password: "demo", // ВРЕМЕННО. См. комментарий в PasswordGate.jsx
    description: placeholder,
    sections: [
      { type: "heading", text: "Процесс" },
      { type: "text", text: placeholder },
      { type: "list", items: [placeholder, placeholder] },
    ],
  },
  {
    id: "project-03",
    title: "Название проекта",
    category: "Категория",
    type: "App",
    year: "2025",
    image: null,
    featured: false,
    protected: false,
    password: null,
    description: placeholder,
    sections: [{ type: "text", text: placeholder }],
  },
];
