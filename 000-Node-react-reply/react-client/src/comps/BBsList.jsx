import { useBBsContext } from "../provider/BBsProvider";
import css from "../css/BBsList.module.css";
import React, { useState } from "react";

const BBsList = () => {
  const { bbsList, setBBsList } = useBBsContext();
  const [visibleItemCount, setVisibleItemCount] = useState(5); // 처음에는 5개만 보이도록 설정
  const loadMoreItems = () => {
    setVisibleItemCount((prevCount) => prevCount + 5); // 예를 들어 5개씩 더 보여주도록 설정
  };

  const bbsItems = bbsList.map((bbs) => {
    return (
      <div key={bbs.b_seq} data-seq={bbs.b_seq} className={css.main}>
        <div className={css.list_image}>
          {bbs.b_image && (
            <img
              src={`/static/upload/${bbs.b_image}`}
              alt={bbs.b_origin_name}
            />
          )}
        </div>

        <div className={css.list_text}>
          <div className={css.list_nick}>{bbs.b_nickname}</div>
          <div className={css.list_content}>{bbs.b_content}</div>
          <div className={css.list_date}>{bbs.b_date}</div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div>{bbsItems.slice(0, visibleItemCount)}</div>
      {visibleItemCount < bbsList.length && (
        <button className={css.more} onClick={loadMoreItems}>
          더볼래?
        </button>
      )}
    </>
  );
};

export default BBsList;
