export class Page {
    //The number of elements in the page
    public pageSize: number = 10;
    //The total number of elements
    public totalCount: number = 0;
    //The total number of pages
    public totalPages: number = 0;
    //The current page number
    public currentPage: number = 0;
    // The current page number loaded
    public currentPageClient: number = 0;

    //Next Page 
    public nextPageLink: string = '';
    //Previous Page
    public previousPageLink: string = '';
}