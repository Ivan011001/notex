import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronRight, LucideIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ItemProps {
  id?: Id<"documents">;
  documentEmoji?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
}

export const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  documentEmoji,
  expanded,
  onExpand,
  active,
  isSearch,
  level = 0,
}: ItemProps) => {
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();

    if (!id) {
      return;
    }

    const promise = create({ title: "No title", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }

        // router.push(`/documents/${documentId}`);
      }
    );

    toast.promise(promise, {
      loading: "Creating new note...",
      success: "New note was created!",
      error: "Failed to create a note.",
    });
  };

  return (
    <div
      role="button"
      onClick={onClick}
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary-5 text-primary"
      )}
    >
      {id && (
        <div
          onClick={handleExpand}
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
        >
          {<ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />}
        </div>
      )}

      {documentEmoji ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentEmoji}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>

      {isSearch && (
        <kbd
          className="ml-auto pointer-events-none inline-flex 
        h-5 select-none items-center gap-1 rounded border bg-muted
        px-1.5 font-mono text-[10px] font-medium text-muted-foreground"
        >
          <span className="text-xs">⌘</span>
          <span>K</span>
        </kbd>
      )}

      {id && (
        <div className="ml-auto flex otems-center gap-x-2">
          <div
            role="button"
            onClick={onCreate}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            <PlusIcon className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      className="flex gap-x-2 py-[3px]"
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};