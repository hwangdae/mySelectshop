import React from "react";
import styled from "styled-components";
import { styleColor } from "@/shared/styles/styleColor";

export const highlightText = (text: string, query: string) => {
  if (!query || !text.includes(query)) return text;

  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <Highlight key={`${part}-${index}`}>{part}</Highlight>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        )
      )}
    </>
  );
};

const Highlight = styled.mark`
  background-color: transparent;
  font-weight: 800;
  color: ${styleColor.YELLOW.PRIMARY};
`;