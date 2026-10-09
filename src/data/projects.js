export const projects = [
  {
    id: "project-01",
    title: "Проект 01",
    category: "Product Design",
    type: "UX / UI",
    year: "2026",

    image: "/images/project-01.jpg",

    featured: true,
    protected: false,
    password: null,

    status: "Можно посмотреть",
    statusType: "available",

    description:
      "Исследование, структура и дизайн цифрового продукта от задачи до готового интерфейса.",

    tags: ["Product Design", "UX/UI", "Research", "Strategy"],

    about:
      "Цифровой продукт, в котором я отвечал за исследование пользовательского сценария, структуру продукта и визуальное решение интерфейса.",

    role: "Product Designer",

    responsibilities:
      "Исследование, UX, UI, прототипирование, работа с гипотезами и визуальной системой.",

    platforms: "Web",

    sections: [
      {
        type: "text",
        title: "Задача",
        content:
          "Нужно было разобраться в пользовательском сценарии, определить основные проблемы и выстроить понятную структуру продукта."
      },

      {
        type: "text",
        title: "Описание",
        content:
          "На первом этапе я изучил задачу, контекст продукта и предполагаемые сценарии использования. После этого сформировал структуру основных экранов и определил ключевые точки взаимодействия."
      },

      {
        type: "image",
        src: "/images/project-01-01.jpg",
        alt: "Первый экран проекта"
      },

      {
        type: "text",
        title: "Гипотеза и решения",
        content:
          "Основная гипотеза заключалась в том, что упрощение пользовательского сценария и более понятная иерархия информации помогут сократить количество лишних действий."
      },

      {
        type: "image",
        src: "/images/project-01-02.jpg",
        alt: "Интерфейс проекта"
      },

      {
        type: "text",
        content:
          "После проверки сценария я доработал структуру и перешёл к визуальной системе интерфейса."
      },

      {
        type: "images",
        items: [
          {
            src: "/images/project-01-03.jpg",
            alt: "Экран проекта"
          },
          {
            src: "/images/project-01-04.jpg",
            alt: "Дополнительный экран проекта"
          }
        ]
      },

      {
        type: "text",
        title: "Исследование",
        content:
          "Исследование помогло определить основные пользовательские сценарии и точки, в которых возникали сложности."
      },

      {
        type: "text",
        title: "Итог",
        content:
          "В результате получилась цельная структура продукта и визуальная система, которую можно развивать дальше без пересборки интерфейса."
      },

      {
        type: "image",
        src: "/images/project-01-05.jpg",
        alt: "Финальный результат"
      }
    ]
  },

  {
    id: "project-02",
    title: "Проект 02",
    category: "Product Design",
    type: "UX / UI",
    year: "2026",

    image: "/images/project-02.jpg",

    featured: true,
    protected: false,
    password: null,

    status: "В разработке",
    statusType: "development",

    description:
      "Концепция продукта, работа с пользовательским сценарием и визуальной системой интерфейса.",

    tags: ["Product Design", "UX/UI", "Concept", "Interface"],

    about:
      "Концептуальный проект цифрового продукта.",

    role: "Product Designer",

    responsibilities:
      "Концепция, UX/UI, структура продукта и прототипирование.",

    platforms: "Web",

    sections: [
      {
        type: "text",
        title: "Задача",
        content:
          "Описание задачи второго проекта."
      },

      {
        type: "text",
        title: "Решение",
        content:
          "Описание решения второго проекта."
      }
    ]
  },

  {
    id: "project-03",
    title: "Проект 03",
    category: "Product Design",
    type: "UX / UI",
    year: "2026",

    image: "/images/project-03.jpg",

    featured: false,
    protected: false,
    password: null,

    status: "По запросу",
    statusType: "request",

    description:
      "Проект доступен для просмотра по запросу.",

    tags: ["Product Design", "UX/UI", "Research", "Prototype"],

    about:
      "Проект доступен для просмотра по запросу.",

    role: "Product Designer",

    responsibilities:
      "Исследование, UX/UI и прототипирование.",

    platforms: "Web",

    sections: []
  },

  {
    id: "project-04",
    title: "Проект 04",
    category: "Product Design",
    type: "UX / UI",
    year: "2026",

    image: "/images/project-04.jpg",

    featured: false,
    protected: true,
    password: "demo",

    status: "По запросу",
    statusType: "request",

    description:
      "Закрытый проект с ограниченным доступом к материалам и процессу работы.",

    tags: ["Product Design", "UX/UI", "Strategy", "Prototype"],

    about:
      "Закрытый проект.",

    role: "Product Designer",

    responsibilities:
      "Стратегия, UX/UI и прототипирование.",

    platforms: "Web",

    sections: []
  }
];

export const featuredProjects = projects.filter(
  (project) => project.featured
);
