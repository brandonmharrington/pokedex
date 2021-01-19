import React from 'react';

const Pagination = ({ goToPrevPokemon, goToNextPokemon }) => {
  return (
    <div>
      {goToPrevPokemon && <button onClick={goToPrevPokemon}>Previous</button>}
      {goToNextPokemon && <button onClick={goToNextPokemon}>Next</button>}
    </div>
  );
};

export default Pagination;
