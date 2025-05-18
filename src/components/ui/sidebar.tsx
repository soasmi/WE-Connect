import * as React from "react";
import { createContext, useContext, useEffect, useCallback, useMemo } from "react";
import { cva } from "class-variance-authority";

interface SidebarContextType {
  collapsed: boolean;
  collapsible: boolean;
  collapsedWidth: number;
  onCollapseToggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export interface SidebarProviderProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  collapsible?: boolean;
  collapsedWidth?: number;
  storageName?: string;
}

export function SidebarProvider({
  children,
  defaultCollapsed = false,
  collapsible = true,
  collapsedWidth = 56,
  storageName = "sidebar-collapsed",
}: SidebarProviderProps) {
  // Load initial collapsed state from localStorage or use default
  const [collapsed, setCollapsed] = React.useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(storageName);
      return storedValue !== null ? JSON.parse(storedValue) : defaultCollapsed;
    }
    return defaultCollapsed;
  });

  // Update localStorage when collapsed state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageName, JSON.stringify(collapsed));
    }
  }, [collapsed, storageName]);

  // Handler for toggling collapse state
  const onCollapseToggle = useCallback(() => {
    if (collapsible) {
      setCollapsed((prev) => !prev);
    }
  }, [collapsible]);

  // Create stable context value with useMemo to avoid unnecessary re-renders
  const value = useMemo(
    () => ({
      collapsed,
      collapsible,
      collapsedWidth,
      onCollapseToggle,
    }),
    [collapsed, collapsible, collapsedWidth, onCollapseToggle]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsible?: boolean;
}

export function Sidebar({
  children,
  className,
  collapsible = true,
  ...props
}: SidebarProps) {
  return (
    <aside
      className={`flex flex-col ${className || ""}`}
      data-collapsible={collapsible}
      {...props}
    >
      {children}
    </aside>
  );
}

interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({
  className,
  children,
  ...props
}: SidebarTriggerProps) {
  const { onCollapseToggle, collapsible } = useSidebar();

  if (!collapsible) return null;

  return (
    <button
      type="button"
      onClick={onCollapseToggle}
      className={`flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground ${
        className || ""
      }`}
      aria-label="Toggle sidebar"
      {...props}
    >
      {children || (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <line x1="9" x2="15" y1="3" y2="3" />
          <line x1="9" x2="15" y1="21" y2="21" />
          <path d="m9 3-6 6 6 6" />
          <path d="m15 3 6 6-6 6" />
        </svg>
      )}
    </button>
  );
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({
  children,
  className,
  ...props
}: SidebarContentProps) {
  return (
    <div className={`flex-1 overflow-auto ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SidebarGroup({
  children,
  className,
  defaultOpen,
  open: controlledOpen,
  onOpenChange,
  ...props
}: SidebarGroupProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(
    defaultOpen || false
  );
  
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleToggle = () => {
    if (isControlled) {
      onOpenChange?.(!controlledOpen);
    } else {
      setUncontrolledOpen(!uncontrolledOpen);
    }
  };

  return (
    <div
      className={`py-2 ${className || ""}`}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      <div onClick={handleToggle}>{children}</div>
    </div>
  );
}

interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroupLabel({
  children,
  className,
  ...props
}: SidebarGroupLabelProps) {
  const { collapsed } = useSidebar();
  
  if (collapsed) return null;
  
  return (
    <div
      className={`mb-2 px-4 text-xs font-medium uppercase text-muted-foreground ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
}

interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroupContent({
  children,
  className,
  ...props
}: SidebarGroupContentProps) {
  return (
    <div className={`space-y-1 ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenu({
  children,
  className,
  ...props
}: SidebarMenuProps) {
  return (
    <div className={`px-2 ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenuItem({
  children,
  className,
  ...props
}: SidebarMenuItemProps) {
  return (
    <div className={`${className || ""}`} {...props}>
      {children}
    </div>
  );
}

interface SidebarMenuButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const sidebarMenuButtonStyles = cva(
  "flex w-full items-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground", 
  {
    variants: {
      active: {
        true: "bg-accent text-accent-foreground",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export function SidebarMenuButton({
  children,
  className,
  asChild = false,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? React.Fragment : "div";
  return (
    <Comp {...(asChild ? {} : props)} className={asChild ? undefined : className}>
      {children}
    </Comp>
  );
}
