import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/LogRecords.css';

function LogRecords() {
  const [search, setSearch] = useState('');

  const [data, setData] = useState([
    { id: 1, listNo: 1, title: 'Faculty', timeIn: '08:00 AM', timeOut: '05:00 PM', date: '2024-09-15' },
    { id: 2, listNo: 2, title: 'Staff', timeIn: '09:00 AM', timeOut: '04:00 PM', date: '2024-09-16' },
    // Add more data here
  ]);

  const columns = React.useMemo(
    () => [
      { Header: 'No.', accessor: 'listNo' },
      { Header: 'Title', accessor: 'title' },
      { Header: 'Time In', accessor: 'timeIn' },
      { Header: 'Time Out', accessor: 'timeOut' },
      { Header: 'Date', accessor: 'date' },
      { 
        Header: 'Action', 
        accessor: 'action', 
        Cell: ({ row }) => (
          <div className="text-center">
            <Button variant="danger" onClick={() => handleDelete(row.original.id)}>
              Delete
            </Button>
          </div>
        )
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize },
    setPageSize,
    gotoPage,
    pageCount,
    canPreviousPage,
    canNextPage,
    pageOptions,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    usePagination
  );

  const handleDelete = (id) => {
    setData(data.filter((log) => log.id !== id));
  };

  return (
    <Container>
      <Row>
        <Col md={9}>
          <h1>Log Records (S.Y. 2024-2025)</h1>
        </Col>
        <Col md={3} className="text-end">
          <div className="user-profile">
            <img src="https://via.placeholder.com/50" alt="User" className="user-photo" />
            <div>
              <p className="user-name">John</p>
              <p className="user-type">Admin</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>
      <Table {...getTableProps()} striped bordered hover>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows
            .filter((row) =>
              row.original.title.toLowerCase().includes(search.toLowerCase())
            )
            .slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
            .map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </Table>

      <div className="pagination-controls">
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>
        <Button onClick={() => gotoPage(pageIndex - 1)} disabled={!canPreviousPage}>
          {'<'}
        </Button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <Button onClick={() => gotoPage(pageIndex + 1)} disabled={!canNextPage}>
          {'>'}
        </Button>
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          {[10, 20, 30].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </Container>
  );
}

export default LogRecords;
