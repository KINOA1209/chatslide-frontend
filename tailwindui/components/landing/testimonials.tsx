'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import TiktokEmbed from './TiktokEmbed';
import { CardsSlider } from '../new_landing/CardsSlider';

export default function Testimonails() {
  const iframeList = [
    <iframe
      className='w-full'
      src='https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7134734556737196032'
      height='500'
      title='Embedded post'
    ></iframe>,
    <TiktokEmbed src='https://www.tiktok.com/embed/7307629718143012102' />,
    <div className='relative w-full scale-[1.05]'>
      <TwitterTweetEmbed tweetId={'1698559011107602603'} />
    </div>,
    <TiktokEmbed src='https://www.tiktok.com/embed/7304055660713381162' />,
    <iframe
      className='w-full'
      src='https://cards.producthunt.com/cards/comments/2713233?v=1'
      height='400'
    ></iframe>,
    <iframe
      className='w-full'
      src='https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7134729820302696448'
      height='500'
      title='Embedded post'
    ></iframe>,
  ];

  return (
    
    <div className='w-full' data-aos='fade-right'>
      <CardsSlider>
          {iframeList.map((iframe, index) => {
            return (
              <div
                key={'mobile-' + index}
                className='shrink-0 w-[300px] h-[500px] mr-[20px] drop-shadow-md overflow-hidden rounded-2xl border border-gray-300'
              >
                {iframe}
              </div>
            );
          })}
      </CardsSlider>
    </div>
  );
}
