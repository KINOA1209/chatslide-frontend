import React from 'react';

const videoData = {
  "@context": "http://schema.org",
  "@type": "VideoObject",
  "name": "DrLambda Tiktok Video",
  "thumbnailUrl": "https://drlambda.ai/imgs/ogimage.png",
  "uploadDate": "2023-11-30",
  "description": "DrLambda is your AI agent to create professional slides.",
  "contentUrl": "https://www.tiktok.com/@drlambda_ai/video/7304055660713381162",
};

const TiktokEmbed: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className="w-full">
      <iframe
        src={src}
        className='w-full aspect-[9/16]'
        allow="encrypted-media;"
      ></iframe>
      <script type="application/ld+json">
        {JSON.stringify(videoData)}
      </script>
    </div>
  );
}

export default TiktokEmbed;
