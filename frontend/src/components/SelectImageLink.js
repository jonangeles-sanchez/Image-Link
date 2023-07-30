function SelectImageLink({ links, handleSelectLink, handleNewImageLink }) {
  return (
    <>
      {links.length > 0 ? (
        <>
          <p>Select which collection to upload to</p>
          <select className="imagelink-dropdown" onChange={handleSelectLink}>
            {links.map((link) => {
              return (
                <option key={link.title} id={link._id}>
                  {link.title}
                </option>
              );
            })}
          </select>
          <p>Or create a new collection!</p>
        </>
      ) : (
        <p>No collections found, create a new one!</p>
      )}

      <button className="button-share-collection" onClick={handleNewImageLink}>
        Create New Collection
      </button>
    </>
  );
}

export default SelectImageLink;
