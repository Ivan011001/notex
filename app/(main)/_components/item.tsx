import { Id } from "@/convex/_generated/dataModel";

import { ChevronDown, ChevronRight, Divide, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ItemProps {
  id?: Id<"documents">;
  documentEmoji?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  shortcut?: string;
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
  shortcut,
}: ItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

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
          onClick={onExpand}
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

      {shortcut && (
        <kbd
          className="ml-auto pointer-events-none inline-flex 
        h-5 select-none items-center gap-1 rounded border bg-muted
        px-1.5 font-mono text-[10px] font-medium text-muted-foreground"
        >
          <span className="text-xs">⌘</span>
          <span>{shortcut}</span>
        </kbd>
      )}
    </div>
  );
};
