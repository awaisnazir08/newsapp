import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import "./News.css";
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar'
export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loader: false,
      page: 1,
      totalResults: 0,
      totalPages: 0,
      loaderProgress:0
    };
    let upper=`${this.props.category}`.charAt(0).toUpperCase() + `${this.props.category}`.slice(1);
    upper+= ' - NewsMonkey'
    document.title=upper
  }
  static defaultProps={
    country: 'us',
    pageSize: '15',
    category:'general',
    heading:'NewsMonkey - Top Headlines',
    page: 1
  }
  static propTypes={
    country:propTypes.string.isRequired,
    pageSize: propTypes.number.isRequired,
  }

  updateNews = async () => {
    this.setState({loader:true, loaderProgress:20});
    const apiUrl = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&page=${this.state.page}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}`;
    let data = await fetch(apiUrl);
    // this.setState({loaderProgress:this.state.loaderProgress+10});
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState(
      { articles: parsedData.articles, totalResults: parsedData.totalResults },
      () => {
        this.setState({
          totalPages: Math.ceil(this.state.totalResults / this.props.pageSize),loaderProgress:this.state.loaderProgress+20
        });

      }
    );
    setTimeout(() => {
      this.setState({ loaderProgress: 100 }); // Set loaderProgress to 100 after a delay
    }, 500); 
    
    this.setState({loader:false});
  }
  // handleNextPage = async () => {
  //   this.setState({page:this.state.page+1})
  //   this.updateNews();
  // };

  // handlePrevPage = async () => {
  //   this.setState({page:this.state.page-1})
  //   this.updateNews();
  // };

  async componentDidMount() {
    this.setState({loaderProgress:10})
    this.updateNews();
  }

  fetchMoreData= async ()=>{
    const newPage=this.state.page+1;
    this.setState({loader:true});
    const apiUrl = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&page=${newPage}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}`;
    let data = await fetch(apiUrl);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState(
      { articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults,page:newPage },
      () => {
        this.setState({
          totalPages: Math.ceil(this.state.totalResults / this.props.pageSize),
        });
      }
    );
    this.setState({loader:false});
  }

  render() {
    let { mode,heading } = this.props;
    return (
      <>
      <div>
        <LoadingBar
        color={`${mode === "light" ? "#0ce8f7" : "orange"}`}
        progress={this.state.loaderProgress}
        onLoaderFinished={()=>this.setState({loaderProgress:0})}
       />
       </div>
        <h1 className={`mx-5 text-${mode === "light" ? "dark" : "light"}`}>
          {heading}
        </h1>
        {this.state.loader && < Loader/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={this.state.loader && < Loader/>}
        >
        <div className="container my-3">
          {this.state.articles.map((element) => {
            console.log(element.source.name)
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
                source={element.source.name}
                mode={mode}
                author={element.author? element.author: 'Unknown'}
                date={element.publishedAt? element.publishedAt.slice(0,10):"Unknown"}
                time={element.publishedAt?element.publishedAt.slice(11,-1):'Unknown'}
              />
            );
          })}
        </div>
        </InfiniteScroll>

        {/* <div
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
        </div> */}
      </>
    );
  }
}

export default News;
