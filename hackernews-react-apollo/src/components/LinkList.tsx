import React from 'react';
import Link from './Link';
import { useQuery, gql } from '@apollo/client';
import { LinkObject } from '../types';
import { useHistory } from 'react-router';

export const FEED_QUERY = gql`
  query FeedQuery(
    $take: Int
    $skip: Int
    $orderBy: LinkOrderByInput
  ) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
      count
    }
  }
`;

const LinkList = () => {
    const {data} = useQuery(FEED_QUERY);
    const history = useHistory();

    const getLinks = () => {
        let links = data.feed.links.slice();

        if (history.location.pathname.includes('top')) {
            links.sort((l1: LinkObject, l2: LinkObject) => l2.votes.length - l1.votes.length);
        } else {
            links.sort((l1: LinkObject, l2: LinkObject) => l2.createdAt > l1.createdAt);
        }

        return links;
    }

    return (
        <div>
            {data && (
                <>
                    {getLinks().map((link: LinkObject, index: number) => (
                        <Link key={link.id} link={link} index={index}/>
                    ))}
                </>
            )}
        </div>
    )
};

export default LinkList;