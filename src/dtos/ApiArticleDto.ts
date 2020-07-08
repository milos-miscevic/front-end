export default interface ApiArticleDto {
    articleId: number;
    name: string;
    categoryId: number;
    shortDescription: string;
    description: string;
    price: number;

    articleFeatures: {
        articleFeatureId: number;
        featureId: number;
        value: string;
    }[];

    features: {
        featureId: number;
        name: string;
    }[];

    photos: {
        photoId: number;
        imagePath: string;
    }[];

    category?: {
        name: string;
    };

}