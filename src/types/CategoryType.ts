import ArticleType from "./ArticleType";

export default class CategoryType {
    // ako iza imena stavimo "?", znaci da ne mora da bude inicijalizovana vrednost
    categoryId?: number;
    name?: string;
    description?: string;
    items?: ArticleType[];

}