import Tweet from "components/Tweet";
import TweetForm from "components/TweetForm";
import { fbStore } from "fb";
import React, { useEffect, useState } from "react";

const Home = ({ userInfo }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // DB가 뭔가를 할 때마다 트윗리스트 갱신
    fbStore
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const updatedTweets = snapshot.docs.map((document) => ({
          pid: document.id,
          ...document.data(),
        }));
        setTweets(updatedTweets);
      });
  }, []);

  return (
    <div>
      <TweetForm userInfo={userInfo} />
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.pid}
            tweet={tweet}
            isOwner={tweet.uid === userInfo.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
