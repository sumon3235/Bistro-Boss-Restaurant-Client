
const Cover = ({img, title, subTitle }) => {
  return (
    <div className='max-w-screen-2xl mx-auto'>

    <div
      className="hero min-h-[800px] parallax-bg bg-cover bg-center relative"
      style={{ backgroundImage: `url('${img}')` }}
    >
      <div className="hero-content text-center text-white">
        <div className="py-10 px-16 hero-overlay bg-black/60 rounded-lg">
          <h1 className="text-5xl font-bold uppercase tracking-widest mb-4">
            {title}
          </h1>
          <p className="text-lg tracking-widest">
            {subTitle}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Cover;