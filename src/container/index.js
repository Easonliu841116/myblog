import React, { useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'

function getApi () {
  return fetch('http://localhost:3000', {
    method: 'GET'
  })
}

const Root = document.querySelector('#root')
const Container = () => {
  const [data, setData] = useState('')
  const getData = useCallback(_ => {
    const getingData = async _ => {
      const data = await (await getApi()).json()
      setData(data.data)
    }
    getingData()
  }, [])

  useEffect(_ => {
    getData()
  }, [getData])

  return(
    <h1>
      {data}
    </h1>
  )
}

ReactDOM.render(<Container/>, Root)