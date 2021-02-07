export type LinkObject = {
    id: string;
    createdAt: number;
    url: string;
    description: string;
    postedBy: {
        name: string;
    };
    votes: []
}

export type Feed = {
    links: [LinkObject];
}

export type LinkWrapper = {
    index: number;
    link: LinkObject;
}