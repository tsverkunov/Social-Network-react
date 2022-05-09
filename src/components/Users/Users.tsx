import React, {FC, useEffect} from 'react'
import style from './Users.module.sass'
import Paginator from '../../common/Paginator/Paginator'
import Preloader from '../../common/Preloader/Preloader'
import {UserSearchForm} from './UsersSearchForm'
import {FilterType, follow, requestUsers, unfollow} from '../../redux/usersReducer'
import {useDispatch, useSelector} from 'react-redux'
import {
  getAuthorizedUserId,
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUserCount,
  getUsers,
  getUsersFilter
} from '../../redux/usersSelectors'
import {User} from './User/User'
import {useHistory} from 'react-router'
import * as queryString from 'querystring'


type PropsType = {}

export const Users: FC<PropsType> = React.memo(() => {

  const users = useSelector(getUsers)
  const totalUserCount = useSelector(getTotalUserCount)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const followingInProgress = useSelector(getFollowingInProgress)
  const filter = useSelector(getUsersFilter)
  const isOwner = useSelector(getAuthorizedUserId)
  const isFetching = useSelector(getIsFetching)

  const dispatch = useDispatch()
  const history = useHistory()

  type QueryParamsType = { term?: string; page?: string; friend?: string }

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

    let actualPage = currentPage
    let actualFilter = filter

    if (!!parsed.page) actualPage = Number(parsed.page)

    if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

    switch (parsed.friend) {
      case 'null':
        actualFilter = {...actualFilter, friend: null}
        break
      case 'true':
        actualFilter = {...actualFilter, friend: true}
        break
      case 'false':
        actualFilter = {...actualFilter, friend: false}
        break
    }

    dispatch(requestUsers(actualPage, pageSize, actualFilter))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const query: QueryParamsType = {}
    if (!!filter.term) query.term = filter.term
    if (filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.page = String(currentPage)

    history.push({
      pathname: '/users',
      search: queryString.stringify(query)
    })
    // eslint-disable-next-line
  }, [filter, currentPage])

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
  }
  const followUsers = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollowUsers = (userId: number) => {
    dispatch(unfollow(userId))
  }


// for Pagination
  let pagesCount = Math.ceil(totalUserCount / pageSize)

  return (
    <div className={style.wrapper}>
      <div>
        <UserSearchForm onFilterChanged={onFilterChanged}/>
      </div>
      <Paginator
        totalItemsCount={totalUserCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />
      {isFetching
        ? <Preloader/>
        : <div className={style.wrapperContent}>
          {users.map(u =>
            <User
              followingInProgress={followingInProgress}
              follow={followUsers}
              unfollow={unfollowUsers}
              isOwner={isOwner}
              user={u}
              key={u.id}
            />
          )}
        </div>}
    </div>
  )
})
