"use client";

import { SignOutButton, useUser } from "@clerk/clerk-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronsLeftRightIcon } from "lucide-react";

export const UserItem = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="group/usermenu">
        <div
          role="button"
          className="flex items-center text-sm p-3 y-full hover:bg-primary/5"
        >
          <div className="flex items-center gap-x-2 w max-w-[250px]">
            <Avatar className="w-7 h-7">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            {user?.fullName ? (
              <span className="font-medium line-clamp-1">
                {user?.fullName}&apos;s Notex
              </span>
            ) : (
              <span className="font-medium line-clamp-1">
                {user?.username}&apos;s Notex
              </span>
            )}
          </div>
          <div className="ml-2 text-muted-foreground opacity-0 group-hover/usermenu:opacity-100 transition">
            <ChevronsLeftRightIcon className="rotate-90 h-4 w-4" />
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
            <div className="space-y-1 ">
              {user?.fullName ? (
                <p className="text-sm line-clamp-1">{user?.fullName}&apos;s Notex</p>
              ) : (
                <p className="text-sm line-clamp-1">{user?.username}&apos;s Notex</p>
              )}
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground" asChild>
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
