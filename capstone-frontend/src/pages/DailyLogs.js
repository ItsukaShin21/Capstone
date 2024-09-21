import React, { useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import { Container, Row, Col, Form, Table, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/DailyLogs.css'; 

function DailyLogs() {
  const [search, setSearch] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [selectedPlate, setSelectedPlate] = useState('');

  const data = React.useMemo(
    () => [
      { listNo: 1, plateNo: 'ABC123', title: 'Faculty', timeIn: '08:00 AM', timeOut: '', status: 'Valid' },
      { listNo: 2, plateNo: 'XYZ789', title: 'Visitor', timeIn: '09:00 AM', timeOut: '04:00 PM', status: 'Exceeded' },
      // Add more data here
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      { Header: 'No.', accessor: 'listNo' },
      { Header: 'Plate No.', accessor: 'plateNo' },
      { Header: 'Title', accessor: 'title' },
      { Header: 'Time In', accessor: 'timeIn' },
      { Header: 'Time Out', accessor: 'timeOut' },
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

  useEffect(() => {
    const exceededRow = data.find(row => row.status === 'Exceeded');
    if (exceededRow) {
      setSelectedPlate(exceededRow.plateNo);
      setShowNotification(true);
    }
  }, [data]);

  const handleRowClick = (plateNo) => {
    // Navigate to locator page
    setSelectedPlate(plateNo);
    window.location.href = '/locator'; 
  };

  const handleCloseNotification = () => setShowNotification(false);

  return (
    <Container>
      <Row>
        <Col md={9}>
          <h1>Daily Logs</h1>
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
            .filter(row => row.original.plateNo.toLowerCase().includes(search.toLowerCase()))
            .slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
            .map(row => {
              prepareRow(row);
              const isExceeded = row.original.status === 'Exceeded';
              return (
                <tr
                  {...row.getRowProps()}
                  style={isExceeded ? { backgroundColor: 'red', color: 'white', cursor: 'pointer' } : {}}
                  onClick={() => isExceeded && handleRowClick(row.original.plateNo)}
                >
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

      {/* Notification Modal */}
      {showNotification && (
        <Modal show={showNotification} onHide={handleCloseNotification} centered>
          <Modal.Header closeButton>
            <Modal.Title>Parking Time Exceeded</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Plate number {selectedPlate} has exceeded parking time.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseNotification}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleCloseNotification();
                handleRowClick(selectedPlate);
              }}
            >
              View Location
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default DailyLogs;
