"use client";
// import { toastError } from "@/config/adapters";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useState } from "react";

export interface QueryRenderProps {
  // RTQ data
  allData: {
    data: any;
    isError?: boolean;
    error?: FetchBaseQueryError | SerializedError | undefined;
    isLoading?: boolean;
    isFetching?: boolean;
  };
  name: string;

  toastDisabled?: boolean;

  // react-nodes
  NodeIsLoading?: React.ReactNode;
  NodeIsEmpty?: React.ReactNode;
  NodeIsError?: React.ReactNode;
  NodeSuccess: React.ReactNode;

  // EVENTS

  // GENERIC
  className?: string;
}

export const QueryRender = ({
  allData,
  name,
  toastDisabled,
  NodeIsLoading,
  NodeIsEmpty,
  NodeIsError,
  NodeSuccess,
}: QueryRenderProps) => {
  const [hasRendered, setHasRendered] = useState(false);

  if (allData && allData.error && allData.error && !hasRendered) {
    // !toastDisabled && toastError(errorMsg(allData.error ?? ""));
    setHasRendered(true);
  }

  return (
    <>
      {allData.isLoading ? (
        NodeIsLoading || <p>CARGANDO...</p>
      ) : !allData.data || allData.isError ? (
        NodeIsEmpty || <p>NO SE ENCONTRARON DATOS</p>
      ) : allData.data && allData.data.length == 0 ? (
        NodeIsError || <p>NO SE ENCONTRARON DATOS</p>
      ) : (
        <>{NodeSuccess}</>
      )}
    </>
  );
};
