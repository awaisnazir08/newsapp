import React from "react";
const NewsItem = (props) => {
  let {
    title,
    description,
    imageUrl,
    newsUrl,
    mode,
    author,
    date,
    time,
    source,
  } = props;
  return (
    <div>
      <div
        className="card"
        style={{
          width: "18rem",
          backgroundColor: mode === "light" ? "white" : "#10404a",
        }}
      >
        <h6
          style={{
            display: "flex",
            position: "absolute",
            justifyContent: "flex-end",
            right: "0",
          }}
        >
          <span className="badge bg-danger">{source}</span>
        </h6>
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5
            className={`card-title text-${mode === "light" ? "dark" : "light"}`}
          >
            {title}
          </h5>
          <p
            className={`card-text text-${mode === "light" ? "dark" : "light"}`}
          >
            {description}
          </p>
          <p
            className={`text-${mode === "light" ? "dark" : "light"}`}
            style={{ fontSize: "10px" }}
          >
            By {author} on {date} {time} GMT
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className={`btn btn-sm btn-${
              mode === "light" ? "dark" : "secondary"
            }`}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;

NewsItem.defaultProps = {
  author: "Unknown",
};
