import React from 'react'

const Pages = () => {
  return (
<nav aria-label="...">
  <ul className="pagination pagination-lg">
    {/* <li class="page-item active" aria-current="page">
      <span class="page-link">1</span>
    </li> */}
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    {/* <li class="page-item"><a class="page-link" href="#">3</a></li> */}
  </ul>
</nav>
  )
}

export default Pages