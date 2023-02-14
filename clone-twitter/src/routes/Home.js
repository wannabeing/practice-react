import { fbStore } from "fb";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweetList, setTweetList] = useState([]);

  useEffect(() => {
    getTweetList();
  }, []);

  // firebaseStore에서 트윗 리스트 가져오는 함수
  const getTweetList = async () => {
    const fromFB = await fbStore.collection("tweets").get();
    fromFB.forEach((document) => {
      const newTweet = {
        id: document.id, // id 저장
        ...document.data(), // 그 외 데이터 저장
      };
      setTweetList((prev) => [newTweet, ...prev]);
    });
  };
  // 폼 제출 함수
  const onSumbit = async (event) => {
    event.preventDefault();
    // fireStore에 저장
    await fbStore.collection("tweets").add({
      tweet,
      createdAt: Date.now(),
    });
    setTweet(""); // 초기화
  };
  // 글(트윗) 저장 함수
  const onChange = (event) => {
    const { value } = event.target;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSumbit}>
        <input
          onChange={onChange}
          value={tweet}
          type="text"
          placeholder="니 생각을 적어랏"
          maxLength={120}
        />
        <input type="submit" value="Tweet" />
      </form>

      <div>
        {tweetList.map((tweet) => (
          <div key={tweet.id}>
            <h4>{tweet.tweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
