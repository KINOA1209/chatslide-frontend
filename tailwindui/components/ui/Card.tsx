const Card: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className='rounded-xl p-2 sm:p-4 my-2 sm:my-4 border border-2 border-gray-200 flex flex-col gap-y-2 sm:gap-y-4'>
      {children}
    </div>
  );
}

export default Card;