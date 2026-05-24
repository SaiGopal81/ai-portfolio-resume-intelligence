import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    role: 'Data Engineering Intern',
    company: 'Sigmoid',
    location: 'India',
    period: '2026 - Present',
    type: 'Internship',
    description: 'Working on enterprise-grade data engineering solutions, building scalable data pipelines, and developing AI-powered platforms for autonomous data management.',
    responsibilities: [
      'Designing and implementing scalable ETL pipelines using PySpark and Delta Lake',
      'Building autonomous data engineering platforms with LangGraph-based AI agents',
      'Developing fraud detection and risk analytics pipelines on Azure cloud',
      'Creating airport operations analytics platforms using Azure Data Factory and Databricks',
      'Implementing data quality frameworks with Great Expectations',
      'Orchestrating complex data workflows using Apache Airflow',
      'Collaborating with cross-functional teams on data architecture decisions',
    ],
    technologies: [
      'PySpark', 'Delta Lake', 'LangGraph', 'Airflow', 'Azure',
      'ADF', 'ADLS Gen2', 'Databricks', 'Great Expectations',
      'Python', 'SQL', 'PostgreSQL',
    ],
    achievements: [
      'Built an AI-powered autonomous data engineering platform reducing pipeline maintenance by 70%',
      'Designed fraud detection pipeline processing 100K+ records with 95% accuracy',
      'Created airport operations analytics platform unifying 5+ data sources',
      'Implemented Delta Lake medallion architecture across multiple projects',
    ],
    linkedProjects: [
      'autonomous-data-platform',
      'fraud-detection-pipeline',
      'airport-operations',
    ],
  },
];
