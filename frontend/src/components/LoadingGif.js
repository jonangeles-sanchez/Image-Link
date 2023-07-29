import loadingGif from "./assets/26pFklJn2H.gif";
function LoadingGif() {
  return (
    <div className="loadingGifContainer">
      <div className="loadingGif">
        <img src={loadingGif} alt="Loading..." />
      </div>
    </div>
  );
}

export default LoadingGif;
