import React from 'react'

const LoadMore = ({ loadMore, maxPage, currentPage, loading }) => (
  <div className='load-more'>
    {currentPage < maxPage && <button className='button' onClick={loadMore}>{`${loading ? 'Cargando...' : 'Ver más'}`}</button>}
  </div>
)

export default LoadMore
