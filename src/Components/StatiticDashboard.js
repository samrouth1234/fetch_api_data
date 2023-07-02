"use client"
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function StatiticDashboard() {
      const [certificateData, setCertificateData] = useState([]);
      const [userData, setUserData] = useState([]);
      const [isLoading, setLoading] = useState(true);

      useEffect(() => {
            setLoading(true);
            const fetchCertificateData = async () => {
                  try {
                        const response = await fetch("http://136.228.158.126:8002/api/v1/certificates?page=1&limit=20");
                        const responseData = await response.json();
                        const data = await responseData.data.list;
                        console.log("list Certificate: ", data);
                        setCertificateData(data);
                  } catch (error) {
                        console.error("error: " + error);
                  }
            };
            fetchCertificateData();
      }, []);

      useEffect(() => {
            setLoading(true);
            const fetchUserData = async () => {
                  try {
                        const response = await fetch("http://136.228.158.126:8002/api/v1/users");
                        const responseData = await response.json();
                        const data = await responseData.data.list;
                        console.log("list User: ", data);
                        setUserData(data);
                  } catch (error) {
                        console.error("error: " + error);
                  }
            };
            fetchUserData();
      }, []);

      const data = certificateData.concat(userData);

      const columns = [
            {
                  name: 'Number of Created Certificate',
                  selector: 'id',
            },
            {
                  name: 'User',
                  selector: 'username',
            },
            {
                  name: 'Date',
                  selector: 'createdAt'
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