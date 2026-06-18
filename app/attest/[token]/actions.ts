"use server";

import { revalidatePath } from "next/cache";
import { signAttestation } from "@/lib/attest";

export async function actionSign(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  await signAttestation(token, name, email);
  revalidatePath(`/attest/${token}`);
}
