import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { registerReviewSchema } from "@/validators/review";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import React, { useState } from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FieldArrayWithId,
} from "react-hook-form";
import styled from "styled-components";
import Trash from "@/assets/Trash.svg";
import { ErrorMessage } from "@hookform/error-message";
import { useSession } from "next-auth/react";
import { uploadImagesFn } from "@/utils/uploadImages";
import CommonSpinner from "../ui/CommonSpinner";
import useReview from "@/hook/mutate/review/useReview";
import WriteReviewInputImage from "./InputImage";
import { TReviewFormData, TNewReview, TReview } from "@/types";

interface PropsType {
  selectshopId?: string;
  setIsWriteReviewOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  type?: string;
  prevReview?: TReview;
  setIsEditReview?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewEditorContainer = ({
  selectshopId,
  setIsWriteReviewOpen,
  type,
  prevReview,
  setIsEditReview,
}: PropsType) => {
  const [files, setFiles] = useState<File[]>([]);
  const { data: userData } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { reviewMutate } = useReview(type, selectshopId);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TReviewFormData>({
    resolver: zodResolver(registerReviewSchema),
    defaultValues: {
      reviewImages: null,
      description: prevReview?.description || "",
      advantages: prevReview?.advantages
        ? prevReview.advantages.map((advantage) => ({ value: advantage }))
        : [{ value: "" }],
      disAdvantages: prevReview?.disAdvantages
        ? prevReview.disAdvantages.map((disAdvantage) => ({
            value: disAdvantage,
          }))
        : [{ value: "" }],
      tags: prevReview?.tags || "",
    },
  });

  const {
    fields: advantageFields,
    append: advantageAppend,
    remove: advantageRemove,
  } = useFieldArray({
    control,
    name: "advantages",
  });

  const {
    fields: disAdvantageFields,
    append: disAdvantageAppend,
    remove: disAdvantageRemove,
  } = useFieldArray({
    control,
    name: "disAdvantages",
  });

  const addReviewSubmit: SubmitHandler<TReviewFormData> = async ({
    description,
    advantages,
    disAdvantages,
    tags,
  }) => {
    setIsLoading(true);
    const uploadImages = await uploadImagesFn(files);
    const existingImages = prevReview?.reviewImages
      ? prevReview.reviewImages.split(",")
      : [];
    const newUploadedImages =
      uploadImages!.length > 0 ? uploadImages : existingImages;
    const newReview: TNewReview = {
      selectshopId,
      reviewImages:
        newUploadedImages!.length > 0 ? newUploadedImages?.join(",") : null,
      description,
      advantages: advantages?.map((item) => item.value) || null,
      disAdvantages: disAdvantages?.map((item) => item.value) || null,
      tags: tags,
      userId: userData?.user?.id,
    };

    try {
      if (type === "write") {
        reviewMutate.mutate(newReview);
        alert("작성이 완료 되었습니다.");
        setIsWriteReviewOpen!(false);
      } else if (type === "edit") {
        const updateReview = {
          ...newReview,
          id: prevReview?.id,
        };
        reviewMutate.mutate(updateReview);
        alert("수정이 완료 되었습니다.");
        setIsEditReview!(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.ReviewEditorContainer>
      <S.ReviewEditorInner onSubmit={handleSubmit(addReviewSubmit)}>
        <S.ReviewEditorTitle>
          ✍ 후기 {type === "edit" ? "수정" : "등록"}하기
        </S.ReviewEditorTitle>
        <S.ReviewEditorUl>
          <S.InputLiRow>
            <WriteReviewInputImage
              files={files}
              setFiles={setFiles}
              prevReview={prevReview?.reviewImages}
            />
          </S.InputLiRow>
          <S.InputLiRow>
            <S.Label htmlFor="description">후기</S.Label>
            <S.TextAreaWrap>
              <S.TextArea
                id="description"
                {...register("description")}
                maxLength={50}
              />
              <S.StringLength>
                {watch("description").length}
                /50
              </S.StringLength>
            </S.TextAreaWrap>
            <ErrorMessage
              errors={errors}
              name="description"
              render={({ message }) => (
                <S.ReviewErrorMessage>{message}</S.ReviewErrorMessage>
              )}
            />
          </S.InputLiRow>
          <S.InputLiRow>
            <S.Label htmlFor="advantage">
              장점
              <S.AddButton
                type="button"
                onClick={() => advantageAppend({ value: "" })}
              >
                +
              </S.AddButton>
            </S.Label>
            {advantageFields.map(
              (
                field: FieldArrayWithId<TReviewFormData, "advantages", "id">,
                index
              ) => (
                <div key={field.id} style={{ marginBottom: "10px" }}>
                  <S.InputWrap>
                    <S.Input
                      id={`advantage-${index}`}
                      {...register(`advantages.${index}.value` as const)}
                    />
                    {index > 0 && (
                      <button onClick={() => advantageRemove(index)}>
                        <Trash fill={`${styleColor.GRAY[200]}`} />
                      </button>
                    )}
                  </S.InputWrap>
                  <ErrorMessage
                    errors={errors}
                    name={`advantages.${index}.value`}
                    render={({ message }) => (
                      <S.ReviewErrorMessage>{message}</S.ReviewErrorMessage>
                    )}
                  />
                </div>
              )
            )}
          </S.InputLiRow>
          <S.InputLiRow>
            <S.Label htmlFor="disAdvantage">
              단점
              <S.AddButton
                type="button"
                onClick={() => disAdvantageAppend({ value: "" })}
              >
                +
              </S.AddButton>
            </S.Label>
            {disAdvantageFields.map(
              (
                field: FieldArrayWithId<TReviewFormData, "disAdvantages", "id">,
                index
              ) => {
                return (
                  <div key={field.id} style={{ marginBottom: "10px" }}>
                    <S.InputWrap>
                      <S.Input
                        id={`disAdvantage-${index}`}
                        {...register(`disAdvantages.${index}.value` as const)}
                      />
                      {index > 0 && (
                        <button onClick={() => disAdvantageRemove(index)}>
                          <Trash fill={`${styleColor.GRAY[200]}`} />
                        </button>
                      )}
                    </S.InputWrap>
                    <ErrorMessage
                      errors={errors}
                      name={`disAdvantages.${index}.value`}
                      render={({ message }) => (
                        <S.ReviewErrorMessage>{message}</S.ReviewErrorMessage>
                      )}
                    />
                  </div>
                );
              }
            )}
          </S.InputLiRow>
          <S.InputLiRow>
            <S.Label htmlFor="tags">추천 브랜드</S.Label>
            <S.InputWrap>
              <S.Input
                id="tags"
                placeholder="쉼표(,)로 구분하면 멋진 태그가 될거에요!"
                {...register("tags")}
              />
            </S.InputWrap>
          </S.InputLiRow>
        </S.ReviewEditorUl>
        <S.WriteButtonWrap>
          <Button color="secondary" type="submit" sx={{ width: "100%" }}>
            저장{isLoading && <CommonSpinner />}
          </Button>
        </S.WriteButtonWrap>
      </S.ReviewEditorInner>
    </S.ReviewEditorContainer>
  );
};

export default ReviewEditorContainer;

const S = {
  ReviewEditorContainer: styled.div``,
  ReviewEditorInner: styled.form`
    padding: 20px 0px;
  `,
  ReviewEditorTitle: styled.h1`
    ${styleFont.title.tit_md}
    font-weight: 600;
    margin-bottom: 15px;
  `,
  ReviewEditorUl: styled.ul`
    li:first-child {
      padding: 0px;
    }
  `,
  InputLiRow: styled.li`
    padding: 0px 12px;
    margin-bottom: 15px;
  `,
  Label: styled.label`
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 10px;
    ${styleFont.text.txt_md}
    font-weight: 500;
  `,
  ImageInput: styled.input`
    display: none;
  `,
  TextAreaWrap: styled.div`
    position: relative;
    right: 0;
    bottom: 0;
  `,
  TextArea: styled.textarea`
    max-width: 94%;
    width: 94%;
    height: 90px;
    padding: 12px 7px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 4px;
    outline: none;
    resize: none;
    &::placeholder {
      font-size: 14px;
      color: #d9dfeb;
    }
  `,
  StringLength: styled.p`
    position: absolute;
    right: 10px;
    bottom: 10px;
    ${styleFont.text.txt_md}
    color: ${styleColor.GRAY[400]};
  `,
  InputWrap: styled.div`
    display: flex;
    justify-content: space-between;
    gap: 7px;
    width: 97%;
    padding: 12px 0px;
    padding-right: 7px;
    margin-bottom: 7px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 4px;
    outline: none;
    button {
      cursor: pointer;
    }
  `,
  Input: styled.input`
    width: 100%;
    border: none;
    outline: none;
    text-indent: 7px;
    &::placeholder {
      font-size: 14px;
      color: #d9dfeb;
    }
  `,
  AddButton: styled.button`
    cursor: pointer;
    width: 20px;
    height: 20px;
    background-color: ${styleColor.INDIGO[0]};
    ${styleFont.text.txt_sm}
    color: #fff;
    border-radius: 4px;
  `,
  WriteButtonWrap: styled.div`
    padding: 0px 12px;
  `,
  ReviewErrorMessage: styled.p`
    color: red;
    font-size: 14px;
  `,
};
