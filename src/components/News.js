import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "./News.css";
export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
    };
  }
  async componentDidMount() {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=f0e4417198644166b22113c6187c0cfd`;
    let data = await fetch(apiUrl);      //takes a url and returns a promise
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles})


    // fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.status === "ok") {
    //       this.setState({ articles: data.articles });
    //       console.log(this.state.articles); // Do something with the articles array
    //     } else {
    //       console.error("Error fetching data");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Fetch error:", error);
    //   });
  }

  render() {
    return (
      <>
        <h1 className="mx-5">NewsMonkey - Top Headlines</h1>
        <div className="container my-3">
          {this.state.articles.map((element) => {
            return (
              <NewsItem
                key={element.url}
                title={element.title ? element.title.slice(0, 44) + "..." : ""}
                description={
                  element.description.length > 88
                    ? element.description.slice(0, 88) + "..."
                    : "Click below to read more"
                }
                imageUrl={element.urlToImage? element.urlToImage: "https://scitechdaily.com/images/Brain-Neurons-Rendering-Art.jpg"}
                newsUrl={element.url}
              />
            );
          })}

          {/* <NewsItem title="mytitle" description="mydescription" />
          <NewsItem title="mytitle" description="mydescription" />
          <NewsItem title="mytitle" description="mydescription" />
          <NewsItem title="mytitle" description="mydescription" />
          <NewsItem title="mytitle" description="mydescription" /> */}
        </div>
      </>
    );
  }
}

export default News;
