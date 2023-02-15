import { fbStore } from "fb";
import React, { useState } from "react";

const Tweet = ({ tweet, isOwner }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedTweet, setUpdatedTweet] = useState(tweet.text);

  // 트윗 삭제 함수
  const onDel = async () => {
    const isDel = window.confirm("트윗을 삭제하시겠습니까?");
    if (isDel) {
      // DB에서 삭제
      await fbStore.doc(`tweets/${tweet.pid}`).delete();
    }
  };
  // 수정모드 함수
  const toggleEditMode = () => setEditMode((prev) => !prev);

  // 수정할 트윗 인풋 함수
  const onEditChange = (event) => {
    const { value } = event.target;
    setUpdatedTweet(value);
  };

  // 수정할 트윗 폼 제출 함수
  const onEditSubmit = async (event) => {
    event.preventDefault();
    // DB에서 수정
    await fbStore.doc(`tweets/${tweet.pid}`).update({
      text: updatedTweet,
    });
    // 수정모드 종료
    setEditMode(false);
  };

  return (
    <div>
      {/* 수정 중일 경우 */}
      {editMode ? (
        <>
          <form onSubmit={onEditSubmit}>
            <input
              onChange={onEditChange}
              type="text"
              placeholder="트윗을 수정해보세요!"
              value={updatedTweet}
              required
            />
            <input type="submit" value="수정" />
          </form>
          <button onClick={toggleEditMode}>취소</button>
        </>
      ) : (
        <>
          <h4>{tweet.text}</h4>
          {/* 작성자만 수정/삭제 가능 */}
          {isOwner && (
            <>
              <button onClick={toggleEditMode}>수정</button>
              <button onClick={onDel}>삭제</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
