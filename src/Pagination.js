import React from 'react';

const Pagination = ({ goToPrevPokemon, goToNextPokemon }) => {
  return (
    <div>
      {goToPrevPokemon && (
        <button className="pa1 mb3" onClick={goToPrevPokemon}>
          Previous
        </button>
      )}
      {goToNextPokemon && (
        <button className="pa1 mb3" onClick={goToNextPokemon}>
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
