import { Skill } from '@/types';

export const skills: Skill[] = [
  // Data Engineering
  { name: 'PySpark', category: 'Data Engineering', description: 'Distributed data processing framework for large-scale ETL and analytics.', usedFor: ['ETL Pipelines', 'Data Transformation', 'Batch Processing', 'Data Analysis'], relatedProjects: ['AI-Powered Autonomous Data Engineering Platform', 'Fraud Detection Pipeline', 'Airport Operations Analytics'] },
  { name: 'Delta Lake', category: 'Data Engineering', description: 'Open-source storage layer providing ACID transactions and schema enforcement for data lakes.', usedFor: ['Lakehouse Architecture', 'Data Versioning', 'Time Travel', 'ACID Transactions'], relatedProjects: ['AI-Powered Autonomous Data Engineering Platform', 'Fraud Detection Pipeline', 'Airport Operations Analytics'] },
  { name: 'ETL', category: 'Data Engineering', description: 'Extract, Transform, Load — core methodology for building data pipelines.', usedFor: ['Data Integration', 'Data Warehousing', 'Data Migration', 'Pipeline Development'], relatedProjects: ['AI-Powered Autonomous Data Engineering Platform', 'Fraud Detection Pipeline', 'Airport Operations Analytics'] },
  { name: 'Airflow', category: 'Data Engineering', description: 'Workflow orchestration platform for scheduling and monitoring data pipelines.', usedFor: ['Pipeline Orchestration', 'DAG Management', 'Task Scheduling', 'Workflow Monitoring'], relatedProjects: ['AI-Powered Autonomous Data Engineering Platform'] },
  { name: 'ADF (Azure Data Factory)', category: 'Data Engineering', description: 'Azure cloud-based ETL service for data integration and orchestration.', usedFor: ['Cloud ETL', 'Data Pipeline Orchestration', 'Data Movement', 'Workflow Automation'], relatedProjects: ['Fraud Detection Pipeline', 'Airport Operations Analytics'] },
  { name: 'Databricks', category: 'Data Engineering', description: 'Unified analytics platform for data engineering, data science, and machine learning.', usedFor: ['Spark Processing', 'Notebook Collaboration', 'ML Training', 'Data Analytics'], relatedProjects: ['Fraud Detection Pipeline', 'Airport Operations Analytics'] },
  { name: 'Pandas', category: 'Data Engineering', description: 'Powerful data manipulation and analysis library for Python.', usedFor: ['Data Cleaning', 'Exploratory Analysis', 'Feature Engineering'], relatedProjects: ['Job Matching Platform', 'Fraud Detection Pipeline'] },
  { name: 'NumPy', category: 'Data Engineering', description: 'Fundamental package for scientific computing in Python.', usedFor: ['Numerical Analysis', 'Array Operations', 'Mathematical Functions'], relatedProjects: ['Job Matching Platform'] },
  { name: 'Snowflake', category: 'Data Engineering', description: 'Cloud computing-based data cloud company.', usedFor: ['Data Warehousing', 'Data Lake', 'Data Engineering'], relatedProjects: [] },
  { name: 'dbt', category: 'Data Engineering', description: 'Data build tool for transforming data in the warehouse.', usedFor: ['Data Transformation', 'SQL pipelines', 'Data Modeling'], relatedProjects: [] },
  { name: 'Kafka', category: 'Data Engineering', description: 'Distributed event streaming platform.', usedFor: ['Real-time Streaming', 'Data Integration', 'Event Sourcing'], relatedProjects: [] },

  // AI & ML
  { name: 'LangGraph', category: 'AI & ML', description: 'Framework for building stateful multi-agent AI applications with cyclic computation.', usedFor: ['Multi-Agent Systems', 'AI Orchestration', 'Stateful AI Workflows', 'Agent Communication'], relatedProjects: ['AI-Powered Autonomous Data Engineering Platform'] },
  { name: 'LangChain', category: 'AI & ML', description: 'Framework for developing applications powered by language models.', usedFor: ['LLM Integration', 'RAG Systems', 'Prompt Management'], relatedProjects: ['Job Matching Platform'] },
  { name: 'Llama 3.1', category: 'AI & ML', description: 'Meta\'s open-source large language model for text generation and understanding.', usedFor: ['Text Generation', 'Content Optimization', 'Resume Analysis', 'Chatbot Development'], relatedProjects: ['AI-Powered Autonomous Data Engineering Platform'] },
  { name: 'Prompt Engineering', category: 'AI & ML', description: 'Designing effective prompts to guide LLM behavior for specific tasks.', usedFor: ['LLM Optimization', 'Task-Specific Prompts', 'Output Formatting', 'Context Engineering'], relatedProjects: ['AI-Powered Autonomous Data Engineering Platform'] },
  { name: 'Great Expectations', category: 'AI & ML', description: 'Data quality validation framework for testing, documenting, and profiling data.', usedFor: ['Data Quality Testing', 'Data Validation', 'Data Profiling', 'Pipeline Testing'], relatedProjects: ['AI-Powered Autonomous Data Engineering Platform'] },
  // Cloud & Orchestration
  { name: 'Azure', category: 'Cloud & Orchestration', description: 'Microsoft cloud platform used for enterprise data engineering and cloud-native applications.', usedFor: ['Azure Data Factory', 'ETL Pipelines', 'Data Orchestration', 'Cloud Infrastructure'], relatedProjects: ['Fraud Detection Pipeline', 'Airport Operations Analytics'] },
  { name: 'ADLS Gen2', category: 'Cloud & Orchestration', description: 'Azure Data Lake Storage Gen2 — scalable and secure data lake for big data analytics.', usedFor: ['Data Lake Storage', 'Hierarchical Namespace', 'Big Data Storage', 'Cloud Storage'], relatedProjects: ['Fraud Detection Pipeline', 'Airport Operations Analytics'] },
  { name: 'Microsoft Fabric', category: 'Cloud & Orchestration', description: 'Unified analytics platform combining data engineering, science, and business intelligence.', usedFor: ['Unified Analytics', 'Data Warehousing', 'Real-time Analytics', 'BI Integration'], relatedProjects: [] },

  // Databases
  { name: 'PostgreSQL', category: 'Databases', description: 'Advanced open-source relational database with extensibility and SQL compliance.', usedFor: ['Relational Data Storage', 'Complex Queries', 'ACID Transactions', 'Data Warehousing'], relatedProjects: ['MediHita Doctor Appointment Platform', 'Job Matching Platform'] },
  { name: 'Azure SQL', category: 'Databases', description: 'Fully managed relational database service built for the cloud.', usedFor: ['Cloud Database', 'Enterprise Applications', 'Scalable Storage'], relatedProjects: ['Fraud Detection Pipeline'] },
  { name: 'MySQL', category: 'Databases', description: 'Popular open-source relational database management system.', usedFor: ['Web Applications', 'CRUD Operations', 'Data Storage', 'Backend Development'], relatedProjects: [] },
  { name: 'MongoDB', category: 'Databases', description: 'NoSQL document database for flexible and scalable data storage.', usedFor: ['Document Storage', 'Flexible Schema', 'Real-time Data', 'API Backends'], relatedProjects: [] },
  { name: 'SQLite', category: 'Databases', description: 'Lightweight embedded relational database for local storage and prototyping.', usedFor: ['Local Storage', 'Prototyping', 'Embedded Applications', 'Testing'], relatedProjects: [] },

  // Programming Languages
  { name: 'Python', category: 'Programming Languages', description: 'Primary language for data engineering, AI/ML, and backend development.', usedFor: ['Data Engineering', 'Machine Learning', 'API Development', 'Automation'], relatedProjects: ['AI-Powered Autonomous Data Engineering Platform', 'Fraud Detection Pipeline', 'Airport Operations Analytics', 'AI Background Removal SaaS', 'Job Matching Platform'] },
  { name: 'SQL', category: 'Programming Languages', description: 'Standard language for querying and managing relational databases.', usedFor: ['Data Querying', 'Database Management', 'Data Analysis', 'ETL Logic'], relatedProjects: ['Fraud Detection Pipeline', 'Airport Operations Analytics', 'MediHita Doctor Appointment Platform'] },
  { name: 'C++', category: 'Programming Languages', description: 'Systems programming language used for competitive programming and algorithm optimization.', usedFor: ['Competitive Programming', 'Algorithm Design', 'Performance Optimization', 'Data Structures'], relatedProjects: [] },
  { name: 'Java', category: 'Programming Languages', description: 'Object-oriented programming language.', usedFor: ['Backend Systems', 'Enterprise Applications', 'Android Development'], relatedProjects: [] },

  // Web Development
  { name: 'Next.js', category: 'Web Development', description: 'React framework for production-grade web applications.', usedFor: ['Frontend Development', 'SSR', 'Full Stack Apps'], relatedProjects: ['MediHita Doctor Appointment Platform', 'AI Background Removal SaaS'] },
  { name: 'React', category: 'Web Development', description: 'JavaScript library for building user interfaces.', usedFor: ['UI Development', 'SPA', 'Component Architecture'], relatedProjects: ['MediHita Doctor Appointment Platform'] },
  { name: 'Node.js', category: 'Web Development', description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine.', usedFor: ['Backend Services', 'API Development', 'Microservices'], relatedProjects: [] },
  { name: 'FastAPI', category: 'Web Development', description: 'Modern, fast web framework for building APIs with Python.', usedFor: ['REST APIs', 'Microservices', 'ML Model Serving'], relatedProjects: ['AI Background Removal SaaS', 'Job Matching Platform'] },

  // Tools & Others
  { name: 'Git', category: 'Tools & Others', description: 'Distributed version control system.', usedFor: ['Source Code Management', 'Collaboration', 'Version History'], relatedProjects: [] },
  { name: 'Docker', category: 'Tools & Others', description: 'Platform for developing, shipping, and running applications in containers.', usedFor: ['Containerization', 'Deployment', 'Environment Isolation'], relatedProjects: [] },
  { name: 'Kubernetes', category: 'Tools & Others', description: 'Open-source container orchestration system.', usedFor: ['Container Orchestration', 'Scaling', 'Deployment Automation'], relatedProjects: [] },
  { name: 'PowerBI', category: 'Tools & Others', description: 'Interactive data visualization software product developed by Microsoft.', usedFor: ['Data Visualization', 'Business Intelligence', 'Dashboards'], relatedProjects: [] },
];

export const getSkillsByCategory = (): Record<string, Skill[]> => {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
};
