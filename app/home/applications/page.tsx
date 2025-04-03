import { fetchCompanies } from "@/services/company";
import React, { Suspense } from "react";

export default async function Applications() {
  const companies = await fetchCompanies();
  console.log(companies);

  return (
    <div>
      <p>Job Applications</p>
      {/* {companies.map((item, index) => (
        <p key={index}>{item.name}</p>
      ))} */}
    </div>
  );
}
