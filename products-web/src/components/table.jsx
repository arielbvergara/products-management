import { deleteProductByCode } from "@/api/products";
import { Table, Row, Col, Tooltip } from "@nextui-org/react";
import Link from "next/link";

export default function TableComponent({columns, rows, actions}) {

  const handleDeleteAsync = async (code) => {
    console.log("codeeee", code)
    if (confirm('Are you sure you want to delete this product?')) {
      // Save it!
      let response = await deleteProductByCode(code);

      alert(response)
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }
  }

  const renderCell = (product, columnKey) => {

    const cellValue = product[columnKey];
    //TODO: Make it more generic
    if (columnKey == "actions"){
      return (
        <Row justify="center" align="center">
          <Col css={{ d: "flex" }}>
            <Tooltip content="Product details">
            <Link href={`/products/details/${product.code}`} className="text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>

            </Link>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit product">
              <Link href={`/products/edit/${product.code}`} className="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>

              </Link>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }} onClick={async () => await handleDeleteAsync(product.code)}>
            <Tooltip
              content="Delete product"
              color="error"
            >
              <div className="text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
            </Tooltip>
          </Col>
        </Row>
      );
    }
    else{
      return cellValue;
    }
  };

  return (
    <Table
      aria-label="Example table with custom cells"
      shadow={true}
      css={{
        height: "auto",
        minWidth: "60%",
      }}
      bordered={false}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={rows}>
        {(item) => (
          <Table.Row key={item.code}>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}
