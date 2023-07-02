"use client"
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
export default function StatiticDashboard() {
      const [data, setData] = useState([]);
      const [isLoading, setLoading] = useState(true);
      useEffect(() => {
            setLoading(true);
            const fetchData = async () => {
                  try {
                        const response = await fetch("http://136.228.158.126:8002/api/v1/certificates?page=1&limit=20");
                        const responseData = await response.json();
                        const dataRes = await responseData.data;
                        const list = await dataRes.list;
                        console.log("list: ", list);
                        setData(list);
                  } catch (error) {
                        console.error("error: " + error);
                  }
            };
            fetchData();
      }, []);
      const columns = [
            {
                name: 'Product',
                selector: 'total',
            },
            {
                name: 'CreatedAt',
                selector: 'createdAt',
            },
            {
                name: 'CreatedBy',
                selector: 'createdBy'
            },
        ];

      return (
            <div className='container mt-5'>
            <DataTable
                title="Product"
                columns={columns}
                data={data}
                pagination
            />
        </div>
      )
}