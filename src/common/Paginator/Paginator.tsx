import style from './Paginator.module.sass'
import React, {useState} from 'react'
import next from '../img/next.svg'
import prev from '../img/back.svg'
import cn from 'classnames'


type PropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  portionSize?: number
}
let Paginator: React.FC<PropsType> = ({
                                        totalItemsCount, pageSize,
                                        currentPage, onPageChanged,
                                        portionSize = 10
                                      }) => {

  let pagesCount = Math.ceil(totalItemsCount / pageSize)
  let pages: Array<number> = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let portionCount = Math.ceil(pagesCount / portionSize)
  let [portionNumber, setPortionNumber] = useState(1)
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = portionNumber * portionSize

  return (
    <div className={style.page}>
      {portionNumber > 1 &&
      <img alt=""
           src={prev}
           onClick={() => {
             setPortionNumber(portionNumber - 1)
           }}/>}
      {pages
        .filter(n => n >= leftPortionPageNumber && n <= rightPortionPageNumber)
        .map((p) => {
          return <span key={p}
                       className={cn(style.page, {
                         [style.changePage]: currentPage === p
                       })
                       }
                       onClick={(e) => {
                         onPageChanged(p)
                       }}>{p}</span>
        })}
      {portionCount > portionNumber &&
      <img alt=""
           src={next}
           onClick={() => {
             setPortionNumber(portionNumber + 1)
           }}/>}
    </div>
  )
}

export default Paginator


