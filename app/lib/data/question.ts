export type question = {
  id: string;
  type: "mcq" | "text";
  level?: "intern" | "fresher" | "junior" | "senior";
  position?: "backend" | "frontend" | "fullstack" | "devops";
  question: string;
  options?: string[];
  expectedAnswer?: string;
  expectedScore?: number;
  givenAnswer?: string;
};

export type questionResult = {
  questionId: string;
  answer: string;
  score: number;
};

// Explicit list: 3 questions per position x level (keep original simple form)
export const sampleQuestions: question[] = [
  // backend - intern
  {
    id: "backend-intern-1",
    type: "mcq",
    level: "intern",
    position: "backend",
    question: "Which HTTP method is typically used to retrieve data?",
    options: ["GET", "POST", "PUT", "DELETE"],
    expectedAnswer: "GET",
    expectedScore: 1,
  },
  {
    id: "backend-intern-2",
    type: "mcq",
    level: "intern",
    position: "backend",
    question: "Which database is relational (SQL)?",
    options: ["MongoDB", "MySQL", "Redis", "Cassandra"],
    expectedAnswer: "MySQL",
    expectedScore: 1,
  },
  {
    id: "backend-intern-3",
    type: "text",
    level: "intern",
    position: "backend",
    question: "Briefly explain what an API endpoint is.",
    expectedAnswer: "",
    expectedScore: 1,
  },

  // backend - fresher
  {
    id: "backend-fresher-1",
    type: "mcq",
    level: "fresher",
    position: "backend",
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Simple Query Language",
      "Sequential Query Language",
      "Standard Query List",
    ],
    expectedAnswer: "Structured Query Language",
    expectedScore: 1,
  },
  {
    id: "backend-fresher-2",
    type: "mcq",
    level: "fresher",
    position: "backend",
    question: "Which status code means success?",
    options: ["200", "404", "500", "301"],
    expectedAnswer: "200",
    expectedScore: 1,
  },
  {
    id: "backend-fresher-3",
    type: "text",
    level: "fresher",
    position: "backend",
    question: "Describe what a RESTful API is in one sentence.",
    expectedAnswer: "",
    expectedScore: 1,
  },

  // backend - junior
  {
    id: "backend-junior-1",
    type: "mcq",
    level: "junior",
    position: "backend",
    question: "Which technique helps scale read-heavy databases?",
    options: ["Replication", "Sharding", "Indexing", "Caching"],
    expectedAnswer: "Replication",
    expectedScore: 2,
  },
  {
    id: "backend-junior-2",
    type: "mcq",
    level: "junior",
    position: "backend",
    question: "Which of these is a message broker?",
    options: ["RabbitMQ", "MySQL", "Redis (not as broker)", "MongoDB"],
    expectedAnswer: "RabbitMQ",
    expectedScore: 2,
  },
  {
    id: "backend-junior-3",
    type: "text",
    level: "junior",
    position: "backend",
    question: "Explain the difference between horizontal and vertical scaling.",
    expectedAnswer: "",
    expectedScore: 2,
  },

  // backend - senior
  {
    id: "backend-senior-1",
    type: "mcq",
    level: "senior",
    position: "backend",
    question: "Which isolation level prevents dirty reads?",
    options: ["Read Committed", "Read Uncommitted", "Snapshot", "Serializable"],
    expectedAnswer: "Read Committed",
    expectedScore: 3,
  },
  {
    id: "backend-senior-2",
    type: "mcq",
    level: "senior",
    position: "backend",
    question: "Which pattern helps to decompose a monolith?",
    options: ["Microservices", "Singleton", "Factory", "Adapter"],
    expectedAnswer: "Microservices",
    expectedScore: 3,
  },
  {
    id: "backend-senior-3",
    type: "text",
    level: "senior",
    position: "backend",
    question:
      "Describe strategies for handling schema migrations in production.",
    expectedAnswer: "",
    expectedScore: 3,
  },

  // frontend - intern
  {
    id: "frontend-intern-1",
    type: "mcq",
    level: "intern",
    position: "frontend",
    question: "Which HTML tag is used for paragraphs?",
    options: ["<p>", "<div>", "<span>", "<section>"],
    expectedAnswer: "<p>",
    expectedScore: 1,
  },
  {
    id: "frontend-intern-2",
    type: "mcq",
    level: "intern",
    position: "frontend",
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Styling Sheets",
      "Colorful Style Syntax",
    ],
    expectedAnswer: "Cascading Style Sheets",
    expectedScore: 1,
  },
  {
    id: "frontend-intern-3",
    type: "text",
    level: "intern",
    position: "frontend",
    question: "What is the purpose of the <head> element in HTML?",
    expectedAnswer:
      "The <head> element contains meta information about the HTML page, such as its title and links to stylesheets.",
    expectedScore: 1,
  },

  // frontend - fresher
  {
    id: "frontend-fresher-1",
    type: "mcq",
    level: "fresher",
    position: "frontend",
    question: "Which property centers text in CSS?",
    options: [
      "text-align: center",
      "align-items: center",
      "justify-content: center",
      "center-text: true",
    ],
    expectedAnswer: "text-align: center",
    expectedScore: 1,
  },
  {
    id: "frontend-fresher-2",
    type: "mcq",
    level: "fresher",
    position: "frontend",
    question: "Which attribute sets an image source in HTML?",
    options: ["src", "href", "alt", "data-src"],
    expectedAnswer: "src",
    expectedScore: 1,
  },
  {
    id: "frontend-fresher-3",
    type: "text",
    level: "fresher",
    position: "frontend",
    question: "Explain what responsive design means.",
    expectedAnswer: "",
    expectedScore: 1,
  },

  // frontend - junior
  {
    id: "frontend-junior-1",
    type: "mcq",
    level: "junior",
    position: "frontend",
    question: "What is the virtual DOM?",
    options: [
      "A lightweight copy of the real DOM",
      "A server-side DOM",
      "A CSS abstraction",
      "A database for DOM nodes",
    ],
    expectedAnswer: "A lightweight copy of the real DOM",
    expectedScore: 2,
  },
  {
    id: "frontend-junior-2",
    type: "mcq",
    level: "junior",
    position: "frontend",
    question: "Which tool is commonly used for bundling JS?",
    options: ["Webpack", "Postgres", "Nginx", "Docker"],
    expectedAnswer: "Webpack",
    expectedScore: 2,
  },
  {
    id: "frontend-junior-3",
    type: "text",
    level: "junior",
    position: "frontend",
    question: "Describe when you would use CSS Grid vs Flexbox.",
    expectedAnswer: "",
    expectedScore: 2,
  },

  // frontend - senior
  {
    id: "frontend-senior-1",
    type: "mcq",
    level: "senior",
    position: "frontend",
    question: "Which pattern helps avoid prop drilling in React?",
    options: [
      "Context API",
      "Lifting State Up",
      "Redux only",
      "Direct DOM access",
    ],
    expectedAnswer: "Context API",
    expectedScore: 3,
  },
  {
    id: "frontend-senior-2",
    type: "mcq",
    level: "senior",
    position: "frontend",
    question: "What is code-splitting used for?",
    options: [
      "Reduce initial bundle size",
      "Increase CSS specificity",
      "Improve SEO",
      "Encrypt assets",
    ],
    expectedAnswer: "Reduce initial bundle size",
    expectedScore: 3,
  },
  {
    id: "frontend-senior-3",
    type: "text",
    level: "senior",
    position: "frontend",
    question: "Explain techniques to improve web app performance.",
    expectedAnswer: "",
    expectedScore: 3,
  },

  // fullstack - intern
  {
    id: "fullstack-intern-1",
    type: "mcq",
    level: "intern",
    position: "fullstack",
    question: "Which layer typically handles business logic?",
    options: ["Backend", "Frontend", "Database", "Proxy"],
    expectedAnswer: "Backend",
    expectedScore: 1,
  },
  {
    id: "fullstack-intern-2",
    type: "mcq",
    level: "intern",
    position: "fullstack",
    question: "What does REST stand for?",
    options: [
      "Representational State Transfer",
      "Remote State Transfer",
      "Representational Server Transfer",
      "Reserved State Transport",
    ],
    expectedAnswer: "Representational State Transfer",
    expectedScore: 1,
  },
  {
    id: "fullstack-intern-3",
    type: "text",
    level: "intern",
    position: "fullstack",
    question: "Describe the role of an API in a web application.",
    expectedAnswer: "",
    expectedScore: 1,
  },

  // fullstack - fresher
  {
    id: "fullstack-fresher-1",
    type: "mcq",
    level: "fresher",
    position: "fullstack",
    question: "Which database would you choose for relational data?",
    options: ["Postgres", "MongoDB", "Redis", "Elasticsearch"],
    expectedAnswer: "Postgres",
    expectedScore: 1,
  },
  {
    id: "fullstack-fresher-2",
    type: "mcq",
    level: "fresher",
    position: "fullstack",
    question: "Which HTTP status indicates 'Not Found'?",
    options: ["404", "200", "500", "403"],
    expectedAnswer: "404",
    expectedScore: 1,
  },
  {
    id: "fullstack-fresher-3",
    type: "text",
    level: "fresher",
    position: "fullstack",
    question: "Explain how the browser requests a webpage (high level).",
    expectedAnswer: "",
    expectedScore: 1,
  },

  // fullstack - junior
  {
    id: "fullstack-junior-1",
    type: "mcq",
    level: "junior",
    position: "fullstack",
    question: "What is CORS used for?",
    options: [
      "Cross-origin resource sharing",
      "Cookie operation routing system",
      "Client-only routing service",
      "Cache origin response system",
    ],
    expectedAnswer: "Cross-origin resource sharing",
    expectedScore: 2,
  },
  {
    id: "fullstack-junior-2",
    type: "mcq",
    level: "junior",
    position: "fullstack",
    question: "Which tool helps automate builds and tests?",
    options: ["CI tools (e.g., GitHub Actions)", "Dockerfile", "Nginx", "Sass"],
    expectedAnswer: "CI tools (e.g., GitHub Actions)",
    expectedScore: 2,
  },
  {
    id: "fullstack-junior-3",
    type: "text",
    level: "junior",
    position: "fullstack",
    question:
      "Describe how you would debug a failing API call from the frontend.",
    expectedAnswer: "",
    expectedScore: 2,
  },

  // fullstack - senior
  {
    id: "fullstack-senior-1",
    type: "mcq",
    level: "senior",
    position: "fullstack",
    question: "Which approach helps horizontally scale a web application?",
    options: [
      "Load balancing",
      "Single-threading",
      "Monolithic-only",
      "Inline scripts",
    ],
    expectedAnswer: "Load balancing",
    expectedScore: 3,
  },
  {
    id: "fullstack-senior-2",
    type: "mcq",
    level: "senior",
    position: "fullstack",
    question: "What is eventual consistency?",
    options: [
      "Data will become consistent over time",
      "Immediate consistency always",
      "Temporary inconsistency is impossible",
      "Consistency enforced by DB only",
    ],
    expectedAnswer: "Data will become consistent over time",
    expectedScore: 3,
  },
  {
    id: "fullstack-senior-3",
    type: "text",
    level: "senior",
    position: "fullstack",
    question:
      "Describe a migration strategy for a critical production database.",
    expectedAnswer: "",
    expectedScore: 3,
  },

  // devops - intern
  {
    id: "devops-intern-1",
    type: "mcq",
    level: "intern",
    position: "devops",
    question: "Which tool is commonly used for container builds?",
    options: ["Docker", "Kubernetes", "Ansible", "Terraform"],
    expectedAnswer: "Docker",
    expectedScore: 1,
  },
  {
    id: "devops-intern-2",
    type: "mcq",
    level: "intern",
    position: "devops",
    question: "What does CI stand for?",
    options: [
      "Continuous Integration",
      "Continuous Inspection",
      "Container Integration",
      "Continuous Infrastructure",
    ],
    expectedAnswer: "Continuous Integration",
    expectedScore: 1,
  },
  {
    id: "devops-intern-3",
    type: "text",
    level: "intern",
    position: "devops",
    question: "Explain what a Docker image is.",
    expectedAnswer: "",
    expectedScore: 1,
  },

  // devops - fresher
  {
    id: "devops-fresher-1",
    type: "mcq",
    level: "fresher",
    position: "devops",
    question: "Which system is used for orchestration of containers?",
    options: ["Kubernetes", "Docker Compose", "Git", "Vim"],
    expectedAnswer: "Kubernetes",
    expectedScore: 1,
  },
  {
    id: "devops-fresher-2",
    type: "mcq",
    level: "fresher",
    position: "devops",
    question: "Which file often defines CI steps?",
    options: [
      ".github/workflows/*.yml",
      "package.json",
      "Dockerfile",
      "README.md",
    ],
    expectedAnswer: ".github/workflows/*.yml",
    expectedScore: 1,
  },
  {
    id: "devops-fresher-3",
    type: "text",
    level: "fresher",
    position: "devops",
    question: "Describe what infrastructure as code means.",
    expectedAnswer: "",
    expectedScore: 1,
  },

  // devops - junior
  {
    id: "devops-junior-1",
    type: "mcq",
    level: "junior",
    position: "devops",
    question: "Which monitoring tool is commonly used?",
    options: ["Prometheus", "Postgres", "Redis", "Sass"],
    expectedAnswer: "Prometheus",
    expectedScore: 2,
  },
  {
    id: "devops-junior-2",
    type: "mcq",
    level: "junior",
    position: "devops",
    question: "What is immutable infrastructure?",
    options: [
      "Servers are replaced rather than modified",
      "Servers are modified in-place",
      "Containers are not allowed",
      "Infrastructure cannot be versioned",
    ],
    expectedAnswer: "Servers are replaced rather than modified",
    expectedScore: 2,
  },
  {
    id: "devops-junior-3",
    type: "text",
    level: "junior",
    position: "devops",
    question: "Explain rollback strategies for deployments.",
    expectedAnswer: "",
    expectedScore: 2,
  },

  // devops - senior
  {
    id: "devops-senior-1",
    type: "mcq",
    level: "senior",
    position: "devops",
    question: "Which tool is used to provision cloud resources declaratively?",
    options: ["Terraform", "Gulp", "Webpack", "Jest"],
    expectedAnswer: "Terraform",
    expectedScore: 3,
  },
  {
    id: "devops-senior-2",
    type: "mcq",
    level: "senior",
    position: "devops",
    question: "What is canary deployment?",
    options: [
      "Deploying to a small subset of users first",
      "Deploying simultaneously to all users",
      "Deploying only to staging",
      "Using only blue-green",
    ],
    expectedAnswer: "Deploying to a small subset of users first",
    expectedScore: 3,
  },
  {
    id: "devops-senior-3",
    type: "text",
    level: "senior",
    position: "devops",
    question: "Describe how you would secure CI/CD pipelines.",
    expectedAnswer: "",
    expectedScore: 3,
  },
];
