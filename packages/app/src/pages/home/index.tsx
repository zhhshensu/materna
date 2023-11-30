const renderAppList = (categories: any[]) => {
  return categories.map((category, index) => (
    <div key={index} className="mb-4">
      <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
      <ul className="list-none p-0 m-0 flex flex-wrap">
        {category.list.map((item, i) => (
          <li
            key={i}
            className="mb-2 p-4 bg-white rounded-md shadow-md hover:shadow-lg transition duration-300 flex-shrink-0 w-48 sm:w-48 hover:bg-secondary"
          >
            <a href="#" className="text-blue-500 hover:underline">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  ))
}

const Home = () => {
  const categories = [
    {
      title: 'Category 1',
      list: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
      title: 'Category 2',
      list: ['Item 4', 'Item 5', 'Item 6'],
    },
  ]
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Page</h1>
      {renderAppList(categories)}
    </div>
  )
}

export default Home
