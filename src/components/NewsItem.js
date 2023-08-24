import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, mode} = this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem", backgroundColor:mode==='light'?'white':'#10404a' }}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className={`card-title text-${mode==="light"?'dark':'light'}`}>{title}</h5>
            <p className={`card-text text-${mode==="light"?'dark':'light'}`}>{description}</p>
            <a rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className={`btn btn-sm btn-${mode==="light"?'dark':'secondary'}`}
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
