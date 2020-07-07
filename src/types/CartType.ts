export default interface CartType {
    cartId: number;
    createdAt: string;
    cartArticles: {
        cartArticleId: number;
        articleId: number;
        quantity: number;
        article: {
            articleId: number;
            name: string;
            price: number;
            category: {
                categoryId: number;
                name: string;
            };
        }
    }[];
}