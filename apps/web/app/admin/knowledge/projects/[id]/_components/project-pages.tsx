"use client";

import { useState } from "react";
import { DataTable } from "../../../../../../../../../packages/components/src/components/core/data-table";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../../../../../../../../packages/components/src/components/core/card";
import { Button } from "../../../../../../../../../packages/components/src/components/core/button/button";
import { Eye, Link2, Star } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { Database } from "../../../../../../../../../packages/types/src/supabase";
import { getProjectPages } from "../../../../../../_actions/knowledge";
import { useRouter } from "next/navigation";

type KnowledgePage = Database["public"]["Tables"]["knowledge_pages"]["Row"] & {
	knowledge_page_collaborators: Array<{
		knowledge_users: {
			name: string;
			display_name: string;
		};
	}>;
};

interface ProjectPagesProps {
	projectId: string;
}

export function ProjectPages({ projectId }: ProjectPagesProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState<KnowledgePage[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	// ページデータを取得する関数
	const fetchPages = async (page: number) => {
		try {
			setIsLoading(true);
			const data = await getProjectPages(projectId, page);
			setPages(data);
		} catch (error) {
			console.error("Failed to fetch pages:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// 初回マウント時にデータを取得
	useState(() => {
		fetchPages(currentPage);
	});

	const columns: ColumnDef<KnowledgePage>[] = [
		{
			accessorKey: "title",
			header: "タイトル",
			cell: ({ row }) => (
				<div className="flex items-center gap-2">
					{row.original.pin_status > 0 && (
						<Star className="h-4 w-4 text-yellow-500" />
					)}
					<span>{row.original.title}</span>
				</div>
			),
		},
		{
			accessorKey: "views",
			header: "閲覧数",
		},
		{
			accessorKey: "linked_count",
			header: "リンク数",
			cell: ({ row }) => (
				<div className="flex items-center gap-1">
					<Link2 className="h-4 w-4" />
					<span>{row.original.linked_count}</span>
				</div>
			),
		},
		{
			accessorKey: "updated_at",
			header: "更新日時",
			cell: ({ row }) => (
				<span>{new Date(row.original.updated_at).toLocaleString("ja-JP")}</span>
			),
		},
		{
			accessorKey: "knowledge_page_collaborators",
			header: "最終編集者",
			cell: ({ row }) => {
				const lastEditor = row.original.knowledge_page_collaborators.find(
					(collaborator) => collaborator.knowledge_users,
				);
				return lastEditor ? lastEditor.knowledge_users.display_name : "-";
			},
		},
		{
			id: "actions",
			cell: ({ row }) => (
				<Button
					variant="ghost"
					size="icon"
					onClick={() =>
						window.open(
							`https://scrapbox.io/path/to/${row.original.scrapbox_id}`,
							"_blank",
						)
					}
				>
					<Eye className="h-4 w-4" />
				</Button>
			),
		},
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle>ページ一覧</CardTitle>
			</CardHeader>
			<CardContent>
				<DataTable columns={columns} data={pages} />
			</CardContent>
		</Card>
	);
}
