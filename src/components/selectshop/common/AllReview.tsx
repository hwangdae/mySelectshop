import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "@/lib/register";
import User from "@/components/common/User";
import Tags from "@/components/common/Tags";
import { TReview } from "@/types";

interface PropsType {
  review: TReview;
  id: string;
}

const AllReview = ({ review, id }: PropsType) => {
  const { selectshopId, userId, description, tags } = review;

  const { data: user } = useQuery({
    queryKey: ["userDetails", userId],
    queryFn: () => getUserDetails(userId),
  });

  return (
    <>
      {selectshopId === id ? (
        <S.ReviewWrap>
          <User user={user} type={"allReview"} />
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
