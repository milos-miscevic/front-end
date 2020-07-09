export default class ArticleType {
    articleId?: number;
    name?: string;
    shortDescription?: string;
    description?: string;
    imageUrl?: string;
    price?: number;
    categoryId?: number;


    articleFeatures?: {
        articleFeatureId: number;
        featureId: number;
        value: string;
    }[];

    features?: {
        featureId: number;
        name: string;
    }[];

    photos?: {
        photoId: number;
        imagePath: string;
    }[];

    category?: {
        name: string;
    };
}