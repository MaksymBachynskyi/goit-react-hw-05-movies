export function Form({ onSetSearchParams }) {
  function searchByName(evnt) {
    evnt.preventDefault();
    const searchName = evnt.target.elements.searchValue.value;
    if (searchName === '') {
      return onSetSearchParams({});
    }
    onSetSearchParams({ query: searchName });

    evnt.target.reset();
  }

  return (
    <form onSubmit={searchByName}>
      <input type="text" name="searchValue" />
      <button type="submit">Search</button>
    </form>
  );
}
