/* eslint-disable no-unused-expressions */
import React from "react";
import { useCategoryList } from "../../services/queries/use-category-list";
import RecomendationList from "./recommendation";

const CategoryRecomendation = () => {
    const categoryList = useCategoryList();

    return (
        <div>
            {
                categoryList?.results?.map((category) => <RecomendationList key={category?.guid} category={category} />)
            }
        </div>
    )
}

export default CategoryRecomendation