import React, { FC } from 'react'
import { useQuery } from 'react-apollo'
import getTwites from './graphql/getTwites.gql'
import getConfig from './graphql/getConfig.gql'
import styles from './TwitterCards.css'

interface Props {
  title: string
  searchTerm: string
}

interface Tweet {
  text: string,
  user: {
    name: string
  }
}

const TwitterCards = ({ title = 'Twitter Title', searchTerm = 'Juventus' }: Props) => {
  const { data, loading, error } = useQuery<{ search: Tweet[] }>(getTwites, { variables: { searchTerm } })

  // console.log(data)
  // console.log(error)

  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    )
  }
  if (error) {
    return <h4>Error on data fetching</h4>
  }

  const firstFourTweets = data?.search.slice(0, 4) ?? []

  return (
    <div className="w-80-ns w-90 mv-2 db center mt7 mw9">
      <h2 className="tc">{title}</h2>
      <div className={`db flex-ns `+`${styles.tweetsContainer}`}>
        <div className={`dn flex-ns `+`${styles.locationContainer}`}>
          <p className={`tc f1 `+`${styles.location}`}>"{searchTerm}"</p>
        </div>
        <div className={`db dn-m `+`${styles.locationContainerMobile}`}>
          <p className={`tc f2 `+`${styles.location}`}>"{searchTerm}"</p>
        </div>
        <ul className={`${styles.tweets}`}>
          {firstFourTweets.map((item: Tweet, index: number) => (
            <li key={index}>
              <span className={`${styles.userName}`}>
                @{item.user.name}
              </span> says: {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

}

TwitterCards.schema = {
  title: 'editor.twitter-integration.title',
  description: 'editor.twitter-integration.description',
  type: 'object',
  properties: {
    title: {
      title: 'Title',
      description: 'This is the title of the Twitter Block',
      type: 'string',
      default: 'Title',
    },
    searchTerm: {
      title: 'Search Term',
      description: 'This is the search term Twitter Block',
      type: 'string',
      default: 'Juventus',
    },
  },
}

export default TwitterCards
