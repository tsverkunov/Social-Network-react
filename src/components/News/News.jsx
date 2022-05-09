import React, {useCallback} from "react";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOCs/withAuthRedirect";
import {useDispatch, useSelector} from "react-redux";
import AddArticleForm from "./NewsForm/AddArticleForm";
import Article from "./Article/Article";
import {addNewsThunk} from "../../redux/newsReducer";


const News = () => {
  const articles = useSelector(state => state.newsReducer.articles);
  const dispatch = useDispatch();
  const addArticle = useCallback((news) => {
    dispatch(addNewsThunk(news))
  }, [dispatch]);

  const articlesElements = articles.map(a =>
     <Article key={a.id}
              article={a.article}
     />);
  return (
     <>
       <div>
         {articlesElements}
         <AddArticleForm addArticle={addArticle}/>
       </div>
     </>
  )
}

export default compose(withAuthRedirect)(News);


