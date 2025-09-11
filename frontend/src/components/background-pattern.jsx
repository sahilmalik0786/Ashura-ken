export const  BackgroundPattern = ()=> {
  return (
    <section
      className='absolute inset-0 -z-10  '
      aria-hidden='true'
    >
      <div
        className='absolute inset-0 
      bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]'
      ></div>
    </section>
  );
}

export const DotBackground = () => {
  return (
    <div className='absolute inset-0 -z-10'>
      <div className='relative h-full w-full [&>div]:absolute [&>div]:h-full [&>div]:w-full [&>div]:bg-[radial-gradient(var(--border)_1px,transparent_1px)] [&>div]:[background-size:16px_16px]'>
        <div></div>
      </div>
    </div>
  );
};

