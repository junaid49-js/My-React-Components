import React, { useEffect, useState } from "react"
import Table from "./Table"
import { fetchResources } from './APIs/getAPIs';
import LoadingComponent from "./Components/LoadingComponent";


function App() {

  const [data,setData] = useState([])
  const [itemsPerPage,setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [dataRetrieving, setDataRetrieving] = useState(true);
  const [error, setError] = useState(false);
  const [apiSearch, setApiSearch] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      setDataRetrieving(true)
      try {
        const itemsToSkip = (currentPage - 1) * itemsPerPage
        const userData = await fetchResources('users', itemsPerPage, itemsToSkip, apiSearch);
        const total = userData.total;
        setTotalItems(total)
        setData(userData.users)
        setTotalPages(Math.ceil(total / itemsPerPage));
      } catch (error) {
        console.error(`Error getting data : ${error}`)
      } finally {
        
        setDataRetrieving(false)
      }
    }

    fetchData();
  },[currentPage, itemsPerPage, apiSearch])

  useEffect(() => {
    setCurrentPage(1);
  }, [apiSearch]);

  // useEffect(() => {
  //   if (!dataRetrieving && data.length === 0) {
  //     const timer = setTimeout(() => {
  //       setError(true);
  //     }, 6000);

  //     return () => clearTimeout(timer);
  //   } else {
  //     setError(false);
  //   }
  // }, [data, dataRetrieving]);

  

  // if (error) return <div className="h-screen flex items-center justify-center text-red-600 font-bold">Error: No data found.</div>;
  if(dataRetrieving) return <LoadingComponent />
  

  return (
    <>
      <Table 
          data={data} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          totalPages={totalPages}
          apiSearch={apiSearch}
          setApiSearch={setApiSearch}
          />
    </>
  )
}

export default App