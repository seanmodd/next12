import React, { useContext } from 'react';
import Context from '../store/context';

export const DownloadImage = () => {
  const { globalState } = useContext(Context);

  return (
    <form
      method="get"
      action="https://images.ctfassets.net/clveum0ikkbk/3ZsxVyTFk2SKHWxazwJuqe/3027b2448f6b7425fd28754cbafe539a/liquid-fill.jpg"
    >
      <button disabled={!globalState.isLoggedIn} type="submit">
        Download
      </button>
    </form>
  );
};
