import { useQuery } from "@tanstack/react-query";
import UserContainer from "../utilityComponents/UserContainer";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";
import { styleFont } from "@/styles/styleFont";
import { styleColor } from "@/styles/styleColor";
import People from "@/assets/People.svg";
import { formatFollowCount } from "@/utils/formatFollowCount";
import axios from "axios";

interface PropsType {
  showFollow: boolean;
}
interface TabType {
  id: string;
  name: string;
  count: number | undefined;
}

const ShowFollowContainer = ({ showFollow }: PropsType) => {
  const router = useRouter();
    const pathname = usePathname()
  const { data: followList } = useQuery({
    queryKey: ["followList"],
    queryFn: async () => {
      const res = await axios.get("/api/follow");
      return res.data;
    },
  });
  console.log(followList,"팔로우 리스트")

  const FOLLOWTABNAV = [
    { id: "follower", name: "팔로워", count: followList?.length },
    { id: "following", name: "팔로잉", count: followList?.length },
  ];

  return (
    <S.ShowFollowContainer>
      <S.FollowNavWrap>
        {FOLLOWTABNAV.map((tab: TabType) => {
          return (
            <S.Content key={tab.id}>
              <S.TabButton
                onClick={() => router.push(`/?follow=${tab.id}`)}
                $isActive={pathname === tab.id}
              >
                <h1>
                  <span>{formatFollowCount(tab.count)}</span>
                  {tab.name}
                </h1>
              </S.TabButton>
            </S.Content>
          );
        })}
      </S.FollowNavWrap>
      <ul>
        {pathname === "follower" ? (
          followList && followList.length > 0 ? (
            followList?.map((user: any) => {
              return (
                <li key={user.id}>
                  <UserContainer user={user} type={"follow"} />
                </li>
              );
            })
          ) : (
            <S.EmptyMessage>
              <People fill={`${styleColor.BLACK[100]}`} />
              아직 팔로워가 없습니다.
            </S.EmptyMessage>
          )
        ) : followList && followList.length > 0 ? (
            followList.map((user: any) => {
            return (
              <li key={user.id}>
                <UserContainer user={user} type={"follow"} />
              </li>
            );
          })
        ) : (
          <S.EmptyMessage>
            <People fill={`${styleColor.WHITE}`} />
            아직 팔로잉이 없습니다.
          </S.EmptyMessage>
        )}
      </ul>
    </S.ShowFollowContainer>
  );
};

export default ShowFollowContainer;

const S = {
  ShowFollowContainer: styled.div`
    position: relative;
    left: 0;
    top: 0;
    height: calc(100vh - 272.5px);
    background-color: ${styleColor.GRAY[400]};
  `,
  FollowNavWrap: styled.ul`
    padding: 0px 12px;
    margin-bottom: 14px;
    display: flex;
    justify-content: start;
    border-bottom: solid 1px ${styleColor.BLACK[100]};
  `,
  Content: styled.li``,
  TabButton: styled.button<{ $isActive: boolean }>`
    cursor: pointer;
    padding: 10px 14px;
    border-bottom: ${(props) => (props.$isActive ? "2px solid #111" : "none")};
    h1 {
      ${styleFont.title.tit_xs}
      font-weight: ${(props) => (props.$isActive ? "600" : "400")};
      color: #111;
      span {
        margin-right: 4px;
      }
    }
  `,
  EmptyMessage: styled.h1`
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    ${styleFont.title.tit_md};
    color: ${styleColor.WHITE};
  `,
};
