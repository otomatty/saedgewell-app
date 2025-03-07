"use server";

import { createClient } from "@saedgewell/lib/server";
import type { Database, ContactTypes } from "@saedgewell/types";

type DbResult<T extends keyof Database["public"]["Tables"]> =
	Database["public"]["Tables"][T]["Row"];
type CategoryRow = DbResult<"contact_categories">;

/**
 * カテゴリ一覧を取得する
 */
export async function getCategories(): Promise<ContactTypes.Category[]> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("contact_categories")
		.select("*")
		.order("created_at", { ascending: true });

	if (error) {
		console.error("Error fetching categories:", error);
		throw new Error("カテゴリの取得に失敗しました");
	}

	return (data as CategoryRow[]) ?? [];
}

/**
 * カテゴリを取得する
 */
export async function getCategory(
	id: string,
): Promise<ContactTypes.Category | null> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("contact_categories")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.error("Error fetching category:", error);
		throw new Error("カテゴリの取得に失敗しました");
	}

	return data as CategoryRow | null;
}
