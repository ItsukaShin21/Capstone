import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { Container, Row, Col, Button, Form, Table, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSOList.css'; 

function CSOList() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newID, setNewID] = useState('');

  const data = React.useMemo(
    () => [
      { listNo: 1, id: 'CSO001', name: 'Jane Smith', status: 'Registered' },
      // Add more data here
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      { Header: 'No.', accessor: 'listNo' },
      { Header: 'ID Number', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Status', accessor: 'status' },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <Button variant="warning" className="me-2">Edit</Button>
            <Button variant="danger">Delete</Button>
          </div>
        ),
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
    pageOptions
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    usePagination
  );

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddCSO = () => {
    // Add the logic to handle the new Chief Security Officer addition here
    console.log('Adding new Chief Security Officer with ID:', newID);
    setShowModal(false);
  };

  return (
    <Container>
      <Row>
        <Col md={9}>
          <h1>Chief Security Officers</h1>
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
        <Col className="text-end">
          <Button variant="primary" onClick={handleShowModal}>Add Chief Security Officer</Button>
        </Col>
      </Row>
      <Table {...getTableProps()} striped bordered hover>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows
            .filter(row => row.original.name.toLowerCase().includes(search.toLowerCase()))
            .slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
            .map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </Table>

      <div className="pagination-controls">
        <Button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </Button>
        <Button
          onClick={() => gotoPage(pageIndex - 1)}
          disabled={!canPreviousPage}
        >
          {'<'}
        </Button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <Button
          onClick={() => gotoPage(pageIndex + 1)}
          disabled={!canNextPage}
        >
          {'>'}
        </Button>
        <Button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </Button>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30].map(size => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>

      {/* Modal for adding a Chief Security Officer */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Chief Security Officer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formIDNumber">
              <Form.Label>ID Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ID Number"
                value={newID}
                onChange={(e) => setNewID(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleAddCSO}>Add</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CSOList;
