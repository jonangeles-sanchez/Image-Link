function SelectImageLink({ links, handleSelectLink, handleNewImageLink }) {
  return (
    <>
      {links.length > 0 ? (
        <>
          <p>Select which link to upload to</p>
          <select className="imagelink-dropdown" onChange={handleSelectLink}>
            {links.map((link) => {
              return (
                <option key={link.title} id={link._id}>
                  {link.title}
                </option>
              );
            })}
          </select>
          <p>Or create a new imagelink!</p>
          <button
            className="button-share-collection"
            onClick={handleNewImageLink}
          >
            Create new imagelink
          </button>
        </>
      ) : (
        <p>No imagelinks found</p>
      )}
    </>
  );
}

export default SelectImageLink;
