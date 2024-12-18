"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { getCapitalLettersOfName } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./__dashboard_ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./__dashboard_ui/DropDownMenu";

export default function UserAccountNav({ user }) {
  const baseAPIUrl = "/signin";

  return (
    <DropdownMenu className="!bg-primary-700  text-white">
      <DropdownMenuTrigger className="outline-none cursor-pointer" asChild>
        <Avatar>
          <AvatarImage src={user?.image} />
          <AvatarFallback className="!text-white">
            {user?.name && getCapitalLettersOfName(user?.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="!bg-primary">
        <div className="text-md p-2 flex flex-col">
          <Link href="/dashboard/admin/profile" className="!text-white">
            {user?.name && getCapitalLettersOfName(user?.name)}
          </Link>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: `${baseAPIUrl}` })}
          className="text-danger"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
