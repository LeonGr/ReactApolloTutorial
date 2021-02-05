import React from 'react';

interface LinkWrapper {
    link: {
        id: string;
        createdAt: string;
        url:  string;
        description: string;
    }
}

const Link = (props: LinkWrapper) => {
    const { link } = props;
    return (
        <div>
            <div>
                { link.description } (<a href={ link.url }>{ link.url }</a>)
            </div>
        </div>
    );
};

export default Link;
