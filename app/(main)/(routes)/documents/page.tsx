"use client";

import Image from "next/image";

import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onNoteCreate = () => {
    const promise = create({ title: "No title" });

    toast.promise(promise, {
      loading: "Creating new note...",
      success: "New note was created!",
      error: "Failed to create a note.",
    });
  };

  return (
    <div className="h-full flex flex-col justify-center items-center space-y-4">
      <Image
        src="/empty.png"
        width="300"
        height="300"
        alt="Empty"
        className="dark:hidden"
        priority
      />
      <Image
        src="/empty-dark.png"
        width="300"
        height="300"
        alt="Empty"
        className="hidden dark:block"
        priority
      />

      {user?.firstName ? (
        <h2 className="text-lg font-medium">
          Welcome to the {user?.firstName}&apos;s Notex
        </h2>
      ) : (
        <h2 className="text-lg font-medium">
          Welcome to the {user?.username}&apos;s Notex
        </h2>
      )}

      <Button onClick={onNoteCreate}>
        <PlusCircle className="mr-2 h-5 w-5" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
