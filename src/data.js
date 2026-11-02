export const profile = {
  name: 'Machagiri Nirudu',
  role: 'Software Engineer',
  email: 'machagirimudhiraj39@gmail.com',
  phone: '+91 90148 79830',
  location: 'Hyderabad, India',
  linkedin: 'https://www.linkedin.com/in/nirudu/',
  github: 'https://github.com/machagiri-max',
}

export const projects = [
  {
    title: 'ContractLens',
    tag: 'AI contract review',
    live: 'https://contract-lens-weld.vercel.app/', code: 'https://github.com/machagiri-max/ContractLens',
    blurb: 'Helps freelancers understand contracts without paying a lawyer. Upload a PDF, get key terms, risky clauses and answers with citations.',
    points: [
      'RAG pipeline: question → retrieve chunks → OpenAI with context → cited answer',
      'JSON-mode extraction for payment, notice period, liability and IP, with "not specified" instead of guesses',
      'FastAPI + PostgreSQL + ChromaDB, JWT auth, Dockerized, deployed solo on Render and Vercel',
    ],
    stack: ['FastAPI', 'PostgreSQL', 'ChromaDB', 'OpenAI', 'Docker', 'JWT'],
    featured: true,
  },
  {
    title: 'DevFlow',
    tag: 'URL shortener + CI/CD',
    code: 'https://github.com/machagiri-max/devflow',
    blurb: 'Built to learn how real teams ship. Every push to main is tested, built, scanned and deployed automatically.',
    points: [
      'Redis-cached redirects served in under 1 ms',
      'Multi-stage Docker build: ~900 MB down to ~120 MB',
      'GitHub Actions: pytest 70% gate, flake8, multi-arch build, Trivy scan, SSH deploy',
      'Nginx rate limiting, Prometheus metrics, Grafana dashboards',
    ],
    stack: ['Flask', 'Redis', 'GitHub Actions', 'Trivy', 'Nginx', 'Grafana'],
  },
  {
    title: 'Zepto Clone',
    tag: 'E-commerce platform',
    live: 'https://zepto-7x7y7t4ut-machagirimudhiraj39-3571s-projects.vercel.app/', code: 'https://github.com/machagiri-max/Zepto',
    blurb: 'Grocery delivery app with catalog, search, cart and checkout, built around a solid backend.',
    points: [
      'Normalized PostgreSQL schema with indexes on SKU and order status',
      'Checkout runs in DB transactions: no double orders, no race conditions',
      'JWT auth with user and admin roles; React + Tailwind frontend on Vercel',
    ],
    stack: ['Django', 'PostgreSQL', 'React', 'Tailwind'],
  },
  {
    title: 'Intrusion Detection System',
    tag: 'College major project',
    code: 'https://github.com/machagiri-max?tab=repositories',
    blurb: 'Network traffic classifier on NSL-KDD reaching 97%+ accuracy with Random Forest and SVM.',
    points: [
      'SMOTE for class imbalance, cross-validated tuning on precision, recall and F1',
      'Model serialized and served through a FastAPI endpoint for real-time predictions',
    ],
    stack: ['Scikit-learn', 'SMOTE', 'FastAPI'],
  },
]

export const aiSkills = [
  { name: 'RAG pipelines', note: 'Chunking, embeddings, retrieval, cited answers (ContractLens)' },
  { name: 'LLM app development', note: 'OpenAI API, LangChain, context building, streaming responses' },
  { name: 'Prompt engineering', note: 'System prompts, few-shot examples, output constraints' },
  { name: 'Structured outputs', note: 'JSON mode, schema validation, safe "not specified" fallbacks' },
  { name: 'Vector search', note: 'ChromaDB, similarity search, embedding models' },
  { name: 'Hallucination control', note: 'Grounding answers in sources, refusing when evidence is missing' },
  { name: 'Classical ML', note: 'Scikit-learn, Random Forest, SVM, SMOTE, cross-validation' },
  { name: 'Model serving', note: 'FastAPI inference endpoints, Docker, CI/CD for ML services' },
  { name: 'AI agents & tool use', note: 'Function calling and multi-step LLM workflows (learning)' },
  { name: 'LLM evaluation', note: 'Test sets for answer quality, citation checks (learning)' },
]

export const skills = {
  Languages: ['Python', 'JavaScript', 'SQL', 'Java (basic)'],
  Backend: ['FastAPI', 'Flask', 'Django', 'REST APIs', 'JWT', 'OAuth2'],
  Databases: ['PostgreSQL', 'MySQL', 'Redis', 'ChromaDB'],
  Frontend: ['React', 'Vite', 'Tailwind CSS', 'HTML5', 'CSS3'],
  'DevOps & tools': ['Docker', 'GitHub Actions', 'Nginx', 'Linux', 'Prometheus', 'Grafana', 'Trivy', 'Git'],
  'Core CS': ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
}

export const certs = [
  'AWS Cloud Practitioner Essentials',
  'Oracle Cloud Infrastructure AI Foundations',
  'Software Engineering Job Simulation, JPMorgan Chase & Co. (Forage)',
]

// Chunks the "Ask my portfolio" widget searches over
export const chunks = [
  { src: 'About', text: 'I am a B.Tech CSE (Data Science) graduate from TKR College of Engineering, Hyderabad, 2023 to 2026. I build full-stack apps and backend systems with Python and Java and I am learning to plug AI into real products.' },
  { src: 'ContractLens', text: 'ContractLens is an AI contract review platform. It reads PDF contracts, extracts payment terms, notice period, liability and IP rights, flags risky clauses and answers questions using a RAG pipeline with source citations.' },
  { src: 'ContractLens', text: 'ContractLens uses FastAPI, PostgreSQL and ChromaDB with OpenAI. Structured extraction uses JSON mode and returns "not specified" rather than hallucinating. It is deployed with Docker on Render and Vercel.' },
  { src: 'DevFlow', text: 'DevFlow is a URL shortener with a full CI/CD pipeline: pytest coverage gate, flake8, multi-platform docker buildx, Trivy vulnerability scan and SSH deploy. Redirects are cached in Redis and served in under 1ms.' },
  { src: 'DevFlow', text: 'DevFlow monitoring uses Nginx rate limiting, Prometheus metrics and Grafana dashboards. The multi-stage Docker build shrinks the image from 900MB to 120MB.' },
  { src: 'Zepto Clone', text: 'Zepto Clone is a grocery delivery platform with Django, PostgreSQL, React and Tailwind. Checkout uses database transactions to avoid double orders and race conditions, with JWT auth for users and admins.' },
  { src: 'Intrusion Detection', text: 'The Intrusion Detection System is a college major project on the NSL-KDD dataset with 97 percent accuracy using Random Forest and SVM, SMOTE for imbalance, served through a FastAPI endpoint.' },
  { src: 'Skills', text: 'Skills: Python, JavaScript, SQL, FastAPI, Flask, Django, React, PostgreSQL, Redis, Docker, GitHub Actions, LangChain, RAG, vector embeddings, OpenAI API and scikit-learn.' },
  { src: 'Certifications', text: 'Certifications: AWS Cloud Practitioner Essentials, Oracle Cloud Infrastructure AI Foundations and the JPMorgan Chase Software Engineering job simulation on Forage.' },
  { src: 'Contact', text: 'You can reach me at machagirimudhiraj39@gmail.com or +91 90148 79830. I am based in Hyderabad, India and looking for a Software Engineer role.' },
]
