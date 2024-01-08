"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { useQuery, useMutation } from "convex/react";

import { UserItem } from "./user-item";
import { Item } from "./item";

import { ChevronsLeft, Menu, PlusCircle, Search, Settings } from "lucide-react";

import { api } from "@/convex/_generated/api";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Sidebar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  const isResizing = useRef(false);
  const sidebar = useRef<ElementRef<"aside"> | null>(null);
  const navbar = useRef<HTMLDivElement | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const documents = useQuery(api.documents.get);
  const create = useMutation(api.documents.create);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else resetWidth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    isResizing.current = true;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing.current) {
      return;
    }

    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebar.current && navbar.current) {
      sidebar.current.style.width = `${newWidth}px`;
      navbar.current.style.setProperty("left", `${newWidth}px`);
      navbar.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const collapse = () => {
    if (sidebar.current && navbar.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebar.current.style.width = "0";
      navbar.current.style.setProperty("left", "0");
      navbar.current.style.setProperty("width", "100%");

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const resetWidth = () => {
    if (sidebar.current && navbar.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebar.current.style.width = isMobile ? "100%" : "240px";
      navbar.current.style.setProperty("left", isMobile ? "100%" : "240px");
      navbar.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)");

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const onCreate = () => {
    const promise = create({ title: "No title" });

    toast.promise(promise, {
      loading: "Creating new note...",
      success: "New note was created!",
      error: "Failed to create a note.",
    });
  };

  return (
    <>
      <aside
        ref={sidebar}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto w-60 relative flex flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 rounded-sm text-muted-foreground hover:bg-neutral-300 dark:hover:bg-neutral-600 hover:text-primary dark:hover:text-secondary-foreground transition absolute top-3.5 right-3 opacity-0 group-hover/sidebar:opacity-100",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="w-6 h-6" />
        </div>
        <div>
          <UserItem />
          <Item label="Search" onClick={() => {}} icon={Search} isSearch />
          <Item label="Setting" onClick={() => {}} icon={Settings} />
          <Item label="New Note" onClick={onCreate} icon={PlusCircle} />
        </div>
        <div className="mt-2">
          {documents?.map((document) => {
            return (
              <div key={document._id}>
                <p>{document.title}</p>
              </div>
            );
          })}
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 cursor-ew-resize
          transition bg-primary/15 h-full w-1 absolute right-0 top-0"
        />
      </aside>
      <div
        ref={navbar}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <div
              onClick={resetWidth}
              role="button"
              className="h-8 w-8 rounded-sm text-muted-foreground hover:bg-neutral-200 dark:hover:bg-neutral-600 hover:text-primary dark:hover:text-secondary-foreground transition"
            >
              <Menu className="w-8 h-8" />
            </div>
          )}
        </nav>
      </div>
    </>
  );
};
