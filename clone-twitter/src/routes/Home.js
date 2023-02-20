import Tweet from "components/Tweet";
import { fbStorage, fbStore } from "fb";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userInfo }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [imgFileUrl, setImgFileUrl] = useState("");
  const imgFileInput = useRef();

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

  // 폼 제출 함수
  const onTweetSubmit = async (event) => {
    event.preventDefault();
    let fbImgUrl = "";
    // firebase에 이미지 파일 저장 및 이미지 파일 주소 가져오기
    if (imgFileUrl !== "") {
      const imgFileBucket = fbStorage
        .ref()
        .child(`${userInfo.email}/${uuidv4()}`);
      const response = await imgFileBucket.putString(imgFileUrl, "data_url");
      fbImgUrl = await response.ref.getDownloadURL();
    }

    // fireStore에 저장
    await fbStore.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      uid: userInfo.uid, // 작성자 id 저장
      fbImgUrl, // 이미지 URL 저장
    });
    // 초기화
    setTweet("");
    setImgFileUrl("");
    imgFileInput.current.value = "";
  };

  // 글(트윗) 저장 함수
  const onTweetChange = (event) => {
    const { value } = event.target;
    setTweet(value);
  };

  // 이미지 파일 업로드 변경 감지 함수
  const onFileChange = (event) => {
    const { files } = event.target; // 업로드된 파일 배열
    const file = files[0]; // 업로드한 첫번째 파일
    const fileReader = new FileReader(); // fileReader API

    fileReader.onloadend = (event) => {
      const { result } = event.currentTarget; // fileURL 추출
      setImgFileUrl(result); // fileURL 세팅
    };
    fileReader.readAsDataURL(file);
  };
  // 이미지 파일 업로드 취소 함수
  const onFileClear = () => {
    setImgFileUrl("");
    imgFileInput.current.value = "";
  };

  return (
    <div>
      <form onSubmit={onTweetSubmit}>
        <input
          onChange={onTweetChange}
          value={tweet}
          type="text"
          placeholder="니 생각을 적어랏"
          maxLength={120}
        />
        <input
          onChange={onFileChange}
          type="file"
          accept="image/*"
          ref={imgFileInput}
        />
        <input type="submit" value="Tweet" />
        {imgFileUrl && (
          <div>
            <img src={imgFileUrl} width="50" height="50" alt="fileUrl" />
            <button onClick={onFileClear}>이미지 업로드 취소</button>
          </div>
        )}
      </form>

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
