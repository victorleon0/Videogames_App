export interface VideogamesInterface {
    id: number;
    title: string;
    company: string;
    cover: string;
    platform: string[];
    year: number;
    genre: string;
}

export interface PlatformInterface{
    id: number;
    value: string;
}
=======
export interface NavigatorInterface {
    logo:ImageInterface;
    links:LinksInterface[];
  }

  export interface ImageInterface {
      src: string;
      alt: string
  }

export interface LinksInterface {
    text: string;
    link: string;
}


