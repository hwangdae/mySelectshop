"use client";

import { styleColor } from "@/styles/styleColor";
import React from "react";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

const S = {
  ModalOverlay: styled.div`
    position: absolute;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
  `,
  ModalContent: styled.div`
    position: relative;
    left: 0;
    top: 0;
    width: 360px;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: solid 1px #000;
    border-radius: 4px;
    padding: 30px;
    z-index: 99999;
  `,
  CloseButton: styled.button`
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    background: #ccc;
    cursor: pointer;
  `,
};
