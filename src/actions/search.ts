"use server";

import { redirect } from "next/navigation";

import paths from "@/paths";

export const search = async (formData: FormData) => {
  const term = formData.get("term");

  if (typeof term !== "string" || !term) {
    redirect(paths.home());
  }

  redirect(paths.search(term));
};
