/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable arrow-body-style */
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useBookFile } from 'services/api/use-book-file';

const ReactEpubViewerComponent: any = dynamic(() => import('components/epub'));

const ReadOnline = () => {
  const { query } = useRouter();
  const bookFiles = useBookFile(query?.guid || '');

  useEffect(() => {
    if (bookFiles?.isError) Router.push('/login');
  }, []);
  return (
    <main>
      <Head>
        <title>Product details</title>
      </Head>
      {/* @ts-ignore next-line */}
      <ReactEpubViewerComponent epubBook={bookFiles?.data?.online_books[0]} />
    </main>
  );
};
export default ReadOnline;
