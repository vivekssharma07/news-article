import React from "react";
import { Card } from "antd";
import { IArticle } from "../types/types";

export const CardDetails = ({ article, setDetailedView }:{ article:IArticle,  setDetailedView:Function }) => {
  return (
    <div className="d-flex" style={{ justifyContent: "center" }}>
      {article && Object.keys(article).length && (
        <div>
          <div className="card-detail-title">{article.title}</div>
          <Card
            hoverable
            style={{ width: 740 }}
            cover={
              <img
                alt={article.author}
                src={article.urlToImage ? article.urlToImage : "no-image.png"}
              />
            }
          >
            <div>
              {article?.author && (
                <div>
                  <div className="font-bold">Author</div>
                  <div> {article.author} </div>
                </div>
              )}
              {article?.description && (
                <div>
                  <div className="font-bold">Description</div>
                  <div> {article.description} </div>
                </div>
              )}
              {article?.content && (
                <div>
                  <div className="font-bold">Content</div>
                  <div> {article.content} </div>
                </div>
              )}
              {article?.url && (
                <div>
                  <div className="font-bold">Reference Link</div>
                  <div>
                    <a href={article.url} style={{ wordWrap: "break-word" }}>
                      {article.url}
                    </a>
                  </div>
                </div>
              )}
              {article?.publishedAt && (
                <div>
                  <div className="font-bold">Published At</div>
                  <div> {article.publishedAt} </div>
                </div>
              )}
            </div>
          </Card>
          <div
            onClick={() => {
              setDetailedView(false);
            }}
            className="back-btn"
          >
            {`<< back to list`}
          </div>
        </div>
      )}
    </div>
  );
};
