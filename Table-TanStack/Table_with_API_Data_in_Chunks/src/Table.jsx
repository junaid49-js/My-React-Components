import React, { useState, useEffect } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'


const ColumnHelper = createColumnHelper();

const columns = [
    ColumnHelper.accessor('id', {
        cell: (info) => `#${String(info.getValue()).padStart(5, '0')}`,
        header: () => (
            <span className='flex items-center'>
                ID
            </span>
        ),
    }),

    ColumnHelper.accessor(
        row => `${row.firstName} ${row.lastName}`, 
        {
            id: 'name', // You need an ID when using function accessors
            header: () => (
                <span className='flex items-center'>
                    Name
                </span>
            ),
            cell: info => info.getValue(),
        }
    ),

    ColumnHelper.accessor('username', {
        cell: (info) => info.getValue(),
        header: () => (
            <span className='flex items-center'>
                Username
            </span>
        ),
    }),

    ColumnHelper.accessor('email', {
        cell: (info) => info.getValue(),
        header: () => (
            <span className='flex items-center'>
                Email
            </span>
        ),
    }),

    ColumnHelper.accessor('phone', {
        cell: (info) => info.getValue(),
        header: () => (
            <span className='flex items-center'>
                Phone
            </span>
        ),
    })
]

const Table = ({data, currentPage, setCurrentPage, itemsPerPage, setItemsPerPage, totalPages, apiSearch, setApiSearch}) => {
    const [searchInput, setSearchInput] = useState(apiSearch);
    const [sorting, setSorting] = useState([])
    const [debouncedInput, setDebouncedInput] = useState(currentPage);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (debouncedInput !== currentPage) {
                let page = debouncedInput;
                if (page < 1) page = 1;
                if (page > totalPages) page = totalPages;
                setCurrentPage(page);
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [debouncedInput]);

    useEffect(() => {
        const timer = setTimeout(() => {
          setApiSearch(searchInput);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);

    useEffect(() => {
        setDebouncedInput(currentPage);
    }, [currentPage]);

    useEffect(() => {
        setSearchInput(apiSearch);
    }, [apiSearch]);

    const table = useReactTable({
        data,
        columns,
        state:{
            sorting
        }, 
        initialState:{
            pagination: {
                pageSize: itemsPerPage,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),

        getPaginationRowModel: getPaginationRowModel(),
    })
    
    return (
        <div className='flex flex-col min-h-screen max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>

            <div className='mb-4 relative'>
                <input 
                type="text" 
                value={searchInput} 
                onChange={(e) => setSearchInput(e.target.value)} 
                placeholder='Search....' 
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500' 
                />
            </div>

            <div className='overflow-x-auto bg-white shadow-md rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        <div {
                                            ...{
                                                className: header.column.getCanSort() ? "cursor-pointer select-none flex items-center" : "",
                                                onClick: header.column.getToggleSortingHandler()
                                            }
                                        }>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                            }
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className='hover:bg-gray-50'>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                        {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )
                                            }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700'>
                <div className='flex items-center mb-4 sm:mb-0'>
                    <span className='mr-2'>Items Per Page</span>
                    <select 
                    className='border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2' 
                    value={table.getState().pagination.pageSize} 
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value))
                        setItemsPerPage(e.target.value)
                    }}
                    >
                        {[10,20,50,100].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex items-center space-x-2'>
                    <button 
                    className='p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50'
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage <= 0}
                    >
                        Very First
                    </button>

                    <button 
                    className='p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50' 
                    onClick={() => setCurrentPage(currentPage => currentPage - 1)} 
                    disabled={currentPage <= 0}
                    >
                        Previous
                    </button>

                    <span className='flex items-center'>
                        <input 
                        type="number" 
                        min={totalPages == 0 ? 0 : 1}
                        max={totalPages}
                        // value={table.getState().pagination.pageIndex + 1}
                        value={totalPages == 0 ? 0 : debouncedInput}
                        onChange={(e) => {
                            setDebouncedInput(Number(e.target.value));
                        }}
                        className='w-16 p-2 rounded-md border border-gray-300 text-center'
                        />
                        <span className='ml-1'>of {totalPages}</span>
                    </span>

                    <button 
                    className='p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50' 
                    onClick={() => {
                        setCurrentPage(currentPage => currentPage + 1)
                    }}
                    disabled={currentPage >= totalPages}
                    >
                        Next
                    </button>

                    <button 
                    className='p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50' 
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage >= totalPages}
                    >
                        Very Last
                    </button>
                </div>  

            </div>
        </div>
    )
}

export default Table