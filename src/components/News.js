import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import "./News.css";
import propTypes from 'prop-types'
export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loader: false,
      page: 1,
      totalResults: 0,
      totalPages: 0,
    };
  }
  static defaultProps={
    country: 'us',
    pageSize: '15',
    category:'general'

  }
  static propTypes={
    country:propTypes.string.isRequired,
    pageSize: propTypes.number.isRequired,
    general: propTypes.string.isRequired
  }
  handleNextPage = async () => {
    if (this.state.totalPages > this.state.page) {
      this.setState({ page: this.state.page + 1 }, async () => {
        const apiUrl = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&page=${this.state.page}&pageSize=${this.props.pageSize}&apiKey=f0e4417198644166b22113c6187c0cfd`;
        this.setState({loader:true});
        let data = await fetch(apiUrl);
        let parsedData = await data.json();
        console.log(this.state.page);
        this.setState({ articles: parsedData.articles, loader:false });
      });
    } else {
    }
  };

  handlePrevPage = async () => {
    if (this.state.page>1) {
      this.setState({ page: this.state.page - 1 }, async () => {
        const apiUrl = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&page=${this.state.page}&pageSize=${this.props.pageSize}&apiKey=f0e4417198644166b22113c6187c0cfd`;
        this.setState({loader:true});
        let data = await fetch(apiUrl);
        let parsedData = await data.json();
        console.log(this.state.page);
        this.setState({ articles: parsedData.articles,loader:false });
      });
    } else {
      
    }
  };

  async componentDidMount() {
    this.setState({loader:true});
    const apiUrl = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&page=1&pageSize=${this.props.pageSize}&apiKey=f0e4417198644166b22113c6187c0cfd`;
    let data = await fetch(apiUrl);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState(
      { articles: parsedData.articles, totalResults: parsedData.totalResults },
      () => {
        this.setState({
          totalPages: Math.ceil(this.state.totalResults / this.props.pageSize),
        });
      }
    );
    this.setState({loader:false});

    console.log(this.state.totalPages, this.state.totalResults);
  }

  render() {
    let { mode } = this.props;
    return (
      <>
        <h1 className={`mx-5 text-${mode === "light" ? "dark" : "light"}`}>
          NewsMonkey - Top Headlines
        </h1>
        {this.state.loader && < Loader/>}
        <div className="container my-3">
          {!this.state.loader && this.state.articles.map((element) => {
            return (
              <NewsItem
                key={element.url}
                title={element.title ? element.title.slice(0, 44) + "..." : ""}
                description={
                  element.description
                    ? element.description.slice(0, 88) + "..."
                    : "Click below to read more"
                }
                imageUrl={
                  element.urlToImage? element.urlToImage: "https://scitechdaily.com/images/Brain-Neurons-Rendering-Art.jpg"
                }
                newsUrl={element.url}
                mode={mode}
              />
            );
          })}
        </div>
        <div
          className="pre-nextButtons"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "350px",
            marginRight: "350px",
          }}
        >
          <button
            type="button"
            className={`btn btn-${mode === "light" ? "dark" : "secondary"}`}
            onClick={this.handlePrevPage}
            disabled={this.state.page === 1}
          >
            &laquo; Previous
          </button>
          <button
            type="button"
            id="nextButton"
            className={`btn btn-${mode === "light" ? "dark" : "secondary"}`}
            onClick={this.handleNextPage}
            disabled={this.state.page>=this.state.totalPages}
          >
            Next &raquo;
          </button>
        </div>
      </>
    );
  }
}

export default News;
