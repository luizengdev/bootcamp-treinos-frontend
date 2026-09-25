"use client";

import Image from "next/image";

import { authClient } from "@/app/_lib/auth-client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProfileAvatarProps {
  userName: string;
}

export const ProfileAvatar = ({ userName }: ProfileAvatarProps) => {
  const { data: session } = authClient.useSession();
  const userImage = session?.user.image;
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <Avatar className="size-[52px] overflow-hidden after:hidden">
      {userImage ? (
        <Image src={userImage} alt={userName} fill sizes="52px" className="object-cover" />
      ) : (
        <AvatarFallback className="font-heading text-lg font-semibold">{userInitial}</AvatarFallback>
      )}
    </Avatar>
  );
};
