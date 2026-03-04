import React from "react";
import DataTable from "@/components/DataTable";
import { cn } from "@/lib/utils";

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2 animate-pulse">
        <div className="header-image bg-dark-400" />
        <div className="info">
          <div className="header-line-sm bg-dark-400 rounded-sm" />
          <div className="header-line-lg bg-dark-400 rounded-sm" />
        </div>
      </div>
      <div className="chart pt-4 animate-pulse">
        <div className="chart-skeleton bg-dark-400" />
      </div>
    </div>
  );
};

export const TrendingCoinsFallback = () => {
  const columns: DataTableColumn<number>[] = [
    {
      header: "Name",
      cellClassName: "name-cell",
      cell: () => (
        <div className="flex items-center gap-2 md:gap-3 animate-pulse">
          <div className="rounded-full size-8 md:size-9 bg-dark-400" />
          <div className="h-4 w-24 bg-dark-400 rounded-sm" />
        </div>
      ),
    },
    {
      header: "24h Change",
      cellClassName: "change-cell",
      cell: () => (
        <div className="flex items-center gap-1 animate-pulse">
          <div className="h-3.5 w-3.5 rounded-full bg-dark-400" />
          <div className="h-4 w-16 bg-dark-400 rounded-sm" />
        </div>
      ),
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: () => (
        <div className="animate-pulse">
          <div className="h-4 w-20 bg-dark-400 rounded-sm" />
        </div>
      ),
    },
  ];

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>

      <div className="trending-coins-table">
        <DataTable
          data={[1, 2, 3, 4, 5, 6]}
          columns={columns}
          rowKey={(i) => i}
          tableClassName="trending-coins-table"
          headerClassName="py-3!"
          bodyRowClassName="py-2!"
        />
      </div>
    </div>
  );
};
