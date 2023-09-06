import React, {useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import "./News.css";
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar'
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loaderProgress, setLoaderProgress] = useState(0);

  const updateNews = async () => {
    let upper=`${props.category}`.charAt(0).toUpperCase() + `${props.category}`.slice(1);
    upper+= ' - NewsMonkey'
    document.title=upper
    setLoader(true);
    setLoaderProgress(20);
    const apiUrl = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&page=${page}&pageSize=${props.pageSize}&apiKey=${props.apiKey}`;
    let data = await fetch(apiUrl);
    let parsedData = await data.json();
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults);
      // setLoaderProgress(loaderProgress+20)
      const timeoutId = setTimeout(() => {
      setLoaderProgress(100)
      }, 1000); 
      setLoader(false);
      return () => clearTimeout(timeoutId);
  }
  useEffect(()=>{
    updateNews();
    //eslint-disable-next-line
  },[])

  const fetchMoreData= async ()=>{
    const newPage=page+1;
    setLoader(true);
    const apiUrl = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&page=${newPage}&pageSize=${props.pageSize}&apiKey=${props.apiKey}`;
    let data = await fetch(apiUrl);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults);
    setPage(newPage);
    setLoader(false);
  }
    let { mode,heading } = props;
    return (
      <>
      <div>
        <LoadingBar
        color={`${mode === "light" ? "#0ce8f7" : "orange"}`}
        progress={loaderProgress}
        onLoaderFinished={()=>setLoaderProgress(0)}
       />
       </div>
        <h1 className={`mx-5 top-heading text-${mode === "light" ? "dark" : "light"}`}>
          {heading}
        </h1>
        {loader && < Loader/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={loader && < Loader/>}
        >
        <div className="container my-3">
          {articles.map((element) => {
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
      </>
    );
}

export default News;
News.defaultProps={
  country: 'us',
  pageSize: 15,
  category:'general',
  heading:'NewsMonkey - Top Headlines',
  page: 1
}
News.propTypes={
  country:propTypes.string.isRequired,
  pageSize: propTypes.number.isRequired,
}