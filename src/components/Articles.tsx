import { CardDetails } from "./CardDetails";
import React, { useState } from "react";
import { Empty, Card } from "antd";
import { IArticle } from "../types/types";
const { Meta } = Card;

export const Articles = ({ articles }: { articles: IArticle[] }) => {
  const [selectedArticle, setArticleSelected] = useState({});
  const [enableDetailedView, setDetailedView] = useState(false);

  const handleMoreClick = (article: IArticle) => {
    setDetailedView(!enableDetailedView);
    setArticleSelected(article);
  };

  return (
    <div className="container">
      {!enableDetailedView ? (
        <ul className="parent">
          {articles && articles.length ? (
            articles.map((article, index) => (
              <li className="child" key={`${article}-${index}`}>
                <div className="headline-title">{article.title}</div>
                <Card
                  className="card-container"
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt={article.author}
                      src={
                        article.urlToImage ? article.urlToImage : "no-image.png"
                      }
                    />
                  }
                >
                  <Meta description={article.description} />
                  <div
                    className="more-btn"
                    onClick={() => handleMoreClick(article)}
                  >
                    More...
                  </div>
                </Card>
              </li>
            ))
          ) : (
            <Empty />
          )}
        </ul>
      ) : (
        <CardDetails article={selectedArticle} setDetailedView={setDetailedView} />
      )}
    </div>
  );
};
