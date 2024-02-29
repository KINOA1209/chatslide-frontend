const Card: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className='rounded-lg p-2 sm:p-4 lg:p-6 my-2 sm:my-4 border border-2 border-gray-200 flex flex-col gap-y-2 sm:gap-y-4'>
      {children}
    </div>
  );
}

export default Card;