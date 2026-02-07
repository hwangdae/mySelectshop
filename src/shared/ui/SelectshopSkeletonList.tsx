import styled from "styled-components";

const SelectshopSkeletonList = ({ count = 10 }: { count?: number }) => {
  return (
    <S.List>
      {Array.from({ length: count }).map((_, idx) => (
        <S.Item key={idx} />
      ))}
    </S.List>
  );
};

export default SelectshopSkeletonList;

const S = {
  List: styled.ul`
  `,
  Item: styled.li`
    height: 150px;
    margin: 20px;
    border-radius: 4px;
    background-color: #f0f0f0;
  `,
};
