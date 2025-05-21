import React from "react";
import ScreenLayout from "../layouts/ScreenLayout";
import CategoriesContainer from "../containers/CategoriesContainer";
import AppMode from "../components/AppMode";

const Categories = () => {
  return (
    <ScreenLayout
      title="Categories"
      rightComponent={<AppMode />}
      scroll={false}
    >
      <CategoriesContainer />
    </ScreenLayout>
  );
};

export default Categories;
