import React from 'react';
import Panel from '../components/main-panel';
import Header from '../components/header';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Panel />
    </div>
  );
};

export default Home;