import React from "react";
import ScreenLayout from "../layouts/ScreenLayout";
import AppMode from "../components/AppMode";
import NewsContainer from "../containers/NewsContainer";

const Home = () => {
  return (
    <ScreenLayout title="Home" rightComponent={<AppMode />} scroll={false}>
      <NewsContainer />
    </ScreenLayout>
  );
};

export default Home;
