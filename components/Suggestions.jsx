import faker from '@faker-js/faker'
import { useState, useEffect } from 'react'
import { Tooltip, Button } from 'antd'
import 'antd/dist/antd.css'

const text = <span>Follow feature is yet to release</span>
const buttonWidth = 70

function Suggestions() {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }))
    setSuggestions(suggestions)
  }, [])

  return (
    <div className="mt-4 ml-4">
      <div className="mb-5 flex justify-between text-sm">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="font-semibold text-gray-600">See all</button>
      </div>
      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className="mt-3 flex items-center justify-between"
        >
          <img
            src={profile.avatar}
            alt=""
            className="h-10 w-10 rounded-full border p-[2px]"
          />
          <div className="ml-4 flex-1">
            <h2 className="text-sm font-semibold">{profile.username}</h2>
            <h3 className="text-xs text-gray-400">
              Works at {profile.company.name}
            </h3>
          </div>
          <Tooltip placement="bottom" title={text} color="blue">
            <button className="text-xs font-semibold text-blue-400">
              Follow
            </button>
          </Tooltip>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
