export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  logo: string;
  description: string;
  skills: string[];
  saved: boolean;
  aboutCompany?: string;
  companySize?: string;
  companyIndustry?: string;
  companyWebsite?: string;
  responsibilities?: string[];
  qualifications?: string[];
};
