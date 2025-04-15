import { Stack } from '@mui/material';
import { Button } from 'components/button';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import { useCommentList } from 'services/api/use-comment-list';
import { isAuthenticated } from 'services/AuthService';
import CommentDetails from './comment-details';
import CommentItem from './comment-item/comment-item';
import WriteComment from './comment-item/write-comment';

const Comments = (props: any) => {
  const { query } = useRouter();
  const user = isAuthenticated();
  const guid = query?.guid;
  const { data, hasNextPage, refetch, fetchNextPage, isFetchingNextPage } =
    useCommentList(guid);
  return (
    <Stack gap="1.5rem">
      <CommentDetails data={props?.data} />
      <WriteComment {...{ refetch }} isVerified={user?.is_virified} />
      {get(data, 'pages', []).map((page: any) =>
        get(page, 'results').map((comment: any) => (
          <CommentItem key={comment.guid} {...{ comment }} />
        ))
      )}
      {get(data, 'pages[0].count') > 4 && (
        <Button
          variant="contained"
          fullWidth
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? '...' : 'Кўпроқ'}
        </Button>
      )}
    </Stack>
  );
};

export default Comments;
