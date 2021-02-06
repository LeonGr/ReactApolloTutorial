import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { AUTH_TOKEN, LINKS_PER_PAGE } from '../constants';
import { FEED_QUERY } from './LinkList';
import { timeDifferenceForDate } from '../utils';
import { LinkWrapper, LinkObject } from '../types';

const VOTE_MUTATION = gql`
mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const Link = (props: LinkWrapper) => {
    const { link } = props;
    const authToken = localStorage.getItem(AUTH_TOKEN);

    const take = LINKS_PER_PAGE;
    const skip = 0;
    const orderBy = { createdAt: 'desc' };

    const [vote] = useMutation(VOTE_MUTATION, {
        variables: {
            linkId: link.id
        },
        update(cache, { data: { vote } }) {
            const query: any = cache.readQuery({
                query: FEED_QUERY
            });
            const feed = query['feed'];

            const updatedLinks = feed.links.map((feedLink: LinkObject) => {
                if (feedLink.id === link.id) {
                    return {
                        ...feedLink,
                        votes: [...feedLink.votes, vote]
                    };
                }

                return feedLink;
            });

            cache.writeQuery({
                query: FEED_QUERY,
                data: {
                    feed: {
                        links: updatedLinks
                    }
                }
            });
        }
    });

    return (
        <div className="flex mt2 items-start">
            <div className="flex items-center">
                <span className="gray">{props.index + 1}.</span>
                {authToken && (
                    <div
                        className="ml1 gray f11"
                        style={{ cursor: 'pointer' }}
                        onClick={(event: React.MouseEvent<HTMLElement>) => {
                            vote()
                        }}
                    >
                        ▲
                    </div>
                )}
            </div>
            <div className="ml1">
                <div>
                    {link.description} (<a href={link.url}>{link.url}</a>)
                </div>
                {authToken && (
                    <div className="f6 lh-copy gray">
                        {link.votes.length} votes | by{' '}
                        {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
                        {timeDifferenceForDate(link.createdAt)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Link;
