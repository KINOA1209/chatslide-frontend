const Loading: React.FC<{
  children?: React.ReactNode
  text?: string
}> = ({ children, text }) => {
  return (
    <div className='grow flex flex-col items-center justify-center'>
      <div className='grow flex flex-row items-center justify-center text-gray-600 text-[14px] md:text-[20px] font-normal leading-normal tracking-wide'>
        {children ? children : text ? text : 'Loading...⏳'}
      </div>
    </div>
  );
}

const Blank = Loading;

export {Blank, Loading}