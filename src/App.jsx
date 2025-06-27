import React, { useState } from 'react';
import ArticleList from './components/ArticleList';
import ArticleForm from './components/ArticleForm';

export default function App() {
  const [articles, setArticles] = useState([]);

  const addArticle = (article) => {
    setArticles([...articles, article]);
  };

  return (
    <div>
      <h1>My Articles</h1>
      <ArticleForm onAdd={addArticle} />
      <ArticleList articles={articles} />
    </div>
  );
}
