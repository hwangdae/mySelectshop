import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { UserType } from "@/types/authType";
import { ReviewType } from "@/types/reviewType";
import React from "react";
import styled from "styled-components";
import Tags from "../utilityComponents/Tags";
import { useQuery } from "@tanstack/react-query";
import UserContainer from "../utilityComponents/UserContainer";
import axios from "axios";

interface PropsType {
  review: ReviewType;
  id: string;
}

const AllReview = ({ review, id }: PropsType) => {
  const { selectshopId, userId, description, tags } = review;

  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await axios.get(`/api/register?userId=${userId}`);
      return res.data;
    },
  });

  return (
    <>
      {selectshopId === id ? (
        <S.ReviewWrap>
          <UserContainer user={user} type={"allReview"} />
          <S.ReviewDescription>{description}</S.ReviewDescription>
          <Tags tags={tags} type={"allReview"} />
        </S.ReviewWrap>
      ) : (
        ""
      )}
    </>
  );
};

export default AllReview;

const S = {
  ReviewWrap: styled.li`
    border: solid 1px ${styleColor.GRAY[100]};
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
  `,
  ReviewDescription: styled.h1`
    background-color: ${styleColor.GRAY[0]};
    padding: 10px;
    margin-bottom: 10px;
    ${styleFont.text.txt_sm}
    font-weight: 400;
  `,
};
