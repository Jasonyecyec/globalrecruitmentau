import React, { useEffect, useState } from "react";
import { getUsers } from "@/lib/api";
import { User } from "@/app/_types/user";

export default async function Home() {
  //   const users: User[] = await getUsers();

  return (
    <div className="bg-red-200 ">
      <aside>
        <p>Dasboard</p>
      </aside>
    </div>
  );
}
