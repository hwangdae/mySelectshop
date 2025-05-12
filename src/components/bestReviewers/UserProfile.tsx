import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Follow from "../common/Follow";
import { getFollowerCount } from "@/lib/follow";
import { TBestReviewer } from "@/types";
import ProfileImage from "../ui/ProfileImage";

interface PropsType {
  user: TBestReviewer;
  index: number;
}

const UserProfile = ({ user, index }: PropsType) => {
  const { id, image, name, _count } = user;

  const { data: followerCount } = useQuery({
    queryKey: ["followCount", id],
    queryFn: () => getFollowerCount(id),
  });

  return (
    <S.ProfileInfoContainer>
      <S.ProfileInfoInner>
        <S.Rank>{index + 1}</S.Rank>
        <S.ProfileImageWrap>
          <ProfileImage src={image} width={"55px"} height={"55px"} />
        </S.ProfileImageWrap>
        <S.UserInfoWrap>
          <S.UserEmail>{name}</S.UserEmail>
          <S.UserActivity>
            <S.Activity>
              <h3>
                리뷰수<span>{_count.reviews}</span>
              </h3>
            </S.Activity>
            <S.Activity>
              <h3>
                팔로워<span>{followerCount}</span>
              </h3>
            </S.Activity>
          </S.UserActivity>
        </S.UserInfoWrap>
        <S.ActionButtons>
          <Follow id={id} />
        </S.ActionButtons>
      </S.ProfileInfoInner>
    </S.ProfileInfoContainer>
  );
};

export default UserProfile;

const S = {
  ProfileInfoContainer: styled.div`
    overflow: hidden;
    position: relative;
    left: 0;
    top: 0;
    cursor: pointer;
    width: 100%;
    margin-bottom: 20px;
    box-shadow: 0px 0px 10px 1px rgba(124, 124, 124, 0.1);
    border-radius: 4px;
  `,
  ProfileInfoInner: styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 20px 18px 20px 10px;
  `,
  Rank: styled.span`
    position: absolute;
    left: -20px;
    top: -32px;
    ${styleFont.title.tit_4xl}
    font-size: 130px;
    font-weight: 600;
    color: ${styleColor.WHITE};
    z-index: -1;
    text-shadow: 1px 1px 60px rgba(0, 0, 0, 0.1);
  `,
  ProfileImageWrap: styled.div`
    width: 20%;
  `,
  UserInfoWrap: styled.div`
    width: 45%;
  `,
  UserEmail: styled.h2`
    ${styleFont.text.txt_md}
    margin-bottom: 6px;
  `,
  UserActivity: styled.ul`
    display: flex;
  `,
  Activity: styled.li`
    display: flex;
    border-right: solid 1px #eee;
    margin-right: 5px;
    padding-right: 5px;
    letter-spacing: -1px;
    h3 {
      ${styleFont.text.txt_sm}
      color: ${styleColor.GRAY[600]};
    }
    span {
      margin-left: 4px;
      ${styleFont.text.txt_sm}
      color: ${styleColor.GRAY[600]};
    }
    &:last-child {
      border-right: none;
      padding-right: 0px;
    }
  `,
  ActionButtons: styled.div`
    width: 35%;
    display: flex;
    justify-content: end;
    gap: 7px;
  `,
};
