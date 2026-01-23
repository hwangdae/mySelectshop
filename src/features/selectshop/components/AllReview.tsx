import { styleColor } from "@/shared/styles/styleColor";
import { styleFont } from "@/shared/styles/styleFont";
import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "@/features/register/api";
import { TReview } from "@/shared/types";
import User from "@/shared/components/User";
import Tags from "@/shared/components/Tags";

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
      {selectshopId === id && (
        <S.ReviewWrap>
          <User user={user} type={"allReview"} />
          <S.ReviewDescription>{description}</S.ReviewDescription>
          <Tags tags={tags} type={"allReview"} />
        </S.ReviewWrap>
      )}
    </>
  );
};

export default React.memo(AllReview)
// export default AllReview


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
    overflow-wrap: break-word;
  `,
};
