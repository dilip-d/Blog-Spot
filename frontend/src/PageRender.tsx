import React from 'react'
import { useParams } from 'react-router-dom'
import { IParams } from './utils/TypeScript'
import NotFound from './components/global/NotFound'

const generatePage = (name: string) => {
  console.log(name);
  try {
    const component = () => require(`./pages/${name}`).default
    return React.createElement(component())
  } catch (err) {
    return <NotFound />;
  }
}

const PageRender = () => {

  const { page, slug }: IParams = useParams()

  let name = '';
  if (page) {
    name = slug ? `${page}/${slug}` : `${page}`
  }

  return generatePage(name)
}

export default PageRender