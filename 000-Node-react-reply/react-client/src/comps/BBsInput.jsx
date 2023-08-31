import React, { useEffect, useRef, useState } from "react";
import { filePreview, filesPreview } from "../modules/ImagePreview";

import css from "../css/BBsInput.module.css";
import { useBBsContext } from "../provider/BBsProvider";

const BBsInput = () => {
  const { bbs, setBBs, bbsInsertCB, imgRef, imgsRef } = useBBsContext();

  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);

  const setMainImage = (image) => {
    setImage(image);
  };

  const thumbImages = images.map((image) => {
    return <img src={image} onClick={(e) => setMainImage(image)} />;
  });

  const fileChangeHandler = async (e) => {
    const imgSrc = await filePreview(e.target.files[0]);
    setImage(imgSrc);
  };

  const filesChangHandler = async (e) => {
    const files = e.target.files;
    const imgSrcList = await Promise.all(filesPreview(files));

    setImages(imgSrcList);
  };

  const inputChangHandler = (e) => {
    const { name, value } = e.target;
    bbs.b_date = currentTime;
    setBBs({ ...bbs, [name]: value });
  };

  const insertButtonClickHandler = async () => {
    if (imgRef && imgRef.current) {
      bbsInsertCB();
      setBBs({
        ...bbs,
        b_nickname: "",
        b_content: "",
        b_image: "",
        b_origin_image: "",
      });
      setMainImage();
    } else {
      console.log("Image input is not ready yet.");
    }
  };

  const [currentTime, setCurrentTime] = useState(getCurrentFormattedTime());

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(getCurrentFormattedTime());
    }, 1000);
    return () => clearInterval(timerID);
  }, []);

  function getCurrentFormattedTime() {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = padZero(now.getMonth() + 1);
    const day = padZero(now.getDate());
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }

  function padZero(num) {
    return (num < 10 ? "0" : "") + num;
  }

  const textarea = useRef();
  const handleResizeHeight = () => {
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  return (
    <section className={css.main}>
      <div className={css.input_container}>
        <div>
          <input
            className="nickname"
            name="b_nickname"
            placeholder="닉네임을 써보자"
            value={bbs.b_nickname}
            onChange={inputChangHandler}
          />
        </div>

        <div>
          <textarea
            name="b_content"
            placeholder="내용을 작성해보자. "
            value={bbs.b_content}
            onChange={inputChangHandler}
            textarea
            rows={9}
          />
        </div>
        <div className={css.button}>
          <button onClick={insertButtonClickHandler}>작성</button>
        </div>
      </div>

      <div className={css.image_box}>
        <div>
          <input
            id="main_image"
            type="file"
            accept="image/*"
            onChange={fileChangeHandler}
            ref={imgRef}
          />
          <label htmlFor="main_image">이미지</label>
          <div className={css.thumb}>
            <img src={image ? image : ""} width="150px" />
          </div>
          <div>
            <input
              id="gallery_image"
              type="file"
              accept="image/*"
              multiple="multiple"
              onChange={filesChangHandler}
              ref={imgsRef}
            />
          </div>
        </div>
      </div>

      <div className="view"></div>
    </section>
  );
};
export default BBsInput;
