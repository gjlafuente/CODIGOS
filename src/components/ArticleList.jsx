import React from 'react';

export default function ArticleList({ articles }) {
  return (
    <ul>
      {articles.map((article, index) => (
        <li key={index}>{article.title}</li>
      ))}
    </ul>
  );
}
