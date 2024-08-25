export interface Product {
    idProduct: string;
    name: string;
    value: number;
    description: string;
    image: string;
    link: string | null;
    _links: {
      "Products List": {
        href: string;
      };
    };
  }
  