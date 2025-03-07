"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@saedgewell/components/core";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@saedgewell/components/core";
import { User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "@saedgewell/actions";
import type { ProfileWithRole } from "@saedgewell/types";

interface UserMenuProps {
	profile: ProfileWithRole;
}

export const UserMenu = ({ profile }: UserMenuProps) => {
	const handleSignOut = async () => {
		try {
			await signOut();
		} catch (error) {
			console.error("ログアウトに失敗しました:", error);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage
						src={profile.avatarUrl ?? "/images/default-avatar.png"}
						alt={profile.fullName ?? "ユーザー"}
					/>
					<AvatarFallback>
						{profile.fullName?.[0]?.toUpperCase() ?? "U"}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>{profile.fullName ?? "ユーザー"}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/app/dashboard" className="cursor-pointer">
						<User className="mr-2 h-4 w-4" />
						ダッシュボード
					</Link>
				</DropdownMenuItem>
				{profile.isAdmin && (
					<DropdownMenuItem asChild>
						<Link href="/admin" className="cursor-pointer">
							<Settings className="mr-2 h-4 w-4" />
							管理者ページ
						</Link>
					</DropdownMenuItem>
				)}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={handleSignOut}
					className="text-destructive focus:text-destructive cursor-pointer"
				>
					<LogOut className="mr-2 h-4 w-4" />
					ログアウト
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
