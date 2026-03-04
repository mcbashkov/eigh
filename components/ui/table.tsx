"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Renders a semantic table inside a responsive wrapper with default styling and optional class overrides.
 *
 * @param className - Additional class names appended to the table's default classes
 * @param props - All other props are forwarded to the underlying `<table>` element
 * @returns The table element wrapped in a responsive container
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

/**
 * Renders a semantic table header element (<thead>) with default header-row bottom borders and optional custom classes.
 *
 * Forwards remaining props to the underlying <thead> element.
 *
 * @returns A <thead> element with data-slot="table-header" and merged class names
 */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("[&_tr]:border-b", className)} {...props} />;
}

/**
 * Renders a styled tbody element for table bodies.
 *
 * The element receives a data-slot of "table-body", merges the default class that removes the bottom border on the last row with any provided `className`, and forwards all other props to the underlying `tbody`.
 *
 * @returns The rendered `tbody` element with merged classes, `data-slot="table-body"`, and forwarded props.
 */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

/**
 * Renders a table footer (<tfoot>) element with default layout and styling.
 *
 * @returns The rendered `<tfoot>` element with merged class names and all received props applied.
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  );
}

/**
 * Table row component that renders a semantic `<tr>` with default row styles, hover behavior, and selected-state styling.
 *
 * @returns A `<tr>` element with merged class names (borders, hover background, selected state) and all forwarded props.
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a styled table header cell.
 *
 * Merges `className` with the component's default header classes and applies all other props to the underlying `<th>` element.
 *
 * @param className - Additional CSS classes to merge with the default header classes
 * @returns A `<th>` element with composed classes and forwarded props
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a table cell (<td>) element with predefined layout and spacing classes.
 *
 * @param className - Additional CSS class names to merge with the component's defaults
 * @returns A <td> element with merged class names and all other props forwarded to the element
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a styled table caption element.
 *
 * @returns The rendered `<caption>` element with default caption styling and any provided `className`
 */
function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
