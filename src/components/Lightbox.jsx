const Lightbox = ({ closeMap }) => {
  return (
    <div
      onClick={closeMap}
      className="fixed w-screen h-screen bg-black opacity-50 z-[800]"
    ></div>
  );
};

export default Lightbox;
