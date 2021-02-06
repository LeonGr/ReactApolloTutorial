export interface LinkObject {
    id: string;
    createdAt: number;
    url: string;
    description: string;
    postedBy: {
        name: string;
    };
    votes: [];
}

export interface Feed {
    links: [LinkObject];
}

export interface LinkWrapper {
    index: number;
    link: LinkObject;
}